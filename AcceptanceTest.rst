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
(qualita' della doc ed eventuali problemi, le mail non sono da considerare doc secondo me)

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

Other notes
============

* No Java Packages used.
* No JavaDoc paper committed. (why do you document the code if you don't commit a javadoc???)

(varie ed eventuali sulla qualita' del codice e dei doc)
