from sqlalchemy import Column, String, Boolean
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
    
    @classmethod
    def get_user_by_username(cls, username:str):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def get_user_by_email(cls, email:str):
        return cls.query.filter_by(email=email).first()

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email} created>"
    

class TokenTable(BaseInfoModel):
    __tablename__ = "tokentable"
    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450), nullable=False)
    status = Column(Boolean)