function RoomClass ()
{
    //Public properties
    

    //Private properties
    var chosenRoom ; //public setter
    var connectedUsers;

    //Constructor
	
	//Public functions

	function SET_chosenRoom ( value )
	{
		chosenRoom = value ;
	} 

	function SET_connectedUsers ( value )
	{
		connectedUsers = value ;
	}
	
	function removeUser(user)
    {
        console.log('removing');

        var userNo = 5;
        for (var i = 0; i < connectedUsers.length; i++)
        {
            console.log(connectedUsers[i], user);
            if (connectedUsers[i] == user) userNo = i;
        }
        connectedUsers[userNo] = 0;
        //UIUpdateUsersPresentation();
    }

    function addUsers(users)
    {
        console.log(users);
        for (var i = 0; i < users.length; i++)
        {
            connectedUsers[i] = users[i];
        }

        //UIHandler.UpdateUsersPresentation();
    }

	//Private functions
}