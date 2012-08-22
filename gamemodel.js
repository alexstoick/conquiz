function GameModel()
{
	this.answers=[] ;
	this.usernames=[] ;
	this.times=[] ;
	this.correctAnswer=1;
//	this.scores=[];


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

		var winners=[];

		for(var i=0;i<answers.length;i++)
		{
			if ( answers[i] )
			{
				winners[winners.length] = i ;
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
		}
		,2500);
	};
}