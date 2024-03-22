from sqlalchemy import Column, Integer, String
from .baseInfoModel import BaseInfoModel
from werkzeug.security import generate_password_hash, check_password_hash

class User(BaseInfoModel):
    __tablename__ = "users"

    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)


    def set_password(self, password:str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password:str):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email} created>"
    

