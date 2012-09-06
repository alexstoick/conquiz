 var button;
 var userInfo;

 window.fbAsyncInit = function()
 {
     FB.init({ appId: '134519973357696', status: true, cookie: true, xfbml: true, oauth: true});
     showLoader(true);

    function updateButton(response)
    {
        button       =   document.getElementById('fb-auth');
        userInfo     =   document.getElementById('user-info');

        if (response.authResponse)
        {
            //user is already logged in and connected
            FB.api('/me', function(info) { login(response, info); } ) ;
            button.onclick = function() { FB.logout(function(response) { logout(response); } ) ; } ;

        }
        else
        {
            //user is not connected to your app or logged out
            button.innerHTML = 'Login';
            button.onclick = function() {
                showLoader(true);
                FB.login( function(response) {
                    if (response.authResponse) 
                    {
                        FB.api('/me', function(info) { login(response, info); });
                    }
                    else
                    {
                        //user cancelled login or did not grant authorization
                        showLoader(false);
                    }
                }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me'} ) ;
            }
        }
    }

    // run once with current status and whenever the status changes
    FB.getLoginStatus(updateButton);
    FB.Event.subscribe('auth.statusChange', updateButton);
};

(function() 
{
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol
    + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
} () );


function login(response, info)
{
if (response.authResponse)
{
    //showLoader(false);
    //username = info.name ;
    loggedIn2 ( info.name , info.id );
}
}

function logout(response)
{
userInfo.innerHTML                             =   "";
document.getElementById('other').style.display =   "none";
showLoader(false);
}

function showLoader(status)
{
if (status)
    document.getElementById('loader').style.display = 'block';
else
    document.getElementById('loader').style.display = 'none';
}
                    