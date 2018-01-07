import sqlite3 as sql
from secrets import token_urlsafe
from time import time
import threading

# this is the token memory db for the login and the REST calls every token is associated an user
DBlock = threading.Lock()
token_db = sql.connect(":memory:")
token_db.execute('CREATE TABLE token_tab('
                 'NAME varchar(255),'
                 'TOKEN varchar(255),'
                 'TIME time,'
                 'PRIMARY KEY (TOKEN))')


def token_gen():
    token = token_urlsafe(32)
    return token


def save_user(name):
    token = token_gen()
    try:
        with DBlock:
            token_db.execute(" INSERT INTO token_tab VALUES(?, ?, ?)", (name, token, time()))
            token_db.commit()
        return token
    except sql.IntegrityError:
        save_user(name)
        return token


# by the token get the email that is univocal for a user
def token_query(token):
    query = token_db.execute('SELECT * '
                             'FROM token_tab '
                             'WHERE TOKEN =?', (token,)).fetchone()
    # if the token isn't in the db the server stop the computation for this call
    if query is None:
        raise Exception('Illegal access')
    return query[0]

