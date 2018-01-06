#!/usr/bin/env python3

import importlib
import os
import time
import schedule


def init():
    plugin_path = os.path.join(os.getcwd(), 'modules')
    scraper_plugins = filter(lambda x: x.endswith('.py'),
                           os.listdir(plugin_path))
    for plugin in scraper_plugins:
        module = importlib.import_module('modules.{}'.format(plugin[:-3]))
        module.init()


if __name__ == "__main__":
    init()
    while True:
        time.sleep(1)
        schedule.run_pending()
