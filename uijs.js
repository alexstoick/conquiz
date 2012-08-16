
function UIClass()
{

    //Public functions

    this.UIUpdateUsersPresentation = function ()
    {
        var connectedUsers = roomHandler.GET_connectedUsers() ;
        console.log(connectedUsers);
        for (var i = 0; i < 4; i++)
        {
            if (connectedUsers[i] !== 0)
                $('.casuta:eq(' + i + ')').text(connectedUsers[i]);
            else
               $('.casuta:eq(' + i + ')').text('no user connected');
        }
    }

    this.UIShowPopUp = function (intrebare, answers)
    {
        setUpTimer();
        $('#pop-up4a').show();
        $('#question').text(intrebare);
        var i ;
        for ( i = 1 ; i < 5 ; ++ i )
            $("#answer"+i).text(answers[i-1]);
    }

    this.UIAddUsersForRoomTooltip = function (roomId,users)
    {
        var userBlock=$('.roomSelect .roomUI:eq('+(roomId-1)+') .userBlock');
        console.log(users.length);
        for(var i=0;i<users.length;i++)
            userBlock.find('p:eq('+i+')').text(users[i]);
        //for(var i=users.length;i<4;i++)
            //userBlock.find('p:eq('+i+')').text('free slot');
    }


    //Private functions
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






    setUpQuestion();
    tryButton();
    roomSetUp();

}