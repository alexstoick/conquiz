
function UIClass()
{
    //IMPORTANT VARS
    var clickedAnswerAlready=0;
    var roomModal=$('#roomModal');

    //Public functions

    //GAME UI
 
   
    this.UIUpdateUsersPresentation = function ()
    {
        var scores=roomHandler.scores;
        var connectedUsers = roomHandler.GET_connectedUsers() ;
        for (var i = 0; i < 4; i++)
        {
            if (connectedUsers[i] !== 0)
                $('.casuta:eq(' + i + ')').text(connectedUsers[i]+' : '+scores[i]);
            else
               $('.casuta:eq(' + i + ')').text('no user connected');
            if(connectedUsers[i]==loginHandler.username)
                loginHandler.thisIsUserNo=i;
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
            $('#'+i).text(answers[i-1]);
            UIHandler.colorAnswer(['#63AA9C'],i);
        }
        clickedAnswerAlready=0 ;
    };

    this.UIHidePopUp = function ()
    {
        $('#pop-up4a').hide();
    };
    this.colorAnswer = function ( colors , answerNumber)
    {
        var width=100/colors.length;
        var answerDiv=$('.answer:eq('+(answerNumber-1)+')');
        for(var i=1;i<=colors.length;i++)
            answerDiv.find('#Color'+i).css({'width':width+'%','background-color':colors[i-1],'left':width*(i-1)+'%'}).show();
        for(i=colors.length+1;i<=4;i++)
            answerDiv.find('#Color'+i).hide();
    };
    this.addGlow = function ( answerNumber )
    {
        $('#'+answerNumber).parent().addClass ('glow');
    }
    this.removeGlow = function (answerNumber)
    {
         $('#'+answerNumber).parent().removeClass ('glow');
         console.log('removed glow from '+answerNumber);
    }
    function UIClickedAnswer(answerClicked)
    {
       // $('#pop-up4a').hide();
        interval = clearInterval(interval);
        UIHandler.colorAnswer( [colors[loginHandler.thisIsUserNo]], answerClicked );
    }
    function clickedAnswer()
    {
        if(clickedAnswerAlready==0)
        {
            UIClickedAnswer($(this).attr('id'));
            submitAnswer($(this).attr('id'), timer);
            clickedAnswerAlready=1;
        }
    }
    function UIselectedRoom()
    {
        $('.roomSelect').slideUp();
        $('.shouldBeHiddenBeforeEnteringAGame').show();
    }
    function clickedRoom(roomID)
    {
        roomModal.modal('show');
        roomModal.find('#roomNumberModal').text('Room '+roomID);
        roomModal.find('#themeModal').text('Theme for room '+roomID);
        getUsersFromRoom(roomID); 

    }
    this.UIAddUsersForRoomTooltip = function (roomID,users)
    {
        var connectButton=roomModal.find('#connectToRoom');
        connectButton.unbind('click');
        connectButton.click(function(){
            UIselectedRoom();
            selectedRoom(roomID);
            roomModal.modal('hide');
        });
        roomModal.find("#connectedUsers").text('Connected Users:'+(users.length)+'/4');
        if(users.length!=0)
        {
            var tbody=roomModal.find('.tbodyModal');
            console.log('tbody is '+$(tbody));
            var currentTR;
            for(var i=0;i<users.length;i++)
            {
                currentTR=tbody.find('tr:eq('+i+')').show();
                for(var j=0;j<2;j++)
                {
                    //AICi e de munca cu issue #43
                    if(j==1)
                    {
                        var currentTD=currentTR.find('td:eq('+j+')');
                        currentTD.text(users[i]);
                    }
                }
                console.log('currentTR is '+currentTR);
            }
            for(var i=users.length;i<4;i++)
            {
                currentTR=tbody.find('tr:eq('+i+')').hide();
            }
        }
        else
            roomModal.find('table').hide();

    };
    this.UIAddFreeUsers = function (users)
    {
        var freeUsersBlock=$('.uncoonectedUsersBlock');
        freeUsersBlock.html('');
            for(var i=0;i<users.length;i++)
                freeUsersBlock.append('<p>'+users[i]+'</p>');
    };

    // ROOM Table Set-UP

    function addNewRoom (roomNumber)
    {
        var table=$('tbody.rooms');
        table.append('<tr class="is'+roomNumber+'" isroom="'+roomNumber+'"><td>Room'+ roomNumber +'</td></tr>');
        var currentTR=table.find('.is'+roomNumber);
        currentTR.click(function(){
            clickedRoom(currentTR.attr('isroom'))
        });
    }

    this.roomSetUp = function ()
    {
        for (var i = 1; i <= roomsAvailable; i++)
            addNewRoom(i);
        $('.addNewRoom').click(function(){
            
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

    // Room Table Set-up END


    /*
     *  Timer related functions
     */
    var timer, interval ;

    function addTime()
    {
        timer += 1000;
        if ( timer >= 10000 )
        {
            console.log ( "~Passed time" ) ;
            clearInterval(interval);
            submitAnswer(0, 10000);
        }
        console.log ( "Timer is: " + timer ) ;
    }

    function setUpTimer()
    {
        timer = 0;
        clearInterval(interval) ;
        interval = setInterval(addTime, 1000);
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
            $('#'+i).click(clickedAnswer);
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