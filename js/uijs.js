function UIClass() {
    //IMPORTANT VARS
    var clickedAnswerAlready = 0;
    var roomModal            = $('#roomModal');
    var inputmodal           = $('#inputQuestionModal');
    //IMPORTANT VARS END

    //ROOM SCORE START
    this.newRoom             = addNewRoom;
    this.UIUpdateUsersPresentation = function () {
        var scores         = roomHandler.scores;
        var connectedUsers = roomHandler.GET_connectedUsers();
        for (var i = 0; i < 3; i++) {
            if (connectedUsers[i] !== 0) 
                $('.casuta:eq(' + i + ')').text(connectedUsers[i][0] + ' : ' + scores[i]);
            else 
                $('.casuta:eq(' + i + ')').text('no user connected');
            if (connectedUsers[i][0] == loginHandler.username) 
            {
                loginHandler.thisIsUserNo = i;
            }
        }
    };
    //ROOM SCORE END

    // inputQuestion Start
    this.UIShowPopUPinputQuestion = function(intrebare,correctAnswer)
    {
        inputmodal.modal('show');
        $('#warCorrectAnswer').hide();
        gameHandler.correctAnswerForInput=correctAnswer;
        if( gameHandler.iAmWinner == 1 )
        {
            $('#inputQuestionAnswer').val('').focus();
            $(currentActivity).text('Question time!');
            inputmodal.find('#inputQuestion').text(intrebare);
            setUpTimer();
        }
        else
        {
            $('#inputQuestionAnswer').hide();
            $('#statusInputQuestion').show();
        }
    }
    function inputEntered()
    {
        var answer=document.getElementById("inputQuestionAnswer").value;
        submitAnswer(answer, timer);
        inputmodal.find('#inputQuestionForm').hide();
        inputmodal.find('#statusInputQuestion').show();
        interval = clearInterval(interval);
    }
    this.UIHidePopUpinputQuestion = function()
    {
        inputmodal.find('#inputQuestionForm').show();
        inputmodal.find('#statusInputQuestion').hide();
        inputmodal.find('table').hide();
        inputmodal.modal('hide');
    }
    this.UIUpdateInputResults = function(usernames,times,answer,userNO)
    {
        inputmodal.find('#statusInputQuestion').hide();
        var resultTable=inputmodal.find('table');
        resultTable.show();
        resultTable=resultTable.find('tbody');
        for(var i=0;i<times.length;i++)
        {
            var currentTR=resultTable.find('tr:eq('+i+')');
            currentTR.css({'background-color' : colors[userNO[i]]} );
            currentTR.find('td:eq(1)').text(usernames[i]);
            currentTR.find('td:eq(2)').text(answer[i]+' in '+times[i]);
        }
        for(var i=times.length;i<3;i++)
        {
            resultTable.find('tr:eq('+i+')').hide();
        }
        $('#warCorrectAnswer').show().text('Correct Answer was:'+gameHandler.correctAnswerForInput);

    }
    // inputQuestion End


    //4 Answers Pop-UP START
    this.UIShowPopUp4question = function (intrebare, answers, correctAnswer) {
        console.log(correctAnswer);
        $(currentActivity).text('Quesiton Time!')
        $("#fourQuestionModal").modal('show');
        setUpTimer();
        // $('#pop-up4a').show();
        $('#question').text(intrebare);
        for (var i = 1; i < 5; ++i) {
            $('#' + i).text(answers[i - 1]);
            UIHandler.colorAnswer(['#63AA9C'], i);
        }
        gameHandler.correctAnswer=correctAnswer;
        clickedAnswerAlready = 0;
    };

    this.UIHidePopUp4question = function () {
        $("#fourQuestionModal").modal('hide');
    };

    this.colorAnswer = function (colors, answerNumber) {
        var width     = 100 / colors.length;
        var answerDiv = $('.answer:eq(' + (answerNumber - 1) + ')');
        for (var i = 1; i <= colors.length; i++)
        answerDiv.find('#Color' + i).css({
            'width': width + '%',
            'background-color': colors[i - 1],
            'left': width * (i - 1) + '%'
        }).show();
        for (i = colors.length + 1; i <= 4; i++)
        answerDiv.find('#Color' + i).hide();
    };

    this.addGlow = function (answerNumber) {
        console.log(answerNumber);
        $('#' + answerNumber).parent().addClass('glow');
    };

    this.removeGlow = function (answerNumber) {
        $('#' + answerNumber).parent().removeClass('glow');
    };

    function UIClickedAnswer(answerClicked) {
        interval = clearInterval(interval);
        UIHandler.colorAnswer([colors[loginHandler.thisIsUserNo]], answerClicked);
    };

    function clickedAnswer() {
        if (clickedAnswerAlready == 0) {
            UIClickedAnswer($(this).attr('id'));
            submitAnswer($(this).attr('id'), timer);
            clickedAnswerAlready = 1;
        }
    }
    // 4 Answers Pop-UP END






    //ModalRoom UI START

    function UIselectedRoom() {
        $('.roomSelect').slideUp();
        $('.shouldBeHiddenBeforeEnteringAGame').show();
    }

    function clickedRoom(roomID) {
        roomModal.modal('show');
        getUsersFromRoom(roomID);
    }
    var teme=[0,'Biologie'];
    this.UIAddUsersForRoomTooltip = function (roomID, users, theme) {
        roomModal.find('#roomNumberModal').text('Room ' + roomID);
        roomModal.find('#themeModal').text('Theme: ' + teme[theme]);

        var connectButton = roomModal.find('#connectToRoom');
        connectButton.unbind('click');
        connectButton.click(function () {
            UIselectedRoom();
            selectedRoom(roomID);
            roomModal.modal('hide');
        });

        for ( i = 0 ; i < users.length ; ++ i )
            if ( ! users[i][0] ) 
            {
                users.length = i ;
                break;
            }

        roomModal.find("#connectedUsers").text('Connected Users:' + (users.length) + '/3');
        if (users.length != 0) {
            var tbody = roomModal.find('.tbodyModal');
            var currentTR;
            for (var i = 0; i < users.length; i++) {
                currentTR = tbody.find('tr:eq(' + i + ')').show();
                for (var j = 0; j < 2; j++) {
                    //AICi e de munca cu issue #43
                    if (j == 1) {
                        var currentTD = currentTR.find('td:eq(' + j + ')');
                        currentTD.text(users[i][0]);
                    }
                    else
                        if ( j == 0 )
                        {
                            currentTD = currentTR.find ( 'td:eq(' + j + ')' ) ;
                            currentTD.html ( "<img src='https://graph.facebook.com/" + users[i][1] + "/picture' height='25px' width='25px'>" ) ;
                        }
                }
            }
            for (var i = users.length; i < 4; i++) {
                currentTR = tbody.find('tr:eq(' + i + ')').hide();
            }
        } else roomModal.find('table').hide();

    };
    // ModalRoomUI End
    // ROOM Table Set-UP

    function addNewRoom(roomNumber) {
        var table = $('tbody.rooms');
        table.append('<tr class="is' + roomNumber + '" isroom="' + roomNumber + '"><td>Room' + roomNumber + '</td></tr>');
        var currentTR = table.find('.is' + roomNumber);
        currentTR.click(function () {
            clickedRoom(currentTR.attr('isroom'))
        });
    }

    function createNewRoom(roomNumber) {
        var theme = document.getElementById("themeForRoom").value;
        console.log(theme);
        addNewRoom(roomNumber);
        $('#roomCreationModal').modal('hide');
        newRoomAdded(roomsAvailable, theme); //call to publicAPI
    }


    this.roomSetUp = function () {
        for (var i = 1; i <= roomsAvailable; i++)
        addNewRoom(i);
        $('.addNewRoom').click(function () {

            //showing room modal
            $('#roomCreationModal').modal('show');
        });
        $('#createRoomBtn').click(function () {
            createNewRoom(++roomsAvailable);
        })

        $('.unconnectedUsers').click(function () {
            $(this).find('div').toggle();
        });

        for (var i = 0; i < 3; i++)
        $('.casuta:eq(' + i + ')').css({
            'background-color': colors[i]
        });
    };

    this.UIAddFreeUsers = function () {

    }
    // Room Table Set-up END
    //TIMER FUNCTION START
    var timer, interval;

    function addTime() {
        timer += 10;
        if (timer >= 10000) {
            clearInterval(interval);
            submitAnswer(0, 10000);
        }
    }

    function setUpTimer() {
        timer = 0;
        clearInterval(interval);
        interval = setInterval(addTime, 10);
    }
    //TIMER FUNCTIONS END
    
    // CONSTRUCT FUNCTIONS START
    this.construct = function () {
        setUpQuestion();
        tryButton();
    };

    function setUpQuestion() {
        for (var i = 1; i < 5; ++i)
            $('#' + i).click(clickedAnswer);
        $('#inputQuestionForm').bind("submit", function(event) {
            event.preventDefault();
            inputEntered();
        });
        inputmodal.find('#statusInputQuestion').hide();
        inputmodal.find('table').hide();
    }
    // CONTRUCT FUNCTION END
    //DEMO STUFF STARTS

    function tryButton() {
        $("#addQuestion").click(spawn);
    }

    function spawn() //rigged Question
    {
       showPopUpInputQuestion('Compozitori: În ce oraş a decedat Camille Saint-Saëns, compozitor francez din epoca romantică?');
    }
    //DEMO STUFF ENDS
}