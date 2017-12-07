import rethinkdb as r
import hashlib
import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)


@app.route('/registration', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    return registration(user)


def registration(user):
    hash_pass = hashlib.md5(user["password"].encode())
    user["password"] = hash_pass.hexdigest()
    return save_user(user)


def save_user(user):
    r.connect("localhost", 28015, "Users").repl()
    if r.table("user").filter(r.row["email"].eq(user["email"])).count().run() == 0:
        r.table("user").insert(user).run()
        return "registration successful"
    else:
        return "email already registered"


if __name__ == "__main__":
    app.run()
