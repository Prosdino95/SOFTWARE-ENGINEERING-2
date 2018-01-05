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


adopted middleware
-------------------

api
----


Structure of the source code
=============================


Testing
========

System test
------------
We use jmeter for testing all API endoint.
We test the API doing some Post and Get request and make some assert on the response.

    #) In the Thread Group: Registration,UserProfile,Event we test all API endpoint by do the correct Posts and make some assertion on the response.
    #) In the Thread Group: Post_missing_information we do some malformed post with some missing essential information. We expect a Bad Request response.
    #) In the Thread Group: Wrong_post we test a possible post that try to modify random event that not belong to the user. so in this case we expect an Illegal Accession response.
    #) In the Thread Group: Illegal_token we test an incorrect login and some post with incorrect token. In tthat case when the Server see that the token is incorrect stop the computantion and send an error message.


Installation instructions
==========================
(giacomoooooooooooooo (tutta tua sta parte)

