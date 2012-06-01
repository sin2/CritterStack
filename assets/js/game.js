var canvas;
var stage;
var bounds;
var resetX;
var switchDir;
var speed;

var ktileSize = 30;
var kborder = 25;
var kcolumns = 9;
var krows = 14;

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
	DisplayInstructions(function(){start();});
}

function start() {
	bounds = new Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;
				
	stage = new Stage(canvas);
	switchDir = 1;
	speed = 3;
	
	var g = new Graphics();
	//stroke of 1 px
	g.setStrokeStyle(1);
	g.beginStroke(Graphics.getRGB(255,0,0,.7));
	g.drawRect(0,0, ktileSize,ktileSize);
	circle = new Shape(g);
	circle.x = resetX = kborder;
	circle.y = canvas.height / 2;
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
	grid = new Shape(g);
	grid.x = 0;
	grid.y = 0;
	//add the circle to the stage.
	stage.addChild(grid);
	
	
	stage.update();
	Ticker.setFPS(speed);
	Ticker.addListener(this);
}

function tick() {
	if(circle.x >= bounds.width-kborder-25) {
		switchDir = -1;
	}
	else if(circle.x < kborder) {
		switchDir = 1;
	}
	circle.x += switchDir * ktileSize;

	stage.update();
}