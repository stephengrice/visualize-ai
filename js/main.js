var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = CANVAS_WIDTH;

var MAP_WIDTH = 5;
var MAP_HEIGHT = 5;

var SQUARE_WIDTH = CANVAS_WIDTH / MAP_WIDTH;
var SQUARE_HEIGHT = CANVAS_HEIGHT / MAP_HEIGHT;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = CANVAS_WIDTH;
c.height = CANVAS_HEIGHT;

var map = null;

function loadMap() {
	Map.load("./maps/small.json", ctx, function(response) {
		map = response;
	
		document.getElementById("btnLoad").disabled = true;
		document.getElementById("btnStart").disabled = false;
	});
}
