import unittest
import importlib.util as im
import rethinkdb as r
import rt_server
import event

# start import test
spec = im.spec_from_file_location("ProfileTest", "test/ProfileTest.py")
t1 = im.module_from_spec(spec)
spec.loader.exec_module(t1)
spec = im.spec_from_file_location("EventTest", "test/EventTest.py")
t2 = im.module_from_spec(spec)
spec.loader.exec_module(t2)
spec = im.spec_from_file_location("LoginTest", "test/LoginTest.py")
t3 = im.module_from_spec(spec)
spec.loader.exec_module(t3)
spec = im.spec_from_file_location("FlexibleLunchTest", "test/FlexibleLunchTest.py")
t4 = im.module_from_spec(spec)
spec.loader.exec_module(t4)
# end import test


# test suite for the back end the tesa are in the test folder
def suite():
    suite = unittest.TestSuite()
    suite.addTest(t1.ProfileTest('test_mod_profile'))
    suite.addTest(t1.ProfileTest('test_mod_profile_preference'))
    suite.addTest(t2.EventTest('test_add_mod_del'))
    suite.addTest(t2.EventTest('test_overlay'))
    suite.addTest(t3.LoginTest('test_login'))
    suite.addTest(t4.FlexibleLunchTest('test_flexible'))
    return suite


if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
