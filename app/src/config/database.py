from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import Config


config = Config()

connectionString = f'postgresql://{config.db_username}:{config.db_password}@{config.db_url}/{config.db_name}'

# use echo=True for debugging
engine = create_engine(connectionString, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()