import rethinkdb as r
import json
import tokenDB as db


def profile_mod(user):
    r.connect("localhost", 28015, "Travelander").repl()
    # quando il token db funzionera'
    # email = db.token_query(user["token"])
    email = "bbb@io.com"
    r.table("user").get(email).update(user).run()
