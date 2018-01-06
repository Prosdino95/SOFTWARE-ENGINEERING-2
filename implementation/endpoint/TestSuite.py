import unittest
import ProfileTest as t1
import EventTest as t2
import LoginTest as t3
import FlexibleLunchTest as t4


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
