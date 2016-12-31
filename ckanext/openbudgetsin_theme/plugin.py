import actions
import db
import logging
import re

from ckan.common import c
from ckan.lib.dictization import table_dictize
import ckan.lib.dictization.model_dictize as md
from ckan.lib.plugins import DefaultOrganizationForm
import ckan.model as model
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckanext.openbudgetsin_theme import helpers

from ckanext.openbudgetsin_theme.logic import action
from ckanext.openbudgetsin_theme import helpers

log = logging.getLogger(__name__)

# This plugin is designed to work only these versions of CKAN
plugins.toolkit.check_ckan_version(min_version='2.0')


class Openbudgetsin_ThemePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.ITemplateHelpers, inherit=True)
    plugins.implements(plugins.IFacets)

    # IConfigurer

    def update_config(self, config):
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_public_directory(config, 'public')
        toolkit.add_resource('fanstatic', 'openbudgetsin_theme')

    # ITemplateHelpers
    def get_helpers(self):
        return {
            'get_date': helpers.get_date,
            'get_group_link':helpers.get_group_link,
        }

    def dataset_facets(self,facets_dict, package_type):
        facets_dict['groups'] = plugins.toolkit._('Sectors')
        facets_dict['organization'] = plugins.toolkit._('Budget Sources')
        return  facets_dict
    
    def organization_facets(self, facets_dict, organization_type, package_type):
        return  facets_dict

    def group_facets(self, facets_dict, group_type, package_type):
        return facets_dict


def custom_convert_from_extras(key, data, errors, context):

    '''Converts values from extras, tailored for groups.'''

    # Set to empty string to remove Missing objects
    data[key] = ""

    to_remove = []
    for data_key in data.keys():
        if (data_key[0] == 'extras'):
            data_value = data[data_key]
            if('key' in data_value and data_value['key'] == key[-1]):
                data[key] = data_value['value']
                to_remove.append(data_key)
                break
    else:
        return

    for remove_key in to_remove:
        del data[remove_key]


class HierarchyDisplay(plugins.SingletonPlugin):

    plugins.implements(plugins.IConfigurer, inherit=True)
    plugins.implements(plugins.IActions, inherit=True)
    plugins.implements(plugins.ITemplateHelpers, inherit=True)
    plugins.implements(plugins.IPackageController, inherit=True)

    # IConfigurer

    def update_config(self, config):
        plugins.toolkit.add_template_directory(config, 'templates')
        plugins.toolkit.add_template_directory(config, 'public')
        plugins.toolkit.add_resource('public/scripts/vendor/jstree', 'jstree')

    # IActions

    def get_actions(self):
        return {'group_tree': action.group_tree,
                'group_tree_section': action.group_tree_section,
                }

    # ITemplateHelpers
    def get_helpers(self):
        return {'group_tree': helpers.group_tree,
                'group_tree_section': helpers.group_tree_section,
                'group_tree_parents': helpers.group_tree_parents,
                'group_tree_get_longname': helpers.group_tree_get_longname,
                'group_tree_highlight': helpers.group_tree_highlight,
                'get_allowable_parent_groups': helpers.get_allowable_parent_groups,
                'is_include_children_selected': helpers.is_include_children_selected,
                'get_package_count': helpers.get_package_count,
                'get_description': helpers.get_description,
                }

    # IPackageController
    # Modify the search query to include the datasets from
    # the children organizations in the result list
    def before_search(self, search_params):

        ''' If include children selected the query string is modified '''

        def _children_name_list(children):
            name_list = []
            for child in children:
                name = child.get('name', "")
                name_list += [name] + _children_name_list(child.get('children', []))
            return name_list

        query = search_params.get('q', None)
        c.include_children_selected = False

        # fix the issues with multiple times repeated fields
        # remove the param from the fields
        new_fields = set()
        for field, value in c.fields:
            if (field != 'include_children'):
                new_fields.add((field, value))
        c.fields = list(new_fields)

        # parse the query string to check if children are requested
        if query:
            base_query = []
            #  remove whitespaces between fields and values
            query = re.sub(': +', ':',  query)
            for item in query.split(' '):
                field = item.split(':')[0]
                value = item.split(':')[-1]
                # skip organization
                if (field == 'owner_org'):
                    org_id = value
                    continue
                # skip include children andset option value
                if (field == 'include_children'):
                    if (value.upper() != "FALSE"):
                        c.include_children_selected = True
                    continue
                base_query += [item]
        if c.include_children_selected:
            # add all the children organizations in an 'or' join
            # search_params['q'] = " ".join(base_query)
            children = _children_name_list(helpers.group_tree_section(
                c.group_dict.get('id'), include_parents=False,
                include_siblings=False).get('children', []))
            if(children):
                search_params['q'] = " ".join(base_query)
                if (len(search_params['q'].strip()) > 0):
                    search_params['q'] += ' AND '
                search_params['q'] += '(organization:%s' % c.group_dict.get('name')
                for name in children:
                    if name:
                        search_params['q'] += ' OR organization:%s' % name
                search_params['q'] += ")"
            # add it back to fields
            c.fields += [('include_children', 'True')]

        return search_params


