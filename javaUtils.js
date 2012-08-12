function doAlert () {
    alert ( "1231231" ) ;
}

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
    if (socket == null)
    {
        socket = io.connect() ;
        socket.on('connect', function () { status('Connected'); test(); });
        socket.on('message', function (data) { log(data); });
        socket.on('mapUpdate' , function (id,player) { updateMap ( id,player) ;})
    }
    socket.socket.connect();
}

function sendTestMessage ( )
{
    socket.send ( 'abc' ) ;
}

function test ( )
{
    if ( socket && socket.socket.connected )
    {
        socket.emit ( 'joinRoom' , 'room1' ) ;
        log ( '> should join room 1' ) ;
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

    paper.getById ( id ).attr ( {fill:fillColor} ) ;
}

function sendMapUpdate ( id )
{
    socket.emit ( 'updateMap' , id , username ) ;
}

