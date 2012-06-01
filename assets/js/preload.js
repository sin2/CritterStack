
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
		
		var manifest = [			
			{id:"blue1", src:"assets/images/blue1.png"},
			{id:"blue2", src:"assets/images/blue2.png"},
			{id:"blue3", src:"assets/images/blue3.png"},
			
			{id:"green1", src:"assets/images/green1.png"},
			{id:"green2", src:"assets/images/green2.png"},
			{id:"green3", src:"assets/images/green3.png"},
			
			{id:"pink1", src:"assets/images/pink1.png"},
			{id:"pink2", src:"assets/images/pink2.png"},
			{id:"pink3", src:"assets/images/pink3.png"},
			
			{id:"spaceship", src:"assets/images/spaceship.png"},
			{id:"fullBack", src:"assets/images/background.png"},
			{id:"bg1", src:"assets/images/bg1.png"},
			{id:"bg2", src:"assets/images/bg2.png"},
			{id:"bg3", src:"assets/images/bg3.png"},
			{id:"bg4", src:"assets/images/bg4.png"}];
		//preload.onProgress = updateLoading;
		preload.loadFile("assets/images/blue1.png");

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
	