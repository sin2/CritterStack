
	var preload;
	var messageField;
	var stage;		
	var loadingInterval;
	var splash;
	var canvas;
	
    function startPreload(startMenu) {
		preload = new PreloadJS();
		
		preload.onComplete = doneLoading;
		var manifest = [
				{src:"./assets/image0.png", id:"image0"},
				{src:"./assets/image1.png", id:"image1"},
				{src:"./assets/image2.png", id:"image2"},
				{src:"./assets/image3.png", id:"image3"}
			];
		preload.installPlugin(SoundJS);
        preload.loadManifest(manifest);
			preload.loadFile("assets/image0.png");
		//preload.onProgress = updateLoading;

		canvas = document.getElementById("canvas");
		stage = new Stage(canvas);
		messageField = new Text("Loading", "bold 24px Arial", "#000000");
		messageField.textAlign = "center";
		messageField.x = canvas.width / 2;
		messageField.y = canvas.height / 4*3;
		var img = new Image();
		img.src = "assets/splash.png";
		img.onload = function(e){
			 splash = new Bitmap(e.target);
			stage.addChild(splash, messageField);
		stage.update();
			}
			
		stage.addChild(messageField);
		
		stage.update(); 	//update the stage to show text

		setTimeout(function(){startUpdates(startMenu);
			}, 3000);
	}
	
	function startUpdates(startMenu)
	{
		loadingInterval = setInterval(function(){updateLoading(startMenu);}, 200);
		}
	
	function updateLoading(startMenu) {
		messageField.text = "Loading " + (preload.progress*100|0) + "%";
		if(preload.progress ==1)
		doneLoading(startMenu);
		stage.update();
	}
	
	function doneLoading(startMenu) {
		
		clearInterval(loadingInterval);
		startMenu();
		
		stage.removeChild(messageField);
	}
	