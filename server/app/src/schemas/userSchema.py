from pydantic import BaseModel, EmailStr
from typing import Optional

#create user model to store user information in the database

class UserCreate(BaseModel):
    id: int | None = None
    firstname:str
    lastname:str
    username: Optional[str] = None
    email: EmailStr
    password:str
    phone_number: Optional[str] = None

    class Config:
        orm_mode=True


class LoginUser(BaseModel):
    email:EmailStr
    password:str

    class Config:
        orm_mode=True
        use_enum_values = True


class GetUser(BaseModel):
    username:str
    email:EmailStr

    class Config:
        orm_mode=True
        use_enum_values = True


class GetLogin(BaseModel):
    access_token:str
    refresh_token:str
    token_type:str
    user_id:str

    class Config:
        orm_mode=True
        use_enum_values = True
