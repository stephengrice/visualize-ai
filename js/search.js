class SearchNode {
	construct(current, last) {
		this.current = current;
		this.last = last;
	}
}

class Search {
	construct(map, startNode) {
		this.map = map;
		this.current = startNode;
	}
  
	foundGoal() {
		return this.current.type == Type.GOAL;
	}
	
	static successors(node, map) {
		var result = Array();
		// Check north
		if (node.north != null && node.north.type != Type.WALL) {
			result.push(node.north);
		}
		// Check south
		if (node.south != null && node.south.type != Type.WALL) {
			result.push(node.south);
		}
		// Check east
		if (node.east != null && node.east.type != Type.WALL) {
			result.push(node.east);
		}
		// Check west
		if (node.west != null && node.west.type != Type.WALL) {
			result.push(node.west);
		}
		return result;
	}
	
	static isFree(node, map) {
		return node !=node.y > 0 && map.grid[node.x][node.y - 1] != null && map.grid[node.x][node.y - 1].type != Type.WALL
	}
}

class PseudoRandomSearch extends Search {
	
	constructor(map, startNode) {
		super();
		this.map = map;
		this.current = startNode;
	}
	
	draw(ctx) {
		ctx.fillStyle = "#00F";
		ctx.fillRect(this.current.x * SQUARE_WIDTH, this.current.y * SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_HEIGHT);
	}
	
	step() {
		var succs = Search.successors(this.current, this.map);
		var rand = Math.floor(Math.random() * (succs.length));
		this.current = succs[rand];
	}
}