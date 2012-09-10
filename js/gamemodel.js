function GameModel()
{
	this.answers=[] ;
	this.usernames=[] ;
	this.times=[] ;
	this.userNumber=[];
	this.correctAnswer=1;
	this.correctAnswerForInput = 100 ;
	this.winners=[];
	var scoreGainPerAnswer=100;
	var colorsToBeAdded = [4] ;
	this.currentlySelecting=-1;
	this.userToSelect=0;
	this.typeOfQuestion=0;
	this.iAmWinner=0;
	this.inputReq=0;
	this.zonesToSelect=[0,0,0,0];
	function clearZonesToSelect()
	{
		for(var i=0;i<4;i++)
			gameHandler.zonesToSelect[i]=0;
	}
	this.findTheWinner = function ( answers )
	{
		clearZonesToSelect();
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
				roomHandler.scores[gameHandler.userNumber[i]] += scoreGainPerAnswer ;
				gameHandler.zonesToSelect[gameHandler.userNumber[i]]=2;
				if(gameHandler.usernames[i]==loginHandler.username)
				{
					gameHandler.iAmWinner=1;
				}
			}
			colorsToBeAdded [ answers[i] ].push ( colors[gameHandler.userNumber[i]] ) ;
		}
		inputReq=gameHandler.winners.length;
		UIHandler.UIUpdateUsersPresentation();
		for(i=1;i<5;i++)
			if( colorsToBeAdded[i].length!==0 )
				UIHandler.colorAnswer(colorsToBeAdded[i],i);
		console.log(gameHandler.winners);
		UIHandler.addGlow(this.correctAnswer);
		setTimeout(function(){
			
				UIHandler.UIHidePopUp4question();
				UIHandler.removeGlow(gameHandler.correctAnswer);
			if(gameHandler.winners.length<=1)
				gameHandler.StartSelectingZones(gameHandler.winners);
			else
			{
				reqDepartajare();
				console.log ( gameHandler.iAmWinner ) ;
			}
		},2000);
	};

	function modul ( value )
	{
		if ( value < gameHandler.correctAnswerForInput )
			return gameHandler.correctAnswerForInput - value ;
		return value - gameHandler.correctAnswerForInput ;
	}

	function swap ( poz1 , poz2 )
	{
		var aux ;

		aux = gameHandler.times[poz1] ;
		gameHandler.times[poz1] = gameHandler.times[poz2] ;
		gameHandler.times[poz2] = aux ;

		aux = gameHandler.answers[poz1] ;
		gameHandler.answers[poz1] = gameHandler.answers[poz2] ;
		gameHandler.answers[poz2] = aux ;

		aux = gameHandler.usernames[poz1] ;
		gameHandler.usernames[poz1] = gameHandler.usernames[poz2] ;
		gameHandler.usernames[poz2] = aux ;	

		aux = gameHandler.userNumber[poz1] ;
		gameHandler.userNumber[poz1] = gameHandler.userNumber[poz2] ;
		gameHandler.userNumber[poz2] = aux ;	
	}

	this.findTheInputWinner = function ()
	{
		clearZonesToSelect();
		//sortez dupa raspunsul corect. 
		//daca exista mai multe raspunsuri corecte - dupa cel mai rapid timp

		var L = gameHandler.answers.length ;
		var i ;
		var j ;

		for ( i = 0 ; i < L ; ++ i )
		{
			for ( j = i+1 ; j < L ; ++ j )
			{ 
				var mod1 = modul( gameHandler.answers[i] );
				var mod2 = modul( gameHandler.answers[j] );
				console.log(mod1,mod2);
				if ( mod1 > mod2 )
				{
					swap ( i , j ) ;
				}
				else
					if ( mod1 == mod2 && gameHandler.times[i] > gameHandler.times[j] )
						swap(i,j);					
			}
		}
		gameHandler.zonesToSelect[gameHandler.userNumber[0]]=2;
		gameHandler.zonesToSelect[gameHandler.userNumber[1]]=1;
		gameHandler.winners[0]=[gameHandler.userNumber[0]];
		gameHandler.winners[1]=[gameHandler.userNumber[1]];
		// answer  -- gameHandler.times ; gameHandler.usernames; gameHandler.userNumber

		UIHandler.UIUpdateInputResults(gameHandler.usernames,gameHandler.times,gameHandler.answers,gameHandler.userNumber);

		setTimeout ( function () 
			{ 
				UIHandler.UIHidePopUpinputQuestion () ; 
				gameHandler.StartSelectingZones () ; 
			} 
			, 5000 ) ;

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
		gameHandler.zonesToSelect[gameHandler.winners[gameHandler.currentlySelecting]]--;
		if(gameHandler.zonesToSelect[gameHandler.winners[gameHandler.currentlySelecting]]==0)
		{
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
		}
	};
}