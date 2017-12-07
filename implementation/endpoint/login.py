import rethinkdb as r
from hashlib import md5
import flask
from flask_cors import CORS
import tokenDB as db

app = flask.Flask(__name__)
CORS(app)


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
        tok = db.save_user(user["email"])
        return "login successful token: " + tok
    else:
        return "incorrect email or password"


if __name__ == "__main__":
    app.run()




