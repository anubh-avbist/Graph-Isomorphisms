class Graph {
	constructor(name, color, highlight) {
		this.highlight = highlight;
		this.color = color;
		this.name = name;
		this.nodes = [];
		this.edges = [];
		this.order = 0;
	}
	

	addNode(node) {
		this.nodes.push(node);
		this.order++;
	}

	addEdge(edge) {
		let simple = true; // Checks if it keeps the graph simple
		for (let e of this.edges) {
			if (e.name === edge.name) {
				simple = false;
			}
		}
		if (edge.a == edge.b) {
			simple = false;
		}

		if (simple) {
			this.edges.push(edge);
		}
	}

	toString() {

		let str = "";
		str += this.name + " (" + this.color + ") " + "\n";
		str += "ORDER: " + this.order + "\n";
		str += "\nEDGES:\n";
		for (let edge of this.edges) {
			str += "\t" + edge.name + "\n";
		}
		str += "\n ----\n"
		str += this.adjacencyMatrixString();
		str += "\n ----\n"
		return str;
	}

	adjacencyMatrixString() {
		let str = "";
		this.adjacencyMatrix.forEach((row) => {
			str += "[";
			row.forEach((val) => {
				str += val + ", ";
			})
			str = str.substring(0, str.length - 2);
			str += "]\n";
		})
		return str;
	}

	get adjacencyMatrix() {
		let matrix = Array(this.order).fill().map(() => Array(this.order).fill(0));
		
		this.nodes.forEach((node) => {
			node.edges.forEach((edge)=> {
				matrix[edge.a.id][edge.b.id] = 1;
				matrix[edge.b.id][edge.a.id] = 1;
			})
		})
		/*
		this.edges.forEach((edge) => {
			matrix[edge.a.id][edge.b.id] = 1;
			matrix[edge.b.id][edge.a.id] = 1;
		})*/
		return matrix;
	}

	swap(i, j) {
		let tempID = this.nodes[i].id;
		this.nodes[i].id = this.nodes[j].id;
		this.nodes[j].id = tempID;

		let tempNode = this.nodes[i];
		this.nodes[i] = this.nodes[j];
		this.nodes[j] = tempNode;

	}
}

class Node {
	constructor(graph, id, pos, r) {
		this.graph = graph;
		this.id = id;
		this.edges = [];
		this.pos = pos;
		this.neighbors = [];
		this.r = r;
		this.selected = false;
	}
	display() {
		stroke(0);
		fill(this.graph.color);
		if (state.editMode == "edges") {
			if (Math.sqrt(Math.pow((mouseX - this.pos[0]), 2) + Math.pow(mouseY - this.pos[1], 2)) < this.r / 2) {
				fill(this.graph.highlight);
				state.highlightedNode = this;
			} else if (state.highlightedNode == this) {
				state.highlightedNode = null;
			}

			if (this.selected) {
				fill(this.graph.highlight);
			}
		}
		strokeWeight(0);
		ellipse(this.pos[0], this.pos[1], this.r);
		stroke(0);
		strokeWeight(1);
		fill(255);
		text(this.id, this.pos[0] - this.r / 4, this.pos[1]);
	}
}

class Edge {
	constructor(name, a, b) {
		this.a = a;
		this.b = b;
		this.a.edges.push(this);
		this.b.edges.push(this);
	}


	get name() {
		return this.a.id + "-" + this.b.id;
	}

	display() {
		stroke(255);
		strokeWeight(5);
		line(this.a.pos[0], this.a.pos[1], this.b.pos[0], this.b.pos[1]);
	}
}


console.log(Array(5).fill(0) == Array(5).fill(0));