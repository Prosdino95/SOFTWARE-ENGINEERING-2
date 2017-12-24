import rethinkdb as r
import rt_server


def init_bd():
    r.connect(rt_server.ip, rt_server.port).repl()
    if "Travlendar" not in r.db_list().run():
        r.db_create("Travlendar").run()
        r.db("Travlendar").table_create("user", primary_key='email').run()

        r.db("Travlendar").table_create("event").run()
        r.db("Travlendar").table("event").index_create("eventKey", [r.row["eventName"], r.row["startingTime"]]).run()

        r.db("Travlendar").table_create("event_submit", primary_key='event').run()


if __name__ == "__main__":
    init_bd()
