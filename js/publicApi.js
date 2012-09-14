var roomsAvailable=5; // TREBUIE MODIFICAT
var colors=['#dff0d8','#f2dede','#d9edf7','#c09853'];
var UIHandler ;
var loginHandler ;
var roomHandler ;
var mapHandler ;
var gameHandler;
var currentActivty       = $('#currentActivity');
var currentMission       = $('#currentMission');
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

function setPaper ( paper )
{
	mapHandler.paper = paper ;
}

function loggedIn ( user )
{
	loginHandler.username = user ;
	connect ( ) ; //from javaUtils
	//GET No of avaialble ROOMS

	//get list of users in no room: UIHandler.UIAddFreeUsers ( users ) ;
}

function loggedIn2 ( user , picURL )
{
	$("#usernameNav").html( "<img src='https://graph.facebook.com/" + picURL + "/picture'> Hello " + user );
    $('#loginDropdown').hide();
    $("#addQuestion").show();
    $('.roomSelect').show();
	loginHandler.username = user ;
	connect ( ) ; //from javaUtils
}

function submitAnswer ( answer , time)
{
	//se apeleaza de fiecare data cand se primeste
	socket.emit ( 'answer' , roomHandler.chosenRoom , loginHandler.username , answer , time ) ;
}

function showPopUp4Question (intrebare,answers) {
	console.log ( "abcsa321" ) ; 
	//trebuie apelat ca sa apara intrebarea
	UIHandler.UIShowPopUp4question(intrebare,answers);
	gameHandler.answers.length = 0 ;
	gameHandler.times.length = 0 ;
	gameHandler.usernames.length = 0 ;
	gameHandler.userNumber.length = 0 ;
	gameHandler.typeOfQuestion=0;
	gameHandler.iAmWinner=0;
}
function showPopUpInputQuestion (intrebare)
{
	console.log ( "13221" ) ;
	UIHandler.UIShowPopUPinputQuestion(intrebare);
	gameHandler.answers.length = 0 ;
	gameHandler.times.length = 0 ;
	gameHandler.usernames.length = 0 ;
	gameHandler.userNumber.length = 0 ;
	gameHandler.typeOfQuestion=1;
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
	console.log(gameHandler.usernames);
	if(gameHandler.typeOfQuestion==0)
	{
		console.log ( gameHandler.inputReq + "		" + gameHandler.usernames.length ) ;
		if( 2 == gameHandler.usernames.length)
			gameHandler.findTheWinner ( gameHandler.answers ) ;
	}
	else
	{
		console.log ( "abc" ) ;
		if ( gameHandler.usernames.length == 2 )
			gameHandler.findTheInputWinner ( );
	}
}

function newRoomAdded ( roomID , theme )
{
	socket.emit ( 'newRoom' , roomID , theme ) ;
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

function updateUsersTooltipForRoom ( roomID , users , theme )
{
	UIHandler.UIAddUsersForRoomTooltip ( roomID , users , theme );
}

function gameStateReady ( )
{
	socket.emit ( 'showQuestion' ) ;
}
function reqDepartajare()
{
	socket.emit('reqDepartajare');
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

function warReady()
{
	currentMission.text('War Time!')
	currentActivty.text('De implementat aici');
}