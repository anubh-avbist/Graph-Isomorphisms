# Graph Isomorphisms
 
This project deals with the case of simple graphs: graphs with undirected, unweighted, and unrepeated edges between vertices, and no self edges. Open the index.html file and create two graphs to see if they are isomorphic.

## The Algorithm

The [Graph Isomorphism Problem](https://en.wikipedia.org/wiki/Graph_isomorphism_problem) is not known to be solvable in polynomial time as of now. I have implemented a brute force method with some minor optimizations. Every simple graph can be represented entirely by its adjacency matrix, and all of its isomorphisms are permutations of this matrix. Using [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm), I iterate through every possible permutation of one of the graphs' adjacency matrix and stop either when one of the matrices matches (the graphs are isomorphic), or when all possibilities have been exhausted (the graphs are not isomorphic).

-----
The canvas/visuals are all made using p5.js. Graph.js contains all of the class information for the Graph class, Node class, and Edge class, and script.js contains the logic (checking for isomorphisms, updating the HTML etc.)
