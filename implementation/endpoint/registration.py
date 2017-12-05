import json
import rethinkdb as r
import hashlib


def registration(json_file):
    user = json.load(json_file)
    hash_pass = hashlib.md5(user["password"].encode())
    user["password"] = hash_pass.hexdigest()
    save_user(user)


def save_user(user):
    r.connect("localhost", 28015, "Users").repl()
    if r.table("user").filter(r.row["name"].eq(user["name"])).count().run() == 0:
        r.table("user").insert(user).run()
