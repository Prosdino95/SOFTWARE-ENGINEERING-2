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

*The main functions offered by Travlendar+ are substantially three:*
    * **Calendar** App purpose functions
    * **Maps Geolocalization** App functions
    * Customizable **Personal User** page and preferences functions.
     
*To make more readable the document, we divided the main Goals of Travlendar+ for these category*
 
 The Goals are:
 
------------------
Calendar Functions
------------------

 #) Show a personal calendar of 'Events' submitted.
 #) Let the User submit 'Events' on the calendar to plan his/her future appointments.
 #) Notify the User when the 'Event' is about to start and she/he needs to leave to be in time to the 'Event Meeting Location'.
 #) Let the User to create 'Flexible Event' for everyday short and low priority appointments.
 #) (**optional**)  
 
::

 1) See a personal caledar of events.
 2) Allows the registration of an "Event" by specifying a date, a "Starting Location" and a "Meeting Location"
 3) Notify the user of the start of an event ("Alarm" function).
 4) (Facoltativo?) Allow modification/deletion of events.
 5) Let the User to create 'Flexible Event' for everyday  short and low priority appointments.

------------------------------
Maps Geolocalization Functions
------------------------------
 #) Geolocalize the gps coordinates of the "Starting Location" and the "Meeting Location" on a virtual map.
 #) Calculate a list of possible shortest routes from a "Starting Location" and the "Meeting Location" with the 'Vehicles' available.
 #) Calculate the Extimation time of arrival at the destination for each route.
 #) Let the User choose a route from the list of "Best Route" provided by the algorithm
 #) Let the User modify the "Best Route" adding 'Costraint' for 'Intermidiate Locations', preferred 'Vehicle', max distance with a specified 'Vehicle' or max time on a specified 'Vehicle'.
 #) Consider on the possible 'Vehicle' avaible all the public transports of the city, railway stations, aeroports, train stations, car and bike sharing systems, bike, car and by foot.
 #) notify with a Warning message if the 'best Route' chosen by the User is not good and he/she may arrive on late at the 'Meeting' because of its Extimation Time too long.
 #) Suggest a "Best Route" to the User with a 'Vehicle' which is appropriate for the day time of the appointment, the geographical location, the type of the meeting and the weather.

 1) Identify the starting and meeting location on a satellite map via gps technology.
 2) Identify a list of shortest itineraries to get to the meeting location from the starting location based on different methods of transportation available.
 3) Segnalare il "Best Route" all'utente. (L'itinerario piu' breve possibile indipendentemente dai "Costraint" inseriti dall'utente).
 4) Inserire tra i vari mezzi di trasporto disponibili da scegliere eventuali mezzi di trasporto pubblici disponibili in citta' e stazioni di bike e car sharing.
 5) Permettere all'utente la modifica dell'itinerario inserendo delle "Itermidiate Location" (tappe intermedie) o delle preferenze su mezzi di trasporto in particolare tratte del viaggio ("Costraint").
 6) Addattare il "Best Route" alle condizioni metereologiche del giorno.
 7) (Facoltativo?) Notificare all'utente la presenza di un itinerario piu' breve da quello impostato tramite i "Costraint"
 8) Segnalare tramite un "Warning" all'utente se l'itinerario scelto dalla lista di quelli possibili potrebbe farlo arrivare in ritardo all "Meeting".

------------------------------
User Profile Manager Functions
------------------------------
 
 #) Let the User to sign in to the Service filling an online form.
 #) Let the User to login to their personal User page and update their informations.
 #) Let the User fill their 'Vehicle' preferences or dislike for best result on Algorithm 'Best Route' calculus.
 #) Let the User buy online tickets for the majority of the public transports involved on the 'Best Route' chosen.
 #) (**optional**)  Let the User modify settings for the Algorithm 'Best Route'such activating 'Green Mode' or enabling options like "No traffic lighters", "No Schools at 16:00", "Show Autovelox".
 #) (**optional**) Let the User submit on his/her page the availability of public transports subcription, driver licence, coupons for special transports for best result on Algorithm 'Best Route' calculus. 
 
