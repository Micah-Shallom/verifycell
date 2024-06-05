from pydantic import BaseModel, EmailStr
from typing import Optional

class VerifyOTP(BaseModel):
    verification_reference:str
    verification_code:str

    class Config:
        orm_mode=True
        use_enum_values = True

class SendOTP(BaseModel):
    phone_number:str
    email: Optional[EmailStr] = None
    id: int | None = None
    firstname:str
    lastname:str
    username: Optional[str] = None

    class Config:
        orm_mode=True
        use_enum_values = True

