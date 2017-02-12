var Type = Object.freeze({
	FREE: 0,
	WALL: 1,
	START: 2,
	GOAL: 3
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
				switch(cur.type) {
					default:
					case Type.FREE:
						ctx.fillStyle = "#FFF";
						break;
					case Type.WALL:
						ctx.fillStyle = "#000";
						break;
					case Type.START:
						ctx.fillStyle = "#F00";
						break;
					case Type.GOAL:
						ctx.fillStyle = "#0F0";
						break;
				}
				ctx.fillRect(i * this.squareWidth, j * this.squareHeight, this.squareWidth, this.squareHeight);
			}
		}
	}
	static load(file, ctx, callback) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState === this.DONE) {
				var jsonMap = JSON.parse(request.responseText);
				console.log(jsonMap.name);
				// Fill a Map object with the data
				var map = new Map(jsonMap.data.length, jsonMap.data[0].length, SQUARE_WIDTH, SQUARE_HEIGHT);
				map.start_x = jsonMap.start_x;
				map.start_y = jsonMap.start_y;
				for (var i = 0; i < map.width; i++) {
					for (var j = 0; j < map.height; j++) {
						map.grid[j][i] = new GridNode(i,j, jsonMap.data[i][j].state);
					}
				}
				map.draw(ctx);
				callback(map);
			}
		}
		request.open("GET", file);
		request.send(null);
	}
}