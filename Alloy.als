open util/integer
open util/boolean


//Signatures

sig User{
	events: set Event,
	email:one String,
	prohibitedVehicles:set Vehicle
}

sig Vehicle{}

sig Event{
	initialTime:one Date,
	finalTime:one Date,
	position:one Position,	
	warning:one Bool,
	paths:set Path
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

//an event and a path can't end before start
fact timeLinearity{
	all e:Event | e.initialTime.time<e.finalTime.time
	all p:Path | p.startTime.time<p.endTime.time
}

//email are unique
fact emailUnique{
	no disjoint u1,u2:User | u1.email=u2.email
}

//date are unique
fact dateUnique{
	no disjoint d1,d2:Date | d1.time=d2.time
}

//single event not gen warning
fact warninGen1{
	all u:User| #u.events=1 implies
				u.events.warning=False
}

//event without sovrapposition mustn't gen warning
fact warningGen2{
	all disj e1,e2:Event|e1.warning=False implies
						//there aren't sovrappositions
						(e1.finalTime.time<=e2.initialTime.time or
						e1.initialTime.time>=e2.finalTime.time)and
						//also e2 not has warning
						e2.warning=False					
}

//event with sovrapposition must gen warning
fact warningGen3{
	all disj e1,e2:Event|e1.warning=True implies
						//there are sovrappositions
						e1.finalTime.time>e2.initialTime.time and
						//also e2 has warning
						e2.warning=True					
}



//Events have only possible path
fact eventPath{
	all e:Event | some u:User,p:Position| choosePath[p,e,u]
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

pred normalSchedule{
	#User.events>=2
	all e:Event | e.warning=False
}

pred warningSchedule{
	#User.events>=2
	some e:Event | e.warning=True
}

pred show{}


run normalSchedule for 5 but exactly 1 String
run warningSchedule for 5 but exactly 1 String
run choosePath for 4 but 1 User,2 Position,2 Vehicle, exactly 1 String, 1 Event, 2 Path
check addAndDel
run show  for 4 but 2 Position, exactly 1 String,exactly 1 Event,2 Path

