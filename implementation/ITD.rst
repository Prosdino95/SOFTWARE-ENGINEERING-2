.. contents:: Table of Contents
 :depth: 2

Introduction
============
This document present all the informations about the first implementation of Travlendar+.

Requirements and Functionalities
=================================
With reference to the RASD and DD documents we are implemented some functionalities that we consider essential for the first version of Travlendat +.

Implemented funzionalities
----------------------------
-------------------
Calendar Functions
-------------------
We implemented a complete calendar system in which you can submit personal events and the user can access to his personal agenda.
The events can overlap and we are implemented a partucular "flexible event" that can rearrange itself(see RASD fom more information).
Everything is simple and intuitive just like mockups presented on the RASD.

--------------
Map Functions
--------------
We implemented a first version of Best Route algorithm which calculates the best route to reach the meeting based on the user preferences.
The optimal path route in this first version works only in Milan and works with:

    * By foot
    * Car
    * Bike
    * ATM metro
    * BikeMy (bike sharing).
  
In future release may be available other veichles and root path calculation (example: assemble different gpx route with different vehicle)

The meeting and the start locations need to be specified in the map on every personal event submission.
The map is much user friendly as possible and it presents drag and drop markers to help the user to select the appointment's positions.
The map can geolocalize the User, depending on the browser configuration and User choice to be geolocalized.

------------------------
User Profile Functions
------------------------
We implemented a complete user profile as we specify in the RASD. This will used to collect data like personal preferences on types of vehicle which will be used for calculating route path. 

-------------
Alarm System
-------------
The first version of the alarm system send a notify in the browser when the user need to start travel for reach the meeting just as info message. 


Future Features
---------------
Feature not implemented (some of them may be under comments on the code)

------------------
Calendar Functions
------------------

* Adding support to different timezone and locale time setup.
* Adding festivity and weather information using exteranl Api, which could give extra information to user and to optimal path server.

-------------
Map Functions
-------------

* Adding street names support on the meeting and starting location with external database or API.
* Adding support to entire region or support other cities (ex: Rome). (it Needs LOT OF RAM)
* Using different API for geolocation so to be more precise.
* The User can specify the start positions as the meeting position of the last event.

------------
Alarm System
------------
* Adding Email warning message support if allowed by the user. (Need some module on the EE server);
* Adding Telephone warning message support with sms. (Same)
* Adding different type of warning message and more User Friendly. (See RASD for different types of warning)
* New Alarm System trigger events:
    * The Alarm system notify the user when: he submit an event that overlaps with another.
    * The Alarm system notify the user when he try to submit an event than he can't reach in time.
   
------------
Registration
------------
* The registration verify user with email authentication sending message with an url/password/hash.


Adopted development frameworks
=================================

Frontend programming languages
------------------------------
Travlendar was projected to be easy, simple, UI friendly, client-server application and cross-platforming.
So why not using Web Programmation and Framework?

Frontend is based on ModelViewControl and EventDispatching (see DD) and javascript libraries like JQuery are perfect for this scope. Also we didn't wanted to reinvent the wheel so we needed to have OpenSource, Full Documented and Maintened Libraries for the project. 
Also Javascript - Html - CSS are perfect for client-server application, are used for Web Programming!

But the key is that we needed a cross-platforming language whose code is the same for a Broswer Application, Client Application, Android/iOS/Mobile Application. AND JAVASCRIPT CAN DO IT!
 thanks to OpenSource libraries like Electron and Cordova you can REUSE your javascript to build an android/ios/mobile COMPLETE application without changing a line of code! SOUNDS INCREDIBLE!

Other key reason is that Javascript is a simple and concise language with an INFINITE library and API support which can let you create a full working web application WITHOUT using a CLASS!   

Also Html5 is great to build UI layout, and CSS helps you to have a layout much RESPONSIVE as possible. 
...DO WE NEED MORE REASONS? 

LIBRARIES USED:

* FullCalendar API. https://fullcalendar.io/
* OpenLayers v3 API. https://openlayers.org/
* Moment http://momentjs.com/
* Toast https://codeseven.github.io/toastr/
* Material Design lite: https://getmdl.io/
* JQuery https://jquery.com/

Adopted programming languages
------------------------------
**Python**

Python is a dynamically typed programming language that is used worldwide in a variety of applications. We chose this language over others for the following proprerties:

* dynamically typed: allows the construction of complex datatypes with ease and removes the burden of memory managment thanks to its garbage collector
* construction of plugin-frameworks such as those needed for the optimal route and scraper modules are trivial to implement
* vast and production-ready collection of libraries, such as those needed to deploy web frameworks and produce http requests
* interpreted: it allows for rapid prototyping of the application, does not need to be recompiled with every version and the container build process is very streamlined
* can be trivially scaled for heavier workloads with appropiate libraries

