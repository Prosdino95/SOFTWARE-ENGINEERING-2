.. contents:: Table of Contents
 :depth: 2

Introduction
============

Purpose
-------

In this document it will be analyzed all the design features needed to develop Travlendar+ system.

We suppose that the readers are familiar to what is the Travlendar+ system and all its features. If it is not, we suggest them to read the RASD document before continuing. 

Scope
-----

We will focus on mapping all the functions analyzed on the RASD document on different components and modules in a specific structure. 

We will do considerations about the Architecture structure of the system and the single components involved. This analysis will cover not only the Logic part of the application but the UI too.

Definitions
-----------

* *Best Path Algorithm*: the algorithm which computes the *Best Path*. See *RASD - Definitions* for more information
* *FES*: Frontend Endpoint Server. See *Architecture Styles* for details.
* *OPS*: Optimal Path Server. It the server which calculates the Best Path Algorithm. See *Architecture Styles* for details.
* *OSM*: Open Street Map library. See External link for more informations.
* *RASD*: Requirements analysis and specification document. 
* *REST*: Representational state transfer. See external link to have more information.
* *UI*: User Interface of the system.

Architectural Design
====================

High-level components and their interaction
-------------------------------------------

The architecture of the system is a 3 Logic Tiers.

    .. image:: Resources/architecture.png
    

It is mainly composed by these elements:

* Applicational Servers
* Firewalls
* Databases
* Auxiliary Server

---------------------
Applicational Servers
---------------------

Server used to provide the main service and logic of Travlendar+. 
As in the figure above, the Applicational Servers are:

#) **Web Server** which provides all the html forms and hypertext layout of the System.
#) **Frontend Endpoint Server** which dispatches and elaborates all the client requests in a server side and safe environment
#) **Optimal Path Server** which has the function of computing the Best Path Algorithm and arrange a route for the user.

---------------------
Firewalls
---------------------

Protection is a quality driver essential for the System. We decide to put only two firewalls, which are:

#) **Outer Firewall** which has the function to screen external packets with a light level of protection. A complete protection for a Web Server is not necessary.
#) **Inner Firewall** which has to protect all the server side from malicious packets. It must guarantee an high level of protection, especially for the databases access. 

---------
Databases
---------

Of course the System needs to have databases. Those are:

#) **User Data DB** which stores all personal information and preferences of the accounts and member registred on the System.
#) **Transport DB** which stores all the information needed to compute the Best Path Algorithm. For istance it has stored public transports timetables. This is due to absence of valid external API. (see Scraper Section for more information)

---------------------------------------
Auxiliary Server - Scraper & API Module
---------------------------------------

To compute the Best Path Algorithm are needed a lot of external information, such public transport timetables, geographical position car sharing system stations and so forth. External API which could query databases of third parties could be not exist. So it must implement a system which currently gives all these informations. For this reasons it could be used Auxiliary Servers which have the function to populate the Transport Database. 

A good tool is the use of **Scraper & API Module Server**.
 

Component View
--------------

The main function offered by the system can be summarized in those structure of components.

--------------
Server Side
--------------

    .. image:: Resources/DD_Diagram/Component_view.png

--------------
Cient Side
--------------

    .. image:: Resources/DD_Diagram/Component_view_Client.png


Deployement View
----------------

Other userful information about the deployment of the BackEnd components can be represented on the diagram below.


	.. image:: Resources/DD_Diagram/Deployment_view.png

Runtime View
------------

A schematic representation of the runtime System can be summarized in those diagrams. 
We will analyze the main functions of Travlendar+:

* Registration
* Add Event
* Buy Ticket
* Notification

------------
Registration
------------
    .. image:: Resources/DD_Diagram/RunTime_view/Registration.png

------------
Add Event
------------        
    .. image:: Resources/DD_Diagram/RunTime_view/AddEvent.png

------------
Buy Ticket
------------
    .. image:: Resources/DD_Diagram/RunTime_view/BuyTicket.png

------------
Notification
------------
    .. image:: Resources/DD_Diagram/RunTime_view/Notification.png
    

Component Interfaces
--------------------

    .. image:: Resources/Component_Interface.png


