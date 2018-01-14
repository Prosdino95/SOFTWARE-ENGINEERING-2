.. contents:: Table of Contents
 :depth: 2

Introduction
============


analized project
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

(all other commit posted after the last date of submission were ignored. All above information were given by "git log" command.)

Installation and Setup
=======================
The installation procedure was accomplished in the following ways:

Client Side
-----------
The client side installation procedure was done by using the provided apk inside :code:`DeliveryFolder/Implementation`, which was not accounted for in the ITD document. The apk was installed on a variety of devices using Android Virtual Device Manager.

Server Side
-----------

For consistency's sake the we decided to utilize docker to deploy the server component. The installation procedure is as follows:

.. code::

  cp <Repo Folder>/DeliveryFolder/Implementation/web.war .
  sudo ./build.sh
  sudo docker-compose up

the rest of the testing was done using the local server. One detail that was not explicitly specifified in the ITD document was that the mysql server's ip was hardcoded to :code:`localhost`, something that revealed itself to be cumbersome in our docker setup and it would cause major issues if it were used in the setup shown in the RASD (3.4.3).

Moreover it should be noted that that we were unable to build the server component via :code:`mvn package`, as some of the required libraries were missing from the :code:`pom.xml`.



acceptance test cases cases
============================

Document Inconsistencies
------------------------

* There are not motivation on why Travlendar+ has to present to the user a disclamer for the use of personal information. Even external information provided from a facebook or external login are not specified what will need for. There are not specified requirements or algorithm which will not work if those informations are not inserted.(see RASD 2.4-Disclamer Approvance)

* There is not a clear model of the Data Structure on the RASD and the DD. How the data are managed by the database is not clearly written. For example are not specified the tables used and the organization of the information on the different databases, local with REALM and remote with MTSQL (see RASD and DD).

* Is not a 'Thin Client' a client which has implemented a local database synchronized with a server. (see DD 2.7 and ITD 4-client_side).

* Is not specified why it is required a forced synchronization of the client data to server data if the client can't work properly without internet connection (and so without server ednpoint connection). (see ITD 4-client_side).

* Is not specified why a PHP server implementation was replaced by a JEE server with glassfish. (see RASD 3.1.3).

* Is not clear the algotithm design and with which vehicle can calculate the best path. Also the City Bike, Inrix, Car2Go API are not implemented and their neglect is not mentioned in ITD document. (see RASD 2.1)

Other test Case
================
(qualsiasi altro test purche' sia motivato)

* When submitting an event the "Customize" button does not overwrite the "Global Travel Preferences" or any personal preference category chosen before.

* Weather information is always the same.

* Vehicles not working: Car Sharing, Bike, Bike Sharing, Taxi.

* Vehicle working: Car Owned, Walk.

* Public transport: You cannot force a computation of the path with specified transport, because Google considers them only when their ETA is competitive respect the others vehicles. The preference setting on pubblic transport is just a filter on what google passes to the app.   

* Every time I click the 'Server IP' button and confirm on the server box, The App receive always different "restore password" even if the server ip is not changed.  

Other notes
============

* No Java Packages used.
* No JavaDoc paper committed. (why do you document the code if you don't commit a javadoc???)
* APK installer says that no privilege are needed by the app, while still at first login you need to accept the policies. No Android Manifest Setted

(varie ed eventuali sulla qualita' del codice e dei doc)
