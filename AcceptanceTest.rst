.. contents:: Table of Contents
 :depth: 2

Introduction
============
This document present all the informations about the Acceptance Test of Travlendar+.

analyzed project
=================
AldeghiKrasniqiMazzoleni project.

link to project folder: 
https://github.com/filipkrasniqi/AldeghiKrasniqiMazzoleni.

Commit info
-----------

* commit message BEERS WITH THE BOyS
* commit hash: 399e84146fb5c53cd323c0f44ff95edb67ab4a61.
* Author: Filip Krasniqi <filip.krasniqi@mail.polimi.it>.
* Date: Sun Jan 7 23:59:28 2018 +0100.

All other commit posted after the last date of submission were ignored. All above information were obtained with "git log" command.

Installation and Setup
=======================
The installation procedure was accomplished in the following ways:

Client Side
-----------
The client side installation procedure was done by using the provided apk inside :code:`DeliveryFolder/Implementation`, which was not accounted for in the ITD document. The apk was installed on a variety of devices using Android Virtual Device Manager.

Server Side
-----------

For consistency's sake the we decided to utilize docker to deploy the server component. Docker allowed us to have consistent results while we were testing the server on our computers. The war file used was the one provided in :code:`DeliveryFolder/Implementation`, The installation procedure that we followed is as follows:

.. code::

  cp <Repo Folder>/DeliveryFolder/Implementation/web.war .
  sudo ./build.sh
  sudo docker-compose up

the rest of the testing was done using the local server. One detail that was not explicitly specifified in the ITD document was that the mysql server's ip was hardcoded to :code:`localhost`, something that revealed itself to be cumbersome in our docker setup and it would cause major issues if it were used in the setup as shown in the RASD (3.4.3).


Acceptance Test Cases
=====================

Documents inconsistencies
-------------------------

Comparing the RASD, DD and ITD document with the code we found those inconsistencies:

* There are not motivation on why Travlendar+ has to present to the user a disclamer for the use of personal information. Even external information provided from a facebook or external login are not specified what will need for. There are not specified requirements or algorithm which will not work if those informations are not inserted.(see RASD 2.4-Disclamer Approvance)

* There is not a clear model of the data structure on the RASD and the DD. How the data are managed by the database is not clearly written in any document. For example are not specified the tables used and the organization of the information on the different database, the local REALM and  the remote MYSQL (see RASD and DD).

* Is not a 'Thin Client' a client which has implemented a local database synchronized with a server. Also the app takes 61,94 MB on a Android 6.0 device, which is not so 'Thin'(see DD 2.7 and ITD 4-client_side).

* Is not specified why it is required a forced synchronization of the client data to server data even if the client can't work properly without internet connection (and so without server ednpoint connection). (see ITD 4-client_side).

* Is not specified why a PHP server implementation was replaced by a JEE server with glassfish. (see RASD 3.1.3).

* Is not clear the algotithm design and with which vehicle can calculate the best path. Also the City Bike, Inrix, Car2Go API are not implemented and their neglect is not mentioned in ITD document. (see RASD 2.1)

Analysis of Functionalities
---------------------------

For our analysis we used the following environment. 

* We started in local the Server using the file Web.war

* We used mitmproxy, a proxy server that allows us to see the api calls and the json files exchanged between the server and the client.

* We tried some actions provided by the application and register the information exchanged by the client and the server.

* We tried to reproduce the Post calls with jmeter, we have stored a log of our test in the file AcceptanceTest.jmx.

In the following section we report our results of test of the functionalities with some presumed bugs and jmeter test reference.

-------------
Registration
-------------
*jmeter test reference: Registration*

The registration password check does not work properly.
The application asks a password that "Contain at least 8 characters, one lower case character, one upper case character, one number and one special character" but if we set this type of password the server refuses the POST.
The relative jmeter test fail and return error 400.

The most probable cause of this is that the server-side regex responsible for this is not the correct one.

*Actual regular expression*: 

:code:`((?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.:-_,;*+\\[\\]@!\"&/()=?#$%\\\\]).{8})`

------
Login
------
*jmeter test reference: Login*

We can't perform a login test without a registration.
The test returns an error 400.

----------------------
Submit Standard Event
----------------------
*jmeter test reference: Event*

we noticed a strange bug in the app. 
when we submit the event the server answers with the possible paths list but when we try to select a path some times we see this screen:

    .. image:: Resources/PathBug.png
       :height: 300px
       :width: 400 px
    
The post as can see in jmeter test report the message: 
    :code:`"error": "The routine appointment doesn't have any possible instance!"`

----------------------
Submit Flexible Event
----------------------

The flexible lunch seems not working properly.

The Server answer at the post is: 
    :code:`"error": "The minReservationTime is greater than the allowed timeslot"`

We find this bug in the code that check the reservation time:

The code perform this:
        :code:`if(minReservationTime > start.getTimestamp() - end.getTimestamp())` 

Instead of this: 
        :code:`if(minReservationTime > end.getTimestamp() - start.getTimestamp())`

------------------
Submit Preference
------------------
*jmeter test reference: Thread group Preference*

The submit of the preference to the server works fine.

*note:* every time the user selects a preference the app sends a Put Request to the server.
To limit the JSON traffic between Client and Server the application should present a `submit button` which if it is pressed, it triggers an unique post to the server.

---------------
Malformed post
---------------
*jmeter test reference: Malformed Post*

We tried to use Jmeter to send to the server some malformed post requests. for istance: with some null or missing fields.
Those tests verified the robustness of the server and that the group spent a lot of time implementing checks functions, Enum types and extended exceptions.
This is not true for the client which is completely vulnerable and it relies heavily on what server sends to him. (see Security Issues).

Some exemple of this tests are in jmeter


Other test Case
================

* When submitting an event the "Customize" button does not overwrite the "Global Travel Preferences" or any personal preference category chosen before.

* Weather information is always the same.

* Vehicles not working: Car Sharing, Bike, Bike Sharing, Taxi.

* Vehicle working: Car Owned, Walk.

* Public transport: You cannot force a computation of the path with specified transport, because Google considers them only when their ETA is competitive respect the others vehicles. The preference setting on pubblic transport is just a filter on what google passes to the app.   

* Every time I click the 'Server IP' button and confirm on the server box, The App receive always different "restore password" even if the server ip is not changed.  

* json traffic is really high and reduces the performance. A lot of data is redundant and not self-explanatory. Also a json message for submit an event is about 2,6kB, which is not lightweight (see jsonMessage.json)


Security issues
===============


Other notes
============

* No Java Packages used.
* While the code features well-documented functions, there is no compiled javadoc html folder with them.
* APK installer says that no privilege are needed by the app, however at first login you need to accept their policies. No Android manifest is set.
* we were unable to build the server component via :code:`mvn package`, as some of the required libraries were missing from the :code:`pom.xml`.
* The use of a backtracking-regex for password checking was unnecessary, as a much simpler and flexible checkPassword could have been implemented with a for loop.
