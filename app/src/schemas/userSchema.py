from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    # id: int | None = None
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    password: str

    class Config:
        orm_mode = True
