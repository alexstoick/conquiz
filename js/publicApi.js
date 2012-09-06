var roomsAvailable=5; // TREBUIE MODIFICAT
var colors=['#dff0d8','#f2dede','#d9edf7','#c09853'];

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
	$('.roomSelect').hide();
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
	gameHandler.userNumber.length = 0 ;
}

function clickedZone(zoneID){
	//se apelaza de fiecare data cand se clickuie o zona
	if(gameHandler.userToSelect==loginHandler.thisIsUserNo && gameHandler.currentlySelecting!=-1){
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

function gameStateReady ( )
{
	socket.emit ( 'showQuestion' ) ;
}

function updateMap ( id , player )
{
    var fillColor = "#000000" ;
    var i ;
    var players = roomHandler.GET_connectedUsers() ;

    for ( i = 0 ; i < 4 ; ++ i )
        if ( player == players[i] )
            fillColor = colors[i] ;
    if ( mapHandler.zoneIsUsed[id] )
		mapHandler.upperText.attr('text','Select another zone - this is already owned by a player' );
   else
   {
		mapHandler.paper.getById ( id ).attr ( {fill:fillColor} ) ;
		gameHandler.nextUserToSelectZone () ;
		mapHandler.zoneIsUsed[id] = true ;
	}
}
