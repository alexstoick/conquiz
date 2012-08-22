function GameModel()
{
	this.answers=[] ;
	this.usernames=[] ;
	this.times=[] ;
	this.correctAnswer=1;
//	this.scores=[];
	this.winners=[];
	var colors=['green','yellow','cyan','red'];
	var scoreGainPerAnswer;
	var colorsToBeAdded = [4] ;
	this.findTheWinner = function ( answers )
	{
		colorsToBeAdded[0] = [] ;
		colorsToBeAdded[1] = [] ;
		colorsToBeAdded[2] = [] ;
		colorsToBeAdded[3] = [] ;
		colorsToBeAdded[4] = [] ;
		for(var i=0;i<answers.length;i++)
		{
			if ( answers[i] )
			{
				gameHandler.winners[gameHandler.winners.length] = i ;
				//scores[i] += scoreGainPerAnswer ;
			}
			colorsToBeAdded [ answers[i] ].push ( colors[i%4] ) ;
		}

		for(i=1;i<5;i++)
			if( colorsToBeAdded[i].length!==0 )
				UIHandler.colorAnswer(colorsToBeAdded[i],i);
		UIHandler.addGlow(this.correctAnswer);
		setTimeout(function(){
			UIHandler.UIHidePopUp();
			UIHandler.removeGlow(gameHandler.correctAnswer);
			gameHandler.StartSelectingZones(gameHandler.winners);
		}
		,100);
	};
	this.currentlySelecting=0;
	this.StartSelectingZones = function ()
	{
		console.log(mapHandler);
		connectedUsers = roomHandler.GET_connectedUsers();
		console.log(connectedUsers);
		mapHandler.upperText.attr('text','Currently Selecting:'+connectedUsers[gameHandler.winners[gameHandler.currentlySelecting]]);
	}
}