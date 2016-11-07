import logging

from datetime import datetime


def get_date(package, output_required=None):
    '''
    Reurns the required date depending upon the output_required.
    for 'created': return the oldest creation dates among the resources.
    for 'updated': return the latest modification dates among the resources.
    '''
    resources = package['resources']

    if output_required == "created":
        # get the oldest datetime for the creation date; passing current datetime for
        # default
        return_datetime = get_oldest(resources, datetime.now())

    elif output_required == "updated":
        # get the latest datetime for the modification datetime; passing current datetime
        # for default.
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
