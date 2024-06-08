from sqlalchemy import Column, String, DateTime
from datetime import datetime, timezone
from app.src.utils.uuid import generate_uuid as uuid
from sqlalchemy.orm import Session
from app.src.config.database import Base

class BaseInfoModel():
    """
    Base class for SQLAlchemy models with common attributes and methods.
    """
    
    id = Column(String(200), unique=True, nullable=False, primary_key=True, default=lambda: uuid())
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: (datetime.now(timezone.utc)))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: (datetime.now(timezone.utc)))

    def __init__(self, *args, **kwargs):
        """Initialization of base model class."""
        pass

    def __str__(self):
        """String representation of the class."""
        return f"[{type(self).__name__}] ({self.id}) {self.__dict__}"

    def __repr__(self):
        """Representation of the class."""
        return self.__str__()

    def to_dict(self):
        """Dictionary representation of the class."""
        base_dict = dict(self.__dict__)
        base_dict['__class__'] = str(type(self).__name__)
        base_dict['created_at'] = self.created_at.isoformat()
        base_dict['updated_at'] = self.updated_at.isoformat()
        return base_dict
    
    def before_save(self, db: Session, *args, **kwargs):
        """Hook method called before saving."""
        pass

    def after_save(self, db: Session, *args, **kwargs):
        """Hook method called after saving."""
        db.refresh(self)

    def save(self, db: Session, commit=True):
        """Save method to save the current instance."""
        self.before_save(db)

        db.add(self)
        if commit:
            try:
                self.updated_at = datetime.now(timezone.utc)
                db.commit()
            except Exception as e:
                db.rollback()
                raise e
            
        self.after_save(db)

    def before_update(self, db: Session, *args, **kwargs):
        """Hook method called before updating."""
        pass

    def after_update(self, db: Session, *args, **kwargs):
        """Hook method called after updating."""
        db.refresh(self)

    def update(self, db: Session, *args, **kwargs):
        """Update method to update the current instance."""
        self.before_update(db, *args, **kwargs)

        db.commit()

        self.after_update(db, *args, **kwargs)

    def delete(self, db: Session, commit=True):
        """Delete method to delete the current instance."""
        self.before_update(db)

        db.delete(self)
        if commit:
            db.commit()

        self.after_update(db)
