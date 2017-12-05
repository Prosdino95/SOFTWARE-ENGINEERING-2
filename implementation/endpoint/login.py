import sqlite3 as sql
import secrets
import json
import rethinkdb as r
import hashlib
import time

token_db = sql.connect(":memory:")
token_db.execute('CREATE TABLE token_tab('
                 'NAME varchar(255),'
                 'TOKEN varchar(255),'
                 'TIME time,'   
                 'PRIMARY KEY (TOKEN))')


def login(json_file):
    r.connect("localhost", 28015, "Users").repl()
    pars_json = json.load(json_file)
    hash_pass = hashlib.md5(pars_json["password"].encode())
    cursor = r.table("user").filter(r.row["name"] == pars_json["name"]).run()
    user = list(cursor)[0]
    if user["password"] == hash_pass.hexdigest():
        save_token(user["name"], token_gen())
    else:
        # just for test throw this
        raise Exception('incorrect password')


def token_gen():
    token = secrets.token_urlsafe(32)
    return token


def save_token(name, token):
    try:
        token_db.execute(" INSERT INTO token_tab VALUES(?, ?, ?)",(name, token, time.time()))
        token_db.commit()
    except sql.IntegrityError:
        save_token(name,token_gen())


def token_query(token):
    query = token_db.execute('SELECT * '
                              'FROM token_tab '
                              'WHERE TOKEN =?', (token, )).fetchone()
    if time.time() - query[2] > 300:
        # devo chiedere di nuovo user e pass ??
        print("new token")
    # return the username
    return query[0]
