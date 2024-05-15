"""empty message

Revision ID: 584c046744ad
Revises: 8ceb0d056816
Create Date: 2024-04-08 14:51:05.721436

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '584c046744ad'
down_revision: Union[str, None] = '8ceb0d056816'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
