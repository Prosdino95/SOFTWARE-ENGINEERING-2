import unittest
import registration
import profile
from login import login
import rethinkdb as r
import rt_server as rts


r.connect(rts.ip, rts.port, rts.db_name).repl()
rts.db_name = "TravTest"

user = {
        "email": "test@test.com",
        "password": "test",
        "name": "test"
    }


class ProfileTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        registration.registration(user)
        user["password"] = "test"

    def setUp(self):
        self.token = login(user)
        self.preference = {
            "token": self.token,
            "car": False
        }
        self.modprofile = {
            "token": self.token,
            "name": "altro"
        }

    @classmethod
    def tearDownClass(cls):
        r.table("user").delete().run()

    def test_mod_profile(self):
        profile.mod_profile(self.modprofile)
        prof = profile.get_profile(self.token)
        self.assertEqual(prof["name"], "altro")

    def test_mod_profile_preference(self):
        profile.mod_profile_preference(self.preference)
        prof = profile.get_profile_preference(self.token)
        self.assertFalse(prof["car"])


if __name__ == '__main__':
    unittest.main()