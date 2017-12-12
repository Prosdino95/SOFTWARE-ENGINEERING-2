import rethinkdb as r
import hashlib
import flask
from flask_cors import CORS


def registration(user):
    hash_pass = hashlib.md5(user["password"].encode())
    user["password"] = hash_pass.hexdigest()
    return save_user(user)


def save_user(user):
    r.connect("localhost", 28015, "Travelander").repl()
    if r.table("user").filter(r.row["email"].eq(user["email"])).count().run() == 0:
        r.table("user").insert(user).run()
        return "registration successful"
    else:
        return "email already registered"

