import rethinkdb as r
import rt_server as rts


def init_bd():
    r.connect(rts.ip, rts.port).repl()
    if "TravTest" not in r.db_list().run():
        r.db_create("TravTest").run()
        r.db("TravTest").table_create("user", primary_key='email').run()

        r.db("TravTest").table_create("event").run()
        r.db("TravTest").table("event").index_create("eventKey", [r.row["eventName"], r.row["startingTime"]]).run()

        r.db("TravTest").table_create("event_submit", primary_key='event').run()