import ckan.lib.base as base
import ckan.lib.plugins as plugins

render = base.render


class SubscribeController(base.BaseController):
    def dashboard(self):
        return render('dashboards/dashboard.html')