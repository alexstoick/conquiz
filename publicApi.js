var chosenRoom; // READ-ONLY
var paper; // Doar culorile
var roomsAvailabe=5; // TREBUIE MODIFICAT
var UIHandler ;
var loginHandler ;
var roomHandler ;
var mapHandler ;

$(document).ready(function() {
	loginHandler = new LoginClass ( ) ;
	roomHandler = new RoomClass ( ) ;
	mapHandler = new MapClass ( ) ;
    UIHandler = new UIClass();
});

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
    socket.emit ( 'answer' , chosenRoom , username , answer , time ) ;
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
    //connectToRoom ( ) ;
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