from sqlalchemy import Column, String, DateTime
from datetime import datetime, timezone
from app.src.utils.uuid import generate_uuid as uuid
from sqlalchemy.orm import Session
from app.src.config.database import Base


class BaseInfoModel():

    """
        This class defines all common attributes/methods
        for other class that would inherit it.
    """
    
    id = Column(String(200), unique=True, nullable=False, primary_key=True, default=lambda: uuid())
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: (datetime.now(timezone.utc)))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: (datetime.now(timezone.utc)))

    def __init__(self, *args, **kwargs):
        """
            Initialization of base model class

            Args:
                args: Not used
                Kwargs: constructor for the basemodel

            Attributes:
                id: unique id generated
                created_at: creation date
                updated_at: updated date
        """

        # check if parameters were passed while inheriting
        # and assign the to the base class

    def __str__(self):
        """
            This instance defines the property of the class in a string fmt
            Return:
                returns a string containing of class name, id and dict
        """
        return f"[{type(self).__name__}] ({self.id}) {self.__dict__}"

    def __repr__(self):
        """
            Return:
                returns a string representation of the calss

        """
        return self.__str__()
    
    def to_dict(self):
        """
            This instance creates a dictionary representation of the classs

            Return:
                returns a dict rep of the class containing the
        """

        base_dict = dict(self.__dict__)
        base_dict['__class__'] = str(type(self).__name__)
        base_dict['created_at'] = self.created_at.isoformat()
        base_dict['updated_at'] = self.updated_at.isoformat()

        return base_dict
    
    def before_save(self, db: Session, *args, **kwargs):
        pass

    def after_save(self, db:Session, *args, **kwargs):
        db.refresh(self)

    def save(self,db: Session, commit=True):
        """
            This instance saves the current attributes in the class
            and updates the updated_at attribute

            Return:
                None
        """
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

    def before_update(self,db: Session, *args, **kwargs):
        pass

    def after_update(self,db: Session, *args, **kwargs):
        db.refresh(self)

    def update(self,db: Session, *args, **kwargs):
        self.before_update(db,*args, **kwargs)

        db.commit()

        self.after_update(db, *args, **kwargs)

    def delete(self,db: Session, commit=True):
        self.before_update(db)

        db.delete(self)
        if commit:
            db.commit()

        self.after_update(db)