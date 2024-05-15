from pydantic_settings import BaseSettings
from pydantic import ValidationError, BaseModel

class Config(BaseSettings, BaseModel):
    """Base Config Object"""

    SQLALCHEMY_DATABASE_URI: str = 'postgresql://postgres:Chamo.Pzo@localhost:5432/verifyme'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str   # should be kept secret
    JWT_REFRESH_SECRET_KEY: str    # should be kept secret
    DB_USER: str = None
    DB_PASSWORD: str = None
    DB_URL: str = None
    DB_NAME: str = None

    class Config:
        env_file = ".env"


try :
    config = Config()
except ValidationError as e:
    print(repr(e.errors()[0]))