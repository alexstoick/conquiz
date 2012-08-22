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

function setPaper ( paper , upperText)
{
	mapHandler.paper = paper ;
	mapHandler.upperText=upperText;
}

function loggedIn ( user )
{
	loginHandler.username = user ;
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
	if(gameHandler.userToSelect==loginHandler.thisIsUserNo){
		sendMapUpdate(zoneID);
	}
}

function addAnswerToArray ( username , answer , time )
{
	var thisIsUserNumber;
	var connectedUsers=roomHandler.GET_connectedUsers();
	for(var i=0;i<4;i++)
		if(connectedUsers[i]==username)
			thisIsUserNumber=i;
	gameHandler.usernames.push ( username ) ;
	gameHandler.times.push ( time ) ;
	gameHandler.answers.push ( answer ) ;
	gameHandler.userNumber.push ( thisIsUserNumber );
	console.log ( gameHandler.usernames[0] , gameHandler.times[0] , gameHandler.answers[0] ) ;
	if ( gameHandler.usernames.length == 2 )
	{
		gameHandler.findTheWinner ( gameHandler.answers ) ;
	}
}

function newRoomAdded ( roomID )
{
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