
function main() {
	
	function tryButton() {
		$("#addQuestion").click(spawn);
        
		function spawn(){
            
			showPopUp('Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?'
                      ,["Alger1","Alger2","Alger3","Alger4"],this);
		};
	}
    
	
    //timer related
    var timer=0,interval,timeout;
    function addTime()
    {
        timer+=10;
    }
    function passedTime()
    {
        clearInterval(interval);
        submitAnswer(0,10000);
    }
    function setUpTimer()
    {
        timer=0;
        interval=setInterval(addTime,10);
        timeout=setTimeout(passedTime,10000);
    }
    //show Questions related
	function showPopUp (intrebare,answers) {
        setUpTimer();
		$('#pop-up4a').show();
		$('#question').text(intrebare);
		$('#answer1').text(answers[0]).click(clickedAnswer);
		$('#answer2').text(answers[1]).click(clickedAnswer);
		$('#answer3').text(answers[2]).click(clickedAnswer);
		$('#answer4').text(answers[3]).click(clickedAnswer);
		
	};
    //Answer related
    function clickedAnswer()
		{
			submitAnswer($(this).text(),timer);
            clearInterval(interval);
            clearTiemeout(timeout);
		};
    function submitAnswer(chosen , timeInMS )
    {
        console.log(chosen,timeInMS);
        $('#pop-up4a').hide();
        clearInterval(interval);
        clearTimeout(timeout);
    }
    //map related
	function drawCanvas()
	{
		var drawingCanvas = document.getElementById('canvas');
		var context = drawingCanvas.getContext('2d');
		context.rect(0, 0, 960, 500);
  		context.fillStyle = "#221E1D";
  		context.fill();
	};
   
    drawCanvas();
	tryButton();
   

}
$(document).ready(function() {
   main();
 });