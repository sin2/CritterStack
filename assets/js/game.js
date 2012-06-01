var canvas;
var stage;

function init() {
	canvas = document.getElementById('canvas');
	stage = new Stage(canvas);

	var text = new Text('Hello World', '36px Arial', '#f00');

	text.x = 10;
	text.y = 10;

	stage.addChild(text);
	stage.update();
}