::

 1) Permettere la registrazione al servizio tramite numero di telefono, email, nome, cognome e codice fiscale. (cf per patente)
 2) Permettere il login a Travlendar+ tramite indirizzo https www.travelendar.com su Broswer o tramite client app da GooglePLayStore e IOs.
 3) Update, modifica e remove dei dati personali sulla pagina utente.
 4) Gestione delle preferenze dei veicoli per itinerari brevi.
 5) (Facoltativo) Impostazione preferenze algoritmo di calcolo dell'itinerario ("GreenMode Activated","No traffic lighters", "No Schools at 16:00", "Show Autovelox")
 6) (Facoltativo) Permettere l'inserimento di abbonamenti per mezzi di trasporto, coupon o dati su patente.
 7) The User can buy online a ticket for a pubblic transportation suggested on the "Best Route".

Scope
-----

asffasdfasdf
 
 
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

1) Schedule appointments

2) Check transportation availabilities

3) Avoid delays

  - 3.1 have a "buffer time" (to factor in possible delays inherently derived from the transportation used)

4) Use various APIs with eterogeneous protocols to check for the various transports

  - 4.1 transportation and user profile check(history, preferences etc...)
  - 4.2 identify the best transportation method(s)

    - 4.2.1 discriminate based on time/cost/walking time

    - 4.2.2 user preferences (learning system)

    - 4.2.3 weather conditions

    - 4.2.4 appointment type

    - 4.2.5 neighboring appointments (e.g. a car-only destination will make the options for the other appointments discriminate towards cars rather than public transport)

    - 4.2.6 warn the user about itinerary changes.

5) Send warnings to the user based on various events

  - 5.1 creazioni di meeting irraggiungibili in tempo (??)

  - 5.2 Lunch (see:8.5)

6) Users can create meetings

7) Users preferences

  - 7.1 enable/disable types of transportations

  - 7.1.1 have preferences and forbidden types of transportation

  - 7.2 insert rules regarding individual transport types (e.g. time, distance)

  - 7.3 Carbon footprint discriminance

  - 7.4 ability to insert montly/yearly passes

8) Fexible Lunch

  - 8.1 allow optional suppression

  - 8.2 have a timeframe for each day

  - 8.3 customizable length

  - 8.4 automatic rescheduling in case of conflicting appointments

  - 8.5 generate a warning in case lunch is unattendable

  - 8.6 possibility to add other types of reoccurrent events (such as breaks)

9) ticket purchase

Overall Description
===================

Product Perspective
-------------------

Product Functions
-----------------

User Characteristics
--------------------

*Travelendar+ was made to aid organizations to effectively plan appointments throughout the year for its registered users. Its simplicity makes it versatile and easily accessible for all users.*

There are 3 user categories that travelendar is aimed at:
 - *Business men*
 - *Travelers*
 - *City Lovers*

*Businessmen* are all individuals that use the app for business appointments and meetings. Their behaviour will be characterized by:
 #) submit rate of meetings per week and month *very high*.
 #) meetings location *very distant* and often *different*.
 #) *high* interest on arriving on time at meetings
 #) *high* interest on buyng via internet tickets for the vehicle
 #) *medium* interest on additional feature, such as interconnecting other technologies for a better organization (email notifiation, smart alarm, phone and/or smart clock notifications...)
 #) *minimal* interest on user interface and graphical feature
 #) *vehicle preferences* are public transport for city meetings or *train* and *airplane* for outside city meetings.
 #) Long term users (will have a prolonged use the app consistently)
 
*Travelers* are those who use the app for planing their trip or work conference. Their main goals are to reach airports, hotels, train stations or museums. Their behaviour will be:
 #) submit rate of meetings per week and day *very high*
 #) Two important 'Event' which are the 'Departure' and the 'Arrival' Event. For these events the interest on arriving on time is *crucial*.
 #) Several intermediate 'Event' on the week between the 'Arrival' and the 'Departure'. For these event the interest on arriving on time is *medium* since most of the locations are museums, restaurants, hotels.
 #) The 'Routes' have often intermediate 'locations' and the 'Vehicle' used is often 'By Foot'.
 #) Sometimes 'Event' planned for a day can be modified and switched with other 'Event' scheduled for the next days.
 #) *medium* interest on graphical feature and user interfaces. The 'Events' could have useful verbose information attached to them.
 #) Short term users. Once the trip is over, they will probably uninstall the Application.
 
*City Lovers* are people that will use the application to schedule free time activities. They are tech savvy enthusiast who needs to annotate all their appointment during the week and are often curious of the limit of the Application. For example their 'Events' are linked with their social activities like going to the movies with friends or going shopping with their girlfriends, or sport activities, like going to the gym or jogging on Sunday morning. So their 'Behaviour' is characterized by:
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

