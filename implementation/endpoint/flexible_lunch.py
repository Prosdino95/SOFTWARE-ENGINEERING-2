import rethinkdb as r
from tokenDB import token_query
from datetime import time, datetime, timedelta
import rt_server

r.connect(rt_server.ip, rt_server.port, "Travlendar").repl()


def set_lunch(option):
    email = token_query(option["token"])
    del option["token"]
    r.table("user").get(email).update({"lunch": option}).run()
    create_lunch(email)
    return "event added"


def create_lunch(email):
    lunch = r.table("user").get(email).get_field("lunch").run()
    start_hour = time(lunch["launch_start"])
    today = datetime.today().replace(hour=start_hour.hour, minute=start_hour.minute)
    end_day = today + timedelta(days=30)
    for timestamp in datespan(today, end_day):
        start = timestamp
        end = start + timedelta(minutes=30)
        create_lunch_event(start, end, email)


def create_lunch_event(start, end, email):
    lunch_event = {"alarm": False,
                   "color": "#FF5252",
                   "editable": False,
                   "eventOverlap": False,
                   "title": "lunch",
                   "flexible_lunch": True,
                   "start": start.strftime("%Y-%m-%d %H:%M+00:00"),
                   "end": end.strftime("%Y-%m-%d %H:%M+00:00"),
                   }
    cursor = r.table("event").insert(lunch_event).run()
    id = cursor["generated_keys"][0]
    r.table("event_submit").insert({"event": id, "email": email}).run()


def rearrange_lunch(lunch, e, token):
    email = token_query(token)
    end_lunch_time = r.table("user").get(email).get_field("lunch").run()
    end_lunch_time = time(hour=datetime.strptime(end_lunch_time["lunch_end"], "%H:%M").hour,
                          minute=datetime.strptime(end_lunch_time["lunch_end"], "%H:%M").minute)
    new_end = datetime.strptime(e["end"], "%Y-%m-%d %H:%M+00:00") + timedelta(minutes=30)
    new_end = new_end.strftime("%Y-%m-%d %H:%M+00:00")
    lunch_end = time(hour=datetime.strptime(new_end, "%Y-%m-%d %H:%M+00:00").hour,
                     minute=datetime.strptime(new_end, "%Y-%m-%d %H:%M+00:00").minute)
    if lunch_end > end_lunch_time:
        lunch["alarm"] = True
        r.table("event").get(lunch["id"]).update(lunch).run()
    else:
        lunch["start"] = e["end"]
        lunch["end"] = new_end
        r.table("event").get(lunch["id"]).update(lunch).run()


def datespan(start_date, end_date, delta=timedelta(days=1)):
    current_date = start_date
    while current_date < end_date:
        yield current_date
        current_date += delta
