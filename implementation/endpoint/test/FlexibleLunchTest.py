import unittest
import rethinkdb as r
import registration
import flexible_lunch
from login import login
import db_test as testdb
import rt_server as rts
import event


r.connect(rts.ip, rts.port, rts.db_name).repl()
testdb.init_bd()
rts.db_name = "TravTest"

user = {
        "email": "test@test.com",
        "password": "test",
    }
event1 = {
            "name": "test",
            "start": "2017-10-10 11:00+00:00",
            "end": "2017-10-10 13:00+00:00",
        }
event2 = {
            "name": "test",
            "start":  "2017-10-10 13:00+00:00",
            "end":  "2017-10-10 15:00+00:00",
        }
fevent = {
            "title": "test",
            "range_min": "12:00",
            "range_max": "15:00",
            "starting_flexible_day": "2017-10-10",
            "ending_flexible_day": "2017-10-11",
            "duration_event": "00:30",
            "starting_location": "",
            "meeting_location": "",
            "alarm_timer": "",
            "alarm_message": "",
            "route": ""
        }


class FlexibleLunchTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        registration.registration(user)
        user["password"] = "test"

    def setUp(self):
        self.token = login(user)
        event1["token"] = self.token
        event2["token"] = self.token
        fevent["token"] = self.token

    @classmethod
    def tearDownClass(cls):
        r.table("event").delete().run()
        r.table("event_submit").delete().run()
        r.table("user").delete().run()

    def test_flexible(self):
        flexible_lunch.set_lunch(fevent)
        id = event.get_event(event.get_email(self.token))[0]["id"]
        event.add_event(event1)
        ev = r.table("event").get(id).run()
        self.assertEqual(ev["start"],"2017-10-10 13:00+00:00")
        event.add_event(event2)
        ev = r.table("event").get(id).run()
        self.assertEqual(ev["start"], "2017-10-10 13:00+00:00")

