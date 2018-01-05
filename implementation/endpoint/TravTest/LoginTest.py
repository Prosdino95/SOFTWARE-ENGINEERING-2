import unittest
import registration
import login
import rethinkdb as r
import TravTest.db_test as testdb
import rt_server as rts
import TravTest.EventTest as event


r.connect(rts.ip, rts.port).repl()
testdb.init_bd()
rts.db_name = "TravTest"


class LoginTest(unittest.TestCase):
    user = {
        "email": "test@test.com",
        "password": "test"
    }

    @classmethod
    def tearDownClass(cls):
        r.table("user").delete().run()

    # test the registration
    def test_login(self):
        registration.registration(self.user)
        self.user["password"] = "test"
        query = r.db("TravTest").table("user").get("test@test.com").run()
        self.assertEqual(query["email"], self.user["email"])
        self.login_phase()

    # test the login
    def login_phase(self):
        token = login.login(self.user)
        self.assertNotEqual(token, "none")


if __name__ == '__main__':
    unittest.main()
