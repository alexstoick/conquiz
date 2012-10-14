function WarClass ( )
{

	this.construct = function () { } ;

	var listOfUsers = roomHandler.GET_connectedUsers () ;
	this.currentlySelecting = 0 ;
	this.attacker = "" ;
	this.holder = "" ;
	this.zoneID = -1 ;
	this.rounds=0;
	this.startWar = function ( ) {

		//1. Will have to say who is currently next to select a zone to attack

		var currentlySelecting = warHandler.currentlySelecting ;

		$(currentActivity).text('The user ' + listOfUsers[currentlySelecting][0] + ' has to select a zone to attack' ) ;
		warPhase = 1 ;

		//2. After the zone is selected find the player and show him the question - the other player will have to be shown a 
		//waiting for other players.

		//3. If the answer is correct the holder of the zone changes, if not - no change happens.

		//4. The next player comes to select.

		//In order to make things easy will keep the list of users from the moment the game is initiated,
		//and use that as a refference point for the order.
	}

	this.attackZone = function ( zoneID , attacker ) {

		var holder = mapHandler.zoneIsOwnedBy [ zoneID ] ;

		sendQuestionToUser ( attacker , holder , zoneID ) ;
		warHandler.attacker = attacker ;
		warHandler.holder = holder ;
		warHandler.zoneID = zoneID ;
		//setting warPhase to 2 in javaUtils
		console.log ( "will attack zone:" + zoneID ) ;
	} ;
	this.changeHands = function ( winner ) {

		if ( winner )
		{
		    var fillColor = "#000000" ;
		    var i ;
		    var players = roomHandler.GET_connectedUsers() ;
		    for ( i = 0 ; i < 4 ; ++ i )
		        if ( warHandler.attacker == players[i][0] )
		            fillColor = colors[i] ;

		    sendMapUpdate_war ( warHandler.zoneID , fillColor , warHandler.attacker ) ;

			mapHandler.paper.getById ( warHandler.zoneID ).attr ( {fill:fillColor} ) ;
		}

		warHandler.currentlySelecting ++ ;
		if ( warHandler.currentlySelecting == 2 )
		{
			warHandler.rounds++;
			warHandler.currentlySelecting = 0 ;
		}
		if(warHandler.rounds<3)
			warHandler.startWar ( ) ;
		else
		{
			$("#currentActivity").text('Game Over');
			$('#currentMission').text('');
		}
	}
}

//warphase = 0 when no war
//warphase = 1 when the question has to be shown
//warphase = 2 when the question is shown and the decision has to be made.