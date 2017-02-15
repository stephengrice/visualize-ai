var DELAY = 500;

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
var interval = null;
var current = null;
var search = null;

function loadMap() {
	Map.load("./maps/small.json", ctx, function(response) {
		map = response;
	
		document.getElementById("btnLoad").disabled = true;
		document.getElementById("btnStart").disabled = false;
	});
}

function start() {
	document.getElementById("btnStart").disabled = true;
	document.getElementById("btnStop").disabled = false;
	current = map.grid[0][0];
	
	// Set up search object
	search = new PseudoRandomSearch(map, map.grid[map.start_x][map.start_y]);
	
	searchLoop();
	interval = setInterval(searchLoop, DELAY);
}

function stop() {
	document.getElementById("btnStart").disabled = false;
	document.getElementById("btnStop").disabled = true;
	clearInterval(interval);
}

function searchLoop() {
	// Draw map and then current node over top
	map.draw(ctx);
	
	// Draw search pointer / path
	search.draw(ctx);
	
	// Terminate at goal
	if (search.foundGoal()) {
		console.log("Found goal");
		clearInterval(interval);
	}
	
	// Step search function
	search.step();
	

}