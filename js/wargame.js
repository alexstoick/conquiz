function WarClass ( )
{

	this.construct = function () { console.log ( "created war class" ) ; } ;

	var listOfUsers = roomHandler.GET_connectedUsers () ;
	this.currentlySelecting = 0 ;

	this.startWar = function ( ) {

		//1. Will have to say who is currently next to select a zone to attack

		var currentlySelecting = warHandler.currentlySelecting ;

		$(currentActivity).text('The user ' + listOfUsers[currentlySelecting][0] + ' has to select a zone to attack' ) ;
		

		//2. After the zone is selected find the player and show him the question - the other player will have to be shown a 
		//waiting for other players.

		//3. If the answer is correct the holder of the zone changes, if not - no change happens.

		//4. The next player comes to select.

		//In order to make things easy will keep the list of users from the moment the game is initiated,
		//and use that as a refference point for the order.
	}

	this.attackZone = function ( zoneID , attacker ) {

		var holder = mapHandler.zoneIsOwnedBy [ zoneID ] ;

		console.log ( "will attack zone:" + zoneID ) ;
	} ;
}