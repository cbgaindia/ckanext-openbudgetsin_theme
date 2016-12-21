import logging
from datetime import datetime

import ckan.lib.helpers as h
import ckan.lib.munge as munge
import ckan.model as model
import ckan.plugins as p
import copy
from pylons import config
from webhelpers.html import escape, HTML, literal, url_escape

from ckan.common import request


def group_tree(organizations=[], type_='organization'):
    full_tree_list = p.toolkit.get_action('group_tree')({}, {'type': type_})

    if not organizations:
        return full_tree_list
    else:
        filtered_tree_list = group_tree_filter(organizations, full_tree_list)
        return filtered_tree_list


def group_tree_filter(organizations, group_tree_list, highlight=False):
    # this method leaves only the sections of the tree corresponding to the list
    # since it was developed for the users, all children organizations from the
    # organizations in the list are included
    def traverse_select_highlighted(group_tree, selection=[], highlight=False):
        # add highlighted branches to the filtered tree
        if group_tree['highlighted']:
            # add to the selection and remove highlighting if necessary
            if highlight:
                selection += [group_tree]
            else:
                selection += group_tree_highlight([], [group_tree])
        else:
            # check if there is any highlighted child tree
            for child in group_tree.get('children', []):
                traverse_select_highlighted(child, selection)

    filtered_tree = []
    # first highlights all the organizations from the list in the three
    for group in group_tree_highlight(organizations, group_tree_list):
        traverse_select_highlighted(group, filtered_tree, highlight)

    return filtered_tree


def group_tree_section(id_, type_='organization', include_parents=True,
                       include_siblings=True):
    return p.toolkit.get_action('group_tree_section')(
        {'include_parents': include_parents, 'include_siblings': include_siblings},
        {'id': id_, 'type': type_, })


def group_tree_parents(id_, type_='organization'):
    tree_node = p.toolkit.get_action('organization_show')({}, {'id': id_})
    if (tree_node['groups']):
        parent_id = tree_node['groups'][0]['name']
        parent_node = p.toolkit.get_action('organization_show')({}, {'id': parent_id})
        return group_tree_parents(parent_id) + [parent_node]
    else:
        return []


def group_tree_get_longname(id_, default="", type_='organization'):
    tree_node = p.toolkit.get_action('organization_show')({}, {'id': id_})
    longname = tree_node.get("longname", default)
    if not longname:
        return default
    return longname


def group_tree_highlight(organizations, group_tree_list):

    def traverse_highlight(group_tree, name_list):
        if group_tree.get('name', "") in name_list:
            group_tree['highlighted'] = True
        else:
            group_tree['highlighted'] = False
        for child in group_tree.get('children', []):
            traverse_highlight(child, name_list)

    selected_names = [o.get('name', None) for o in organizations]
   
    for group in group_tree_list:
        traverse_highlight(group, selected_names)
    return group_tree_list


def get_allowable_parent_groups(group_id):
    if group_id:
        group = model.Group.get(group_id)
        allowable_parent_groups = \
            group.groups_allowed_to_be_its_parent(type='organization')
    else:
        allowable_parent_groups = model.Group.all(
            group_type='organization')
    return allowable_parent_groups


def is_include_children_selected(fields):
    include_children_selected = False
    if request.params.get('include_children'):
        include_children_selected = True
    return include_children_selected


def get_package_count(organizations):
    '''
    finds the total number of datasets for all child nodes of an organization.
    '''

    total_package_count = 0

    if isinstance(organizations, list):
        for child in organizations:
            group = model.Group.get(child['id'])
            packages = group.packages()
            if packages:
                total_package_count += len(packages)

    return total_package_count


def get_description(organization):
    '''
    Returns the description of the organization.
    '''
    group = model.Group.get(organization['id'])
    return group.description


def get_date(package, output_required=None):
    '''
    Reurns the required date depending upon the output_required.
    for 'created': return the oldest creation dates among the resources.
    for 'updated': return the latest modification dates among the resources.
    '''
    try:
        resources = package['resources']
    except KeyError:
        return None
    else:
        if output_required == "created":
            # get the oldest datetime for the creation date; passing current datetime for
            # default
            return_datetime = get_oldest(resources, datetime.now())

        elif output_required == "updated":
            # get the latest datetime for the modification datetime; passing current
            # datetime for default.
            return_datetime = get_latest(resources)

        else:
            logging.error("No required datetime found")
            return_datetime = datetime.now()

        # extract the date only
        return_date = datetime.strftime(return_datetime.date(), "%B %d, %Y")

        return return_date


def get_oldest(resources, package_created):
    '''
    Get oldest of the creation datetimes.
    '''
    for resource in resources:
        date_string = resource['created']
        this_resource_created = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f")

        # check if this resource is oldest created; if yes then assign the daatetime to
        # package creation datetime.
        if this_resource_created < package_created:
            package_created = this_resource_created

    return package_created


def get_latest(resources):
    '''
    Get latest of the modification datetimes.
    '''
    package_modified_str = resources[0]['last_modified']
    package_modified = datetime.strptime(package_modified_str, "%Y-%m-%dT%H:%M:%S.%f")

    for resource in resources[1:]:
        date_string = resource['last_modified']
        this_resource_modified = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f")

        # check if this resource is latest modified; if yes then assign the daatetime to
        # package last modified datetime.
        if this_resource_modified > package_modified:
            package_modified = this_resource_modified

    return package_modified


def make_image_url(image_url):
    '''
    It checks if an image_url is actually a url, if not then it creates a complete url to render it.
    '''
    image_display_url = None
    if image_url and not image_url.startswith('http'):
        # munge here should not have an effect only doing it incase
        # of potential vulnerability of dodgy api input
        image_url = munge.munge_filename_legacy(image_url)
        image_display_url = h.url_for_static(
            'uploads/group/%s' % image_url,
            qualified=True
        )

    return image_display_url

def get_group_link(menu_item, title, **kw):
   
    link = literal("<a class='btn pull-right' href='/dataset/groups/" +kw["id"] + "'>" +"<i class='icon-group'>Add to Group</i> </a>")
    return link 
    