#Functionalities

## Concept
    
The main idea of our Travlendar+ system was to develop a multi tier architecture as simple as possible.
 
There were a lot of feature, functions and work to do, so the Semplicity was our key value.
A simple systems implies maintanability, better team coordination of the work, better result
   
Also we have to focused on the three main functionality:
    
* Calendar application functionality
* Map application which could calculate a best path
* Personal User login/registration system
    
So Substantially we can reassume  

##Calendar

* Basic function of adding deleting, modifing an event.

* Follow some Time Standard rapresentation (iso8601, unix timestamp)

* Show to user the event submitted in a UI friendly

## Map 

* calculate best path from a starting location to a ending location

* manage geographical coordinates data
 
## User

* manage personal user data

## Other Specific function
* manage User preferences
* best path on preference
* 

# UI

on Travlendar+ we wanted to focus on the Graphics aspects of the client application to have the best result as possible.
 So we decided on an immediate Design as an Every Day application.
On this work we focused on the Design Material guidelines which is widely used nowday on Mobile, Web Based applications and Website.

The Idea was to have the same Graphical Layout on every type of different clients so to have the same usability and the same
general appearance.

Also we wanted to garantee an high customizability of our application with a personal User page in which can upload secondary and optional information data.

## MockUp

We wanted do divide the navigation on the application on a main section page and a sidebar menu. Nothing special is a simple paradigm on nowdays application. 

* Simple buttons fixed on the outer layer
* Self explicative icons.
* Personal page in which the user can upload, optional personal information.


# Javascript

Travlendar was projected to be easy, simple, UI friendly, client-server application and cross-platforming.

So we followed nowday's fashion and we decided to use Html, Css And Javascript to handle the Client side and the WebInterface of our Travlender.

And this helped a lot!

First of all using Javascript/Html/Css it is possible to achieve the Cross Platforming goal! 

thanks to OpenSource libraries like Electron and Cordova you can reuse your
javascript code to build a complete android/ios/mobile application without changing a line.

also javascript programmer comunity is one of the biggest nowday and there is a vast library
and API support which can let you create a full working web application with ease.
This let us reach goals with easy and effectiveness.

for example the most usefull api and library were:

* FullCalendar API. For Calendar Functionalities
* OpenLayers v3 API. For Maps Functionalities
* Material Design lite. For Material Design GUI components support

Also thanks to JQUERY we could implement ModelViewControl and Event-Based design paradigm. 

#How it Works

Html documents are the static layout page which works like a reactive gui.

JQuery and javascript code watch the html and when user makes some particular actions, it triggers execution of code.

The tasks assigned for javascript frontend code are only two:

*modify the layout, changing some html attribute or creating a new child element for example
*start an Ajax calls to the endpoint server to perform a GET or a POST HTTP request.

also is widely use CSS. 
*adjust html layout
*blink or fade animation
*make responsive the html. 

This is particular important and deicate for a crossPlatforming application which teorically has to support 320-400px to 4K display resolution!!!

Other pro of Javascript is that is really simple write code with its dinamical type system. Also readability is great and rarely are exceeded the 100 lines of code of a js script


#Testing

Testing it was not simple. After trying to use QUnit library which let you write unit
test into javascript code we decided to use other apporoach. This is because we used a
lot of JQuery code which it is triggered by user events (like button clicks, writing input
field...) which is intestable in standard ways. So decided to use Test Automation
technique, which is great and widely used for web application. After using for a while Phantomjs without
a good result we adopted Selenium Test Automation to reach our goals.

With Selenium is possible to create a 'Marionette', an artificial user with a programmated navigation behaviour.
Using some of them we could perform test to verify the expected update of html after ajax call or jquery modification.

In these case we decide to build a jar file and write some java code. This because Selenium Api supported it and we could easly use jUnit and other usefull java testing libriaries. Also it is quite handy start the sistematic test simply executing a jar file. 

When the test is finished it returns a clear html log file in which there are the test result and the log line printed.





