
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

function connect( helloMessage )
{
    log('Connecting to local server...');
    if (socket === null)
    {
        socket = io.connect() ;

        socket.on( 'connect' , function () { connected () ; });

        socket.on( 'message' , function (data) { log(data); });

        socket.on( 'mapUpdate' , function (id,player) { updateMap ( id,player) ;}) ;

        socket.on ( 'usersUpdate' , function ( users ) { addUsers ( users ) ; } ) ;

        socket.on ( 'userDisconnected' , function ( user ) { removeUser ( user ) ; } ) ;

        socket.on ( 'showQuestion' , function ( ) { showQuestion () ; } ) ;

        socket.on ( 'usersForSpecificRoom' , function ( conn , room , theme ) { receivedUsers ( conn , room , theme ) ; } ) ;

        socket.on ( 'roomNumber' , function ( rooms ) { log ( "received Rooms" ) ; roomsAvailable = rooms ; UIHandler.roomSetUp () ; }) ;

        socket.on ( 'addRoom' , function ( room ) {  UIHandler.newRoom ( room ) ; roomsAvailable = room ; } ) ;

        socket.on ( 'getFreeUsers', function ( users) {  UIHandler.UIAddFreeUsers(users) ; } ) ;

        socket.on ( 'answer' , function ( username , answer , time) { /*call to publicAPI */addAnswerToArray ( username , answer , time ) ; } ) ;
    }
    socket.socket.connect();
}


function connected ( )
{
    status('Connected');
    socket.emit ( 'noRoom' , loginHandler.username ) ;
    socket.emit ( 'requestRoomNumber') ;
}

function receivedUsers ( users , roomId , theme )
{
    updateUsersTooltipForRoom ( roomId , users , theme ) ;
}

function getUsersFromServer ( roomId  )
{
    socket.emit ( 'requestUsers' , roomId ) ;
}

function showQuestion ( )
{
    //call to public API
    setTimeout(function(){
        showPopUp ( 'Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?', ["1", "2", "3", "4"] ) ;
    }, 1000);

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