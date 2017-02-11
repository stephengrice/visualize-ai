class GridNode {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.north = false;
		this.south = false;
		this.east = false;
		this.west = false;
	}
	draw(ctx) {
		// Draw north
		if (this.north) {
			ctx.moveTo(this.x*SQUARE_WIDTH, this.y*SQUARE_HEIGHT);
			ctx.lineTo( (this.x+1)*SQUARE_WIDTH, this.y*SQUARE_HEIGHT);
			ctx.stroke();
		}
		// Draw south
		if (this.south) {
			ctx.moveTo(this.x*SQUARE_WIDTH, (this.y+1)*SQUARE_HEIGHT);
			ctx.lineTo( (this.x+1)*SQUARE_WIDTH, (this.y+1)*SQUARE_HEIGHT);
			ctx.stroke();
		}
		// Draw east
		if (this.east) {
			ctx.moveTo((this.x+1)*SQUARE_WIDTH, this.y*SQUARE_HEIGHT);
			ctx.lineTo((this.x+1)*SQUARE_WIDTH, (this.y+1)*SQUARE_HEIGHT);
			ctx.stroke();
		}
		// Draw west
		if (this.west) {
			ctx.moveTo(this.x*SQUARE_WIDTH, this.y*SQUARE_HEIGHT);
			ctx.lineTo(this.x*SQUARE_WIDTH, (this.y+1)*SQUARE_HEIGHT);
			ctx.stroke();
		}
	}
}
class Map {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		// Create 2D array
		var grid = new Array(this.width);
		for (var i = 0; i < width; i++) {
			grid[i] = new Array(this.height);
		}
		// Fill with grid objects
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				grid[i][j] = new GridNode(i,j);
			}
		}

		this.grid = grid;
	}
	draw(ctx) {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				this.grid[i][j].draw(ctx);
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
				var map = new Map(jsonMap.data.length, jsonMap.data[0].length);
				for (var i = 0; i < map.width; i++) {
					for (var j = 0; j < map.height; j++) {
						map.grid[j][i] = new GridNode(i,j);
						map.grid[j][i].north = jsonMap.data[j][i].north;
						map.grid[j][i].south = jsonMap.data[j][i].south;
						map.grid[j][i].east = jsonMap.data[j][i].east;
						map.grid[j][i].west = jsonMap.data[j][i].west;
					}
				}
				map.draw(ctx);
			}
		}
		request.open("GET", file);
		request.send(null);
	}
}