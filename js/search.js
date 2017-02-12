class SearchNode {
	construct(current, last) {
		this.current = current;
		this.last = last;
	}
}

class Search {
	construct(map) {
		this.map = map;
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
