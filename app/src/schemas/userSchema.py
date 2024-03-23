from pydantic import BaseModel, EmailStr


class Settings(BaseModel):
    authjwt_secret_key: str = "secret"

class UserCreate(BaseModel):
    # id: int | None = None
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    password: str

    class Config:
        orm_mode = True


class LoginUser(BaseModel):
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True