class plugin_registry:
    def __init__(self):
        self.plugindict = {}

    def register_plugin(self, category, router_obj):
        self._add_to_dict(category, router_obj)

    def _add_to_dict(self, category, router_obj):
        if category is not self.plugindict:
            self.plugindict[category] = []
        self.plugindict[category].append(router_obj)

    def find_routers_by_id(self, id):
        for cat, routers_list in self.plugindict.items():
            for router in routers_list:
                if router['id'] == id:
                    return router
        return None

    def get_routers_by_category(self, category):
        return self.plugindict.get(category, [])