1. The Algorithm will take into account statistics from the user to determine its walking pace and better optimize the algoritm.
2. The Algorithm doesn't take into account for a 'Vehicles' various ground impacts that could slow down the walk, such as stairs, rough terrain, long street climbs. 
3. The Algorithm doesn't take into account the traffic jams on that street. (DA DISCUTERE)
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

--------------
User Interface
--------------

*UI and Graphical features are suited for all kind of users. It is essential a simple and immediate design which is characteristic of nowday applications.*

------------------
Hardware Interface
------------------

------------------
Software Interface
------------------

-----------------------
Communication Interface
-----------------------


Functional Requirements
-----------------------

Performance Requirements
------------------------

*Performance for Apple iOS and Android App*:

#) Battery Consuption should be not greater than 0.96mah (non consuma piu' di Pokemon GO) - come requirement mi sembra difficile da ottenere, dati vari problemi tecnici (es. scheduling)
#) 'Best Route' Calculation time should be not graeter 2.0 seconds
#) 'Alarm' function ('Event-reminder') should be configurable to be active even if the cellphone is Power Off. - tech difficulty to implement
#) The graphical effects of the 'Virtual Map' should not slow down the runtime execution of the App.
#) Memory Storage Consumption of the application should not be greater than 128MB.

*Performance for Browser Application*:

#) Loading of the Home Page should be as fast as possible. - not a requirement
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

Scenarios
=====================

Scenario 1
-----------
Karla is a businesswoman that needs an app to help her manage all her appointments; following her friend's advice she downloads the Tavelendar+ app.
Karla registers herself onto the app by inserting her personal data (username, password, mail) and her transportation preferences.
The app sends an email with a verification link in order to verify the existance and ownership of the email address.
After Karla presses the link inside the email the registration process will be completed, she will be shown a quick tutorial on how to use the app and  add/change her preferences. From this point onward she can start using Travelendar+.

Scenario 2
-----------
John wants to add an appointment to a day that has none. After pressing on the 'add appointment' button, a form is presented to him asking date, time, place and name.
Moreover the application asks the starting position by offering a choice between the current position, from a list of saved locations or the position of the preceding appointment.
Afterwards travelendar+ checks if there are any overlaps with other appointments and the possibility of having lunch given the current schedule status. If no overlap is found then it computes the optimal paths to reach the appointment location, presenting a ranked list of alternatives.
John picks one of the proposed itineraries, which is saved by the app.

Scenario 3  (riguardare)
------------------------
Jennifer inserisce un appuntamento in un qualsiasi giorno.
Travelander+ verifica la prefenza di una sovrapposizione e quindi l'app genera un segnale di warning sul giorno relativo.
Jennifere a quel punto premendo sul segnale puo decidere se modificare i dati di uno degli appuntamenti in modo da evitare sovrapposizioni oppure eliminare gli appuntamenti ritenuti da lei meno importnati, sempre in modo da evitare sovrapposizioni.

Scenario 4
-----------
Riccardo has inserted an appointment that involves using a bicycle.
The app check the day previous to the appointment weather condition, discovering that rain is forecasted. Knowing that the itinerary contains a part on bicycle, it sends a notification to Riccardo asking whether or not he wants to change che itinerary/transportation mean, offerring him alternatives.

Scenario 5
-----------
Chiara added its lunch time between 12:00 and 2:30, with a duration of 45 min, during the configuration of the app. Chiara knows that Travelendar+ will automatically add a 'Lunch' event to each day's timetable and, if needed, will shift the event in case of overlap.
One day Chiara adds enough appointments to make it unfeasible to have lunch, due to this the app will generate a warning, giving Chiara the choice to reschedule the appointments or to skip lunch.

Scenario 6 (scritto male)
---------------------------
Alex e' un uomo che tiene particolarmente all'ecologia, essendo molto impegnato decide di utilizzare Travelander+ per schedulare i suoi appuntamenti.
Alex ha scelto Tralevander+ perche' sa che l'applucazione e' ingrado di calcolare il migior percorso per raggiungere la destinazione in modo tale da rispettare gli orari e le sue perferenze, tra di esse infatti Alex ha inserito il fatto di voler tenere bassa la sua impronta ecologica.
Travelander+ provvedera' a calcolare i percorsi di Alex in modo che siano piu' Green possibile.

Scenario 7
-----------
Newt uses Travelendar+ to schedule a series of out of town appointments. After having picked the best path, the app offers Newt the option to directly purchase the tickets needed for the trip.

Alloy
=====

Effort Spent
============

References
==========
