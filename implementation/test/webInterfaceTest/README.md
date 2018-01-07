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
* delete the log file ``testLog.html`` created by old test. Otherwise the data will be appended on it and will corrupt it!
* Assure that you have a working last version of Mozilla Broswer. THIS TEST WON'T WORK IF YOU DON'T HAVE IT!

# How to Run

* Open `eclipse`
* Select File > Import... > Existing Maven Projects > 
* click `next`
* click `Broswer...` and select the path in which is the `pom.xml` file. You don't have to look for a main.java. just reach that base root path and click `ok`.
* select the checkbox of the `pom.xml` and click `finish`.
* Eclipse may show you some box. always say YES or CONFIRM.
* select the Main.java class on main/travlendarTest package view.
* click with right mouse and select `Run as Java Application` 

# When test is Running

* Don't click or interfere with`Marionette` Navigation! TEST MAY FAIL!
* Just take a coffee and watch the show!

# After test is Completed

* take a look on the log file ``testLog.html``.
* Remember to perform ```Before Every Running`` task!


