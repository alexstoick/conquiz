
function LoginClass ( ){

    //Public properties
    this.username ;

    //Private properties

    //Constructor
    $("#submitUsername").click(setUsername);


    function setUsername()
    {
        this.username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + this.username );
        $("#addQuestion").show();
        $('.roomSelect').show();
        console.log ( this.username ) ;
        //connectedUsers[0] = this.username ;
        //UIUpdateUsersPresentation();
    }
}