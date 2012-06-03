function displayMenu(startInstructions)
{
	// Show splash image
	stage.splashPlay = new Bitmap(preload.getResult("splash-play").result);
	stage.addChild(stage.splashPlay);
	stage.update();
		
	// Handle mouse event
	stage.onMouseDown = function(e){
		// Remove play image/text
		stage.removeChild(stage.splashPlay);
		stage.update();

		// Run callback on touch
		startInstructions();
		
		// Cancel propagation
		e.nativeEvent.preventDefault();
	}
}

function displayInstructions(startGame)
{
	console.log('DisplayInstructions');
	stage.textInstructions = new Text("Instructions Go Here.\nClick to start.", "bold 24px Arial", "#000000");
	stage.textInstructions.textAlign = "center";
	stage.textInstructions.x = canvas.width / 2;
	stage.textInstructions.y = canvas.height / 4*3;

	// Show instructions
	stage.splashInstructions = new Bitmap(preload.getResult("splash-instructions").result);
	stage.addChild(stage.splashInstructions, stage.textInstructions);
	stage.update();

	// On click start game
	stage.onMouseDown = function(e){
		// Remove instructions image/text
		stage.removeChild(stage.textInstructions);
		stage.removeChild(stage.splashInstructions);

		// Run callback on touch
		startGame();
		
		// Cancel propagation
		e.nativeEvent.preventDefault();
	}
}