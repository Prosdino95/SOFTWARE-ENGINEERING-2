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
 3) Notificare l'inizio di un evento all'utente ("Alarm" function).
 4) (Facoltativo?) Permettere la modifica/eliminazione degli "Eventi".
 5) Let the User to create 'Flexible Event' for everyday  short and low priority appointment.
 
 **Maps**
 
 1) Identificare la "Starting Location" e il "Meeting Location" su una mappa satellitare virtuale tramite tecnologia gps.
 2) Individuare una lista di itinerari piu' brevi possibili per raggiungere la "Meeting Location" dalla "Starting Location" con diversi mezzi di trasporto disponibili.
 3) Segnalare il "Best Route" all'utente. (L'itinerario piu' breve possibile indipendentemente dai "Costraint" inseriti dall'utente).
 4) Inserire tra i vari mezzi di trasporto disponibili da scegliere eventuali mezzi di trasporto pubblici disponibili in citta' e stazioni di bike e car sharing.
 5) Permettere all'utente la modifica dell'itinerario inserendo delle "Itermidiate Location" (tappe intermedie) o delle preferenze su mezzi di trasporto in particolare tratte del viaggio ("Costraint").
 6) Addattare il "Best Route" alle condizioni metereologiche del giorno.
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
 7) The User can buy online a ticket for a pubblic transportation suggested on the "Best Route".
 
 
Definitions
-----------
* *Alarm*:
* *Best Route*:
* *Costraint*:
* *Event*:
* *Green Mode*:
* *Itermidiate Location*:
* *Meeting Location*:
* *Route*:
* *Starting Location*:
* *Vehicle*:
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

*Travelendar+ e' pensata per aiutare ad organizzare e pianificare in modo efficiente gli impegni settimanali mensili e annuali dei suoi utenti registrati. La sua semplicita'la rende versatile e facilmente accessibile a ogni tipologia di utente.*

Le categorie di utenti principali a cui si rivolge Travelendar+ sono:
 - *Business men*
 - *Travelers*
 - *City Lovers*

*Business men* sono tutti gli utenti che installerano l'applicazione principalemente per annotare appuntamenti di lavoro e meeting importanti tra partners. Il loro behaviour sara' percio' caratterizzato da:
 #) submit rate of meetings per week and month *very high*.
 #) meetings location *very distant* and often *different*.
 #) *high* interest on arriving on time at meetings
 #) *high* interest on buyng via internet tickets for the vehicle
 #) *medium* interest on addictional feature, such as interconnect other technologies for a better organization (email notifiation, smart alarm, notifiche sul palmare o sullo smart clock...)
 #) *minimal* interest on user interface and graphical feature
 #) *vehicle preferences* are public transport for city meetings or *train* and *aeroplane* for outside city meetings.
 #) Long term users (utilizzeranno piu' volte e spesso l'app anche nel lungo periodo)
 
*Travelers* sono tutti coloro che si affidano all'app per organizzare e pianificare il proprio viaggio turistico or convegno di lavoro abroad. Le loro attivita' sono per lo piu' raggiungere alberghi, aeroporti stazioni, treni o musei di citta' d'arte. Il loro behaviour sara' caratterizzato da:
 #) submit rate of meetings per week and day *very high*
 #) Two important 'Event' which are the 'Departure' and the 'Arrival' Event. For these events the interest on arriving on time is *crucial*.
 #) Several intermediate 'Event' on the week between the 'Arrival' and the 'Departure'. For these event the interest on arriving on time si *medium* and for the most of the locations are museums, restaurants, hotels.
 #) The 'Routes' have often intermediate 'locations' (tappe intermedie) and the 'Vehicle' used is often 'By Foot'. 
 #) Sometimes 'Event' planned for a day can be modified and switched with other 'Event' scheduled for the next days.
 #) *medium* interest on graphical feature and user interfaces. Sometimes they could think usefull put verbose descriptions on 'Events'.
 #) Short term users. When they will end the trip, they will probably disinstall the Application.
 
*City Lovers* (Faggots) are people that will use the application to schedule all the things he/she does in the free time. They are technology enthusiast or smart guys who needs to annotate all his/her appointment during the week and are often curious of the limit of the Application. For example their 'Events' are linked with their social activities like going to the cinema with friends or going shopping with the girlfriend, or are sport activities, like going to the gym or jogging on Sunday morning. So their 'Behaviour' is characterized by:
 #) submit rate of meetings per week and day *very high*
 #) *low* interest on arriving on time on their appointments.
 #) *high* interest on user interface and additional feature, like vocal message warning.
 #) *high* rate of modified 'Event'
 #) *high* interest on the 'Personal Profile' page of the App or feature like adding secondary information, uploading profile images, recording all the kilometers of his/her 'Routes' and all the location visited.
 #) *high* interest on 'Green Mode'
 #) *Vehicle* preferences are often bike, public transports and car/bike sharing.
 #) They are *often* young age users, university students and sportmen.
 #) *High* interest on Technical performance of the App, like memory storage consuption, cpu memory usage, heat burst.
 #) *Short* term and *occasional* user
 
