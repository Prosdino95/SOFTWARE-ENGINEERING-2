import rethinkdb as r
import registration as re
import login


def test_reg():
    r.connect("localhost", 28015).repl()
    file = open("./User_test.json", "r")
    re.registration(file)
    table = r.table("user").run()
    print(table)


def test_log():
    file = open("./login_test.json", "r")
    login.login(file)

