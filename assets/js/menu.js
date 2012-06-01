var preload;
	var messageField;
	var stage;		
	var loadingInterval;
	var splash;
	var canvas;
	var button;
	var event1;
	
function DisplayMenu(startGame)
{
	event1 = startGame;
		canvas = document.getElementById("canvas");
		stage = new Stage(canvas);
		var img = new Image();
		img.src = "assets/images/splash.png";
		var img2 = new Image();
		img2.src = "assets/images/startButton.png";
			splash = new Bitmap(img);
			stage.addChild(splash);
			 button = new Bitmap(img2);
			 button.x = canvas.width/2;
			 button.y = canvas.height/4*3;
			stage.addChild(button);
			
		stage.update(); 	//update the stage to show text
		canvas.onclick = HandleClick;
	}
	
function DisplayInstructions(startGame)
{
		canvas = document.getElementById("canvas");
		stage = new Stage(canvas);
		messageField = new Text("Instructions Go Here", "bold 24px Arial", "#000000");
		messageField.textAlign = "center";
		messageField.x = canvas.width / 2;
		messageField.y = canvas.height / 4*3;
		var img = new Image();
		img.src = "assets/images/splash.png";
			splash = new Bitmap(img);
			stage.addChild(splash);
			stage.addChild(messageField);
			
		stage.update(); 
		setTimeout(startGame, 10000);
}

function HandleClick()
{
	canvas.onclick = null;
	event1();
}