
function LoginClass ( ){

    //Public properties
  //  this.username ;
    var user ;
    this.username = user ;

    //Private properties

    //Constructor
    this.construct = function ( ) {
        $("#submitUsername").click(setUsername);
    };


    function setUsername()
    {
        user = document.getElementById("usernameForm").value;
        $(".login").text("Hello " + user );
        $("#addQuestion").show();
        $('.roomSelect').show();
        console.log ( user ) ;
        loggedIn ( user ) ;
    }
}