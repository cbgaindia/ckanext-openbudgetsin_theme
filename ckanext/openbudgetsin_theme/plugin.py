import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from ckanext.openbudgetsin_theme import helpers


class Openbudgetsin_ThemePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.ITemplateHelpers, inherit=True)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'openbudgetsin_theme')

    # ITemplateHelpers
    def get_helpers(self):
        return {
            'get_date': helpers.get_date,
        }
