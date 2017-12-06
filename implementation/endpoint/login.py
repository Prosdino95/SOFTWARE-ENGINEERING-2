import sqlite3 as sql
from secrets import token_urlsafe
import rethinkdb as r
from hashlib import md5
from time import time
import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
token_db = sql.connect(":memory:")
token_db.execute('CREATE TABLE token_tab('
                 'NAME varchar(255),'
                 'TOKEN varchar(255),'
                 'TIME time,'
                 'PRIMARY KEY (TOKEN))')


@app.route('/login', methods=['POST'])
def login_api():
    user = flask.request.get_json()
    return login(user)


def login(user):
    r.connect("localhost", 28015, "Users").repl()
    hash_pass = md5(user["password"].encode())
    cursor = r.table("user").filter(r.row["email"] == user["email"]).run()
    password = list(cursor)[0]["password"]
    if password == hash_pass.hexdigest():
        tok = save_token(user["email"], token_gen())
        return "login successful token: " + tok
    else:
        return "incorrect email or password"


def token_gen():
    token = token_urlsafe(32)
    return token


def save_token(name, token):
    try:
        token_db.execute(" INSERT INTO token_tab VALUES(?, ?, ?)", (name, token, time()))
        token_db.commit()
        return token
    except sql.IntegrityError:
        save_token(name, token_gen())
        return token


def token_query(token):
    query = token_db.execute('SELECT * '
                             'FROM token_tab '
                             'WHERE TOKEN =?', (token, )).fetchone()
    if time() - query[2] > 300:
        print("new token")
    # return the username
    return query[0]


if __name__ == "__main__":
    app.run()

