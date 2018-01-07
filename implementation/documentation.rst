.. contents:: Table of Contents
 :depth: 2

Introduction
============


Requirements and Functionalities
=================================
With reference to the RASD and DD documents we are implemented some functionalities that we consider essential for the first version of Travlendat +.

Implemented funzionalities
----------------------------
-------------------
Calendar Functions
-------------------
There are implemented a completed calendar system in witch you can submit multile events and the user can see the complete agenda.
The events can overlap and we are implemented a partucular "flexible event" that can rearrange itself(see RASD fom more information).

--------------
Map Functions
--------------
We are implemented a first version of Best Route algorithm that, considering the user's preference, calculate the best route to reach the meeting.
The optimal path route in this first version works only in Milan and works with:

    * By foot
    * Car
    * Bike
    * ATM metro
    * BikeMy (bike sharing)

The meeting and the start locations need to be specified in the map at every event submit.
The map can geolocalize the User.

------------------------
User Profile Functions
------------------------
We are implemented a complete user profile as we specify in the RASD.

-------------
Alarm System
-------------
The first version of the alarm system send a notify in the browser when the user need to start travel for reach the meeting.



Not implemented funzionalities
-------------------------------
There are some features that were not included in this first version because they are too difficult to implement [*]_ or aren't essential for the first presentation. 
    * The Alarm system notify the user when: he submit an event that overlaps with another.
    * The Alarm system notify the user when he try to submit an event than he can't reach in time.
    * The Alarm system have different type of notifications such email or message.
    * The registration not required that the email are verified.
    * The Best Route algorithm considers some unexpected event like traffic or meteo.
    * The User can specify the start positions as the meeting position of the last event.

.. [*] In the short time available

Adopted development frameworks
=================================

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
    perche' abbiamo usato questo?   
    https://www.rethinkdb.com/

api
----


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