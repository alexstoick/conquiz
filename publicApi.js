var username; // READ-ONLY
var chosenRoom; // READ-ONLY
var paper; // Doar culorile
var roomsAvailabe=5; // TREBUIE MODIFICAT
var m;

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
    socket.emit ( 'answer' , chosenRoom , username , answer , time ) ;
}

function showPopUp (intrebare,answers) {
	//trebuie apelat ca sa apara intrebarea
	m.UIShowPopUp(intrebare,answers);
}

function clickedZone(zoneID){
	//se apelaza de fiecare data cand se clickuie o zona
	sendMapUpdate(zoneID);
}

function selectedRoom ( roomId ){
	//se apelaza de fiecare data cand se alege o camera
	chosenRoom=roomId;
}

function addUsers ( users )
{
	//trimiti un Array
	m.UIAddUsersForCurrentRoom(users);
}
function removeUser ( user )
{
	m.UIRemoveUser(user);
}
function receiveAnswer( answers)
{
	//doar 3
}
function getUsersFromRoom ( roomID )
{
	users=getUsersFromServer(roomID) ;//java servlet
	m.UIAddUsersForRoomTooltip ( roomId , users);
}