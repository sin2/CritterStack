
	var preload;
	var messageField;
	var stage;		
	var loadingInterval;
	var splash;
	var canvas;
	
    function startPreload(startMenu) {
		preload = new PreloadJS();
		
		preload.onComplete = doneLoading;
		preload.installPlugin(SoundJS);
			preload.loadFile("assets/images/blue1.png");
			preload.loadFile("assets/images/blue2.png");
			preload.loadFile("assets/images/blue3.png");
			
			preload.loadFile("assets/images/green1.png");
			preload.loadFile("assets/images/green2.png");
			preload.loadFile("assets/images/green3.png");
			
			preload.loadFile("assets/images/pink1.png");
			preload.loadFile("assets/images/pink2.png");
			preload.loadFile("assets/images/pink3.png");
		//preload.onProgress = updateLoading;

		canvas = document.getElementById("canvas");
		stage = new Stage(canvas);
		messageField = new Text("Loading", "bold 24px Arial", "#000000");
		messageField.textAlign = "center";
		messageField.x = canvas.width / 2;
		messageField.y = canvas.height / 4*3;
		var img = new Image();
		img.src = "assets/images/splash.png";
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
	