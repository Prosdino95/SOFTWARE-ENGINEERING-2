import rethinkdb as r
import tokenDB as db


def mod_profile(user):
    r.connect("localhost", 28015, "Travelander").repl()
    email = db.token_query(user["token"])
    del user["token"]
    r.table("user").get(email).update(user).run()


def get_profile(token):
    r.connect("localhost", 28015, "Travelander").repl()
    email = db.token_query(token)
    result = r.table("user").get(email).run()
    return result
