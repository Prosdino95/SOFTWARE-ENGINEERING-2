import rethinkdb as r
from hashlib import md5
import flask
from flask_cors import CORS
import tokenDB

app = flask.Flask(__name__)
CORS(app)
db = tokenDB.TokenDB.get_instance()


@app.route('/login', methods=['POST'])
def login_api():
    user = flask.request.get_json()
    return login(user)


def login(user):
    r.connect("localhost", 28015, "Travelander").repl()
    hash_pass = md5(user["password"].encode())
    cursor = r.table("user").filter(r.row["email"] == user["email"]).run()
    password = list(cursor)[0]["password"]
    if password == hash_pass.hexdigest():
        tok = db.save_user(user["email"])
        return flask.jsonify(token=tok)
    else:
        return flask.jsonify(token="none")


if __name__ == "__main__":
    app.run()




