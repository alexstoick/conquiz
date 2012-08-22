
function UIClass()
{

    //Public functions

    //GAME UI
    this.newRoom = addNewRoom ;
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
    };

    this.UIShowPopUp = function (intrebare, answers)
    {
        setUpTimer();
        $('#pop-up4a').show();
        $('#question').text(intrebare);
        var i ;
        for ( i = 1 ; i < 5 ; ++ i )
        {
            $("#answer"+i).text(answers[i-1]);
            console.log('hello');
            UIHandler.colorAnswer(['#63AA9C'],i);
        }
    };
    this.UIHidePopUp = function ()
    {
        $('#pop-up4a').hide();
    };
    this.colorAnswer = function ( colors , answerNumber)
    {
        var width=100/colors.length;
        console.log(colors);
        var answerDiv=$('.answer:eq('+(answerNumber-1)+')');
        console.log(answerDiv);
        for(var i=1;i<=colors.length;i++)
            answerDiv.find('#Color'+i).css({'width':width+'%','background-color':colors[i-1],'left':width*(i-1)+'%'}).show();
        for(i=colors.length+1;i<=4;i++)
            answerDiv.find('#Color'+i).hide();
    };
    function UIClickedAnswer()
    {
       // $('#pop-up4a').hide();
        clearInterval(interval);
        clearTimeout(timeout);
    }
    function clickedAnswer()
    {
        UIClickedAnswer();
        submitAnswer($(this).text(), timer);
    }
    /*
     * Room UI
     */

    //div .roomSelect = allRooms
        //div .roomUI = currentRoom
            //p .left .roomTitle = titleOfRoom
            //br clear:both pentru background
            //div .userBlock = usersOfRoom
                //p (username)
        //div .roomUI ETC
    var lastItem=-1;
    function barItemClicked()
    {

        getUsersFromRoom($(this).parent().attr('isRoom'));
    }
    function clickedRoom()
    {
        var userBlock=$(this).find('div');
        var roomId = $(this).attr('isRoom');
        if($(userBlock).is(':visible')){
            selectedRoom(roomId);
            UIselectedRoom();
        }
        else{
            getUsersFromRoom(roomId);
            userBlock.show();
            if(lastItem!=-1)
            {
                $(this).parent().find('.userBlock:eq('+(lastItem-1)+')').hide();
            }
            lastItem=roomId;
        }

    }
    function UIselectedRoom()
    {
        $('.roomSelect').slideUp();
        $('.shouldBeHiddenBeforeEnteringAGame').show();
        $('.shouldBeHiddenUntilLogin').show();
    }
    this.UIAddUsersForRoomTooltip = function (roomId,users)
    {
        var userBlock=$('.roomSelect .roomUI:eq('+(roomId-1)+') .userBlock');
        for(var i=0;i<users.length;i++)
            userBlock.find('p:eq('+i+')').text(users[i]);
        for( i=users.length;i<4;i++)
            userBlock.find('p:eq('+i+')').text('Free slot');
    };
    this.UIAddFreeUsers = function (users)
    {
        var freeUsersBlock=$('.uncoonectedUsersBlock');
        freeUsersBlock.html('');
            for(var i=0;i<users.length;i++)
                freeUsersBlock.append('<p>'+users[i]+'</p>');
    };
    function addNewRoom (roomNumber)
    {
        var allRooms = $('.roomSelect');
        allRooms.append('<div class="roomUI"><p class="roomTitle">ROOM ' + roomNumber + '</p></div>');
        var currentRoom = allRooms.find(' .roomUI:eq(' + (roomNumber - 1) + ')').attr({
            'isRoom': roomNumber
        });
        var titleOfRoom = currentRoom.find(' p:eq(0)');
        currentRoom.click(clickedRoom);
        var barItemOfRoom = currentRoom.find('P:eq(1)');
        barItemOfRoom.click(barItemClicked);
        currentRoom.append('<div class="userBlock"></div>');
        var usersOfRoom = $('.userBlock:eq(' + (roomNumber - 1) + ')');
        for (var j = 1; j <= 4; j++)
            usersOfRoom.append('<p>Free Slot</p>');
    }
    var colors=['green','yellow','cyan','red'];
    this.roomSetUp = function ()
    {
        for (var i = 1; i <= roomsAvailable; i++)
            addNewRoom(i);
        $('.addNewRoom').click(function(){
            log ( "qq" ) ;
            addNewRoom(++roomsAvailable);
            //call to publicAPI
            newRoomAdded ( roomsAvailable ) ;
        });

        $('.unconnectedUsers').click(function(){
            $(this).find('div').toggle();
        });

        for(var i=0;i<4;i++)
             $('.casuta:eq(' + i + ')').css({'background-color':colors[i]});
    };
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
    /*CONSTRUCT FUNCTIONS*/
    this.construct = function ( )
    {
        setUpQuestion();
        tryButton();
    };
    function setUpQuestion()
    {
        var i ;
        for ( i = 1 ; i < 5 ; ++ i )
            $("#answer"+i).click(clickedAnswer);
    }
    /*
     *  DEMO STUFF
     */

    function tryButton()
    {
        $("#addQuestion").click(spawn).hide();
    }

    function spawn() //rigged Question
    {
        showPopUp ( 'Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?',
                      ["Alger1", "Alger2", "Alger3", "Alger4"] ) ;
    }

}