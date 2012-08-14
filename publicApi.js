//PUBLIC PROPERTY
/**
 * @class Global Public Api
 * @property {string} username usernameul userului ; nu trebuie modificat
 * @property {number} chosenRoom camera aleasa ; nu trebuie modificat
 * @property {paper} paper nvas; nu trebuie modificat
 * @property {number} roomsAvailable numarul de camere disponibile ; nu trebuie modificat
 * @property {function}  m functia main; nu trebuie modificat
 */
var username; // READ-ONLY
var chosenRoom; // READ-ONLY
var paper; // Doar culorile
var roomsAvailabe=5; // TREBUIE MODIFICAT
var m;
//PUBLIC FUNCTION
/**
	@function  submitAnswer se apelaza de fiecare data cand se primeste
	@param answer raspunsul trimis
	@param time timpul de raspuns
*/
function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
}

function showPopUp (intrebare,answers) {
	//trebuie apelat ca sa apara intrebarea
	m.UIshowPopUp(intrebare,answers); 
}

function clickedZone(zoneID,hh){
	//se apelaza de fiecare data cand se clickuie o zona
	console.log("APELAT");
	sendMapUpdate(zoneID);
}

function selectedRoom ( roomId ){
	//se apelaza de fiecare data cand se alege o camera
	room=roomId;
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
	users=getUsersFromServer()//java servlet
	UIAddUsersForRoomTooltip ( roomId , users);
}