import rethinkdb as r
from tokenDB import token_query
from flexible_lunch import rearrange_lunch


def add_event(event):
    r.connect("localhost", 28015, "Travlendar").repl()
    token = event["token"]
    del event["token"]
    event["flexible_lunch"] = False
    email = get_email(token)
    cursor = r.table("event").insert(event).run()
    id = cursor["generated_keys"][0]
    r.table("event_submit").insert({"event": id, "email": email}).run()
    check_overlays(token)


def del_event(token, event_id):
    r.connect("localhost", 28015, "Travlendar").repl()
    r.table("event").get(event_id).delete().run()
    r.table("event_submit").get(event_id).delete().run()
    check_overlays(token)


def mod_event(event):
    r.connect("localhost", 28015, "Travlendar").repl()
    token = event["token"]
    r.table("event").get(event["id"]).update(event).run()
    check_overlays(token)


def check_overlays(token):
    events_list = get_event(token)
    for i in events_list:
        alarm = False
        for j in events_list:
            if i != j and j["start"] < i["end"]:
                if j["end"] > i["start"]:
                    alarm = True
                    if i["flexible_lunch"]:
                        rearrange_lunch(i, j, token)
                    else:
                        set_alarm(i, j)
        if not alarm:
            r.table("event").get(i["id"]).update({"alarm": False}).run()
    return "all ok"


def set_alarm(e1, e2):
    id1 = e1["id"]
    id2 = e2["id"]
    r.table("event").get(id1).update({"alarm": True}).run()
    r.table("event").get(id2).update({"alarm": True}).run()


def get_event(token):
    r.connect("localhost", 28015, "Travlendar").repl()
    email = get_email(token)
    query = r.table("event_submit").filter(r.row["email"] == email).\
        eq_join("event", r.table("event")). \
        without({"left": ["email", "event"]}).\
        zip().run()
    events = list(query)
    return events


def get_email(token):
    return token_query(token)

