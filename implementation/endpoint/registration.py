import rethinkdb as r
import hashlib
import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)


@app.route('/registration', methods=['POST'])
def registration_api():
    user = flask.request.get_json()
    registration(user)
    return flask.jsonify(ok="va tutto bene")


def registration(user):
    hash_pass = hashlib.md5(user["password"].encode())
    user["password"] = hash_pass.hexdigest()
    save_user(user)


def save_user(user):
    r.connect("localhost", 28015, "Users").repl()
    if r.table("user").filter(r.row["name"].eq(user["name"])).count().run() == 0:
        r.table("user").insert(user).run()
    table = r.table("user").run()
    print(table)


if __name__ == "__main__":
    app.run()
