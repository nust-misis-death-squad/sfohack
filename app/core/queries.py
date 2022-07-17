from sqlalchemy import Integer, Boolean, BigInteger, Text, Time, SmallInteger, and_
from sqlalchemy import MetaData, Column, Table, ForeignKey
from sqlalchemy import create_engine, select, delete, insert
from random import randint
try:
    engine = create_engine('postgresql+psycopg2://deathsquad:misis1488@localhost:5432/deathsquad?client_encoding=utf8')
    conn = engine.connect()
    metadata = MetaData(bind=engine)
except:
    print('could not connect to database')

applicant = Table('applicant',metadata,
                  Column('id')
                  )
manufacturer = Table()
product = Table()


def get_cords_by_id():
    pass

def get_table() -> list:
    table = []
    for i in range(0,15):
         table.append({'name': 'example{n}'.format(n=i), 'number': randint(0, 100)})
    return table