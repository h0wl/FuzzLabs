#!/usr/bin/python

import os
import re
import sys
import json
import time
import signal
import syslog
import inspect
import httplib
import hashlib
import threading
import requests
from daemon import runner

root = os.path.dirname(
            os.path.abspath(
                inspect.getfile(inspect.currentframe()
            )))

sys.path.append(root)
from classes import ConfigurationHandler as ch
from classes import CollectorDaemon as cd

# -----------------------------------------------------------------------------
#
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    try:
        config = ch.ConfigurationHandler(root + "/etc/collector.json").get()
    except Exception, ex:
        print "[e] failed to load configuration: %s" % str(ex)
        sys.exit(1)

    try:
        d = runner.DaemonRunner(cd.CollectorDaemon(root, config))
        d.do_action()
    except Exception, ex:
        print "[e] failed to start/stop collector: %s" % str(ex)

