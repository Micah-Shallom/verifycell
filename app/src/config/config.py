import os
from dotenv import load_dotenv


class Config:
    def __init__(self) -> None:
        load_dotenv()
        self.db_username = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_url = os.getenv("DB_URL")
        self.db_name = os.getenv("DB_NAME")