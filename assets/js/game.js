var canvas;
var stage;
var bounds;

var switchDir;
var speed;
var towerLevel;
var stageLevel;
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

var tokens;
var tokenString;

var DEFAULT_FONT = "bold 24px HappyHell";

function init() {
	canvas = document.getElementById('canvas');
	stage = new Stage(canvas);
	tokens = 0;

	// Enable touch events
	Touch.enable(stage);
	
	// Handle click events
	startPreload(function(){
		startMenu();
	});
}

function startMenu()
{
	console.log('startMenu');
	displayMenu(function(){
		displayInstructions(function(){
			startGame();
		});
	});
}

function startGame() {
	console.log('startGame');
	
	bounds = new Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;

	stageLevel = 1;
	switchDir = 1;
	speed = 1;
	tower = [];
	towerLast = [];
	towerLevel = 1;
	towerSize = 5;

	// Update background image
	updateBackground();

	// Circle is the top most sprite being animated (Need to rename...)
	circle = ChooseSprite(towerSize);
	circle.x = kborder;
	circle.y = bounds.height - ktileSize*towerLevel;
	//add the circle to the stage.
	stage.addChild(circle);

	// Draw grid
	// drawGrid();

	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);

	// On click place tile
	stage.onMouseDown = function(e){
		// Place tile
		placeTile();
		
		// Cancel propagation
		e.nativeEvent.preventDefault();
	}
}

function updateBackground(){
	// Load background image
	// TODO: Need to change this to change levels
	if(typeof stage.background == 'undefined') {
		stage.background = new Bitmap(preload.getResult("background").result);
		stage.addChildAt(stage.background, 0);
	}

	stage.background.y = -canvas.height*stageLevel;
	stage.update();
}

function nextStage(){
	// TODO
	stageLevel++;

	updateBackground();
}

function ClearAll()
{
	canvas.removeEventListener("mousedown", placeTile, false);
	stage.clear();
}

function gameOver(){
	var currTokens =0 ;
for(var size = 0;size<=tower[2];size++){
	currTokens += tower[2] * 1;//stageLevel when it works;
	}
	tokens+=currTokens;
	alert("You earned " +currTokens +" tokens! You now have "+ tokens+ " tokens!");
	//ShowTokensEarned(tokens, function(){
	ClearAll();
	startMenu();//);
	//return false;
}


function loadGFX(e){
    if(e.target.name = 'bg'){
    	background = new Bitmap(bgSource);
		stageLevel = Math.floor(Math.random()*4);
		background.y = -canvas.height*stageLevel;
    	stage.addChildAt(background,0);
		tokenString = new Text(tokens + " tokens",DEFAULT_FONT, "#FFFFFF");
		stage.addChildAt(tokenString,0);
    }  
}

function ChooseSprite(numCritters)
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
			"width": 30*numCritters,
			"numFrames": 2,
			"height": 30
		},
		"animations": {"down": [0,1]},
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
	console.log("TowerSize: "+towerSize);
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
	speed+= 0.5;
	Ticker.setFPS(speed);
	
	// Every other level the animating sprite starts from the right side
	if(towerLevel % 2 == 1){
		stage.removeChild(circle);
		circle = ChooseSprite(towerSize);
		circle.x = kborder;
		stage.addChild(circle);
	}
	else{
		stage.removeChild(circle);
		circle = ChooseSprite(towerSize);
		circle.x = bounds.width - kborder - (ktileSize*towerSize);
		stage.addChild(circle);
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

function drawGrid(){
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
}