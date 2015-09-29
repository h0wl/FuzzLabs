from Base import Base
from sqlalchemy import Column, Integer, String, Text

# -----------------------------------------------------------------------------
#
# -----------------------------------------------------------------------------

class Job(Base):
    __tablename__ = 'jobs'
    id          = Column(Integer, primary_key=True)
    engine_id   = Column(Integer)
    active      = Column(Integer)
    job_id      = Column(String(32))
    job_data    = Column(Text)

