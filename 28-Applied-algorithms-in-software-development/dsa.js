function dijkstra(graph, start) {
    const distances = {}; // Stores shortest distances from start
    const visited = new Set(); // Keeps track of visited nodes
    const nodes = new Set(Object.keys(graph)); // All vertices in the graph

    // Step 1: Initialize distances
    for (let node of nodes) {
        distances[node] = Infinity; // Initially, all distances are infinite
    }
    distances[start] = 0; // Distance to start node is 0

    while (visited.size < nodes.size) {
        // Step 2: Find unvisited node with smallest distance
        let currentNode = null;
        let smallestDistance = Infinity;
        for (let node of nodes) {
            if (!visited.has(node) && distances[node] < smallestDistance) {
                smallestDistance = distances[node];
                currentNode = node;
            }
        }

        if (currentNode === null) {
            break; // No reachable unvisited nodes left
        }

        // Step 3: Update distances for neighbors
        for (let neighbor in graph[currentNode]) {
            if (!visited.has(neighbor)) {
                const newDistance = distances[currentNode] + graph[currentNode][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
            }
        }

        // Step 4: Mark current node as visited
        visited.add(currentNode);
    }

    return distances;
}

const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const shortestDistances = dijkstra(graph, 'A');
console.log(shortestDistances);
