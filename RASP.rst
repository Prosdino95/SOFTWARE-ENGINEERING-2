IngSw2

Introduction
============

Purpose
-------
 *Travlendar+ e' un sistema di gestione di appuntamenti capace di schedulare in modo efficiente la calendarizzazione degli impegni dell'utente. Grazie all'applicazione e' possibile calcolare in anticipo il tempo stimato per raggiungere il luogo di incontro in funzione del mezzo di trasporto scelto dall'utente.* 

 *L'applicazione e' pensata non solo per organizzare viaggi interregionale ma anche per gli impegni personali o di lavoro dell'utente. L'utente una volta registrato potra' impostare le sue preferenze sui mezzi di trasporto per raggiungere la location dell'appuntamento. In funzione alla scelta dell'utente l'applicazione potra' suggerire diversi itinerari con diverse stime di tempo per oguna di esse.* 

 *Travlendar+ si propone al pubblico come una mobile applicazione web based capace di migliorare la vita quotidiana dei suoi utenti in modo semplice, sicuro ed efficiente.* 

Scope
-----
*GOALS:*

 **Calendar**

 
 1) Visionare un calendario online personale di "Eventi" registrati.
 2) Permettere la registrazione di un "Evento" specificando una data, una "Starting Location", una "Meeting Location" e una fascia oraria.
 3) Notificare l'inizio di un evento all'utente (Alarm function).
 4) (Facoltativo?) Permettere la modifica/eliminazione degli "Eventi".
 5) ...
 
 **Maps**
 
 1) Identificare la "Starting Location" e il "Meeting Location" su una mappa satellitare virtuale tramite tecnologia gps.
 2) Individuare una lista di itinerari piu' brevi possibili per raggiungere la "Meeting Location" dalla "Starting Location" con diversi mezzi di trasporto disponibili.
 3) Segnalare il "Best Itinerary" all'utente. (L'itinerario piu' breve possibile indipendentemente dai "Costraint" inseriti dall'utente).
 4) Inserire tra i vari mezzi di trasporto disponibili da scegliere eventuali mezzi di trasporto pubblici disponibili in citta' e stazioni di bike e car sharing.
 5) Permettere all'utente la modifica dell'itinerario inserendo delle "Itermidiate Location" (tappe intermedie) o delle preferenze su mezzi di trasporto in particolare tratte del viaggio ("Costraint").
 6) Addattare il "Best Itinerary" alle condizioni metereologiche del giorno.
 7) (Facoltativo?) Notificare all'utente la presenza di un itinerario piu' breve da quello impostato tramite i "Costraint"
 8) Segnalare tramite un "Warning" all'utente se l'itinerario scelto dalla lista di quelli possibili potrebbe farlo arrivare in ritardo all "Meeting".
 9) ...
 
 **User Profile**
 
 1) Permettere la registrazione al servizio tramite numero di telefono, email, nome, cognome e codice fiscale. (cf per patente)
 2) Permettere il login a Travlendar+ tramite indirizzo https www.travelendar.com su Broswer o tramite client app da GooglePLayStore e IOs.
 3) Update, modifica e remove dei dati personali sulla pagina utente.
 4) Gestione delle preferenze dei veicoli per itinerari brevi.
 5) (Facoltativo) Impostazione preferenze algoritmo di calcolo dell'itinerario ("GreenMode Activated","No traffic lighters", "No Schools at 16:00", "Show Autovelox")
 6) (Facoltativo) Permettere l'inserimento di abbonamenti per mezzi di trasporto, coupon o dati su patente.
 7) ...
 
 
Definitions
-----------

* *Best Itinerary*:
* *Costraint*:
* *Event*:
* *Green Mode*:
* *Meeting Location*:
* *Starting Location*:
* *Warning*:

Requirements
------------

1) Schedule appuntamenti

2) Contollare possibilit?? trasporti

3) Evitare ritardi

  - 3.1 tempo "cuscinetto"(considerare eventuali ritardi non previsti dipendente dal mezzo)

4) Contattare varie API con protocolli eterogenei per poter controllare i vari tipi di trasporto ecc...

  - 4.1 controllo dei mezzi di trasporto e controlli profilo utente(storico, preferenze ecc...)
  - 4.2 identificare il/i miglior/i mezzo/i di trasporto disponibile

    - 4.2.1 tempo di trasporto considerando anche i pezzi "a piedi"/prezzo

    - 4.2.2 preferenze utente(sistema di "learning")

    - 4.2.3 condizioni metereologiche

    - 4.2.4 tipo di appuntamento

    - 4.2.5 altri appuntamenti in giornata(es. uno non pu?? essere raggiunto con i mezzi, verra suggerito di muoversi con mezzi propri tutta la giornata)
    
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

  - 7.4 possibilita' di inserire gli abbonamenti a trasporti ecc...

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

