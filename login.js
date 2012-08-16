
function LoginClass ( ){

    //Public properties
  //  this.username ;
    this.username = "abc" ;

    //Private properties

    //Constructor
    this.construct = function ( ) {
        $("#submitUsername").click(setUsername);
    }


    function setUsername()
    {
        this.username = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + this.username );
        $("#addQuestion").show();
        $('.roomSelect').show();
        console.log ( this.username ) ;
        loggedIn ( this.username ) ;
    }
}