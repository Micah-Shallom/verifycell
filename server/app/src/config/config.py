from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import ValidationError
from dotenv import load_dotenv
from typing import Optional
from pydantic import PostgresDsn
from pathlib import Path

load_dotenv()

class Config(BaseSettings):
    """Base Config Object"""
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)


    SQLALCHEMY_DATABASE_URI: str = None 
    SENDCHAMP_API_KEY: str = None
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 12 * 1 # 12 hours
    ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str    # should be kept secret
    JWT_REFRESH_SECRET_KEY: str     # should be kept secret
    DB_USER: str 
    DB_PASSWORD: str 
    DB_URL: str
    DB_NAME: str 

    # class Config:
    #     env_file = Path(Path(__file__).resolve().parent) / ".env"
    #     print(f'environment created - {Path(Path(__file__).resolve().name)}')

try :
    config = Config()
except ValidationError as e:
    print(repr(e.errors()[0]))