Architectural Styles
--------------------

--------------------
Overall Architecture
--------------------


The software is divided in multiple tiers. On the server side there will be the following components:

#) Frontend endpoint server

#) Web scraping and API daemon to obtain transportation and weather data

#) RethinkDB document-oriented database

#) Optimal Path server

The client will be thin in both the web and android version.

------------------------
Frontend Endpoint Server
------------------------

The frontend endpoint server's purpose is to provide REST endpoint in JSON, it is the main and only interface between the client and the server. The API calls will be done through HTTP and will use a token infrastructure for authentication. All API calls will be processed through a secure connection. It will also include a portion of the business logic needed by Travlendar+. It will also integrate a proxy architecture with the OPS.

The following endpoints will be present in the first (v1) release:

* /v1/register_user

    * POST - registers the user into the system

* /v1/get_token

    * POST - user provides credentials and obtains a token to use for further transactions

* /v1/get_appointments

    * GET - receive a JSON describing the appointments specified in the date range

* /v1/get_route_options

    * POST - provides the routing alternatives given a source and destination point

* /v1/register_appointment

    * POST - registers an appointment, if it is specified the appointment is modified

* /v1/delete_appointment

    * POST - deletes the appointment

--------------------
Web Scraping and API
--------------------

This server is needed to obtain information pertaining the various transportation methods. As a architectural choice API will be favoured over raw website scraping if possible.

-------------------
Optimal Path Server
-------------------

The optimal path server's purpose is to calculate the optimal transportation options given a starting and ending point and user preferences. The OPS will exclusively communicate with the FES via a JSON REST API. It will make use of a OSM routing library to handle the route computation.

In the first release there will be the following endpoints:

* /v1/calculate_path

    * calculates a list of optimal paths


Other Design Decisions
----------------------

* RESTful with transition support architecture system.
* RethinkDB was chosen based on the need to store data such as geojson and other information in a structured manner, hence precluding the use of a relational database.
* Both GUI will employ an MVC pattern to manage the interaction between the GUI and the backend requests

Algorithm Design
================

The main algorithm of this application resides in the optimal path server. The OPS' job is to provide to the endpoint server the travelling options needed at the core of the application.

Transport Categories
--------------------

The algorithm considers viable transport options based on the trip distance:

- 0 - 0.5km (short)

    - foot
    - bike sharing

- 0.5-10km (city)

    - foot
    - bike/bike-sharing
    - metro/bus
    - car-sharing
    - suburban train

- 10-20km (ex-city)

    - car/taxi
    - metro/bus/suburban train

- 20-100km (region)

    - car/taxi
    - train

- 100+ km (long)

    - airplane
    - car
    - train

Transport Switch Penalties
--------------------------
Each mode of transport has a inherited "transfer delay", which is put to account for events such as parking the car, moving through the station and buying the transport ticket. It also allows to priviledge routes with less modes of transportation, while allowing fast multi-transport options to be displayed.

Main Algorithm
--------------
Here follows an example of the path code, written in pseudocode.

::

    compute_path(start_coord, end_coord){
        min_bound = calc_foot_time(start_coord, end_coord);
        return compute_path_bound(start_coord, end_coord, min_bound);
    }
    
    compute_path_bound(start_coord, end_coord, time_bound){
        result = [];
        distance = calc_distance(start_coord, end_coord);
        if( distance == 0 ){
            return valid_null;
        }
        transports = get_transports(distance);
        for( single_transport : transports ){
            single_path = transport.compute_path_nearest(start_coord, end_coord);
            if( single_path.valid &&
                single_path.time + single_path.time_penalty < time_bound ){
                remaining_time = time_bound - (single_path.time + single_path.time_penalty);
                
                begin_distance = calc_distance(start_coord, single_path.start);
                end_distance = calc_distance(single_path.end, end_coord);
                
                begin_bound = begin_distance / (begin_distance + end_distance);
                end_bound = end_distance / (begin_distance + end_distance);
                
                result_begin = compute_path_bound(start_coord, single_path.begin);
                result_end = compute_path_bound(single.path_end, end_coord);
                
                if( result_begin.valid && result_end.valid ){
                    result.add( result_begin + single_path + result_end );
                }
            }
        }
        return result;
    }



