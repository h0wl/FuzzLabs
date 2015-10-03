from Base import Base
from flask.ext.bcrypt import Bcrypt
from flask.ext.login import UserMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Column, Integer, String

bcrypt = Bcrypt()

# -----------------------------------------------------------------------------
#
# -----------------------------------------------------------------------------

class User(UserMixin, Base):
    __tablename__ = 'users'
    id        = Column(Integer, primary_key=True)
    email     = Column(String(255), unique=True)
    username  = Column(String(32), unique=True)
    _password = Column(String(128))

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def _set_password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext)

    def is_correct_password(self, plaintext):
        if bcrypt.check_password_hash(self._password, plaintext):
            return True
        return False

