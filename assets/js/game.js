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
var tokenBarSource;
var preload;
var messageField;
var stage;		
var loadingInterval;
var splash;
var canvas;
var button;
var event1;
var playing;
var scrolling;
var transitionLevel;

var currentScore;

var DEFAULT_FONT = "bold 24px HappyHell";
var TOKENBAR_FONT = "bold 18px HappyHell";

function init() {
	canvas = document.getElementById('canvas');
	stage = new Stage(canvas);

	// Enable touch events
	Touch.enable(stage);
	
	// Handle click events
	startPreload(function(){
		startMenu();
	});
}

function startMenu(){
	console.log('startMenu');

	// Reset stage and start over
	resetStage();
	
	displayMenu(function(){
		displayInstructions(function(){
			startGame();
		});
	});
}

function startGame() {
	// Update background image and token bar
	updateBackground();
	updateTokenBar();
	playing = true;
	// Circle is the top most sprite being animated (Need to rename...)
	circle = ChooseSprite(towerSize);
	circle.x = kborder;
	circle.y = bounds.height - ktileSize*towerLevel;
	//add the circle to the stage.
	stage.addChildAt(circle,3);

	// Update stage and begin game
	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);// On click place tile
	
	// Stop playing old sound and start playing game level
	stopSound(stage.backgroundSound, true);
	stage.backgroundSound = playSound("audio-level-" + stageLevel);

	stage.onMouseDown = function(e){
		// Place tile
		placeTile();
	}
}

function resetStage(){
	// Remove all childrens from stage
	stage.removeAllChildren();
	
	// Remove ticker
	Ticker.removeAllListeners();

	// Initialize game bounds
	bounds = new Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;

	// Initialize variables
	currentScore = 0;
	scrolling = false;
	switchDir = 1;
	speed = 1;
	tower = [];
	towerLast = [];
	towerLevel = 1;
	towerSize = 5;
	stageLevel = 1;

	// Delete variable from stage
	delete stage.background;
	delete stage.tokenBar;
	delete stage.tokenBarText;

	// Update stage
	stage.clear();
	stage.update();
}

function StartNextLevel()
{
			// Remove all childrens from stage
	stage.removeAllChildren();
	
	// Remove ticker
	Ticker.removeAllListeners();

	// Initialize game bounds
	bounds = new Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;

	updateTokenBar();
	scrolling = false;
	switchDir = 1;
	switch(stageLevel)
	{
		case 2:
			speed = 3;
		case 3:
			speed = 7;
		default:
			speed = 10;	
	}
	
	transitionLevel = [transitionLevel[0], 1, transitionLevel[2]];
	tower = transitionLevel;
	towerLast = [];
	towerLevel = 2;
	towerSize = transitionLevel[2];
	drawTower();

	// Delete variable from stage
	delete stage.background;
	delete stage.tokenBar;

	// Update stage
	stage.clear();
	stage.update();
	startGame();
}

function nextStage(){
	if(stageLevel + 1 == 5) {
	stopSound(stage.backgroundSound, true);
	playSound("audio-you-win", true);
		alert("You win!");
		startMenu();
		return false;
	}
	else {
		stageLevel++;
		transitionLevel = tower;
		StartNextLevel();	
	}
}

function gameOver(){
	stopSound(stage.backgroundSound, true);
	playSound("audio-game-over", true);
	alert("Game over!  Your score is " + currentScore);
	
	// Ignore on PhoneGap.  TODO: Needs better implementation
	if(typeof Media == 'undefined') {
		var name = prompt("Enter your name for the highscores!");
		while(name ==null || name == "")
		{
			name = prompt("You forgot to enter a name!");
		}
		$.post('insert.php', {name: name, score:currentScore, level: stageLevel, towerHeight:towerLast[2], password:"SinthushanIsLame"}, function(){

			  }).error(function(){
				alert('error... ohh no!');
			  });
	}

	playing = false;
	// Go back to main menu
	startMenu();
}

function updateBackground(){
	// Get background from preloaded assets
	var background = preload.getImage("background");

	// Load background image and add it to stage
	if(typeof stage.background == 'undefined') {
		console.log('stage.background loaded');
		stage.background = new Bitmap(background);
		stage.addChildAt(stage.background, 0);
	}

	// Offset the background based on level
	stage.background.y = -background.height + (canvas.height * stageLevel);
	stage.update();
}

