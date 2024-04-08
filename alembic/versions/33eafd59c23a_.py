"""empty message

Revision ID: 33eafd59c23a
Revises: 584c046744ad
Create Date: 2024-04-08 14:54:22.104342

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '33eafd59c23a'
down_revision: Union[str, None] = '584c046744ad'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
