
function Login ( ){

    //Public properties
    this.username ;

    //Private properties

    //Constructor
    $("#submitUsername").click(login);


    function setUsername()
    {
        this.username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + this.username );
        $("#addQuestion").show();
        $('.roomSelect').show();
        connectedUsers[0] = this.username ;

        //UIUpdateUsersPresentation();
    }
}