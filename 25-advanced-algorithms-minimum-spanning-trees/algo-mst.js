class UnionFind {
  constructor(vertices) {
    this.parent = {};
    this.rank = {};

    vertices.forEach(v => {
      this.parent[v] = v;
      this.rank[v] = 0;
    });
  }

  find(vertex) {
    if (this.parent[vertex] !== vertex) {
      this.parent[vertex] = this.find(this.parent[vertex]); // path compression
    }
    return this.parent[vertex];
  }

  union(u, v) {
    const rootU = this.find(u);
    const rootV = this.find(v);

    if (rootU === rootV) return false; // cycle detected

    // union by rank
    if (this.rank[rootU] < this.rank[rootV]) {
      this.parent[rootU] = rootV;
    } else if (this.rank[rootU] > this.rank[rootV]) {
      this.parent[rootV] = rootU;
    } else {
      this.parent[rootV] = rootU;
      this.rank[rootU]++;
    }
    return true;
  }
}

/**
 * Kruskal’s Algorithm
 * @param {*} vertices 
 * @param {*} edges 
 * @returns 
 */
function kruskalMST(vertices, edges) {
  // Sort edges by increasing weight
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(vertices);
  const mst = [];
  let totalCost = 0;

  for (const edge of edges) {
    if (uf.union(edge.u, edge.v)) {
      mst.push(edge);
      totalCost += edge.weight;
    }
  }

  return { mst, totalCost };
}

const vertices = ["A", "B", "C", "D"];

const edges = [
  { u: "A", v: "B", weight: 4 },
  { u: "A", v: "C", weight: 1 },
  { u: "C", v: "B", weight: 2 },
  { u: "B", v: "D", weight: 5 },
  { u: "C", v: "D", weight: 3 }
];

const result = kruskalMST(vertices, edges);

console.log("Selected Connections (MST):");
result.mst.forEach(e =>
  console.log(`${e.u} -- ${e.v} (Cost: ${e.weight})`)
);

console.log("Total Network Cost:", result.totalCost);
