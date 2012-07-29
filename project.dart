
#import('dart:html');
final BLACK="black";
final BLUE="blue";
num rotatePos = 0;
void main()
{
  query("#pop-up").hidden=true;
  drawDemo();
  var a = new List();
  a=["ans1","ans2","ans3","ans4"];
  showPopUpWindow("Question" , a );
}
void drawDemo(){
  CanvasElement canvas = query("#canvas");
  var context = canvas.context2d;
 
  context.rect(0, 0, 960, 500);
  context.fillStyle=BLUE;
  context.fill();
  context.fillStyle=BLACK;
  context.fillText("This should be the map",200 , 200);
}
void showPopUpWindow(String question , List answers)
{
  final popUp= document.query("#pop-up");
  popUp.hidden=false;
  document.query("#question").text=question;
  document.query("#answer1").text=answers[0];
  document.query("#answer2").text=answers[1];
  document.query("#answer3").text=answers[2];
  document.query("#answer4").text=answers[3];
  
}
/*
void main() {
query("#text").text = "Welcome to Dart!";

query("#text").on.click.add(rotateText);
}

void rotateText(Event event) {
  rotatePos += 360;

  var textElement = query("#text");

  textElement.style.transition = "1s";
  textElement.style.transform = "rotate(${rotatePos}deg)";
}*/
