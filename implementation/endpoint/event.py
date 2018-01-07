import rethinkdb as r
from tokenDB import token_query
from flexible_lunch import rearrange_lunch
import rt_server as rts
from datetime import datetime

r.connect(rts.ip, rts.port, rts.db_name).repl()


# Function for add an event in the db
def add_event(event):
    token = event["token"]
    del event["token"]
    event["flexible_lunch"] = False
    email = get_email(token)
    cursor = r.table("event").insert(event).run()
    # take the id generated automatically by rethink db
    id = cursor["generated_keys"][0]
    # Submit event id and email of the user in the link table
    r.table("event_submit").insert({"event": id, "email": email}).run()
    check_overlays(token)


# Function for add an event in the db by using the event id
def del_event(token, event_id):
    if not security_check(token, event_id):
        return "illegal access"
    r.table("event").get(event_id).delete().run()
    r.table("event_submit").get(event_id).delete().run()
    check_overlays(token)
    return "event deleted"


# Function for modify an event
def mod_event(event):
    token = event["token"]
    if not security_check(token, event["id"]):
        return "illegal access"
    r.table("event").get(event["id"]).update(event).run()
    check_overlays(token)
    return "event modified"


# this function get the users events and check overlays
def check_overlays(token):
    events_list = get_event(get_email(token))
    for i in events_list:
        alarm = False
        for j in events_list:
            # confront the events
            if i != j and convert(j["start"]) < convert(i["end"]):
                if convert(j["end"]) > convert(i["start"]):
                    alarm = True
                    # if event with overlap is flexible call the rearrange function
                    if i["flexible_lunch"]:
                        rearrange_lunch(i, j)
                    else:
                        set_alarm(i, j)
        if not alarm:
            r.table("event").get(i["id"]).update({"alarm": False}).run()


# this function convert the string in a date that is comparable
def convert(str):
    return datetime.strptime(str, "%Y-%m-%d %H:%M+00:00")


def set_alarm(e1, e2):
    id1 = e1["id"]
    id2 = e2["id"]
    r.table("event").get(id1).update({"alarm": True}).run()
    r.table("event").get(id2).update({"alarm": True}).run()


# query in the db, get all event belonging to the user.
# the table event_submit contains all events id link to user mail, so the function join the table event and the
# table event_submit
def get_event(email):
    query = r.table("event_submit").filter(r.row["email"] == email).\
        eq_join("event", r.table("event")). \
        without({"left": ["email", "event"]}).\
        zip().run()
    events = list(query)
    return events


def get_email(token):
    return token_query(token)


# if an users try to modify or delete another user's event this function return False
def security_check(token, id):
    events = get_event(get_email(token))
    for e in events:
        if e["id"] == id:
            return True
    return False
