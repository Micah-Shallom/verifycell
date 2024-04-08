import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    """Base Config Object"""

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://postgres:Chamo.Pzo@localhost:5432/verifyme')

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # Set access token expiration time to 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)  # Set refresh token expiration time to 30 days
    SQLALCHEMY_TRACK_MODIFICATIONS = False # This is just here to suppress a warning from SQLAlchemy as it will soon be removed
    ALGORITHM = "HS256"

    def __init__(self) -> None:
        self.db_username = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_url = os.getenv("DB_URL")
        self.db_name = os.getenv("DB_NAME")