Assumptions
-----------

*Algorithm 'Best Route' Calculation Assumptions*:

1. The Algorithm with the 'By Foot' 'Veichle' assume that the user can walk with the standard average walk speed. 
2. The Algorithm doesn't take into account for a 'By Foot' 'veichle preference' various ground impacts that could slow down the walk, such as road stairs, rough terrain, long street climbs (salite). 
3. The Algorithm doesn't take into account the traffic exstimation on that street. (DA DISCUTERE)
4. The Algorithm doesn't take into account for a 'By Foot' vehicle preference if the sidewalk is crowded in that day and time which could slow down the walk of the user.(example: Cso BuonosAires)
5. The Algorithm doesn't take into account for a 'By foot' or a 'Bike' It avoids to track the route across a park or a green area on the map if it is not specified by the user.

*Query external DBs Assumptions*:

1. The Application can access informations on:
    -Local public transportations timetables such tram, bus, Coach.
    -Positions and availability of Car and Bike sharing *private* and public service stations
    -Positions of public transportations stops and stations like railway stations, train stations, bus stops.
2. The Application can redirect the user during the navigation on secure Payments service page allowing the user to buy tickets online for public transports.

Specific Requirements
=====================

External Interface Requirements
-------------------------------
In these section it will presented in the details all the specific interface of Travelandar+.

**User Interface**

UI and Graphical features are suited for all kind of users. It is essential a simple and immediate design which is characteristic of nowday applications.

**Hardware Interface**

**Software Interface**

**Communication Interface**

Functional Requirements
-----------------------

Performance Requirements
------------------------

*Performance for Apple iOS and Android App*:

#) Battery Consuption should be not greater than 0.96mah (non consuma piu' di Pokemon GO)
#) 'Best Route' Calculation time should be not graeter 2.0 seconds
#) 'Alarm' function ('Event-reminder') should be configurable to be active even if the cellphone is Power Off.
#) The graphical effects of the 'Virtual Map' should not slow down the runtime execution of the App.
#) Memory Storage Consumption of the application should not be greater than 128MB.

*Performance for Browser Application*:

#) Loading of the Home Page should be as fast as possible.
#) Javascript Animations should be performed after that the login bar is loaded.

Design Constraints
------------------

--------------------
Standards Compliance
--------------------
The software will use the following standards when deployed:

- JavaEE for the server backend
- utilize a JSON REST API for communication between the backend and frontend
- Google Maps library for the 'Virtual Map' creation

--------------------
Hardware Limitations
--------------------
The mobile app will have the following hardware limitations:

- Android or iOS operating system
- Semi-continuous [*]_ internet access (3G/4G/WiFi)
- GPS

.. [*] Semi-continuous meaning that the system can loose connection briefly but overall needs to be able to access the internet on a reoccurring basis

--------------------------
Mobile Systems Limitations
--------------------------

#) Android Mobile Systems should have installed the latest Google Play Service avilable.

-----------------
Other Constraints
-----------------
Since the system relies on confidential information in order to work the system will need to store the data securely, especially regarding saved addresses. None of the information provided by the user will be used for commercial purposes.

Software System Attributes
--------------------------

-----------------
Reliability	
-----------------

*The main focus is on the 'Best Route' Algorithm and the calcolation of the 'Expected time' of Arrival at the 'Meeting Location'.*

 #) 'Best Route' Algorithm should be tested and have a coverage greater than 80%
 #) 'Expected time' of arrival at the 'Meeting Location' should be have a relative error of 5% of the time exstimated.
 #) If the user does not have internet connectivity on the mobile, he/she still could open the app and access to 'Calendar' function and view the meetings submitted.
 #) (FACOLTATIVO?) The 'Expected time' of arrival at the 'Meeting Location' should be updated constantly in case of changing of weather forecast or unexpected event (public transport goes off...)
 

-----------------
Availability	
-----------------

*Travlendar+ helps its users to schedule their personal life appoinment and shold be as much open and accessible as possible even with the absence of Internet*

#) The 'Calendar' function should be accessible on the App even if the Mobile is in Offline Mode.
#) A pdf description of the 'Best Route' can be downloaded on the Travelndar+ Broswer.
#) (FACOLTATIVO) User can import a 'Calendar' configuration package and simply update his/her personal schedule of appointments.

-----------------
Security	
-----------------

*Travlendar+ manages personal informaton of the user registered. For this reason it is very important the Security issue and some achievements have to be taken.*

#) https protocol
#) Cryptograpy
#) ...

-----------------
Maintainability
-----------------

-----------------
Portability
-----------------

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