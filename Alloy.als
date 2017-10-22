open util/integer
open util/boolean


//Signatures
sig User{
	events: set Event,
	username:one String,
	prohibitedVehicles:set Vehicle
}

sig Vehicle{}

sig Event{
	//?? ho dovuto fare questa cosa di mettere una data perche' il tipo Time di alloy non ha una 
	//?? relazione d'ordine(o io non sono riuscito a generarla) 
	//??quindi non potevo fare i confronti >,< e quindi ho usato interi senza dividere 
	//??data da giorno per ora
	initialTime:one Date,
	finalTime:one Date,
	position:one Position,	
	warning:one Bool
}

sig Date{
	time:one Int
}

sig Position{
	latitude:one Int,
	longitude:one Int
}

sig Path{
	startTime:one Date,
	endTime:one Date,
	vehicles:set Vehicle	,
	startPosition:one Position,
	endPosition:one Position
}

//Facts

//events must have a user
fact creatingEvents{
all e:Event | some u:User | e in u.events
}

//an event can't end before start
fact timeLinearity{
	all e:Event | e.initialTime.time<e.finalTime.time
}

//not ugual usernameusername
fact usernameUnique{
	no disjoint u1,u2:User | u1.username=u2.username
}

//not ugual date
fact dateUnique{
	no disjoint d1,d2:Date | d1.time=d2.time
}

//event without sovrapposition mustn't gen warning
fact warningGen1{
	all disj e1,e2:Event|e1.warning=False implies
						//there aren't sovrappositions
						(e1.finalTime.time<=e2.initialTime.time or
						e1.initialTime.time>=e2.finalTime.time)and
						//also e2 not has warning
						e2.warning=False					
}

//event without sovrapposition must gen warning
fact warningGen2{
	all disj e1,e2:Event|e1.warning=True implies
						//there are sovrappositions
						e1.finalTime.time>e2.initialTime.time and
						//also e2 has warning
						e2.warning=True					
}

//unreachable events gen warnings
fact unreachableEvents{
	//non sono sicuro sia giusta
	some e:Event| e.warning=True implies
	(some p:Position,e:Event,u:User | choosePath[p,e,u])
}


//Assertion

//add and dell same events gen same user's set of events
assert addAndDel {
	all u1,u2,u3:User,e:Event |
	not e in u1.events and addEvent[u1,u2,e]
					and delEvent[u2,u3,e] implies
	u1.events=u3.events	
}


//Dynamic model

//the algorithm choose the paths from start position to event position 
pred choosePath[p1:Position,e:Event,u:User]{
	some ph:Path |
			//start and arrive in the right position
			ph.startPosition=p1 and ph.endPosition=e.position and
			//arrive at event with no delay
			ph.endTime.time<e.initialTime.time and
			//path not has prohibited veicle
			ph.vehicles not in u.prohibitedVehicles			
}

//addiction of event
pred addEvent[u1,u2:User,e:Event]{
	u2.events=u1.events+e
}

//delection of event
pred delEvent[u1,u2:User,e:Event]{
	u2.events=u1.events-e
}

pred show{
	#User.events>=3
}

run choosePath for 6 but exactly 1 User, exactly 1 String,3 Event, exactly 1 Path
//check addAndDel
//check bestPath
