window.onload=main;
function main(){
	showPopUp('Question',["Answer1","Answer2","Answer3","Answer4"],this);
	drawCanvas();
	function showPopUp(intrebare,answers){
		$('#question').text(intrebare);
		$('#answer1').text(answers[0]);
		$('#answer2').text(answers[1]);
		$('#answer3').text(answers[2]);
		$('#answer4').text(answers[3]);
	}
	function drawCanvas()
	{
		var drawingCanvas = document.getElementById('canvas');
		var context = drawingCanvas.getContext('2d');
		context.rect(0, 0, 960, 500);
  		context.fillStyle = "#FFFF00";
  		context.fill();
	}

}