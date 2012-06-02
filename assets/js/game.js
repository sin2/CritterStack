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
	circle = ChooseSprite();
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
	//stage.addChild(grid);
	
	
	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);
	canvas.addEventListener("mousedown", placeTile, false);

}

function ChooseSprite()
{
	
	randomnumber=Math.floor(Math.random()*3);
	if(randomnumber ==0)
	{
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 1]},
				"images": ["assets/images/blueSprites.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "blue";
	}
	else if(randomnumber ==1)
	{
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 1]},
				"images": ["assets/images/greenSprites.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "green";
	}
	else if(randomnumber ==2)
	{
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 1]},
				"images": ["assets/images/pinkSprites.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "pink";
	}
			// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
			return circle;
		}
		
		function ChooseTile()
{
	if(currColour == "blue"){
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 0]},
				"images": ["assets/images/blue1.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "blue";
	}
	else if(currColour == "green"){
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 0]},
				"images": ["assets/images/green1.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "green";
	}
	if(currColour == "pink"){
			// Define a spritesheet. Note that this data can be exported by Zoë.
			var ss = new SpriteSheet({
				"frames": {
					"width": 30,
					"numFrames": 2,
					"height": 30
				},
				"animations": {"down": [0, 0]},
				"images": ["assets/images/pink1.png"]
			});

			var circle = new BitmapAnimation(ss);

			ss.getAnimation("down").frequency = 1;
			ss.getAnimation("down").next = "down";
			circle.gotoAndPlay("down");
			currColour = "pink";
	}
			// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
			return circle;
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
	SoundJS.play("audio-critter");
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
		console.log("Tower: "+tower+" TowerLast: "+towerLast);
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
//	g.setStrokeStyle(1);
//	g.beginStroke(Graphics.getRGB(0,0,255,1));
	for(var size = 0;size<tower[2];size++){
		g.setStrokeStyle(1);
		g.beginStroke(Graphics.getRGB(0,0,255,1));
//		g.drawRect(ktileSize*size, 0,ktileSize,ktileSize);
		towerTiles = ChooseTile();
		towerTiles.x = tower[0]+size*ktileSize;
		towerTiles.y = bounds.height - tower[1]*ktileSize;
		stage.addChild(towerTiles);
	}
	//g.drawRect(0, 0,ktileSize,ktileSize);
	towerTiles = new Shape(g);
//=======
//	g.drawRect(0, 0,ktileSize,ktileSize);
//	towerTiles = ChooseTile();
// >>> 7d2f91f353ffdc9d1cbe05d0de903220f0cb4e6f
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
			redrawTopSprite();
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

function redrawTopSprite(){
	var g = new Graphics();
	//stroke of 1 px
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(255,0,0,.7));
	for(var length = 0; length<tower[3];length++){
		g.drawRect(length*ktileSize,0, ktileSize,ktileSize);
	}
//	g.drawRect(0,0, ktileSize,ktileSize);
	//circle = ChooseSprite();
	circle.x = kborder;
	circle.y = bounds.height - ktileSize*towerLevel;
	//add the circle to the stage.
	stage.addChild(circle);	
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