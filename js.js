var username;
var paper;


function main() {
    //MAIN SETUP

    function setUp() {
        $('#answer1').click(clickedAnswer);
        $('#answer2').click(clickedAnswer);
        $('#answer3').click(clickedAnswer);
        $('#answer4').click(clickedAnswer);
    }
    //DEMO SHOULD BE REMOVED

    function tryButton() {
        $("#addQuestion").click(spawn).hide();
    }

    function spawn() {
        showPopUp('Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?', ["Alger1", "Alger2", "Alger3", "Alger4"], this);
    }
    //LOGIN

    function addLogin() {
        $("#submitUsername").click(login);
    }

    function login() {
        username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + username);
        $("#addQuestion").show();
    }

    //timer related
    var timer, interval, timeout;

    function addTime() {
        timer += 10;
    }

    function passedTime() {
        clearInterval(interval);
        submitAnswer(0, 10000);
    }

    function setUpTimer() {
        timer = 0;
        interval = setInterval(addTime, 10);
        timeout = setTimeout(passedTime, 10000);
    }
    //show Questions related

    function showPopUp(intrebare, answers) {
        setUpTimer();
        $('#pop-up4a').show();
        $('#question').text(intrebare);
        $('#answer1').text(answers[0]);
        $('#answer2').text(answers[1]);
        $('#answer3').text(answers[2]);
        $('#answer4').text(answers[3]);
    }


    //Answer related

    function clickedAnswer() {
        submitAnswer($(this).text(), timer);
    }

    function submitAnswer(chosen, timeInMS) {
        console.log(chosen, timeInMS);
        $('#pop-up4a').hide();
        clearInterval(interval);
        clearTimeout(timeout);
        //url = "/messageHandler?room="+room+"&userid="+username+"&answer="+chosen+"&time="+timeInMS ;
        //makeRequest ( url , true ) ;
    }


    //map related
    var zones = [];
    var zonesCanvas = [];

    function drawCanvas() {
        // MIGHT MODIFY starting point by 1 px
        // M inseamna goTo x y
        // NEVER NEVER modifica altceva inafara de primele 2 cifre daca nu vrei decat sa muti pozitia
        //zones[0] inseamna zona 1 NO SHIT
        var defaultAttributes = {
            fill: '#ECEAE0',
            stroke: '#63AA9C',
            'stroke-width': 3,
            'stroke-linejoin': 'round'
        };
        paper = new Raphael(document.getElementById('canvasRaphael'), "100%", "100%");
        paper.rect(0, 0, 960, 500).attr({
            fill: '#221E1D'
        });
        zones[0] = "M 144 125 l 160 0 l 0 50 l -160 75 z";
        zones[1] = "M 304 175 l 0 150 l -160 -75 z";
        zones[2] = "M 144 425 l 160 0 l 0 -100 l -160 -75 z";
        zones[3] = "M 304 125 l 512 0 l 0 -50 z";
        zones[4] = "M 304 125 l 0 50 l 320 0 l 0 -50 z";
        zones[5] = "M 304 175 l 0 50 l 256 0 l 0 -50 z";
        zones[6] = "M 304 225 l 0 125 l 384 0 l 0 -125 z";
        zones[7] = "M 304 350 l 0 75 l 192 0 l 0 -75 z";
        zones[8] = "M 496 350 l 0 37.5 l 192 0 l 0 -37.5 z";
        zones[9] = "M 496 387.5 l 0 37.5 l 192 0 l 0 -37.5 z";
        zones[10] = "M 624 125 l 0 50 l 192 0 l 0 -50 z";
        zones[11] = "M 560 175 l 0 50 l 128 0 l 0 125 l 128 0 l 0 -175 z";
        zones[12] = "M 688 350 l 0 75 l 128 0 z";
        zones[13] = "M 688 350 l 128 0 l 0 75 z";
        for (var i = 0; i < zones.length; i++) {
            zonesCanvas[i] = paper.path(zones[i]);
            zonesCanvas[i].attr(defaultAttributes);
            zonesCanvas[i].click(function() {
                console.log("Hello from zone" + this.id);
                //paper.getById ( this.id ).attr ( {fill:'#FFF000'} ) ;
                sendMapUpdate(this.id);
            });
        }
    }

    //SETUP
    drawCanvas();
    tryButton();
    addLogin();
    setUp();


}
$(document).ready(function() {
    main();
});