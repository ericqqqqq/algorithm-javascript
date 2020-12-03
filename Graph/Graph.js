class Graph {
  constructor(sz) {
    this.size = sz;
    this.nodes = [];
  }

  connect(n1, n2) {
    if (n1 > this.size - 1 || n2 > this.size - 1) return;

    if (!this.nodes[n1]) this.nodes[n1] = [];
    if (!this.nodes[n2]) this.nodes[n2] = [];

    this.nodes[n1].push(n2);
    this.nodes[n2].push(n1);
  }

  isConnect(n1, n2) {
    if (!this.nodes[n1]) return false;

    return this.nodes[n1].includes(n2);
  }

  adjacentNodes(v) {
    return this.nodes[v];
  }

  DFS(start) {
    let result = [];
    result = this.DepthFirstSearch(start, start, result, []);

    return result;
  }

  BFS(start) {
    return this.BreadthFirstSearch(start);
  }

  DepthFirstSearch(v, start, result, visited) {
    if (v === start && result.length > 0) return result;

    result.push(v);
    visited[v] = true;

    if (!this.adjacentNodes(v)) return result;

    this.adjacentNodes(v).forEach((node) => {
      if (!visited[node]) this.DepthFirstSearch(node, start, result, visited);
    });

    return result;
  }

  BreadthFirstSearch(start) {
    const queue = [start];
    const visited = [];
    const result = [];

    while (queue.length > 0) {
      if (this.adjacentNodes(queue[0])) {
        this.adjacentNodes(queue[0]).forEach((node) => {
          if (!visited[node]) queue.push(node);
        });
      }

      const node = queue.shift();
      visited[node] = true;
      result.push(node);
    }

    return result;
  }
}
