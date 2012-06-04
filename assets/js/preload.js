function startPreload(startMenu) {
	preload = new PreloadJS();

	// Install audio plugin
	SoundJS.FlashPlugin.BASE_PATH = "assets/audio/";
	preload.installPlugin(SoundJS);

	// Put the manifest inside preload
	preload.manifest = [
		// Main image and spaceship
		{id:"spaceship", src:"assets/images/spaceship.png"},
		{id:"background", src:"assets/images/background.png"},
		{id:"tokenBar", src:"assets/images/tokenBar.png"},

		// Critters
		{id:"blue1", src:"assets/images/blue1.png"},
		{id:"blue2", src:"assets/images/blue2.png"},
		{id:"blue3", src:"assets/images/blue3.png"},
		
		{id:"green1", src:"assets/images/green1.png"},
		{id:"green2", src:"assets/images/green2.png"},
		{id:"green3", src:"assets/images/green3.png"},
		
		{id:"pink1", src:"assets/images/pink1.png"},
		{id:"pink2", src:"assets/images/pink2.png"},
		{id:"pink3", src:"assets/images/pink3.png"},
		
		// Splash images
		{id:"splash-play", src:"assets/images/splash-play.png"},
		{id:"splash-instructions", src:"assets/images/splash-instructions.png"},
	
		// Game audio
		{id:"audio-level-1", src:"assets/audio/level_1.ogg"},
		{id:"audio-level-2", src:"assets/audio/level_2.ogg"},
		{id:"audio-level-3", src:"assets/audio/level_3.ogg"},
		{id:"audio-level-4", src:"assets/audio/level_4.ogg"},
		{id:"audio-critter", src:"assets/audio/sound_bite.ogg"},
	];

	// Handle load and complete events
	preload.onProgress = function(e){
		stage.textLoading.text = "Loading\n" + (preload.progress*100|0) + "%";
		stage.update();
	}
	preload.onComplete = function(e){
		onComplete(e, startMenu);
	};

	// Return an image based on id
	preload.getImage = function(id){
		var o = preload.getResult(id); // Try to get image based on preload's built in method

		// Fall back to manually retrieval via manifest
		if(typeof o == 'undefined' || o == null)
		{
			for(var i in preload.manifest) {
				if(preload.manifest[i].id == id) {
					var o = preload.manifest[i];
					var img = new Image();
					img.src = o.src;

					return img;
				}
			}
		}

		return o.result;
	}

	// Return a sound based on id
	preload.getSound = function(id){
		var o = preload.getResult(id); // Try to get sound based on preload's built in method

		// Fall back to manually retrieval via manifest
		if(typeof o == 'undefined' || o == null)
		{
			for(var i in preload.manifest) {
				if(preload.manifest[i].id == id) {
					var o = preload.manifest[i];

					return o.src;
				}
			}
		}

		return o.src;
	}


	// Add the loading text
	stage.textLoading = new Text("Loading", DEFAULT_FONT, "#000000");
	stage.textLoading.textAlign = "center";
	stage.textLoading.x = canvas.width / 2;
	stage.textLoading.y = canvas.height / 3.5*3;

	// Load the splash image manually and not part of preloading
	var img = new Image();
	img.src = "assets/images/splash-loading.png";
	img.onload = function(e){
		console.log('splash-loading finished');
		stage.splashLoading = new Bitmap(e.target);
		stage.addChild(stage.splashLoading, stage.textLoading);

		// Update stage
		stage.update();

		// Start loading assets
		preload.loadManifest(preload.manifest);
	}
}

function onComplete(e, startMenu) {
	console.log('preload.onComplete');
	console.log(e);

	// Remove splash and text and update stage
	stage.removeChild(stage.splashLoading);
	stage.removeChild(stage.textLoading);
	
	// Play game audio
	playSound("audio-level-1", SoundJS.INTERRUPT_NONE, 0, 0, -1, 1);
	
	// Update stage
	stage.update();

	// Callback when complete is done
	startMenu();
}