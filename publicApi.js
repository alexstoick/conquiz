//PUBLIC PROPERTY
var username; // READ-ONLY
var chosenRoom; // READ-ONLY
var paper; // Doar culorile
var roomsAvailabe=5; // TREBUIE MODIFICAT
//PUBLIC FUNCTION

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
}

function showPopUp (intrebare,answers) {
	//trebuie apelat ca sa apara intrebarea
	UIshowPopUp(intrebare,answers);
}

function clickedZone(zoneID,hh){
	//se apelaza de fiecare data cand se clickuie o zona
	console.log("APELAT");
	sendMapUpdate(zoneID);
}

function selectedRoom ( roomId ){
	//se apelaza de fiecare data cand se alege o camera
	chosenRoom=roomId;
}