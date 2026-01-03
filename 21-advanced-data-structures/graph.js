class Graph {
  constructor(isDirected = false) {
    this.adjList = {};
    this.isDirected = isDirected;
  }

  // Add a vertex if it doesn't exist
  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  // Add an edge
  addEdge(u, v) {
    this.addVertex(u);
    this.addVertex(v);

    this.adjList[u].push(v);

    if (!this.isDirected) {
      this.adjList[v].push(u);
    }
  }

  // Remove an edge
  removeEdge(u, v) {
    if (this.adjList[u]) {
      this.adjList[u] = this.adjList[u].filter(
        vertex => vertex !== v
      );
    }

    if (!this.isDirected && this.adjList[v]) {
      this.adjList[v] = this.adjList[v].filter(
        vertex => vertex !== u
      );
    }
  }

  // Check if an edge exists
  hasEdge(u, v) {
    return this.adjList[u].includes(v) || false;
  }

  // Print the graph
  printGraph() {
    for (let vertex in this.adjList) {
      console.log(`${vertex} -> ${this.adjList[vertex].join(", ")}`);
    }
  }

  // Depth-First Search (DFS)
  dfs(start) {
    const visited = new Set();

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      console.log(vertex);

      for (let neighbor of this.adjList[vertex]) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(start);
  }

  // Breadth-First Search (BFS)
  bfs(start) {
    const visited = new Set();
    const queue = [];

    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex);

      for (let neighbor of this.adjList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}


const graph = new Graph(false);

// Add edges
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

// Print graph
console.log("Graph:");
graph.printGraph();

// Check edge existence
console.log("\nEdge A-B:", graph.hasEdge("A", "B")); // true
console.log("Edge C-D:", graph.hasEdge("C", "D")); // false

// DFS Traversal
console.log("\nDFS starting from A:");
graph.dfs("A");

// BFS Traversal
console.log("\nBFS starting from A:");
graph.bfs("A");