var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = CANVAS_WIDTH;
var SQUARE_WIDTH = CANVAS_WIDTH / 10;
var SQUARE_HEIGHT = SQUARE_WIDTH;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = CANVAS_WIDTH;
c.height = CANVAS_HEIGHT;

ctx.fillRect(0,0,10,10);

drawGrid();

function drawGrid() {
	for (var i = 0; i < CANVAS_HEIGHT; i += SQUARE_HEIGHT) {
		ctx.moveTo(0, i);
		ctx.lineTo(CANVAS_WIDTH, i);
		ctx.stroke();
	}

	for (var i = 0; i < CANVAS_WIDTH; i += SQUARE_WIDTH) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, CANVAS_WIDTH);
		ctx.stroke();
	}
}

class GridNode {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.n = false;
		this.s = false;
		this.e = false;
		this.w = false;
	}
}