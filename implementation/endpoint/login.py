import rethinkdb as r
from hashlib import md5
from flask import jsonify
import tokenDB as db


def login(user):
    r.connect("localhost", 28015, "Travlendar").repl()
    hash_pass = md5(user["password"].encode())
    cursor = r.table("user").get(user["email"]).run()
    if cursor is None:
        return jsonify(token="none")
    password = cursor["password"]
    if password == hash_pass.hexdigest():
        tok = db.save_user(user["email"])
        return jsonify(token=tok)
    else:
        return jsonify(token="none")





