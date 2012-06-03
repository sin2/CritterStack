var canvas;
var stage;
var bounds;

var switchDir;
var speed;
var towerLevel;
var tower;
var towerLast;

var towerSize;
var currColour;
var randomnumber;

var ktileSize = 30;
var kborder = 25;
var kcolumns = 9;
var krows = 14;

var background;
var bgSource;
var preload;
var messageField;
var stage;		
var loadingInterval;
var splash;
var canvas;
var button;
var event1;

var DEFAULT_FONT = "bold 24px HappyHell";

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
//	var img = new Image();
//		img.src = "assets/images/back3.png";
//			img.onload = function(e){
//			splash = new Bitmap(e.target);
//			stage.addChild(splash);
			
	bgSource = new Image();
	bgSource.src = './assets/images/back3.png';
	bgSource.name = 'bg';
	bgSource.onload = loadGFX;		
	
	switchDir = 1;
	speed = 1;
	tower = [];
	towerLast = [];
	towerLevel = 1;
	towerSize = 5;
	
	// Circle is the top most sprite being animated (Need to rename...)
	circle = ChooseSprite();
	circle.x = kborder;
	circle.y = bounds.height - ktileSize*towerLevel;
	//add the circle to the stage.
	stage.addChild(circle);
	
	// Create grid	
	g = new Graphics();
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(0,0,0,1.0));
	g.drawRect(0,0, canvas.width,canvas.height);
	g.beginStroke(Graphics.getRGB(255,0,0,.7));
//	for(var step = kborder;step<canvas.width;step+= 30) {
//		g.drawRect(step,0,0,canvas.height);
//	}
//	for(var step = kborder;step<canvas.height;step+= 30) {
//		g.drawRect(step,0,0,canvas.height);
//	}
	g.beginStroke(Graphics.getRGB(255,0,255,.7));
	g.drawRect(0,0,canvas.width,ktileSize);
	grid = new Shape(g);
	grid.x = 0;
	grid.y = 0;
	stage.addChild(grid);
	
	
	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);
	canvas.addEventListener("mousedown", placeTile, false);

}
function nextStage(){
	// TODO
}

function gameOver(){
	// TODO
}

function loadGFX(e){
    if(e.target.name = 'bg'){
    	background = new Bitmap(bgSource);
    	stage.addChildAt(background,0);
    }  
}

function ChooseSprite()
{
	var colour = "";
	randomnumber=Math.floor(Math.random()*3);
	switch(randomnumber)
	{
	case 0:
		colour = "blue"
		break;
	case 1:
		colour = "pink"
	  break;
	case 2:
		colour = "green"
	  break;    
	}
	// Define a spritesheet. Note that this data can be exported by Zoë.
	var ss = new SpriteSheet({
		"frames": {
			"width": 30,
			"numFrames": 2,
			"height": 30
		},
		"animations": {"down": [0, 1]},
		"images": ["assets/images/"+colour+"Sprites.png"]
	});

	var circle = new BitmapAnimation(ss);

	ss.getAnimation("down").frequency = 1;
	ss.getAnimation("down").next = "down";
	circle.gotoAndPlay("down");
	currColour = colour;
			
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	return circle;
}
		
function ChooseTile()
{
	// Define a spritesheet. Note that this data can be exported by Zoë.
	var ss = new SpriteSheet({
		"frames": {
			"width": 30,
			"numFrames": 2,
			"height": 30
		},
		"animations": {"down": [0, 0]},
		"images": ["assets/images/"+currColour+"1.png"]
	});

	var circle = new BitmapAnimation(ss);

	ss.getAnimation("down").frequency = 1;
	ss.getAnimation("down").next = "down";
	circle.gotoAndPlay("down");
	//currColour = "blue";
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	return circle;
}

document.onkeydown = function(evt) {
  evt = evt || window.event;

  if(evt.keyCode == 32){
  	placeTile();
  }
};

// Called after button press/click
function placeTile() {
	// Save last tower placement
	if(tower != []){
		towerLast = tower;
	}
	tower = [circle.x,towerLevel,towerSize];

	// Check the tower placement 
	if(checkTower() == true && towerLevel <= 15){
		SoundJS.play("audio-critter");
		drawTower();
		console.log("Tower: "+tower+" TowerLast: "+towerLast);
		if(towerLevel == 15){
			console.log("Level Finished!");
			nextStage();
		}
	}
	else {
		gameOver();
	}

	// Increment stuff
	towerLevel++;
	speed+= 1;
	Ticker.setFPS(speed);
	
	// Every other level the animating sprite starts from the right side
	if(towerLevel % 2 == 1){
		circle.x = kborder;
	}
	else{
		circle.x = bounds.width - kborder - (ktileSize*towerSize);
	}
}

// Draws previous levels placed
function drawTower() {
	for(var size = 0;size<tower[2];size++){
		towerTiles = ChooseTile();
		towerTiles.x = tower[0]+size*ktileSize;
		towerTiles.y = bounds.height - tower[1]*ktileSize;
		stage.addChild(towerTiles);
	}

}

// Checks placement of sprite returns false if game over
function checkTower(){
	if(towerLevel > 1){
		console.log("CHECK 2: Tower: "+tower+" TowerLast: "+towerLast);
		
		// tower was placed perfectly
		if(tower[0] == towerLast[0] && tower[2] == towerLast[2]){
			console.log("Perfect");
			return true;
		}
		// tower placed left of old tower
		else if(tower[0] < towerLast[0] && tower[0]+tower[2]*ktileSize > towerLast[0]){
			console.log("Left");
			towerSize = ((tower[0]+tower[2]*ktileSize) - towerLast[0])/ktileSize;
			tower = [towerLast[0], tower[1], ((tower[0]+tower[2]*ktileSize) - towerLast[0])/ktileSize];
			redrawTopSprite();
			return true;		
		}
		// tower placed right of old tower 
		else if(tower[0] > towerLast[0] && tower[0] < towerLast[0]+towerLast[2]*ktileSize){
			console.log("Right");
			towerSize = ((towerLast[0]+towerLast[2]*ktileSize) - tower[0])/ktileSize;
			tower = [tower[0], tower[1], ((towerLast[0]+towerLast[2]*ktileSize) - tower[0])/ktileSize];
			redrawTopSprite();
			return true;
		}
		//tower was placed completely wrong
		else{
			console.log("Game Over");
			return false;
		}
	}
	console.log("First layer");
	return true;
}

// Draws top most sprite being animated
function redrawTopSprite(){
	// TODO: Redesign
	for(var length = 0; length<tower[3];length++){
		circle = ChooseTile();
		circle.x = kborder+length*ktileSize;
		circle.y = bounds.height - ktileSize*towerLevel;
		//circle = new Shape(g);
		stage.addChild(circle);
	}
}

// Called at set FPS (speed)
function tick() {
	// Switch sprite direction once it hits the bounds
	if(circle.x+towerSize*ktileSize >= bounds.width-kborder) {
		switchDir = -1;
	}
	else if(circle.x < kborder+ktileSize) {
		switchDir = 1;
	}
	// Animate the sprite
	circle.x += switchDir * ktileSize;
	circle.y = bounds.height - ktileSize*towerLevel;
	
	stage.update();
}