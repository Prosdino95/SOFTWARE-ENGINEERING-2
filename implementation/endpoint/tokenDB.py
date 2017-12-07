import sqlite3 as sql
from secrets import token_urlsafe
from time import time
import threading


print("hello")
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
        token_db.execute(" INSERT INTO token_tab VALUES(?, ?, ?)", (name, token_gen(), time()))
        token_db.commit()
        print(token_query())
        return token
    except sql.IntegrityError:
        save_user(name)
        return token


def token_query():
    query = token_db.execute('SELECT * '
                             'FROM token_tab '
                             ).fetchall()
  #  if time() - query[2] > 300:
   #     print("new token")
    # return the username
    return query

if __name__ == "__main__":
    print(token_db.execute('SELECT * '
                             'FROM token_tab '
                             ).fetchall())


# 'WHERE TOKEN =?', (token, )