On the other hand it presents the following shortcomings:

* Due to the dynamically typed nature run-time errors are prone to happen and thus the codebase requires stricter coverage

Back End Framework
-------------------
    #)  **unittest**:Python Framework for tests, is very similar to other test libraty like jUnit.
            https://docs.python.org/3/library/unittest.html.
    #)  **flask**:Is a micro web framework written in Python and based on the Werkzeug toolkit and Jinja2 template engine.
            http://flask.pocoo.org.
    #)  **flask_cors**:A Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
            https://pypi.python.org/pypi/Flask-Cors
    #)  **rethinkdb**:RethinkDB is open-source, scalable JSON database built from the ground up for the realtime web(see below for more information). 
    #)  **jsonschema**:JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. We use this framework for check the accuracy of the POST requests.
            https://pypi.python.org/pypi/jsonschema.

Rethink db
-----------
 asdasd

Structure of the source code
=============================
The code is structured in the following way (starting inside the **implementation** directory):

* :code:`*.Dockerfile` docker build files
* :code:`build_valhalla.sh` and :code:`build.sh` helper scripts to build the docker images
* :code:`docker-compose.yml` describes the container order and network linking
* :code:`endpoint` contains the code regarding the HTTP endpoint
* :code:`web_interface` contains the html, javascript and css files that present the website and interact with the endpoint server
* :code:`optimalroute` contains code pertaining to the optimal route server that is used by the endpoint when asked for routes
    * :code:`optimalroute/route_plugins` contains the plugins that provide the various pathing algorithms
* :code:`scraper` contains code for the scraper module which gathers data from the web to be used by the optimalroute server
    * :code:`scraper/modules` has the individual modules that gather data for individual services
* :code:`valhalla_server` contains the dockerfile to assemble the valhalla server together with the :code:`milan_map_full.pbf` which is a PBF-encoded map of the Milan metropolitan area



Testing
========

WebInterface Test
-----------------
Testing it was not simple. After trying to use QUnit library which let you write unit test to javascript code we decided to use other apporoach. This is because we used a lot of JQuery code which dispatches on user events (like button clicks, writing input field...) which is intestable with standard unit test. So decided to use Test Automation technique, which is great for web application. After using for a while Phantomjs without a good result we adopted Selenium Test Automation to reach our goals.

Thanks to Selenium is possible to create a custom user 'Marionette' navigation behaviour to test WebInterface functionality (like if the html div are correctly updated after a http post). Everything is written in Java with Selenium java API integrated with Junit library. Also when the test is finished it returns a clear html log file in which there are the test results.

Tools:

* Selenium API: http://docs.seleniumhq.org/
* see /webInterfaceTest/README.md to setup the test environment.

Back End test
---------------
we test the most important functions of the back end using the python framework unittest.
These unit tests check the right work of the back end functions and their interaction with the database, so the tests need a rethink db to work.

*instruction for test executions*: start a rethinkdb session and execute with pyton 3.6 the file TestSuite.py in the endpoint folder.

System test
------------
We use jmeter for testing all API endoint.
In these case we ipotize the right work of the back end guaranteed by the "Back End tests".
We test the API doing some Post and Get request and make some assert on the response.

    #) In the Thread Group: Registration,UserProfile,Event we test all API endpoint by do the correct Posts and make some assertion on the response.
    #) In the Thread Group: Post_missing_information we do some malformed post with some missing essential information. We expect a Bad Request response.
    #) In the Thread Group: Wrong_post we test a possible post that try to modify random event that not belong to the user. so in this case we expect an Illegal Accession response.
    #) In the Thread Group: Illegal_token we test an incorrect login and some post with incorrect token. In tthat case when the Server see that the token is incorrect stop the computantion and send an error message

*instruction for test executions*: start the docker environment and open with Jmeter the file API_test.jmx in the system_test folder.


Installation instructions
==========================
The installation instructions are as follows:

#) Install **docker** as explained on https://docs.docker.com/engine/installation/
#) Install **docker-compose** as explained on https://docs.docker.com/compose/install/
#) Start the docker service using (might depend on the system used)

  :code:`sudo systemctl start docker`

#) make sure you are in the **implementation** directory and run:

  :code:`sudo ./make_valhalla.sh`

  this will build the valhalla server needed to get routing information

5) then run

  :code:`sudo ./build.sh`

  this needs to be run every time there is a modification to the codebase

6) Finally run :code:`sudo docker-compose up`

  this will bring up the entire application with all its services in one command. The program is browsable by going at :code:`http://localhost`