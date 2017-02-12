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
		if (node.y > 0 && map.grid[node.x][node.y - 1] != null && map.grid[node.x][node.y - 1] != Type.WALL) {
			result.push(map.grid[node.x][node.y - 1]);
		}
		// Check south
		if (node.y < map.height && map.grid[node.x][node.y + 1] != null && map.grid[node.x][node.y + 1] != Type.WALL) {
			result.push(map.grid[node.x][node.y + 1]);
		}
		// Check west
		if (node.x > 0 && map.grid[node.x - 1][node.y] != null && map.grid[node.x - 1][node.y].type != Type.WALL) {
			result.push(map.grid[node.x - 1][node.y]);
		}
		// Check east
		if (node.x < map.width && map.grid[node.x + 1][node.y] != null && map.grid[node.x + 1][node.y].type != Type.WALL) {
			result.push(map.grid[node.x + 1][node.y]);
		}
		return result;
	}
}
