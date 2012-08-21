function GameModel()
{
	this.answers=[];
	this.correctAnswer;
	this.scores=[];
	this.colors=['green','yellow','blue','red'];
	var scoreGainPerAnswer
	function findTheWinner(){
		var winners=[];
		var colorsToBeAdded=[][];
		for(i=0;i<4;i++){
			if(answers[i]==correctAnswer)
			{
				winners[winners.length]=i;
				scores[i]+=scoreGainPerAnswer;
			}
			colorsToBeAdded[answers[i]][colorsToBeAdded[answers[i].length]]=colors[i];
		}
		for(int i=1;i<=4;i++)
			if(colorsToBeAdded[i].length!=0)
				UIHandler.colorAnswer(colorsToBeAdded[i],i);
		console.log(winners);
	}
}