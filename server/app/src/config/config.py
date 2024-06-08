from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import ValidationError
from dotenv import load_dotenv
from typing import Optional
from pydantic import PostgresDsn
from pathlib import Path

load_dotenv()

class Config(BaseSettings):
    """Base Config Object"""

    # Define model_config to load environment variables from .env file
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    # Database connection URI
    SQLALCHEMY_DATABASE_URI: str = None

    # SendChamp API key
    SENDCHAMP_API_KEY: Optional[str] = None

    # Token expiration times
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 12  # 12 hours

    # JWT secret keys (should be kept secret)
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str

    # Database credentials
    DB_USER: str
    DB_PASSWORD: str
    DB_URL: str
    DB_NAME: str

    ALGORITHM: str = "HS256"

try:
    config = Config()
except ValidationError as e:
    print(repr(e.errors()[0]))
