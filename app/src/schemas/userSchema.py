from pydantic import BaseModel, EmailStr
from app.src.config.database import Base

class Settings(BaseModel):
    authjwt_secret_key:str="secret"

class UserCreate(BaseModel):
    id: int | None = None
    fullname:str
    username:str
    email:EmailStr
    password:str

    class Config:
        orm_mode=True


class LoginUser(BaseModel):
    username:str
    email:EmailStr
    password:str

    class Config:
        orm_mode=True