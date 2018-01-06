.. contents:: Table of Contents
 :depth: 2

Introduction
============


Requirements and Functionalities
=================================
    "The requirements/functionalities that are actually implemented in the software
    (with motivations for including them and excluding	 others if applicable)"


Adopted development frameworks
=================================
    "(per ogni cosa scrivere vantaggi e svantaggi)"


Adopted programming languages
------------------------------
    #)**Python**

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

adopted middleware
-------------------

api
----


Structure of the source code
=============================


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
(giacomoooooooooooooo (tutta tua sta parte)

