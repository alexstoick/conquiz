function GameModel()
{
	this.answers=[] ;
	this.usernames=[] ;
	this.times=[] ;
	this.userNumber=[];
	this.correctAnswer=1;
//	this.scores=[];
	this.winners=[];
	var scoreGainPerAnswer;
	var colorsToBeAdded = [4] ;
	this.currentlySelecting=-1;
	this.userToSelect=0;


	this.findTheWinner = function ( answers )
	{
		gameHandler.winners.length = 0 ;
		gameHandler.currentlySelecting = 0 ;
		colorsToBeAdded[0] = [] ;
		colorsToBeAdded[1] = [] ;
		colorsToBeAdded[2] = [] ;
		colorsToBeAdded[3] = [] ;
		colorsToBeAdded[4] = [] ;
		console.log('finding The Winner function is called');
		for(var i=0;i<answers.length;i++)
		{
			if ( answers[i]==gameHandler.correctAnswer )
			{
				gameHandler.winners.push(gameHandler.userNumber[i]);
				//scores[i] += scoreGainPerAnswer ;
				console.log('WINNER FOUND');
			}
			colorsToBeAdded [ answers[i] ].push ( colors[i%4] ) ;
		}

		for(i=1;i<5;i++)
			if( colorsToBeAdded[i].length!==0 )
				UIHandler.colorAnswer(colorsToBeAdded[i],i);
		console.log(gameHandler.winners);
		UIHandler.addGlow(this.correctAnswer);
		setTimeout(function(){
			UIHandler.UIHidePopUp();
			UIHandler.removeGlow(gameHandler.correctAnswer);
			gameHandler.StartSelectingZones(gameHandler.winners);
		},2000);
	};


	this.StartSelectingZones = function ()
	{
		gameHandler.currentlySelecting=0;
		if ( gameHandler.winners.length === 0 )
		{
			gameHandler.currentlySelecting=-1;
			gameStateReady ( ) ;
			return ;
		}
		connectedUsers = roomHandler.GET_connectedUsers();
		mapHandler.upperText.attr('text','Currently Selecting:'+connectedUsers[gameHandler.winners[gameHandler.currentlySelecting]]);
		gameHandler.userToSelect=gameHandler.winners[gameHandler.currentlySelecting];
	};
	this.nextUserToSelectZone = function () {
		gameHandler.currentlySelecting ++ ;
		if ( gameHandler.winners.length == gameHandler.currentlySelecting )
		{
			gameHandler.currentlySelecting=-1;
			gameStateReady ( ) ;
		}
		else
		{
			mapHandler.upperText.attr('text','Currently Selecting:'+connectedUsers[gameHandler.winners[gameHandler.currentlySelecting]]);
			gameHandler.userToSelect=gameHandler.winners[gameHandler.currentlySelecting];
		}
	};
}