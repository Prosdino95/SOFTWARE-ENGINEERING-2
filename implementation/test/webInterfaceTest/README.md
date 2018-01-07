#Configuration

## setup the Log path
open ``log4j2.xml`` and modify the line
 ```<Property name="basePath">/home/archie/Travelandar+/RuggianoProsdocimiVercesi/implementation/test/webInterfaceTest/logs/</Property>``  to ``<Property name="basePath">/MYPATH</Property>``.

## setup gecko.driver path
open ``Main.java`` and modify the line
 ```System.setProperty("webdriver.gecko.driver", "/home/archie/selenium/geckodriver");``. to
```System.setProperty("webdriver.gecko.driver", "/YOURPATH/geckodriver");``.

# Before Every Running

* Assure that the path below are correct.
* perform ```r.db("Travlendar").table("user").delete().run()`` or the RegistrationTest will FAIL!
* delete the log file ``testLog.html`` created by old test. Otherwise the data will be appended on it and will corrupt it!
* Assure that you have a working last version of Mozilla Broswer. THIS TEST WON'T WORK IF YOU DON'T HAVE IT!

# How to Run

* Simply run Main.java

# When test is Running

* Don't click or interfere with`Marionette` Navigation! TEST MAY FAIL!
* Just take a coffee and watch the show!

# After test is Completed

* take a look on the log file ``testLog.html``.
* Remember to perform ```Before Every Running`` task!


