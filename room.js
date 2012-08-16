function RoomClass ()
{
    //Public properties
    

    //Private properties
    var chosenRoom ; //public setter

    var connectedUsers = [ 0, 0, 0, 0];

    //Constructor
	
	//Public functions

	this.SET_chosenRoom = function ( value ) { chosenRoom = value ; } 

	this.GET_connectedUsers = function ( ) { return connectedUsers ; }
	
	this.removeUser = function (user)
    {
        console.log('removing');

        var userNo = 5;
        for (var i = 0; i < connectedUsers.length; i++)
        {
            console.log(connectedUsers[i], user);
            if (connectedUsers[i] == user) userNo = i;
        }
        connectedUsers[userNo] = 0;
        
        UIHandler.UpdateUsersPresentation();
    }

    this.addUsers = function (users)
    {
        console.log(users);
        for (var i = 0; i < users.length; i++)
        {
            connectedUsers[i] = users[i];
        }

        UIHandler.UpdateUsersPresentation();
    }

    //Private functions
}