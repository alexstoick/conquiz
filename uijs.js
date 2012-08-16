$(document).ready(function() {
    m = main()
});

function main()
{
    /*
     *  DEMO STUFF
     */

    function tryButton()
    {
        $("#addQuestion").click(spawn).hide();
    }

    function spawn() //rigged Question
    {
        UIShowPopUp('Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?', ["Alger1", "Alger2", "Alger3", "Alger4"], this);
    }



    /*
     *  Question and Answer UI
     */


    function UIShowPopUp(intrebare, answers)
    {
        setUpTimer();
        $('#pop-up4a').show();
        $('#question').text(intrebare);
        var i ;
        for ( i = 1 ; i < 5 ; ++ i )
            $("#answer"+i).text(answers[i-1]);
    }

    function setUpQuestion()
    {
        var i ;
        for ( i = 1 ; i < 5 ; ++ i )
            $("#answer"+i).click(clickedAnswer);
    }

    function UIClickedAnswer()
    {
        $('#pop-up4a').hide();
        clearInterval(interval);
        clearTimeout(timeout);
    }

    function clickedAnswer()
    {
        UIClickedAnswer();
        submitAnswer($(this).text(), timer);
    }




    /*
     *  Timer related functions
     */



    var timer, interval, timeout;

    function addTime()
    {
        timer += 10;
    }

    function passedTime()
    {
        clearInterval(interval);
        submitAnswer(0, 10000);
    }

    function setUpTimer()
    {
        timer = 0;
        interval = setInterval(addTime, 10);
        timeout = setTimeout(passedTime, 10000);
    }





     /*
      * Login UI
      */


    function addLogin()
    {
        $("#submitUsername").click(login);
    }

    function login()
    {
        username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + username);
        $("#addQuestion").show();
        $('.roomSelect').show();
        connectedUsers[0] = username;
        UIUpdateUsersPresentation();
    }


    /*
     *  Map UI
     */

    var zones = [];
    var zonesCanvas = [];

    function drawCanvas()
    {
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
        paper.rect(0, 0, 960, 500).attr({ fill: '#221E1D' });

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
        for (var i = 0; i < zones.length; i++)
        {
            zonesCanvas[i] = paper.path(zones[i]);
            zonesCanvas[i].attr(defaultAttributes);
            zonesCanvas[i].click(function() { clickedZone(this.id); });
        }
    }



    /*
     * Room UI
     */
    //div .roomSelect = allRooms     
        //div .roomUI = currentRoom
            //p .left .roomTitle = titleOfRoom  
            //p .right (barItem) = barItemOfRoom
            //br clear:both pentru background     
            //div .userBlock = usersOfRoom             
                //p (username)     
        //div .roomUI ETC

    function roomSetUp()
    {
        for (var i = 1; i <= roomsAvailabe; i++)
            addNewRoom(i);
    }

    function addNewRoom(roomNumber)
    {
        var allRooms = $('.roomSelect');
        allRooms.append('<div class="roomUI"><p class="left roomTitle">ROOM ' + roomNumber + '</p><p class="right">=</p><br style="clear:both"></div>');
        var currentRoom = allRooms.find(' .roomUI:eq(' + (roomNumber - 1) + ')').attr({
            'isRoom': roomNumber
        });;
        var titleOfRoom = currentRoom.find(' p:eq(0)');
        titleOfRoom.click(chosenRoom);
        var barItemOfRoom = currentRoom.find('P:eq(1)');
        barItemOfRoom.click(barItemClicked);
        currentRoom.append('<div class="userBlock"></div>');
        var usersOfRoom = $('.userBlock:eq(' + (roomNumber - 1) + ')');
        for (var j = 1; j <= 4; j++)
            usersOfRoom.append('<p>Free Slot</p>');
    }
    function barItemClicked()
    {
        $(this).parent().find('div').toggle();
        getUsersFromRoom($(this).parent().attr('isRoom'));
    }
    function chosenRoom()
    {
        var roomId = $(this).parent().attr('isRoom');
        selectedRoom(roomId);
        UIselectedRoom();

    }

    function UIselectedRoom()
    {
        $('.roomSelect').slideUp();
        $('.shouldBeHiddenBeforeEnteringAGame').show();
        $('.shouldBeHiddenUntilLogin').show();
    }
     function UIAddUsersForRoomTooltip(roomId,users)
    {
        var userBlock=$('.roomSelect .roomUI:eq('+(roomId-1)+') .userBlock');
        console.log(users.length);
        for(var i=0;i<users.length;i++)
            userBlock.find('p:eq('+i+')').text(users[i]);
        //for(var i=users.length;i<4;i++)
            //userBlock.find('p:eq('+i+')').text('free slot');
    }

    /*
     * User related functions
     */


    //pozitia 0 e setata in functia login() cu numele usereului; -- NO LONGER
    var connectedUsers = [-1, 0, 0, 0];

    function UIRemoveUser(user)
    {
        console.log('removing');

        var userNo = 5;
        for (var i = 0; i < connectedUsers.length; i++)
        {
            console.log(connectedUsers[i], user);
            if (connectedUsers[i] == user) userNo = i;
        }
        connectedUsers[userNo] = 0;
        UIUpdateUsersPresentation();
    }

    function UIAddUsersForCurrentRoom(users)
    {
        console.log(users);
        for (var i = 0; i < users.length; i++)
        {
            /*
                var j=0;
                while(connectedUsers[j]!=0 && j<=3)
                    j++;
                if(j==4)
                 console.log('ERROR:Sent more users');
            */
            connectedUsers[i] = users[i];
        }
        UIUpdateUsersPresentation();
    }

    function UIUpdateUsersPresentation()
    {
        console.log(connectedUsers);
        for (var i = 0; i < 4; i++)
        {
            if (connectedUsers[i] !== 0)
                $('.casuta:eq(' + i + ')').text(connectedUsers[i]);
            else
               $('.casuta:eq(' + i + ')').text('no user connected');
        }
    }
    setUpQuestion();
    tryButton();
    drawCanvas();
    addLogin();
    roomSetUp();

    return {
        UIAddUsersForCurrentRoom: UIAddUsersForCurrentRoom,
        UIRemoveUser: UIRemoveUser,
        UIShowPopUp: UIShowPopUp,
        UIAddUsersForRoomTooltip:UIAddUsersForRoomTooltip
    };
}