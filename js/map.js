function MapClass ()
{
    //Public properties

    var paper ;
    this.paper = paper ;
    this.zoneIsUsed = [] ;
    this.zoneIsOwnedBy = [] ;
    //Private properties

    var zones = [];
    var zonesCanvas = [];

    //Constructor
    this.construct = function ( ) { drawCanvas ( ) ; initZone ( ) ; } ;

    function initZone ( )
    {
        for ( var i = 0 ; i < 14 ; ++ i )
        {
            mapHandler.zoneIsUsed[i] = false ;
            mapHandler.zoneIsOwnedBy[i] = '' ;
        }
    }


    function drawCanvas()
    {
        // MIGHT MODIFY starting point by 1 px
        // M inseamna goTo x y
        // NEVER NEVER modifica altceva inafara de primele 2 cifre daca nu vrei decat sa muti pozitia
        //zones[0] inseamna zona 1 NO SHIT
        var defaultAttributes = {
                                    fill: '#ECEAE0',
                                    stroke: '#63AA9C',
                                    'stroke-width': 3,
                                    'stroke-linejoin': 'round',
                                };

        paper = new Raphael(document.getElementById('canvasRaphael'),940,500);
        paper.rect(0, 0, 940, 500).attr({ fill: '#221E1D' });
        zones[0]  = "m 162,265.61 c 0,0 1.875,2.25 3,2.25 1.125,0 0.75,1.5 0.75,1.5 0,0 -2.25,2.25 -3.375,3.625 -1.125,1.375 -0.625,4.5 -1.75,4.5 -1.125,0 -6.25,0.125 -8,0.125 -1.75,0 -3,-0.25 -3.875,1.25 -0.875,1.5 1.25,5.75 1.75,7.25 0.5,1.5 -1.625,2.5 -1.625,3.375 0,0.875 0.75,3.375 0.875,4.5 0.125,1.125 -3.75,2.25 -4.875,3.5 0,0 2.625,0 2.625,1.875 0,1.875 -0.75,4 -0.75,5.375 0,1.375 1.25,3.625 2.5,3.75 1.25,0.125 0.375,3.625 -0.5,4.75 -0.875,1.125 4.875,-0.875 4.875,0.875 0,1.75 -4.5,3.125 -4.875,5 -0.375,1.875 -2,4.125 -3.125,4.125 0,0 1.625,2.75 3,3 1.375,0.25 2.75,1 2.75,2.625 0,1.625 3.125,2.375 4,2.125 0.875,-0.25 2.625,2.125 2.75,2.75 0.125,0.625 4,8.375 2.5,11.875 -1.5,3.5 0.625,6.625 0.75,7.375 0.125,0.75 -0.173,2.267 -0.173,2.267 -0.258,0.137 -0.508,0.272 -0.751,0.407 2.431,-1.344 5.622,-2.875 8.425,-2.174 4.5,1.125 10.125,2 12.125,1.75 2,-0.25 4.375,-1.25 5.875,-1.25 1.5,0 6.75,-1.75 9.375,-2.75 2.625,-1 5.125,-2 7.625,-1.75 2.5,0.25 11.25,-0.75 11.5,-2.875 0.25,-2.125 -0.5,-6.625 1.75,-7.875 0,0 -3.958,-1.626 -5.292,-6.292 -1.334,-4.666 -4.333,-1.332 -5.833,-3.166 -1.5,-1.834 -2.167,-9.166 -4.167,-14 -2,-4.834 -2.5,-7.5 -2.5,-10 0,-2.5 -2.667,-6.333 -3.333,-9.333 -0.666,-3 -6.167,-1.333 -7,-4 -0.833,-2.667 -2.167,-3.833 -3.5,-4 -1.333,-0.167 0.833,-3.5 3.5,-2.667 2.667,0.833 -2.333,-5.5 -6.167,-6.667 0,0 -4.667,-0.333 -4.833,-2.667 -0.166,-2.334 0.5,-6.5 -3.333,-6.5 -3.833,0 -10.335,-1.166 -12.668,-3.833 z"; 
        zones[1]  = "m 169.625,250.61 c -0.25,1.125 -1.625,0.25 -4,1.25 -2.375,1 -3.375,4.5 -3.375,5.875 0,1.375 2.75,3.5 1.625,4.625 -1.125,1.125 -1.875,3.25 -1.875,3.25 2.333,2.667 8.833,3.833 12.667,3.833 3.834,0 3.167,4.167 3.333,6.5 0.166,2.333 4.833,2.667 4.833,2.667 3.833,1.167 8.833,7.5 6.167,6.667 -2.666,-0.833 -4.833,2.5 -3.5,2.667 1.333,0.167 2.667,1.333 3.5,4 0.833,2.667 6.333,1 7,4 0.667,3 3.333,6.833 3.333,9.333 0,2.5 0.5,5.166 2.5,10 2,4.834 2.667,12.166 4.167,14 1.5,1.834 4.5,-1.5 5.833,3.166 1.333,4.666 5.292,6.292 5.292,6.292 0,0 -0.5,-5.875 0.125,-7.25 0.625,-1.375 -0.875,-6 -1.5,-8.375 -0.625,-2.375 1.625,-4.75 2.25,-5.375 0.625,-0.625 -2.5,-1.875 -2.125,-3.25 0.375,-1.375 4.625,-0.5 5.5,-1.75 0.875,-1.25 0.25,-5.875 1.125,-7.75 0.875,-1.875 5.875,-2 7.25,-3.25 1.375,-1.25 -1,-4.5 1.375,-5.875 2.375,-1.375 5.125,1.125 6.75,1 1.625,-0.125 2,-5.875 4.125,-7.625 2.125,-1.75 6.75,-2 8.5,-4.625 1.75,-2.625 0.125,-3.875 0.375,-4.375 0.25,-0.5 -0.25,-6.25 -9.125,-9.875 -8.875,-3.625 -1.5,-4.75 -1.625,-5.125 -0.125,-0.375 -6.375,-5.625 -12.875,-5.625 -6.5,0 -6.625,4.875 -10.375,4.25 -3.75,-0.625 -1.625,-4 -0.875,-4.25 0.75,-0.25 -2.5,-2.125 -5.125,-2.125 -2.625,0 -4.25,-0.5 -6.25,-2 -2,-1.5 -5.875,-2 -8,-1.125 -2.125,0.875 -2.125,4.5 -4.25,3.25 -2.125,-1.25 -5.125,0.5 -7,1.75 -1.875,1.25 -4,-3.5 -4.5,-5.5 -0.5,-2 -4.875,-1.25 -6.75,-0.5 -1.875,0.75 -4.5,-2.75 -4.5,-2.75 z";
        zones[2]  = "m 230.167,192.777 c 0.833,0 1.333,-1.833 2.667,-1.833 1.334,0 4.333,1.333 5.833,1.167 0,0 2.833,4.5 1.833,5 -1,0.5 -6,2.5 -4,6 2,3.5 10,6.5 10.75,9.25 0.75,2.75 -2.5,6.75 -1,8.5 1.5,1.75 8.5,4.25 3.25,14 l -0.125,0.75 c -0.875,0.25 -6,3.125 -6,4.25 0,1.125 3.5,3.375 2.375,5 -1.125,1.625 -5.375,1.5 -5.375,3.75 0,2.25 2,6.25 0.25,7.125 -1.75,0.875 -6.375,1.625 -0.5,9.5 -0.125,-0.375 -6.375,-5.625 -12.875,-5.625 -6.5,0 -6.625,4.875 -10.375,4.25 -3.75,-0.625 -1.625,-4 -0.875,-4.25 0.75,-0.25 -2.5,-2.125 -5.125,-2.125 -2.625,0 -4.25,-0.5 -6.25,-2 -2,-1.5 -5.875,-2 -8,-1.125 -2.125,0.875 -2.125,4.5 -4.25,3.25 -2.125,-1.25 -5.125,0.5 -7,1.75 -1.875,1.25 -4,-3.5 -4.5,-5.5 -0.5,-2 -4.875,-1.25 -6.75,-0.5 -1.875,0.75 -4.5,-2.75 -4.5,-2.75 0.25,-1.125 1.25,-4.625 0.625,-5 -0.625,-0.375 -3.5,0.625 -3.5,-0.125 0,-0.75 1,-5.5 -1,-6.75 -2,-1.25 -2.25,-2.5 -3.25,-3.625 -1,-1.125 -0.5,-1.5 -0.5,-1.5 0,0 4.5,0.125 5,-0.75 0.5,-0.875 0.625,-3.625 0.625,-3.625 0,0 2.5,-2.5 1.75,-3.5 -0.75,-1 -4.125,-1.75 -5,-3.375 -0.875,-1.625 1.625,-2.875 1.625,-4.25 0,0 7.5,0.5 10,2.25 2.5,1.75 1.5,5.25 4,5.25 2.5,0 6.5,4.5 8.25,4.5 1.75,0 6.75,-1.75 6.75,-1.75 l 0.5,-7.25 c 0,0 4.5,6.25 5.75,5.25 1.25,-1 6.75,-8.25 8.75,-9.25 2,-1 -1.75,-3 -1.25,-4.75 0.5,-1.75 2,-5 2.75,-5 0.75,0 7.5,-0.25 7.75,-1.5 0.25,-1.25 4.25,-7.75 7.25,-7.25 3,0.5 4,2.5 4.25,1.75 0.25,-0.75 -0.583,-7.584 -0.583,-7.584 z";
        zones[3]  = "m 274.375,327.86 c -1.375,-1.25 -4.875,4.375 -7,3.5 -2.125,-0.875 -8.375,-1.25 -11.5,-0.375 -3.125,0.875 -9.25,5.125 -12.875,5.125 -3.625,0 -6.875,-2.625 -10.25,-2.875 -3.375,-0.25 -13.375,4.25 -15.625,5.5 -2.25,1.25 -1.5,5.75 -1.75,7.875 0,0 6.125,3.25 11.125,3 0,0 4.25,0.75 3.25,4 -1,3.25 0,8.25 0.25,9 0.25,0.75 -0.75,4.25 -2.5,7.25 -1.75,3 -2.75,5 -2.75,9 0,4 0.75,16 0.5,18.75 -0.043,0.477 -0.157,0.812 -0.312,1.051 0.834,2.088 1.698,4.949 2.562,4.949 1.75,0 4.5,4.5 4.5,7.5 0,0 1.5,2 4.75,0.75 3.25,-1.25 4.25,1 5,1.25 0.75,0.25 4.25,-3 7.25,-2.75 3,0.25 4.25,-5.5 5.25,-5 1,0.5 1.5,6 4,4.5 2.5,-1.5 -1.75,-7 -1.75,-9.25 0,-2.25 -2.75,-7.25 1.5,-12.75 4.25,-5.5 5.75,-6.25 5.75,-4 0,2.25 2,4 3.5,-3.25 1.5,-7.25 2.5,-12.5 1,-17.5 -1.5,-5 -1.5,-10.5 -0.25,-14 1.25,-3.5 -0.25,-9.5 1,-11.25 1.25,-1.75 6.097,-9.343 5.375,-10 z";
        zones[4]  = "m 250.875,280.235 c 0,0.559 1.375,1.75 -0.375,4.375 -1.75,2.625 -6.375,2.875 -8.5,4.625 -2.125,1.75 -2.5,7.5 -4.125,7.625 -1.625,0.125 -4.375,-2.375 -6.75,-1 -2.375,1.375 0,4.625 -1.375,5.875 -1.375,1.25 -6.375,1.375 -7.25,3.25 -0.875,1.875 -0.25,6.5 -1.125,7.75 -0.875,1.25 -5.125,0.375 -5.5,1.75 -0.375,1.375 2.75,2.625 2.125,3.25 -0.625,0.625 -2.875,3 -2.25,5.375 0.625,2.375 2.125,7 1.5,8.375 -0.625,1.375 -0.125,7.25 -0.125,7.25 2.25,-1.25 12.25,-5.75 15.625,-5.5 3.375,0.25 6.625,2.875 10.25,2.875 3.625,0 9.75,-4.25 12.875,-5.125 3.125,-0.875 9.375,-0.5 11.5,0.375 2.125,0.875 4.75,-2.75 7,-3.5 1.296,-0.432 3.629,-0.49 5.661,-0.438 0,0 -0.997,-9.299 -2.15,-9.957 -1.153,-0.658 -1.812,-5.6 2.47,-6.094 4.282,-0.494 2.799,-2.634 2.47,-3.293 -0.329,-0.659 -6.587,-2.141 0.659,-7.082 7.246,-4.94 10.705,-7.081 10.869,-8.728 0.164,-1.647 -4.775,-3.623 -8.069,-2.8 -3.294,0.823 -6.917,3.129 -7.74,1.153 -0.823,-1.976 -0.329,-14.657 -0.329,-14.657 0,0 -6.752,0 -8.893,1.482 -2.141,1.482 -6.752,0.494 -8.069,0 -1.317,-0.494 -10.382,-0.022 -10.379,2.789 z";
        zones[5]  = "m 240.125,265.235 c 0.236,0.317 -7.25,1.5 1.625,5.125 8.26,3.374 9.264,8.583 9.162,9.692 0.393,-2.643 9.054,-3.089 10.341,-2.606 1.317,0.494 5.929,1.482 8.069,0 2.14,-1.482 8.893,-1.482 8.893,-1.482 0,0 -0.494,12.681 0.329,14.657 0.823,1.976 4.446,-0.33 7.74,-1.153 2.027,-0.506 4.673,0.048 6.374,0.933 -0.048,-0.025 -0.092,-0.051 -0.141,-0.075 -0.018,-0.009 -0.036,-0.018 -0.055,-0.026 0,0 6.037,-6.439 11.037,-4.439 2.459,0.984 3.5,0.375 6.625,-1 -6.042,-0.75 -5.792,-5.25 -8.958,-6.417 -3.166,-1.167 -8.833,-2 -9.333,-3.5 -0.5,-1.5 -2.833,-1.5 -2.5,-4 0.333,-2.5 3.5,-2.333 4.333,-3.167 0.833,-0.834 0.833,-2.5 1.833,-6.333 1,-3.833 9.167,-7.5 12.333,-9.5 3.166,-2 9.5,-13.667 6.167,-18.667 -3.333,-5 -1.167,-7.833 -0.667,-11.5 0.5,-3.667 -3.332,-10.157 -3.332,-10.157 0.05,0.002 0.098,-0.002 0.147,-0.001 -1.209,-0.021 -2.524,-0.36 -3.813,-1.174 0,0 -4.209,-0.958 -4.709,-1.583 0,0 -8.625,3 -10.75,3 -2.125,0 -5.375,5.5 -6.625,6.875 -1.25,1.375 -3.125,5.25 -1.875,7.625 1.25,2.375 -1.25,2.25 -1.25,2.25 0,0 -3.25,-4.25 -5.25,-4.625 -2,-0.375 -3.75,2.375 -3.875,3.25 -0.125,0.875 -2.25,4.25 -3.75,5.375 -1.5,1.125 -1,3.5 -3,4.625 -2,1.125 -5.75,2.25 -9,1.375 -3.25,-0.875 -6,-3.25 -6.875,-3 -0.875,0.25 -6,3.125 -6,4.25 0,1.125 3.5,3.375 2.375,5 -1.125,1.625 -5.375,1.5 -5.375,3.75 0,2.25 2,6.25 0.25,7.125 -1.75,0.875 -6.375,1.623 -0.5,9.498 z";
        zones[6]  = "m 301.625,421.235 c 2.75,-1 8.25,-2.625 9.875,-2.5 1.625,0.125 2.25,-2.75 2.875,-4.625 0.625,-1.875 1.75,-4.25 -0.625,-5.25 -2.375,-1 -3.5,-4.625 -4.5,-6.75 -1,-2.125 2.75,-3.375 3,-4.625 0.25,-1.25 -3.625,-0.875 -2.625,-2.25 1,-1.375 0.75,-3.375 0.625,-8.125 -0.125,-4.75 -0.75,-15.75 -2,-16 -1.25,-0.25 -0.875,-2.625 -0.5,-3.375 0.375,-0.75 -0.875,-2.25 -1.375,-6.625 -0.5,-4.375 2.875,-1.75 4.75,-0.5 1.875,1.25 3.75,-1.25 4,-5.125 0.25,-3.875 1.875,-12 1.875,-12 -1.875,0 -3.5,-3 -3.5,-3 0,0 -0.75,-4.375 -3.625,-5.5 -2.875,-1.125 -5.875,-3.625 -7.75,-4.875 -1.875,-1.25 -10.5,-1.125 -12.375,-1.375 -1.875,-0.25 -4.75,-1 -6.25,-1.125 -1.5,-0.125 -6.875,-0.5 -9.125,0.25 0.722,0.656 -4.125,8.25 -5.375,10 -1.25,1.75 0.25,7.75 -1,11.25 -1.25,3.5 -1.25,9 0.25,14 1.5,5 0.5,10.25 -1,17.5 -1.372,6.629 -3.156,5.73 -3.453,3.808 0.144,1.509 0.646,5.508 1.869,4.692 1.5,-1 4.834,-6.167 5.167,-5.667 0.333,0.5 0.833,11.834 5.167,12.167 4.334,0.333 6.333,-0.834 6,1.333 -0.333,2.167 -1.833,3.166 -1.667,4.5 0.166,1.334 2.5,6.666 2.5,8 0,1.334 -2.334,4.5 -1.167,7 1.167,2.5 -0.333,6.334 1.833,6.334 2.166,0 6.5,-0.834 7.167,-0.334 10e-4,0 8.209,-0.208 10.959,-1.208 z";
        zones[7]  = "m 292.463,290.3 c 0.019,0.009 0.037,0.018 0.055,0.026 1.145,0.566 1.903,1.281 1.836,1.942 -0.165,1.647 -3.623,3.788 -10.869,8.728 -7.246,4.941 -0.988,6.422 -0.659,7.082 0.329,0.66 1.812,2.799 -2.47,3.293 -4.282,0.494 -3.623,5.436 -2.47,6.094 1.153,0.658 2.15,9.957 2.15,9.957 -0.004,0 -0.008,0 -0.012,0 1.5,0.038 2.838,0.136 3.476,0.188 1.5,0.125 4.375,0.875 6.25,1.125 1.875,0.25 10.5,0.125 12.375,1.375 1.875,1.25 4.875,3.75 7.75,4.875 2.875,1.125 3.625,5.5 3.625,5.5 0,0 1.625,3 3.5,3 1.875,0 5.75,-2.75 7.75,-3.875 2,-1.125 6.25,-3.625 8,-3.625 1.75,0 7.375,-1.5 9.5,-1 2.125,0.5 5.25,2.25 6,3.375 0.75,1.125 2.75,-0.625 3.875,-1.875 1.125,-1.25 2.375,-2 4.5,-1.875 h 2.875 c 0,0 2.501,-3.823 2.333,-3.833 0,0 -5.583,-7.167 -7.458,-10.167 -1.875,-3 -7.625,-5 -9.5,-5 -1.875,0 -7.25,0.75 -8.625,-0.5 -1.375,-1.25 -6.875,-6 -5.75,-7.5 1.125,-1.5 3.5,-2.5 3.25,-3.625 -0.25,-1.125 -5.875,-4.875 -5,-8.625 0.875,-3.75 -2.125,-2 -4.75,-4.125 -2.625,-2.125 -1.75,-5 -3.625,-5 -1.875,0 -7.125,-2.75 -10.25,-1.375 -3.125,1.375 -4.166,1.984 -6.625,1 -5,-2 -11.037,4.44 -11.037,4.44 z";
        zones[8]  = "m 310.125,284.86 c 3.388,0.42 8.375,1.375 10.25,1.375 0,0 5.875,0.375 6.375,-4.375 0.5,-4.75 6.75,-8.25 8.5,-8.25 1.75,0 4.25,-2.25 4.25,-2.25 0,0 3.75,12 5.75,12 2,0 10,2 11.5,1 1.5,-1 7.75,-3.75 10,-3.75 2.25,0 4.25,-5.25 4.25,-7 l 3.167,3 c -2.167,-2.667 -1.833,-8 -3.833,-9.5 -2,-1.5 -2.334,3.5 -3.667,3.167 -1.333,-0.333 -2,-7.5 -6,-8 -4,-0.5 -6.363,0.995 -5.833,-1.833 0.5,-2.667 2.999,-1.167 3.166,-3.333 0.167,-2.166 -0.167,-7.333 -2.5,-11.167 -2.333,-3.834 -3,-1.333 -4.833,-1.833 -1.833,-0.5 -5.167,-0.833 -6,-4.667 -0.833,-3.834 -0.499,-7 -2.333,-9.333 -1.834,-2.333 -1.192,-4.54 -0.167,-5.167 3,-1.833 4.86,-0.221 5,-2.167 0.167,-2.333 -2.167,-1.667 -3.167,-3.667 -1,-2 -3.5,-8.5 -7.833,-9.167 -4.333,-0.667 -6.999,0.667 -8.833,-0.833 -1.834,-1.5 -6.001,-2 -8.834,-1.667 -2.833,0.333 -2.666,1.167 -4.166,2.667 -0.914,0.915 -2.51,1.581 -4.334,1.509 0,0 3.833,6.491 3.333,10.158 -0.5,3.667 -2.666,6.5 0.667,11.5 3.333,5 -3.001,16.667 -6.167,18.667 -3.166,2 -11.333,5.667 -12.333,9.5 -1,3.833 -1,5.5 -1.833,6.333 -0.833,0.833 -4,0.667 -4.333,3.167 -0.333,2.5 2,2.5 2.5,4 0.5,1.5 6.167,2.333 9.333,3.5 3.166,1.167 2.916,5.666 8.958,6.416 z";
        zones[9]  = "m 327.834,415.943 c -0.038,0.189 -0.043,-0.381 -0.121,-0.563 -0.658,-1.539 -3.836,-2.621 -4.879,-2.771 -1.166,-0.167 -3,0.167 -3,1.333 0,1.166 -1,2.167 -4,4.667 -3,2.5 -4.334,0.125 -4.334,0.125 1.625,0.125 2.25,-2.75 2.875,-4.625 0.625,-1.875 1.75,-4.25 -0.625,-5.25 -2.375,-1 -3.5,-4.625 -4.5,-6.75 -1,-2.125 2.75,-3.375 3,-4.625 0.25,-1.25 -3.625,-0.875 -2.625,-2.25 1,-1.375 0.75,-3.375 0.625,-8.125 -0.125,-4.75 -0.75,-15.75 -2,-16 -1.25,-0.25 -0.875,-2.625 -0.5,-3.375 0.375,-0.75 -0.875,-2.25 -1.375,-6.625 -0.5,-4.375 2.875,-1.75 4.75,-0.5 1.875,1.25 3.75,-1.25 4,-5.125 0.25,-3.875 1.875,-12 1.875,-12 1.875,0 5.75,-2.75 7.75,-3.875 0,0 1.5,3.75 1.5,6 0,2.25 3,5.5 4,6.75 1,1.25 -1.75,3 -1.25,4.75 0.5,1.75 5.5,6.25 6.5,7.25 1,1 4.5,5.75 3.5,9 -1,3.25 4.75,5.25 6.75,5.25 2,0 -1.5,6 -0.5,8.25 1,2.25 4.25,-1.25 6,1.25 1.75,2.5 2,11 3.5,13 1.5,2 0,5.5 -3.5,8.5 -3.5,3 -5.5,3.5 -6.75,2.75 -1.25,-0.75 -4.25,-3 -6.25,-2 -2,1 -4.25,-1 -6,-0.25 0,0.001 -3.082,-0.833 -4.416,5.834 z";
        zones[10] = "m 374.5,392.11 c 1.627,-0.407 4,-1.5 5,-1.5 1,0 5.75,0 7.25,-2.5 1.5,-2.5 6.75,-2.875 6.75,-2.875 -1,-0.5 -2.125,-6 -1.875,-7.25 0.25,-1.25 -1.5,-4.75 -2.75,-5.5 -1.25,-0.75 -2.875,-5.625 -2.875,-5.625 0,0 -1.75,-2.875 -2.125,-5.125 -0.375,-2.25 -3.75,-3.5 -5.25,-3.25 -1.5,0.25 -4.625,-1.5 -6.125,-1.625 -1.5,-0.125 -1.5,-5.25 -3.125,-5.5 -1.625,-0.25 -2,-4.875 -1.875,-6.625 0.125,-1.75 -2.75,-2.875 -3.625,-6.375 -0.875,-3.5 -5.125,-3.625 -7.25,-3.75 -2.125,-0.125 -3.375,0.625 -4.5,1.875 -1.125,1.25 -3.125,3 -3.875,1.875 -0.75,-1.125 -3.875,-2.875 -6,-3.375 -2.125,-0.5 -7.75,1 -9.5,1 -1.75,0 -6,2.5 -8,3.625 0,0 1.5,3.75 1.5,6 0,2.25 3,5.5 4,6.75 1,1.25 -1.75,3 -1.25,4.75 0.5,1.75 5.5,6.25 6.5,7.25 1,1 4.5,5.75 3.5,9 -1,3.25 4.75,5.25 6.75,5.25 2,0 -1.5,6 -0.5,8.25 1,2.25 4.25,-1.25 6,1.25 1.171,1.672 1.67,6.029 2.322,9.33 0,0 2.428,-5.33 5.928,-5.33 3.5,0 14,0.25 15,0 z";
        zones[11] = "m 371,273.61 c 0,1.75 -2,7 -4.25,7 -2.25,0 -8.5,2.75 -10,3.75 -1.5,1 -9.5,-1 -11.5,-1 -2,0 -5.75,-12 -5.75,-12 0,0 -2.5,2.25 -4.25,2.25 -1.75,0 -8,3.5 -8.5,8.25 -0.5,4.75 -6.375,4.375 -6.375,4.375 1.875,0 1,2.875 3.625,5 2.625,2.125 5.625,0.375 4.75,4.125 -0.875,3.75 4.75,7.5 5,8.625 0.25,1.125 -2.125,2.125 -3.25,3.625 -1.125,1.5 4.375,6.25 5.75,7.5 1.375,1.25 6.75,0.5 8.625,0.5 1.875,0 7.625,2 9.5,5 1.875,3 7.458,10.167 7.458,10.167 0,0 2.167,-3.333 3.667,-3.333 1.5,0 2.501,-1 3.167,-2.167 0.666,-1.167 2,-0.333 3.333,0.667 1.333,1 1.833,1 3,-0.167 1.167,-1.167 0.392,-4.617 1.5,-6.834 1.333,-2.666 3.167,-3.666 3.5,-5.166 0.333,-1.5 -2.834,-6.834 -2,-10.334 0.834,-3.5 3,-7.5 2,-13 -1,-5.5 -3.666,-11.167 -5.833,-13.833";
        zones[12] = "m 430.5,381.943 c -0.167,-2.334 2,-9.5 1.833,-10.666 -0.167,-1.166 -4,0.5 -4.333,-3.5 -0.333,-4 -2.833,-8.5 -3,-9 -0.167,-0.5 -1.833,1.833 -3.5,1.833 -1.667,0 -1.833,-1.833 -0.667,-4.167 1.166,-2.334 4.5,-3.333 7.167,-3 2.667,0.333 7,1.5 7.667,0.167 0.667,-1.333 -0.5,-3.833 -0.5,-3.833 -1,-3.666 1.333,-1.167 1.833,-2.667 0.972,-2.916 2.5,-6.875 2.5,-6.875 -1.125,2.5 -7.625,0.375 -8.125,-1.25 -0.5,-1.625 -3.375,-2.5 -4.5,-1.875 -1.125,0.625 -5.25,3.125 -4.75,0.25 0.5,-2.875 -4.75,-2.125 -5.375,-2.125 -0.625,0 -4.625,-5.875 -6.75,-5.5 -2.125,0.375 -10.125,0.5 -11.375,-1.375 -1.25,-1.875 -5.25,-4.875 -8.125,-4.875 -2.875,0 -10.25,-9.291 -10.5,-9.708 -0.333,1.5 -2.167,2.5 -3.5,5.166 -1.108,2.217 -0.333,5.667 -1.5,6.834 -1.167,1.167 -1.667,1.167 -3,0.167 -1.333,-1 -2.667,-1.834 -3.333,-0.667 -0.666,1.167 -1.667,2.167 -3.167,2.167 -1.5,0 -3.667,3.333 -3.667,3.333 0.168,0.01 -2.525,3.821 -2.333,3.833 2.234,0.135 3.569,0.527 4.375,3.75 0.875,3.5 3.75,4.625 3.625,6.375 -0.125,1.75 0.25,6.375 1.875,6.625 1.625,0.25 1.625,5.375 3.125,5.5 1.5,0.125 4.625,1.875 6.125,1.625 1.5,-0.25 4.875,1 5.25,3.25 0.375,2.25 2.125,5.125 2.125,5.125 0,0 1.625,4.875 2.875,5.625 1.25,0.75 3,4.25 2.75,5.5 -0.25,1.25 0.875,6.75 1.875,7.25 1,0.5 6.875,2.75 10.75,2.125 3.875,-0.625 8.625,0.625 12.75,0.5 4.125,-0.125 6.5,0.25 9.5,1.625 0,0 4.167,-5.208 4,-7.542 z";
        zones[13] = "m 390.5,323.485 c 2.875,0 6.875,3 8.125,4.875 1.25,1.875 9.25,1.75 11.375,1.375 2.125,-0.375 6.125,5.5 6.75,5.5 0.625,0 5.875,-0.75 5.375,2.125 -0.5,2.875 3.625,0.375 4.75,-0.25 1.125,-0.625 4,0.25 4.5,1.875 0.5,1.625 7,3.75 8.125,1.25 1.125,-2.5 7.667,-9.125 7.667,-9.125 -1.166,-5.167 -4.167,-11.167 -5.834,-11.5 -1.667,-0.333 -5.333,-4.333 -5.5,-5.667 -0.167,-1.332 -4.333,-8.166 -6.333,-10.166 -2,-2 -2.5,-10 -3.333,-12 -0.833,-2 2.666,-4.167 3.666,-4.667 1,-0.5 7.5,-0.333 8.5,-2.667 1,-2.334 3.021,-3.373 3.021,-3.373 -0.753,0.054 -4.188,-3.627 -4.854,-2.96 -0.75,0.75 -1.5,4.75 -4,1.25 -2.5,-3.5 -8.25,-0.25 -9.25,0.5 -1,0.75 -1.75,4.5 -3,4.5 -1.25,0 -6,1 -7.25,1.5 -1.25,0.5 -3,1.75 -3.5,2.75 -0.5,1 -8,0 -9.5,-1 -1.5,-1 -4.75,-3.25 -7.5,-1 -2.75,2.25 -2.75,4.75 -3.75,5.75 -1,1 -8.75,-1.917 -8.75,-1.917 1,5.5 -1.166,9.5 -2,13 -0.834,3.5 1.21,9.016 2,10.334 0.25,0.417 7.625,9.708 10.5,9.708 z";
        for (var i = 0; i < zones.length; i++)
        {
            zonesCanvas[i] = paper.path(zones[i]);
            zonesCanvas[i].attr(defaultAttributes).scale(2,1.5,100,400);
            zonesCanvas[i].click(function() { clickedZone(this.id); });
        }
        setPaper ( paper) ;
    }
}