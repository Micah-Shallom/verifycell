from pydantic import BaseModel

class TokenData(BaseModel):
    email:str


class Token(BaseModel):
    access_token:str
    token_type:str
    user: TokenData

class RefreshToken(BaseModel):
    refresh_token:str

    class Config:
        orm_mode=True
        use_enum_values = True