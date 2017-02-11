var Type = Object.freeze({
	FREE: 0,
	WALL: 1
});

class GridNode {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type || Type.FREE;
	}
}
class Map {
	constructor(width, height, squareWidth, squareHeight) {
		this.width = width;
		this.height = height;
		this.squareWidth = squareWidth;
		this.squareHeight = squareHeight;
		// Create 2D array
		var grid = new Array(this.width);
		for (var i = 0; i < width; i++) {
			grid[i] = new Array(this.height);
		}
		// Fill with grid objects
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				if (i*j % 2 == 0)
					grid[i][j] = new GridNode(i,j, Type.WALL);
				else
					grid[i][j] = new GridNode(i,j);
			}
		}

		this.grid = grid;
	}
	draw(ctx) {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				var cur = this.grid[i][j];
				if (cur.type == Type.WALL) {
					ctx.fillRect(i * this.squareWidth, j * this.squareHeight, this.squareWidth, this.squareHeight);
				}
			}
		}
	}
	static load(file, ctx) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState === this.DONE) {
				var jsonMap = JSON.parse(request.responseText);
				console.log(jsonMap.name);
				// Fill a Map object with the data
				var map = new Map(jsonMap.data.length, jsonMap.data[0].length, SQUARE_WIDTH, SQUARE_HEIGHT);
				for (var i = 0; i < map.width; i++) {
					for (var j = 0; j < map.height; j++) {
						map.grid[j][i] = new GridNode(i,j, jsonMap.data[i][j].state);
					}
				}
				console.log(map);
				map.draw(ctx);
			}
		}
		request.open("GET", file);
		request.send(null);
	}
}