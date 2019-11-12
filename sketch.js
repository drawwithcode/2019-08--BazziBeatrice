var myMap;
var canvas;
var myLoc;
var mappa = new Mappa('MapboxGL', 'pk.eyJ1IjoiYmVhYmF6emkiLCJhIjoiY2sybjRuZjZ5MDl6bjNvbnYxbXA2dWt4biJ9.cPwbIpITcYwzSr8MQx48Dw');
// Let's put all our map options in a single object
var options = {
	lat: 0,
	lng: 0,
	zoom: 0.2,
	style: 'mapbox://styles/beabazzi/ck2vxwnc60ce51co1zrfoh7eu',
	pitch: 0
}

var PnLat = 84.999976;
var PnLon = -135.0006867;
// var PnLat = 64.753719;
// var PnLon = -147.4033247;
var PsLat = -84.9999998;
var PsLon = 44.9992951;

function preload(){
  // put preload code here
  myLoc = getCurrentPosition();

  Pnord = loadImage("./assets/northpole.png");
  Psud = loadImage("./assets/southpole.png");

}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	// background(100)
	//update options according to current location
	options.lat = myLoc.latitude;
	options.lng = myLoc.longitude;

	// Create a tile map with the options declared
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);
}

function draw() {
	clear();
	angleMode(DEGREES);

  fill('blue');
  noStroke();
  textStyle(BOLD)
  textSize(60);
  textAlign(CENTER);
  text("Your distance to the ", windowWidth/2, 150);
  text("end of the world", windowWidth/2, 210);

  var NorthDist = calcGeoDistance(myLoc.latitude, myLoc.longitude, PnLat, PnLon, "km");
  var SouthDist = calcGeoDistance(myLoc.latitude, myLoc.longitude, PsLat, PsLon, "km");

	var point = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
	fill('red');
  noStroke()
	push();
  // fill("white");
	translate(point.x, point.y);
	ellipse(0,0,20);
	pop();
  push();
  // fill("white");
	translate(point.x, point.y);
  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
	text("You are here", 0, -20);
	pop();

  var PnorthPoint = myMap.latLngToPixel(PnLat, PnLon);
  push();
  fill('white');
  noStroke();
  rectMode(CENTER);
  rect(PnorthPoint.x + 10, PnorthPoint.y + 55, 150, 65)
  pop();
  push();
  textSize(15);
  textAlign(CENTER);
  imageMode(CENTER);
	image(Pnord, PnorthPoint.x + 70, PnorthPoint.y + 50, 200, 200);
  text( 'NORTH POLE', PnorthPoint.x + 10, PnorthPoint.y + 50);
  text( Math.round(NorthDist) + ' km from you' , PnorthPoint.x + 10, PnorthPoint.y + 70);
  pop();

  var PsouthPoint = myMap.latLngToPixel(PsLat, PsLon);
  push();
  fill('white');
  noStroke();
  rectMode(CENTER);
  rect(PsouthPoint.x - 10, PsouthPoint.y - 40, 150, 65);
  pop();
  push();
  textSize(15);
  textAlign(CENTER);
  imageMode(CENTER);
	image(Psud, PsouthPoint.x - 10, PsouthPoint.y - 80, 150, 150);
  text( 'SOUTH POLE', PsouthPoint.x - 10 , PsouthPoint.y - 45);
  text( Math.round(SouthDist) + ' km from you' , PsouthPoint.x - 10, PsouthPoint.y - 25);
  pop();

  //line(x1,y1,x2,y2)
  strokeWeight(4);
  stroke(255,255,255);
  line()

}
