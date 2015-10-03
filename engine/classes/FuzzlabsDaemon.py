""" Implement FuzzLabs daemon """

import os
import time
import signal
import syslog

from classes import ModuleHandler as mh

class FuzzlabsDaemon():
    """
    Implement the FuzzLabs daemon which loads up modules and keeps track of
    any changes both to the loaded and new modules. Once the daemon is finished
    running the modules are unloaded.
    """

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def __init__(self, root, config):
        """
        Initialize FuzzLabs daemon.

        @type  root:     String
        @param root:     Full path to the FuzzLabs root directory
        @type  config:   Dictionary
        @param config:   The complete configuration as a dictionary
        """

        self.root = root
        self.config = config
        self.modules = None
        self.stdin_path = self.config['daemon']['stdin']
        self.stdout_path = self.config['daemon']['stdout']
        self.stderr_path = self.config['daemon']['stderr']
        self.pidfile_path = self.config['daemon']['pidfile']
        self.pidfile_timeout = self.config['daemon']['pidfile_timeout']
        self.running = True
        syslog.openlog(logoption=syslog.LOG_PID, facility=syslog.LOG_DAEMON)

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def __sigterm_handler(self, signum, frame):
        """
        Handle SIGTERM signal and abort execution.
        """

        syslog.syslog(syslog.LOG_INFO, 'DCNWS FuzzLabs is stopping')
        self.running = False

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def run(self):
        """
        Main function of FuzzLabs.
        """

        syslog.syslog(syslog.LOG_INFO, 'DCNWS FuzzLabs is initializing')

        try:
            os.setsid()
            os.umask(077)
            signal.signal(signal.SIGTERM, self.__sigterm_handler) 
        except Exception, ex:
            syslog.syslog(syslog.LOG_ERR, 
                          'failed to start daemon (%s)' % str(ex))

        try:
            self.modules = mh.ModuleHandler(self.root, self.config)
        except Exception, ex:
            syslog.syslog(syslog.LOG_ERR, 
                          'failed to load modules (%s)' % str(ex))

        while self.running:
            time.sleep(1)

        try:
            self.modules.unload_modules()
        except Exception, ex:
            syslog.syslog(syslog.LOG_ERR,
                          'failed to unload modules %s' % str(ex))
            raise ex

