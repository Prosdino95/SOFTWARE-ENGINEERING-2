import rethinkdb as r
from tokenDB import token_query
from hashlib import md5
import rt_server as rts


def mod_profile(user):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    email = token_query(user["token"])
    del user["token"]
    r.table("user").get(email).update(user).run()


def get_profile(token):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    email = token_query(token)
    result = r.table("user").get(email).run()
    return result


def mod_profile_preference(user):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    email = token_query(user["token"])
    del user["token"]
    r.table("user").get(email).update({"preference": user}).run()


def get_profile_preference(token):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    email = token_query(token)
    result = r.table("user").get(email).get_field("preference").run()
    return result


def mod_profile_password(user):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    current_password = md5(user["current_password"].encode())
    new_password = md5(user["new_password"].encode())
    email = token_query(user["token"])
    db_user_info = r.table("user").get(email).run()
    if current_password.hexdigest() == db_user_info["password"]:
        r.table("user").get(email).update({"password": new_password.hexdigest()}).run()
        return "information changed"
    else:
        return "wrong password"

