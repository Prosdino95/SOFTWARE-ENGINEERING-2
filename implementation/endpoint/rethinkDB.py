import rethinkdb as r


def init_bd():
    r.connect("localhost", 28015).repl()
    r.db_create("Travelander").run()
    r.db("Travelander").table_create("user", primary_key='email').run()

    r.db("Travelander").table_create("event").run()
    r.db("Travelander").table("event").index_create("eventKey", [r.row["eventName"], r.row["startingTime"]]).run()

    r.db("Travelander").table_create("eventSubmit").run()
    r.db("Travelander").table("eventSubmit").index_create("userEvent", [r.row["email"], r.row["eventName"], r.row["startingTime"]]).run()

    #r.db("Travelander").table_create("preferenceSubmit").run()


if __name__ == "__main__":
    init_bd()
