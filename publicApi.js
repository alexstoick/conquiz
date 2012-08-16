var roomsAvailabe=5; // TREBUIE MODIFICAT

var UIHandler ;
var loginHandler ;
var roomHandler ;
var mapHandler ;

$(document).ready(function() {
	UIHandler = new UIClass() ;
	loginHandler = new LoginClass ( ) ;
	roomHandler = new RoomClass ( ) ;
	mapHandler = new MapClass ( ) ;
    UIHandler.construct ( ) ;
    roomHandler.construct ( ) ;
    loginHandler.construct ( ) ;
    mapHandler.construct ( ) ;

});

function setUpPaper ( paper )
{
    mapHandler.paper = paper ;
}

function loggedIn ( username )
{
    loginHandler.username = username ;
    console.log ( "publicAPI " + loginHandler.username) ;
    connect ( ) ; //from javaUtils
}

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
    socket.emit ( 'answer' , roomHandler.chosenRoom , loginHandler.username , answer , time ) ;
}

function showPopUp (intrebare,answers) {
	//trebuie apelat ca sa apara intrebarea
	UIHandler.UIShowPopUp(intrebare,answers);
}

function clickedZone(zoneID){
	//se apelaza de fiecare data cand se clickuie o zona
	sendMapUpdate(zoneID);
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