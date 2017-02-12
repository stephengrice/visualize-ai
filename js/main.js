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
	ctx.fillStyle = "#00F";
	ctx.fillRect(current.x * SQUARE_WIDTH, current.y * SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_HEIGHT);
	
	// Terminate at goal
	if (current.type == Type.GOAL) {
		console.log("Found goal");
		clearInterval(interval);
	}
	console.log(Search.successors(current, map));
	// Update current to first possible successor
	var succs = Search.successors(current, map);
	var rand = Math.floor(Math.random() * (succs.length));
	console.log("rand" + rand);
	current = succs[rand];
}