from sqlalchemy import Integer, Text, Float
from sqlalchemy import MetaData, Column, Table, ForeignKey
from sqlalchemy import create_engine, select, delete, insert
from random import randint

"""
engine = create_engine('postgresql+psycopg2://deathsquad:misis1488@localhost:5432/deathsquad?client_encoding=utf8')
metadata = MetaData(bind=engine)
try:
   conn = engine.connect()
except:
    print('could not connect to database')

production = Table('production',metadata,
                  Column('id',Integer(),primary_key=True),
                  Column('number', Text()),
                  Column('TN_Codes', Text()),
                  Column('group', Text()),
                  Column('general_name', Text()),
                  Column('laboratory', Text()),
                  Column('applicant_id', Integer(), ForeignKey('applicant.id')),
                  Column('manufacturer_id', Integer(), ForeignKey('manufacturer.id'))
                  )
manufacturer = Table('manufacturer',metadata,
                     Column('id',Integer(),primary_key=True),
                     Column('name', Text()),
                     Column('address', Text()),
                     Column('lat', Float()),
                     Column('lon', Float())
                     )
applicant = Table('applicant',metadata,
                     Column('id',Integer(),primary_key=True),
                     Column('name', Text()),
                     Column('address', Text()),
                     Column('lat', Float()),
                     Column('lon', Float())
                     )

def get_cords_by_id():
    pass
"""

def get_table() -> list:
    table = []
    for i in range(0,15):
         table.append({'name': 'example{n}'.format(n=i), 'number': randint(0, 100)})
    return table