function updateTokenBar(){
	// Get background from preloaded assets
	var tokenBar= preload.getImage("tokenBar");
	
	// Load tokenBar image and add it to stage
	if(typeof stage.tokenBar == 'undefined') {
		console.log('stage.tokenBar loaded');
		stage.tokenBar = new Bitmap(tokenBar);
		stage.addChildAt(stage.tokenBar, 1);

		stage.tokenBarText = new Text(currentScore, TOKENBAR_FONT, "#fff");
		stage.tokenBarText.x = 32;
		stage.tokenBarText.y = 20;
		stage.addChildAt(stage.tokenBarText, 2);
	}
	stage.tokenBarText.text = currentScore;

	// Update the token bar
	stage.update();
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



// Called after button press/click
function placeTile() {
	var GOD_MODE = (getQueryString("godmode") == "1");

	// Save last tower placement
	if(tower != []){
		towerLast = tower;
	}
	tower = [circle.x,towerLevel,towerSize];

	// Check the tower placement 
	if(checkTower() == true && towerLevel <= 15){
		
		// Prevent re-creation of critter sound everytime.  Caused resource leak on PhoneGap.
		if(typeof stage.critterSound == 'undefined') {
			stage.critterSound = playSound("audio-critter");
		}
		else {
			playSound(stage.critterSound);
		}

		drawTower();
		if(towerLevel >= (GOD_MODE ? 1 : 15)){
			console.log("Level Finished!");
			nextStage();
			return false;
		}
	}
	else {
		
		gameOver();
		return false;
	}

	// Increment stuff
	towerLevel++;
	speed+=1;
	Ticker.setFPS(speed);
	
	// Every other level the animating sprite starts from the right side
	if(towerLevel % 2 == 1){
		stage.removeChild(circle);
		circle = ChooseSprite(towerSize);
		circle.x = kborder;
		stage.addChildAt(circle,3);
	}
	else{
		stage.removeChild(circle);
		circle = ChooseSprite(towerSize);
		circle.x = bounds.width - kborder - (ktileSize*towerSize);
		stage.addChild(circle);
	}

	// Calculate score which is: [Current row #] * [# of Critters] * [Current stage]
	currentScore += tower[1] * tower[2] * stageLevel;
}

// Draws previous levels placed
function drawTower() {
	for(var size = 0;size<tower[2];size++){
		towerTiles = ChooseTile();
		towerTiles.x = tower[0]+size*ktileSize;
		towerTiles.y = bounds.height - tower[1]*ktileSize;
		stage.addChildAt(towerTiles,3);
	}

}

// Checks placement of sprite returns false if game over
function checkTower(){
	if(towerLevel > 1){
		// tower was placed perfectly
		if(tower[0] == towerLast[0] && tower[2] == towerLast[2]){
			return true;
		}
		// tower placed left of old tower
		else if(tower[0] < towerLast[0] && tower[0]+tower[2]*ktileSize > towerLast[0]){
			towerSize = ((tower[0]+tower[2]*ktileSize) - towerLast[0])/ktileSize;
			tower = [towerLast[0], tower[1], ((tower[0]+tower[2]*ktileSize) - towerLast[0])/ktileSize];
			redrawTopSprite();
			return true;		
		}
		// tower placed right of old tower 
		else if(tower[0] > towerLast[0] && tower[0] < towerLast[0]+towerLast[2]*ktileSize){
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
	
	updateTokenBar();
	stage.update();
}

// Play audio using either PhoneGap or SoundJS
function playSound(id, interrupt, delay, offset, loop, volume, pan) {
	// Fallback to SoundJS playback
	var playSoundFallback = function() {
		SoundJS.play(id, interrupt, delay, offset, loop, volume, pan);

		// Return the same id to play
		return id;
	};

	// Stop the sound first just in case
	stopSound(id);

	// Try playing via PhoneGap's Media api
	if(typeof Media != 'undefined') {
		var m = null;

		if(id instanceof Media) {
			m = id;
		}
		else {
			m = new Media
			(
				// Force full URL for android
				"/android_asset/www/" + preload.getSound(id),
				function() { // onSuccess
				},

				function(e) { // onError
				}
			);
		}

		// Play audio
		m.play();

		return m;
	}
	else {
		return playSoundFallback();
	}
}

// Stop playing sound
function stopSound(id, release) {
	if(typeof id == 'undefined') { return false; }

	if(typeof Media != 'undefined') {
		if(id instanceof Media) {
			id.stop();

			// Release the audio to free up resources
			if(typeof release != 'undefined') {
				if(release == true) {
					id.release();
				}
			}
		}
	}
	else {
		SoundJS.stop(id);
	}
}

function getQueryString(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null) {
		return "";
	}
	else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}