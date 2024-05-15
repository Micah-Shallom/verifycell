from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import Config
from pydantic import (
    PostgresDsn
)


config = Config()

database_url = PostgresDsn.build(
    scheme="postgresql",
    user=config.db_username,
    password=config.db_password,
    host=config.db_url,
    path=f"/{config.db_name}",
)

# use echo=True for debugging
engine = create_engine(database_url, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()