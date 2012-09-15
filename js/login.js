
function LoginClass ( ){

    //Public properties
  //  this.username ;
    var user ;
    this.username = user ;
    var thisIsUserNo=-1;
    this.thisIsUserNo=thisIsUserNo=-1;;
    this.profilePIC = "" ;
    //Private properties

    //Constructor
    this.construct = function ( ) {
        $("#submitUsername").click(setUsername);
        $("#loginForm").bind("submit", function(event) {
            event.preventDefault();
            setUsername();
        });
    };


    function setUsername()
    {
        user = document.getElementById("usernameForm").value;
        $("#usernameNav").text("Hello " + user );
        $('#loginDropdown').hide();
        $("#addQuestion").show();
        $('.roomSelect').show();
        loggedIn ( user ) ;
    }
}