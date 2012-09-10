function GameModel()
{
	this.answers=[] ;
	this.usernames=[] ;
	this.times=[] ;
	this.userNumber=[];
	this.correctAnswer=1;
	this.winners=[];
	var scoreGainPerAnswer=100;
	var colorsToBeAdded = [4] ;
	this.currentlySelecting=-1;
	this.userToSelect=0;
	this.typeOfQuestion=0;

	this.findTheWinner = function ( answers )
	{
		gameHandler.winners.length = 0 ;
		gameHandler.currentlySelecting = 0 ;
		colorsToBeAdded[0] = [] ;
		colorsToBeAdded[1] = [] ;
		colorsToBeAdded[2] = [] ;
		colorsToBeAdded[3] = [] ;
		colorsToBeAdded[4] = [] ;
		for(var i=0;i<answers.length;i++)
		{
			if ( answers[i]==gameHandler.correctAnswer )
			{
				gameHandler.winners.push(gameHandler.userNumber[i]);
				roomHandler.scores[i] += scoreGainPerAnswer ;
			}
			colorsToBeAdded [ answers[i] ].push ( colors[gameHandler.userNumber[i]] ) ;
		}
		UIHandler.UIUpdateUsersPresentation();
		for(i=1;i<5;i++)
			if( colorsToBeAdded[i].length!==0 )
				UIHandler.colorAnswer(colorsToBeAdded[i],i);
		console.log(gameHandler.winners);
		UIHandler.addGlow(this.correctAnswer);
		setTimeout(function(){
			
				UIHandler.UIHidePopUp4question();
				UIHandler.removeGlow(gameHandler.correctAnswer);
			if(gameHandler.winners.length<1)
				gameHandler.StartSelectingZones(gameHandler.winners);
			else
			{
				reqDepartajare();
			}
		},2000);
	};
	this.findTheInputWinner = function (answers)
	{
		UIHandler.UIUpdateInputResults(gameHandler.usernames,gameHandler.times,answers);
	}
	
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