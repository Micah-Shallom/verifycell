from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import Config
from pydantic import PostgresDsn, BaseModel
from .config import config

# config = Config()

class DatabaseConfig(BaseModel):
    pg_dsn: PostgresDsn

# Construct the PostgreSQL connection string
# database_url = DatabaseConfig(pg_dsn=config.SQLALCHEMY_DATABASE_URI).pg_dsn

database_url = config.SQLALCHEMY_DATABASE_URI

# Create the SQLAlchemy engine
engine = create_engine(database_url, echo=True)

# Define the session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declare the base class for your models
Base = declarative_base()
