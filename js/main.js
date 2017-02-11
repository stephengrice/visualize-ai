class GridNode {
	constructor(n,s,e,w) {
		this.north = n;
		this.south = s;
		this.east = e;
		this.west = w;
	}
}
function initMap() {
	// Create 2D array
	var map = new Array(MAP_WIDTH);
	for (var i = 0; i < MAP_WIDTH; i++) {
		map[i] = new Array(MAP_HEIGHT);
	}
	// Fill with grid objects
	for (var i = 0; i < MAP_WIDTH; i++) {
		for (var j = 0; j < MAP_HEIGHT; j++) {
			if (i % 2 == 0)
				map[i][j] = new GridNode(false, true, true, false);
			else
				map[i][j] = new GridNode(true, false, true, true);
		}
	}
	return map;
}
function drawMap(map) {
	for (var i = 0; i < MAP_WIDTH; i++) {
		for (var j = 0; j < MAP_HEIGHT; j++) {
			// Draw north
			if (map[i][j].north) {
				ctx.moveTo(i*SQUARE_WIDTH, j*SQUARE_HEIGHT);
				ctx.lineTo( (i+1)*SQUARE_WIDTH, j*SQUARE_HEIGHT);
				ctx.stroke();
			}
			// Draw south
			if (map[i][j].south) {
				ctx.moveTo(i*SQUARE_WIDTH, (j+1)*SQUARE_HEIGHT);
				ctx.lineTo( (i+1)*SQUARE_WIDTH, (j+1)*SQUARE_HEIGHT);
				ctx.stroke();
			}
			// Draw east
			if (map[i][j].east) {
				ctx.moveTo((i+1)*SQUARE_WIDTH, j*SQUARE_HEIGHT);
				ctx.lineTo((i+1)*SQUARE_WIDTH, (j+1)*SQUARE_HEIGHT);
				ctx.stroke();
			}
			// Draw west
			if (map[i][j].west) {
				ctx.moveTo(i*SQUARE_WIDTH, j*SQUARE_HEIGHT);
				ctx.lineTo(i*SQUARE_WIDTH, (j+1)*SQUARE_HEIGHT);
				ctx.stroke();
			}
		}
	}
}

var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = CANVAS_WIDTH;

var MAP_WIDTH = 10;
var MAP_HEIGHT = 10;

var SQUARE_WIDTH = CANVAS_WIDTH / MAP_WIDTH;
var SQUARE_HEIGHT = CANVAS_HEIGHT / MAP_HEIGHT;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = CANVAS_WIDTH;
c.height = CANVAS_HEIGHT;

//ctx.fillRect(0,0,10,10);

var map = initMap();

drawMap(map);
