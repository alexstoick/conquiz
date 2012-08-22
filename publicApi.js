var roomsAvailable=5; // TREBUIE MODIFICAT


var UIHandler ;
var loginHandler ;
var roomHandler ;
var mapHandler ;
var gameHandler;

$(document).ready(function() {
	UIHandler = new UIClass() ;
	loginHandler = new LoginClass ( ) ;
	roomHandler = new RoomClass ( ) ;
	mapHandler = new MapClass ( ) ;
	gameHandler = new GameModel ();
	mapHandler.construct ( ) ;
	UIHandler.construct ( ) ;
	roomHandler.construct ( ) ;
	loginHandler.construct ( ) ;
});

function setPaper ( paper )
{
	mapHandler.paper = paper ;
}

function loggedIn ( user )
{
	loginHandler.username = user ;
	console.log ( "publicAPI " + loginHandler.username ) ;
	connect ( ) ; //from javaUtils
	//GET No of avaialble ROOMS

	//get list of users in no room: UIHandler.UIAddFreeUsers ( users ) ;
}

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
	socket.emit ( 'answer' , roomHandler.chosenRoom , loginHandler.username , answer , time ) ;
}

function showPopUp (intrebare,answers) {
	//trebuie apelat ca sa apara intrebarea
	UIHandler.UIShowPopUp(intrebare,answers);
	gameHandler.answers.length = 0 ;
	gameHandler.times.length = 0 ;
	gameHandler.usernames.length = 0 ;
}

function clickedZone(zoneID){
	//se apelaza de fiecare data cand se clickuie o zona
	sendMapUpdate(zoneID);
}

function addAnswerToArray ( username , answer , time )
{
	console.log ( "added answer to array" ) ;
	gameHandler.usernames.push ( username ) ;
	gameHandler.times.push ( time ) ;
	gameHandler.answers.push ( answer ) ;
	console.log ( gameHandler.usernames[0] , gameHandler.times[0] , gameHandler.answers[0] ) ;
	if ( gameHandler.usernames.length == 2 )
	{
		gameHandler.findTheWinner ( gameHandler.answers ) ;
	}
}

function newRoomAdded ( roomID )
{
	console.log ( "emmited event" ) ;
	socket.emit ( 'newRoom' , roomID ) ;
}

function selectedRoom ( roomId ){
	//se apelaza de fiecare data cand se alege o camera
	roomHandler.chosenRoom=roomId;
	connectToRoom ( ) ;
}

function addUsers ( users )
{
	//trimiti un Array
	console.log ( users ) ;
	roomHandler.addUsers(users);
}

function removeUser ( user )
{
	roomHandler.removeUser(user);
}

function receiveAnswer( answers)
{
	//doar 3
}

function getUsersFromRoom ( roomID )
{
	getUsersFromServer(roomID) ;//java servlet
}

function updateUsersTooltipForRoom ( roomID , users )
{
	UIHandler.UIAddUsersForRoomTooltip ( roomID , users);
}