class HierarchyForm(plugins.SingletonPlugin, DefaultOrganizationForm):

    plugins.implements(plugins.IGroupForm, inherit=True)

    # IGroupForm

    def group_types(self):
        return ('organization',)

    def group_controller(self):
        return 'organization'

    def setup_template_variables(self, context, data_dict):
        from pylons import tmpl_context as c

        group_id = data_dict.get('id')
        c.allowable_parent_groups = helpers.get_allowable_parent_groups(group_id)


class FeaturedviewsPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IActions, inherit=True)
    plugins.implements(plugins.ITemplateHelpers, inherit=True)
    plugins.implements(plugins.IConfigurable, inherit=True)

    # IConfigurable
    def configure(self, config):
        if model.repo.are_tables_created() and not db.featured_table.exists():
            db.featured_table.create()

    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'featured')

    def get_actions(self):
        actions_dict = {
            'featured_create': actions.featured_create,
            'featured_show': actions.featured_show,
            'featured_upsert': actions.featured_upsert
        }
        return actions_dict

    def get_helpers(self):
        helpers = {
            'get_featured_view': _get_featured_view,
            'get_canonical_resource_view': _get_canonical_view,
            'get_homepage_resource_views': _get_homepage_views
        }
        return helpers


def _get_featured_view(resource_view_id):
    if not resource_view_id:
        return None

    featured = db.Featured.get(resource_view_id=resource_view_id)

    return featured


def _get_canonical_view(package_id):
    canonical = db.Featured.find(package_id=package_id, canonical=True).first()

    if not canonical:
        return None

    resource_view = model.ResourceView.get(canonical.resource_view_id)
    if resource_view is None:
        return None

    resource_view_dictized = md.resource_view_dictize(
        resource_view,
        {'model': model}
    )

    resource = md.resource_dictize(
        model.Resource.get(resource_view_dictized['resource_id']),
        {'model': model}
    )

    return {'resource': resource, 'resource_view': resource_view_dictized}


def _get_homepage_views():
    homepage_view_ids = [
        view.resource_view_id for view in db.Featured.find(homepage=True).all()
    ]

    resource_views = model.Session.query(model.ResourceView).filter(
        model.ResourceView.id.in_(homepage_view_ids)
    ).all()

    homepage_views = []
    for view in resource_views:
        resource_view = md.resource_view_dictize(view, {'model': model})
        resource_obj = model.Resource.get(resource_view['resource_id'])

        if resource_obj.state == 'deleted':
            continue

        resource = md.resource_dictize(resource_obj, {'model': model})

        homepage_views.append({
            'resource_view': resource_view,
            'resource': resource,
            'package': md.package_dictize(resource_obj.package, {'model': model})
        })

    return homepage_views
