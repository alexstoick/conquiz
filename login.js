
function LoginClass ( ){

    //Public properties
  //  this.username ;
    var username ;
    this.username = username ;

    //Private properties

    //Constructor
    this.construct = function ( ) {
        $("#submitUsername").click(setUsername);
    }


    function setUsername()
    {
        username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + username );
        $("#addQuestion").show();
        $('.roomSelect').show();
        console.log ( username ) ;
        //loggedIn ( this.username ) ;
    }
}