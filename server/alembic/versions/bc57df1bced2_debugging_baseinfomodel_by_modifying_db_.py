"""debugging baseinfomodel by modifying db lifecycles

Revision ID: bc57df1bced2
Revises: 4074855bfd03
Create Date: 2024-05-19 07:47:39.906453

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bc57df1bced2'
down_revision: Union[str, None] = '4074855bfd03'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
