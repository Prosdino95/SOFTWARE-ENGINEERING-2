import rethinkdb as r
from hashlib import md5
import tokenDB as db
import rt_server


# functions for login
def login(user):
    r.connect(rt_server.ip, rt_server.port, rt_server.db_name).repl()
    hash_pass = md5(user["password"].encode())
    cursor = r.table("user").get(user["email"]).run()
    # if the email not exist return none token
    if cursor is None:
        return "none"
    password = cursor["password"]
    # if the password is correct return the token
    if password == hash_pass.hexdigest():
        tok = db.save_user(user["email"])
        return tok
    # if the password is't correct return none token
    else:
        return "none"





