"""
Manage the sqlite database used to store crash data. Should be updated to use
SQLAlchemy.
"""

import json
import sqlite3

class DatabaseHandler:

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def __init__(self, config = None, root = None, job_id = None):

        if config == None or root == None or job_id == None:
            self.dbinit = False
            return

        self.config   = config
        self.root     = root
        self.database = sqlite3.connect(self.root + "/" + self.config["general"]["database"])
        self.cursor   = self.database.cursor()
        self.job_id   = job_id
        self.dbinit   = True

        if job_id:
            stmt = "CREATE TABLE IF NOT EXISTS issues (job_id text, data text)"
            try:
                self.cursor.execute(stmt)
                self.database.commit()
            except Exception, ex:
                raise Exception(ex)

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def saveCrashDetails(self, data):
        if not self.dbinit: return False
        stmt = "INSERT INTO issues VALUES (?, ?)"
        try:
            self.cursor.execute(stmt, (self.job_id, data))
            self.database.commit()
        except Exception, ex:
            raise Exception(ex)

        return True

    # -------------------------------------------------------------------------
    #
    # -------------------------------------------------------------------------

    def loadCrashDetails(self):
        if not self.dbinit: return False
        issue_list = []
        stmt = "SELECT * FROM issues"
        try:
            for issue in self.cursor.execute(stmt):
                issue_list.append(issue)
        except Exception, ex:
            raise Exception(ex)
        return issue_list