User Interface Design
=====================

User Interface MockUp
---------------------

see *External Interface Requirements* on RASD document.

UX Diagram
----------
    
    .. image:: Resources/UxDiagram/UxDiagram.png

Gui Scheme
----------

    .. image:: Resources/gui.png
     
Gui elements can be reassumed on those elements:

    #) **Broswer Gui** which is composed by all the html pages and insert section of the client broswer interface
    #) **Android Gui** which is composed by all the Activities and java classes of the android layout app. 
    
The Gui interfaces face the same application logic module, which is described in above sections.
Broswer Gui and Android Gui arrange their elements following the UX diagram above to give to the user the same experience.

Client can access to Travlendar+ services in two different ways:
    -  Broswer: Mozilla, Chrome any broswer with html5, javascript support
    -  Android App: Avaiable for any Android 5.x Systems (API level 21)


The different GUI will be as much as possible similar focusing on the Material Design guidelines.
(see *External Link* in *References*)

Communication between Gui and client logic is *Event Based*:
    - Html5 Window Events and Javascript for the Broswer Client
    - onCreate(), onStart() methods and Intents between Activities for Android Client.
     
 
Requirements Traceability
=========================

Referring to RASD document we can track the requirements on the components described.


    .. image:: Resources//RequirementsTrack/Table.png


Implementation, Integration an Testing
======================================

Elements to be Integrated 
--------------------------

--------
BackEnd
--------

    #) Handler Api
    #) RethinkDB
        #) UserDB
        #) TrasportDB
    #) Optimal Path Server

----------------
Scraping Module
----------------

Scrap modules are not required for the testing and implementation of the other components.
they will be used once the system has been completed to populate the DataBases.
They can be implemented, tested and integrated independently of the other modules.

---------
FrontEnd
---------

    #) GUI (android and Broswer)
    #) Client Interface
    #) Client logic
    #) Alarm System

Component Integration sequence
--------------------------------

In this section of the document will be described the order of integration of the components.
As a notation, an arrow going from component A to component B means that A is necessary for B to function, so it must have already been implemented before performing the integration.


--------
BackEnd
--------

    .. image:: Resources/DD_Diagram/Integration.png

---------
FrontEnd
---------

    .. image:: Resources/DD_Diagram/IntegrationGui.png


Effort Spent
============

Prosdocimi Marco
-----------------
    

    6/11/2017 2h
     
    12/11/2017 3h
    
    13/11/2017 3h
     
    14/11/2017 2h
     
    15/11/2017 3h
    
    17/11/2017 4h
    
    20/11/2017 2h
     
    21/11/2017 1h 	
    
    24/11/2017 2h 	
    
    26/11/2017 3h 	



Ruggiano Enrico
-----------------

    4/11/2017 1h
     
    12/11/2017 2h
    
    14/11/2017 5h
     
    15/11/2017 3h
     
    16/11/2017 2h
    
    18/11/2017 3h
    
    20/11/2017 3h
     
    21/11/2017 1h 	
    
    22/11/2017 2h 	
    
    23/11/2017 2h 	
    
    26/11/2017 3h 	

Giacomo Vercesi
---------------

    7/11/2017 4h
    
    13/11/2017 3h
     
    15/11/2017 2h
    
    17/11/2017 2h
    
    22/11/2017 3h
     
    23/11/2017 2h 	
    
    24/11/2017 4h 	
    
    25/11/2017 2h 	
    
    26/11/2017 3h 	
    

References
==========

External Link
-------------

REST architecture systems:

* https://en.wikipedia.org/wiki/Representational_state_transfer

Open Street Map library:

* https://wiki.openstreetmap.org/wiki/Geo::OSM_library

RethinkDB:

* https://www.rethinkdb.com/

Material Design:

* https://material.io/

Tool Used
---------

Uml Diagrams:

* http://umletino.com/ 
* UMlet

Table:

* libreOffice Calc

Architecture schemes:

* Inkscape
