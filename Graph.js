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
		return str;
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
		this.name = name;
		this.a = a;
		this.b = b;
	}

	display() {
		stroke(255);
		strokeWeight(5);
		line(this.a.pos[0], this.a.pos[1], this.b.pos[0], this.b.pos[1]);
	}
}
