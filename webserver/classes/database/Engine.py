from Base import Base
from sqlalchemy import Column, Integer, String

# -----------------------------------------------------------------------------
#
# -----------------------------------------------------------------------------

class Engine(Base):
    __tablename__ = 'engines'
    id        = Column(Integer, primary_key=True)
    name      = Column(String(32), unique=True)
    address   = Column(String(255), unique=True)
    port      = Column(Integer)
    secret    = Column(String(128))
    active    = Column(Integer)
    owner     = Column(String(32))

