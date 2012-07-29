
#import('dart:html');
final BLACK="black";
final BLUE="blue";
num rotatePos = 0;
void main()
{
  query("#pop-up").hidden=true;
  drawDemo();
  showPopUpWindow("Questioning");
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
void showPopUpWindow(String question)
{
  final popUp= document.query("#pop-up");
  popUp.hidden=false;
  popUp.text=question;
 
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