Scenario
=====================

Scenario 1
-----------
Karla e' una donna in piena cariera e ha bisogno di una app che la aiuti a gestire i suoi appuntamenti.
Seguendo i consigli di una sua amica decide di prendere il suo smartphone e scaricare l'app Travlender+.
Karla si registra all'applicazione inserendo i suoi dati (username, mail e pasword) e completando un form in cui vengoni chieste le preferenze sui mezzi di trasporto.
L'app manda una mail con un link per verificare la correttezza e l'esistenza dell'indirizzo mail inserito, dopo che Karla avra' premuto sul link la registrazione sara completate e Karla potra iniziare ad usare Travelender +.
L'applicazione al primo accesso show un breve tutorial sul suo utilizzo e su come modificare e/o aggiungere preferenze.

Scenario 2
-----------
John vuole aggiungere un nuovo appuntamento ad una giornata che non presenta altri impegni.
Dopo aver premuto sul pulsante aggiungi appuntamento si apre un breve form in cui vengono inserite data,ora,luogo,nome.
L'aplicazione chiede inoltre quale sara' la posizione di partenza(tra un location salvata, la posizione attuale o la posizione del precedente appuntamento).
Travelendere+ effetua un controllo per verificare eventuali sovrapposizioni con altri appuntamenti oppure l'impossibilita' di pranzare quel giorno e in caso di assenza di conflitti procede a calcolare il percorso ideale.
Travelendere+ ofre all'iutente un insieme di percori in ordine dal piu' adatto al meno che l'utente piu` decidere di seguire. 
John sceglie uno tra i percorsi proposti e viene salvato dall'app.

Scenario 3  (riguardare)
------------------------
Jennifer inserisce un appuntamento in un qualsiasi giorno.
Travelander+ verifica la prefenza di una sovrapposizione e quindi l'app genera un segnale di warning sul giorno relativo.
Jennifere a quel punto premendo sul segnale puo decidere se modificare i dati di uno degli appuntamenti in modo da evitare sovrapposizioni oppure eliminare gli appuntamenti ritenuti da lei meno importnati, sempre in modo da evitare sovrapposizioni.

Scenario 4
-----------
Riccardo aveva inserito un appuntamento scegliendo un itinerario che prevedeva un vioggio in bicicletta.
l'applicazione il giorno prima dell'appuntamento dopo aver fatto un controllo delle condizioni meteo scopre che per il giorno succesivo sara' prevista pioggia.
Sapendo che riccardo ha selezionato un itinerarrio che prevede la bicicletta manda una notifica chiedendo se, data la possibile pioggia, Riccardo vuole cambiare itinerario e/o mezzo di trasporto offrendogli delle possibili alternative.

Scenario 5
-----------
Chiara durante la configurazione dell'app aveva inserito come orario del possibile pranzo un intervallo che andava delle 12.00 alle 2.30 specificando una durata di 45min.
Chiara e' consapevole che Travelander+ considera in automatico 45 min di pranzo e sa inoltre che inserendo appuntamenti in quella fascia oraria l'applicazione provvedera' in automacoco a reschedulare il pranzo per evitare sovrapposizioni.
Un particolare giorno Chiara inserisce una serie di appuntamenti nela facia oraria del pranzo in modo da renderlo impossibile.
A quel punto l'app genera un warning e Chiara puo' decidere se reschedulare glia appuntamenti o saltare il pranzo.

Scenario 6 (scritto male)
---------------------------
Alex e' un uomo che tiene particolarmente all'ecologia, essendo molto impegnato decide di utilizzare Travelander+ per schedulare i suoi appuntamenti.
Alex ha scelto Tralevander+ perche' sa che l'applucazione e' ingrado di calcolare il migior percorso per raggiungere la destinazione in modo tale da rispettare gli orari e le sue perferenze, tra di esse infatti Alex ha inserito il fatto di voler tenere bassa la sua impronta ecologica.
Travelander+ provvedera' a calcolare i percorsi di Alex in modo che siano piu' Green possibile.

Scenario 7
-----------
Newt utilizza Travelander+ per schedulare una serie di appuntamenti fuori citta'.
Dopo aver scelto il percorso migliore l'applicazione permette ad Alex di acquistare direttamente i biglietti dei treni necesssari per raggiungere il luogo dell'appuntamneto.

Alloy
=====

Effort Spent
============

References
==========