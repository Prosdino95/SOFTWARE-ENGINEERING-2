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
    
    - 4.2.6 aggiornare ed eventualmente mandare un warning per eventuali cambiamenti di itinerario. 

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

Software System Attributes
--------------------------

Scenario
=====================

Scenario 1
-----------
Karla è una donna in piena cariera e ha bisogno di una app che la aiuti a gestire i suoi appuntamenti.
Seguendo i consigli di una sua amica decide di prendere il suo smartphone e scaricare l'app Travlender+.
Karla si registra all'applicazione inserendo i suoi dati (username, mail e pasword) e completando un form in cui vengoni chieste le preferenze sui mezzi di trasporto.
l'app manda una mail con un link per verificare la correttezza e l'esistenza dell'indirizzo mail inserito, dopo che Karla avrà premuto sul link la registrazione sara completate e Karla potra iniziare ad usare Travelender +.
L'applicazione al primo accesso show un breve tutorial sul suo utilizzo e su come modificare e/o aggiungere preferenze.

Scenario 2
-----------
John vuole aggiungere un nuovo appuntamento ad una giornata che non presenta altri impegni.
Dopo aver premuto sul pulsante aggiungi appuntamento si apre un breve form in cui vengono inserite data,ora,luogo,nome.
L'aplicazione chiede inoltre quale sarà la posizione di partenza(tra un location salvata, la posizione attuale o la posizione del precedente appuntamento).
Travelendere+ effetua un controllo per verificare eventuali sovrapposizioni con altri appuntamenti oppure l'impossibilità di pranzare quel giorno e in caso di assenza di conflitti procede a calcolare il percorso ideale.
Travelendere+ ofre all'iutente un insieme di percori in ordine dal più adatto al meno che l'utente può decidere di seguire. 
John sceglie uno tra i percorsi proposti e viene salvato dall'app.

Scenario 3  (riguardare)
-----------
Jennifer inserisce un appuntamento in un qualsiasi giorno.
Travelander+ verifica la prefenza di una sovrapposizione e quindi l'app genera un segnale di warning sul giorno relativo.
Jennifere a quel punto premendo sul segnale puo decidere se modificare i dati di uno degli appuntamenti in modo da evitare sovrapposizioni oppure eliminare gli appuntamenti ritenuti da lei meno importnati, sempre in modo da evitare sovrapposizioni.

Scenario 4
-----------
Riccardo aveva inserito un appuntamento scegliendo un itinerario che prevedeva un vioggio in bicicletta.
l'applicazione il giorno prima dell'appuntamento dopo aver fatto un controllo delle condizioni meteo scopre che per il giorno succesivo è prevista pioggia.
Sapendo che riccardo ha selezionato un itinerarrio che prevede la bicicletta manda una notifica chiedendo se, data la possibile pioggia, Riccardo vuole cambiare itinerario e/o mezzo di trasporto offrendogli delle possibili alternative.

Scenario 5
-----------


Alloy
=====

Effort Spent
============

References
==========