IngSw2

Introduction
============

Purpose
-------
Travlendar+ e' un sistema di gestione di appuntamenti in modo da schedulare in modo efficiente la calendarizzazione degli impegni dell'utente. Grazie all'applicazione e' possibile calcolare in anticipo il tempo stimato per raggiungere il luogo di incontro in funzione del mezzo di trasporto scelto dall'utente. 

L'applicazione e' pensata non solo per organizzare viaggi interregionale ma anche per gli impegni personali o di leavoro dell'utente. L'utente una volta registrato potra' impostare le sue preferenze sui mezzi di trasporto per raggiungere la location dell'appuntamento. In funzione alla scelta dell'utente l'applicazione potra' suggerire diversi itinerari con diverse stime di tempo per oguna di esse. 

Il sistema si presenta come una 'daily' applicazione che ha lo scopo di aiutare la vita di ogni giorno degli utenti.

Scope
-----

Definitions
-----------

Requirements
------------

1) Schedule appuntamenti

2) Contollare possibilità trasporti

3) Evitare ritardi

  - 3.1 tempo "cuscinetto"(considerare eventuali ritardi non previsti dipendente dal mezzo)

4) Contattare varie API con protocolli eterogenei per poter controllare i vari tipi di trasporto ecc...

  - 4.1 controllo dei mezzi di trasporto e controlli profilo utente(storico, preferenze ecc...)
  - 4.2 identificare il/i miglior/i mezzo/i di trasporto disponibile

    - 4.2.1 tempo di trasporto considerando anche i pezzi "a piedi"/prezzo

    - 4.2.2 preferenze utente(sistema di "learning")

    - 4.2.3 condizioni metereologiche

    - 4.2.4 tipo di appuntamento

    - 4.2.5 altri appuntamenti in giornata(es. uno non può essere raggiunto con i mezzi, verra suggerito di muoversi con mezzi propri tutta la giornata)

5) invio di vari Warnings all'utente in base a diverse situazioni

  - 5.1 creazioni di meeting irraggiungibili in tempo

  - 5.2 Pranzo (vedi:8.5)

6) Users can create meetings

7) users preferences

  - 7.1 disabilitare/abilitare vari tipi di trasporto

  - 7.1.1 inserire preferenze oppure divieti di tipi di mezzi

  - 7.2 inserire regole ai vari tipi di trasporto(distanza,tempo ecc..)

  - 7.3 Carbon footprint

  - 7.4 possibilità di inserire gli abbonamenti a trasporti ecc...

8) Fexible Lunch

  - 8.1 permettere soppressione

  - 8.2 range orari-giorni

  - 8.3 durata

  - 8.4 slide automatico se si aggiungono appuntamenti

  - 8.5 warning se il pranzo salta

  - 8.6 aggiunta altri tipi di breaks/eventi ricorrenti

9) comprare i biglietti

Overall Description
===================

Product Perspective
-------------------

Product Functions
-----------------

User Characteristics
--------------------

Assumptions
-----------

Specific Requirements
=====================

External Interface Requirements
-------------------------------

Functional Requirements
-----------------------

Performance Requirements
------------------------

Design Constraints
------------------

--------------------
Standards Compliance
--------------------
The software will use the following standards when deployed:

- JavaEE for the server backend
- utilize a JSON REST API for communication between the backend and frontend

--------------------
Hardware Limitations
--------------------
The mobile app will have the following hardware limitations:

- Android or iOS operating system
- Semi-continuous [*]_ internet access (3G/4G/WiFi)
- GPS

.. [*] Semi-continuous meaning that the system can loose connection briefly but overall needs to be able to access the internet on a reoccurring basis

-----------------
Other Constraints
-----------------
Since the system relies on confidential information in order to work the system will need to store the data securely, especially regarding saved addresses. None of the information provided by the user will be used for commercial purposes.

Software System Attributes
--------------------------

Alloy
=====

Effort Spent
============

References
==========