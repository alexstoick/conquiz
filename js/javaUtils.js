
function log(msg)
{
    document.getElementById('log').appendChild(document.createTextNode(new Date() + ' ' + msg + '\n'));
}
function status(msg)
{
    log(msg);
}

function clearLog()
{
    var e = document.getElementById('log');
    while (e.hasChildNodes())
    {
        e.removeChild(e.firstChild);
    }
    e.appendChild(document.createTextNode('Log: \n'));
}

var socket = null;
var attemptingToConnect = false ;

function connect( helloMessage )
{
    if ( attemptingToConnect )
        return ;
    attemptingToConnect = true ;
    log('Connecting to local server...');
    if (socket === null)
    {
        socket = io.connect() ;

        socket.on( 'connect' , function () { connected () ; });

        socket.on( 'message' , function (data) { log(data); });

        socket.on( 'mapUpdate' , function (id,player) { updateMap ( id,player) ;}) ;

        socket.on ( 'usersUpdate' , function ( users ) { addUsers ( users ) ; } ) ;

        socket.on ( 'userDisconnected' , function ( user ) { removeUser ( user ) ; } ) ;

        socket.on ( 'showQuestion' , function (question,answer1,answer2,answer3,answer4,correctAnswer) { showQuestion (question,answer1,answer2,answer3,answer4,correctAnswer) ; } ) ;

        socket.on ( 'showInputQuestion' , function ( question,correctAnswer ) { showInputQuestion (question,correctAnswer) ; } ) ;

        socket.on ( 'usersForSpecificRoom' , function ( conn , room , theme ) { receivedUsers ( conn , room , theme ) ; } ) ;

        socket.on ( 'roomNumber' , function ( rooms ) { log ( "Received Rooms" ) ; roomsAvailable = rooms ; UIHandler.roomSetUp () ; }) ;

        socket.on ( 'addRoom' , function ( room ) {  UIHandler.newRoom ( room ) ; roomsAvailable = room ; } ) ;

        socket.on ( 'getFreeUsers', function ( users) {  UIHandler.UIAddFreeUsers(users) ; } ) ;

        socket.on ( 'answer' , function ( username , answer , time) { /*call to publicAPI */addAnswerToArray ( username , answer , time ) ; } ) ;

        socket.on ( 'showWarQuestion' , function () { console.log ( "showingWarQuestion!" ) ; warPhase = 2 ;showQuestion () ; } ) ;

        socket.on ( 'updateWarMap' , function ( id , fillColor , newHolder ) { updateZoneHolder ( id , fillColor , newHolder ) ; })
    }
    socket.socket.connect();
}


function connected ( )
{
    status('Connected');
    socket.emit ( 'noRoom' , loginHandler.username , loginHandler.profilePIC ) ;
    socket.emit ( 'requestRoomNumber') ;
}

function receivedUsers ( users , roomId , theme )
{
    console.log ( users[0] ,users[1],users[2] ) ;
    updateUsersTooltipForRoom ( roomId , users , theme ) ;
}

function getUsersFromServer ( roomId  )
{
    socket.emit ( 'requestUsers' , roomId ) ;
}

function showQuestion (question,answer1,answer2,answer3,answer4,correctAnswer)
{
    //call to public API
    console.log(correctAnswer);
    setTimeout(function(){
        showPopUp4Question ( question , [answer1,answer2,answer3,answer4] , correctAnswer) ;
    }, 1000);

}
function showInputQuestion(question,correctAnswer)
{
    console.log ( "am primit" ) ;
    setTimeout(function(){
        showPopUpInputQuestion(question,correctAnswer);
    },1000);
}
function sendTestMessage ( )
{
    socket.send ( 'abc' ) ;
}

function connectToRoom ( )
{
    if ( socket && socket.socket.connected )
    {
        socket.emit ( 'joinRoom' , roomHandler.chosenRoom ) ;
        log ( '> should ' + roomHandler.chosenRoom ) ;
    }
    else
    {
        log ( 'Not connected.' ) ;
    }
}

function sendMapUpdate ( id )
{
    socket.emit ( 'updateMap' , id , loginHandler.username ) ;
}

function sendMapUpdate_war ( id , fillColor , new_holder )
{
    socket.emit ( 'updateWarMap' , id , fillColor , new_holder ) ;
}