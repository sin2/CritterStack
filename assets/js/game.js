var canvas;
var stage;
var bounds;

var switchDir;
var speed;
var towerLevel;
var tower;
var towerLast;
var towerSize;

var ktileSize = 30;
var kborder = 25;
var kcolumns = 9;
var krows = 14;

var background;

function init() {
	canvas = document.getElementById('canvas');

		startPreload(function(){
			StartMenu();
			});
}

function StartMenu()
{
	DisplayMenu(function(){StartInstructions();});
}

function StartInstructions()
{
	//DisplayInstructions(function(){start();});
	start();
}

function start() {
	bounds = new Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;
				
	stage = new Stage(canvas);
	
	background = new Image();
	
	switchDir = 1;
	speed = 3;
	tower = [];
	towerLast = [];
	towerLevel = 1;
	towerSize = 5;
	
	var g = new Graphics();
	//stroke of 1 px
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(255,0,0,.7));
	g.drawRect(0,0, ktileSize,ktileSize);
	circle = new Shape(g);
	circle.x = kborder;
	circle.y = bounds.height - ktileSize*towerLevel;
	//add the circle to the stage.
	stage.addChild(circle);
	
	g = new Graphics();
	//stroke of 1 px
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(0,0,0,1.0));
	g.drawRect(0,0, canvas.width,canvas.height);
	g.beginStroke(Graphics.getRGB(255,0,0,.7));
	for(var step = kborder;step<canvas.width;step+= 30) {
		g.drawRect(step,0,0,canvas.height);
	}
	for(var step = kborder;step<canvas.height;step+= 30) {
		g.drawRect(step,0,0,canvas.height);
	}
	grid = new Shape(g);
	grid.x = 0;
	grid.y = 0;
	//add the circle to the stage.
	stage.addChild(grid);
	
	
	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);
	canvas.addEventListener("mousedown", placeTile, false);
}

//function handleKeyDown(e) {
	//cross browser issues exist
//	if(!e){ var e = window.event; }
//	switch(e.keyCode) {
//	case KEYCODE_SPACE: placeTile(); break;
//	case KEYCODE_A:
//	case KEYCODE_LEFT: lfHeld = false; break;
//	case KEYCODE_D:
//	case KEYCODE_RIGHT: rtHeld = false; break;
//	case KEYCODE_W:
//	case KEYCODE_UP: fwdHeld = false; break;
//	}
//}

document.onkeydown = function(evt) {
  evt = evt || window.event;

  if(evt.keyCode == 32){
  	placeTile();
  	//TODO: check tower
  }
};

function placeTile() {
	// Save last tower placement
	if(tower != []){
		towerLast = tower;
	}
	tower = [circle.x,towerLevel,towerSize];

	// Check the tower placement 
	if(checkTower() == true){
		drawTower();
	}
	else {
		if(towerLevel == 14){
			nextStage();
		}
		else{
			//TODO: Gameover
		
		} 
	}

	// Increment stuff
	towerLevel++;
	speed+= 1;
	Ticker.setFPS(speed);
	if(towerLevel % 2 == 1){
		circle.x = kborder;
	}
	else{
		circle.x = bounds.width - kborder;
	}
	

}

function drawTower() {
	var g = new Graphics();
	//stroke of 1 px
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(0,0,255,1));
	for(var size = 0;size<tower[2];size++){
		g.drawRect(ktileSize*size, 0,ktileSize,ktileSize);
	}
	//g.drawRect(0, 0,ktileSize,ktileSize);
	towerTiles = new Shape(g);
	towerTiles.x = tower[0];
	towerTiles.y = bounds.height - tower[1]*ktileSize;
	//add the circle to the stage.
	stage.addChild(towerTiles);
}

function checkTower(){
	if(towerLevel > 1){
		// tower was placed perfectly
		if(tower[0] == towerLast[0] && tower[2] == towerLast[2]){
			console.log("Perfect");
			return true;
		}
		// tower placed left of old tower
		else if(tower[0] < towerLast[0] && tower[0]+tower[2]*ktileSize > towerLast[0]){
			console.log("Left");
			//size = ((tower[0]+tower[2]*ktileSize) - towerLast[0] - kborder)/ktileSize
			tower = [towerLast[0], tower[1], ((tower[0]+tower[2]*ktileSize) - towerLast[0])/ktileSize];
			return true;		
		}
		// tower placed right of old tower 
		else if(tower[0] > towerLast[0] && tower[0] < towerLast[0]+towerLast[2]*ktileSize){
			console.log("Right");
			//size = ((towerLast[0]+towerLast[2]*ktileSize) - tower[0] - border)/ktileSize
			tower = [tower[0], tower[1], ((towerLast[0]+towerLast[2]*ktileSize) - tower[0])/ktileSize];
			return true;
		}
		//tower was placed completely wrong
		else{
			console.log("WTF");
			return false;
		}
	}
	console.log("First layer");
	return true;
}

function nextStage(){

}
function tick() {
	if(circle.x >= bounds.width-kborder-ktileSize) {
		switchDir = -1;
	}
	else if(circle.x < kborder+ktileSize) {
		switchDir = 1;
	}
	circle.x += switchDir * ktileSize;
	circle.y = bounds.height - ktileSize*towerLevel;
	
//	drawTower();
//	if(checkTower() == true){
//		stage.update();
//	}
//	else {
//		if(towerLevel == 14){
//			nextStage();
//		}
//		else{
//			TODO: Gameover
//		
//		} 
//	}
	stage.update();
}