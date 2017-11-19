.. contents:: Table of Contents
 :depth: 2

Introduction
============

Purpose
-------

In these document will be analyzed all the design features needed to develop Travlendar+ system.

We suppose that the readers are familiar to what is the Travlendar+ system and all its features. If it is not, we suggest them to read the RASD document before continuing. 

Scope
-----

We will focus on mapping all the functions analyzed on the RASD document on different components and modules in a specific structure. 

We will do considerations about the Architecture structure of the system and the single components involved. This analysis will cover not only the Logic part of the application but the UI too.


Architectural Design
====================

High-level components and their interaction
-----------------------------------------------

The architecture of the system is a 3 Logic Tiers.

    .. image:: Resources/architecture.png

When the User submit an event via Web or App the Engine proceed to update the DB and calcolate the route to propose to the user.
When the sistem need external information the Arrange System provides through a query to external API (for istance: the ATM schedule or Google Maps route)

The Database store all user informations about his profile preference and his shedule (Events and Best route chosen by the user)


Component View
--------------

	 .. image:: Resources/Component_view.png.png


Deployement View
----------------

Runtime View
------------

Component Interfaces
--------------------

Architectural Styles
--------------------

--------------------
Overall Architecture
--------------------


The software is divided in multiple tiers. On the server side there will be the following components:

#) Frontend endpoint server

#) Web scraping and API daemon to obtain transportation and weather data

#) RethinkDB document-oriented database

#) Routing server

The client will be thin in both the web and android version.

------------------------
Frontend Endpoint Server
------------------------

The frontend endpoint server's purpose is to provide REST endpoint in JSON, it is the main and only interface between the client and the server. The API calls will be done through HTTP and will use a token infrastructure for authentication. All API calls will be processed through a secure connection. It will also include a portion of the business logic needed by travelendar+.

The following endpoints will be present in the first (v1) release:

* /v1/get_token
   * POST - user provides credentials and obtains a token to use for further transactions
* /v1/get_appointments
   * GET - receive a JSON describing the appointments specified in the date range
* /v1/get_route_options
   * POST - provides the routing alternatives given a source and destination point
* /v1/register_appointment
   * POST - registers an appointment, if id is specified the appointment is modified
* /v1/delete_appointment
   * POST - deletes the appointment

--------------------
Web Scraping and API
--------------------

This server is needed to obtain information pertaining the various transportation methods. As a architectural choice API will be favoured over raw website scraping if possible.

--------------
Routing Server
--------------

The routing server's purpose is to calculate the optimal transportation options given a starting and ending point and user preferences. The routing server will exclusively communicate with the FES via a JSON REST API.

In the first release there will be the following endpoints:

* /v1/calculate_path
    * calculates a list of optimal paths


Other Design Decisions
----------------------

Algorithm Design
================

User Interface Design
=====================

User Interface MockUp
---------------------

see Section on RASD document.

UX Diagram
----------
    
    .. image:: Resources/UxDiagram/UxDiagram.png

Gui Scheme
----------

    .. image:: Resources/gui.png
     
Client can access to Travlendar+ services in two different ways:
    -  Broswer: Mozilla, Chrome any broswer with html5, javascript support
    -  Android App: Avaiable for any Android 5.x Systems (API level 21)


The different GUI will be as much as possible similar focusing on the https://material.io/ design guidelines.

Communication between Gui and client logic is EventBased:
    - Html5 Window Events and Javascript for the Broswer Client
    - onCreate(), onStart() methods and Intents between Activities for Android Client.
     
 
Requirements Traceability
=========================


Implementation, Integration an Testing
======================================


Effort Spent
============

Prosdocimi Marco
-----------------

    

    15/10/2017 2h
     
    18/10/2017 2h
    
    21/10/2017 7h
     
    22/10/2017 4h
     
    25/10/2017 3h
    
    26/10/2017 1h
    
    28/10/2017 3h
     
    29/10/2017 2h 	

Ruggiano Enrico
-----------------

    15/10/2017 2h
     
    16/10/2017 2h
    
    18/10/2017 1h
    
    20/10/2017 4h
     
    21/10/2017 2h
     
    22/10/2017 3h
     
    24/10/2017 2h

    25/10/2017 3h
    
    28/10/2017 2h
     
    29/10/2017 5h 	

Giacomo Vercesi
---------------

    14/10/2017 5h

    15/10/2017 3h

    17/10/2017 1h

    20/10/2017 3h

    22/10/2017 2h

    27/10/2017 3h

    28/10/2017 5h

    29/10/2017 7h
    

References
==========

Picture
-------

All the picture used for the UI are desiged by yanalya / Freepik.

*Those were free downloded from http://www.freepik.com with a Free Licence.*

*For more informations just read the "Licence free.txt" file in the repository or visit*
    - *http://www.freepik.com/terms_of_use*
   
------------
Icon Credits
------------

* Position, Setting Icon: 
    
     *Icon made by CC 3.0 BY from www.flaticon.com*
     
* Calendar, Upload, Menu, Submit Event, Cancel, Accept, Exit, Like, Dislike, Partial like, Hour, Destination Icons: 
    
     *Icon made by Flaticon Basic License BY from www.flaticon.com*
      
* Vehicle Icons:
    
     *Icon made by Flaticon Basic License BY from www.flaticon.com* 
     
-------------
Standard IEEE
-------------

standard ISO/IEC/IEEE 29148
