
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

function connect()
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

        socket.on ( 'usersForSpecificRoom' , function ( conn , room ) { receivedUsers ( conn , room ) ; } ) ;

        socket.on ( 'roomNumber' , function ( rooms ) { log ( "received Rooms" ) ; roomsAvailable = rooms ; UIHandler.roomSetUp () ; }) ;

        socket.on ( 'addRoom' , function ( room ) { console.log ( ' should add new room' ) ; UIHandler.newRoom ( room ) ; roomsAvailable = room ; } ) ;
    }
    socket.socket.connect();
}


function connected ( )
{
    status('Connected');
    socket.emit ( 'noRoom' ) ;
    socket.emit ( 'requestRoomNumber') ;
}

function receivedUsers ( users , roomId )
{
    updateUsersTooltipForRoom ( roomId , users ) ;
}

function getUsersFromServer ( roomId  )
{
    console.log ( "requested users" ) ;
    socket.emit ( 'requestUsers' , roomId ) ;
}

function showQuestion ( )
{
    //call to public API
    console.log ( "called the public api for question" ) ;
    showPopUp ( 'Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?', ["1", "2", "3", "4"] ) ;
}

function sendTestMessage ( )
{
    socket.send ( 'abc' ) ;
}

function connectToRoom ( )
{
    if ( socket && socket.socket.connected )
    {
        console.log ( loginHandler.username ) ;
        socket.emit ( 'joinRoom' , roomHandler.chosenRoom , loginHandler.username ) ;
        log ( '> should ' + roomHandler.chosenRoom ) ;
    }
    else
    {
        log ( 'Not connected.' ) ;
    }
}

var players = [ "alexstoick" , "vladstoick" ] ;
var colors = [ "#ABCF00" , "#FAA000" ] ;


function updateMap ( id , player )
{
    log ( "received update >>> zone:" + id + " by player:" + player ) ;
    var fillColor = "#000000" ;
    var i ;
    for ( i = 0 ; i < 2 ; ++ i )
        if ( player == players[i] )
            fillColor = colors[i] ;

    mapHandler.paper.getById ( id ).attr ( {fill:fillColor} ) ;
}

function sendMapUpdate ( id )
{
    socket.emit ( 'updateMap' , id , loginHandler.username ) ;
    socket.emit ( 'sendQuestion' ) ;
}

