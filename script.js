let G = new Graph("G", 'red', 'pink');
let H = new Graph("H", 'blue', 'lightblue');
const cvsWidth = 500;
let isomorphic = true;
let state = {
	graph: G,
	editMode: "nodes",
	selectedGraph: null,
	highlightedNode: null,
	selectedNode: null
};

function setup() {
	var canvas = createCanvas(cvsWidth, cvsWidth);
	canvas.parent('content');
	background(50);

}

function draw() {
	background(50);

	for (let i = 0; i < G.edges.length; i++) {
		G.edges[i].display();
	}
	for (let i = 0; i < H.edges.length; i++) {
		H.edges[i].display();
	}
	for (let i = 0; i < G.order; i++) {
		G.nodes[i].display();
	}
	for (let i = 0; i < H.order; i++) {
		H.nodes[i].display();
	}

}


function mousePressed() {
	if(mouseX > 0 && mouseX < cvsWidth && mouseY > 0 && mouseY < cvsWidth)
	if (state.editMode == "nodes") {
		let node = new Node(state.graph, state.graph.order, [mouseX, mouseY], 20);
		state.graph.addNode(node);
	} else { // EDGE MODE
		if (state.highlightedNode != null) {
			if (state.selectedNode == null) {
				state.selectedNode = state.highlightedNode;
				state.selectedNode.selected = true;
			} else {
				if (state.highlightedNode.graph.color == state.selectedNode.graph.color) {
					let a = state.selectedNode;
					let b = state.highlightedNode;
					if(state.selectedNode.id > state.highlightedNode.id){
						a = state.highlightedNode;
						b = state.selectedNode;
					}

					state.highlightedNode.graph.addEdge(new Edge(
						a.id + "-" + b.id,
						a,
						b
					));
				}

				state.selectedNode.selected = false;
				state.selectedNode = null;
			}
		} else {
			if (state.selectedNode != null) {
				state.selectedNode.selected = false;
			}
			state.selectedNode = null;
		}
	}
	updateHTML();
}

function keyPressed() {
	if (key === 'e') {
		if (state.editMode == "nodes") {
			state.editMode = "edges";
		} else {
			state.editMode = "nodes";
		}
	}

	if (key === 'c') {
		if (state.graph == G) {
			state.graph = H;
			console.log(H.toString());
		} else {
			state.graph = G;
			console.log(G.toString());
		}
	}
	updateHTML();
}

function updateHTML(){
	document.getElementById("GInfo").innerHTML = G.toString().replaceAll("\n", "<br>");
	document.getElementById("HInfo").innerHTML = H.toString().replaceAll("\n", "<br>");
	document.getElementById("Mode").innerHTML = "Edit Mode: " + (state.editMode == "nodes" ? "Adding Nodes" : "Adding Edges");
	document.getElementById("Graph").innerHTML = "Currently Adding Nodes To: " + state.graph.name + " (" +state.graph.color + ")";

	Isomorphic = checkIsomorphic(G,H);
	document.getElementById("Isomorphic").innerHTML = "Isomorphic: " + (Isomorphic ? "True" : "False");
}

function checkIsomorphic(a,b){
	if(a.order != b.order || a.edges.length != b.edges.length){
		return false;
	}
	
	return true;
}