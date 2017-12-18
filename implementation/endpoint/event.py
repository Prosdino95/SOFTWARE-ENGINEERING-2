import rethinkdb as r
from tokenDB import token_query
import json


def add_event(event):
    r.connect("localhost", 28015, "Travelander").repl()
    token = event["token"]
    del event["token"]
    email = get_email(token)
    cursor = r.table("event").insert(event).run()
    id = cursor["generated_keys"][0]
    r.table("event_submit").insert({"event": id, "email": email}).run()
    # check_overlays(token)


def del_event(token, event_id):
    r.connect("localhost", 28015, "Travelander").repl()
    r.table("event").get(event_id).delete().run()
    # check_overlays(token)


def mod_event(event):
    r.connect("localhost", 28015, "Travelander").repl()
    token = event["token"]
    del event["token"]
    r.table("event").get(event["id"]).update(event).run()
    # check_overlays(token)



def check_overlays(token):
    # TODO work in progress
    return "all ok"


def set_alarm(e1, e2):
    id1 = e1["id"]
    id2 = e2["id"]
    r.table("event").get(id1).update({"alarm": True}).run()
    r.table("event").get(id2).update({"alarm": True}).run()


def get_event(token):
    r.connect("localhost", 28015, "Travelander").repl()
    email = get_email(token)
    e = r.table("event_submit").filter(r.row["email"] == email).\
        eq_join("event", r.table("event")). \
        without({"left": ["email", "event"]}).\
        zip().run()
    return e


def get_email(token):
    return token_query(token)
