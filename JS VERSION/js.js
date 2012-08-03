window.onload=main;
function main(){
	
	drawCanvas();
	tryButton();
	function tryButton ()
	{
		$("#addQuestion").click(spawn);
		function spawn(){
			showPopUp('Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?'
                      ,[" Alger1"," Alger2"," Alger3"," Alger4"],this);
		};
	}
	function showPopUp(intrebare,answers){
		$('#pop-up').show();
		$('#question').text(intrebare);
		$('#answer1').text(answers[0]).click(clicked);
		$('#answer2').text(answers[1]).click(clicked);
		$('#answer3').text(answers[2]).click(clicked);
		$('#answer4').text(answers[3]).click(clicked);
		function clicked()
		{
			console.log(this);
			$('#pop-up').hide();
		};
	};
	function drawCanvas()
	{
		var drawingCanvas = document.getElementById('canvas');
		var context = drawingCanvas.getContext('2d');
		context.rect(0, 0, 960, 500);
  		context.fillStyle = "#221E1D";
  		context.fill();
	};

}