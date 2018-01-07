import unittest
import event
from login import login
import registration
import rethinkdb as r
import db_test as testdb
import rt_server as rts

r.connect(rts.ip, rts.port, rts.db_name).repl()
testdb.init_bd()
rts.db_name = "TravTest"

user = {
        "email": "test@test.com",
        "password": "test"
    }


class EventTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        registration.registration(user)
        user["password"] = "test"

    # the tests need login
    def setUp(self):
        self.token = login(user)
        self.event1 = {
            "name": "test",
            "start": "2017-10-10 11:00+00:00",
            "end": "2017-10-10 15:00+00:00",
            "token": self.token
        }
        self.modevent1 = {
            "name": "test2",
            "start": "2017-10-10  11:00+00:00",
            "end": "2017-10-10  15:00+00:00",
            "token": self.token
        }

    def tearDown(self):
       r.table("event").delete().run()
       r.table("event_submit").delete().run()

    @classmethod
    def tearDownClass(cls):
        r.table("user").delete().run()

    # try to add event1, modify with modevent1 and delete
    def test_add_mod_del(self):
        event.add_event(self.event1)
        elist = event.get_event(event.get_email(self.token))
        id_event = elist[0]["id"]
        self.modevent1["id"] = id_event
        event.mod_event(self.modevent1)
        ev = r.table("event").get(self.modevent1["id"]).run()
        self.assertSequenceEqual(ev["name"], self.modevent1["name"])
        event.del_event(self.token, id_event)
        elist = event.get_event(event.get_email(self.token))
        self.assertListEqual(elist, [])

    def test_overlay(self):
        event.add_event(self.event1)
        event.add_event(self.modevent1)
        elist = event.get_event(self.token)
        for e in elist:
            self.assertTrue(e["alarm"])
