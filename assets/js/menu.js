var preload;
	var messageField;
	var stage;		
	var loadingInterval;
	var splash;
	var canvas;
	var button;
	var event1;
	var stackers;
	
function DisplayMenu(startGame)
{
	event1 = startGame;
	if(stage != null){
	stage.clear();
	}
		var img = new Image();
		img.src = "assets/images/splash2.png";
			img.onload = function(e){
			splash = new Bitmap(e.target);
			stage.addChild(splash);
			stage.update();
			}
			
		canvas.onclick = HandleClick;
	}
	
function DisplayInstructions(startGame)
{
	if(stage != null){
	stage.clear();
	}
		messageField = new Text("Instructions Go Here", DEFAULT_FONT, "#000000");
		messageField.textAlign = "center";
		messageField.x = canvas.width / 2;
		messageField.y = canvas.height / 4*3;
		var img = new Image();
		img.src = "assets/images/splash3.png";
			img.onload = function(e){
			splash = new Bitmap("e.target");
			stage.addChild(splash);
			stage.addChild(messageField);
			}
			
		stage.update(); 
		setTimeout(startGame, 10000);
}

function HandleClick()
{
	canvas.onclick = null;
	event1();
}