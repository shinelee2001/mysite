// Draw initial graph
const nodeForm = document.getElementById('nodeForm');
nodeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get node numbers from an input value
    const numNodes = document.getElementById('numNodes').value;
    generateGraph(numNodes);
    draw();
});

// Drawing graphs
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
export const edges = [];
export const nodes = [];

// drawGraph
function generateGraph(numNodes) {
    edges.length = 0;
    nodes.length = 0;
    // create nodes on canvas
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.clientWidth,
            y: Math.random() * canvas.height,
            degree: 0, // Initialize degree of each node to 0
        });
    }

    // create edges between nodes

    /*/////////////////////////////////////////////
    // METHOD 1 : Perform Delaunay triangulation //
    ///////////////////////////////////////////////
    const delaunay = Delaunator.from(nodes.map((node) => [node.x, node.y]));

    // Iterate through the triangles and add edges
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
        const p1 = nodes[delaunay.triangles[i]];
        const p2 = nodes[delaunay.triangles[i + 1]];
        const p3 = nodes[delaunay.triangles[i + 2]];
        edges.push({ start: p1, end: p2 });
        edges.push({ start: p2, end: p3 });
        edges.push({ start: p3, end: p1 });
    }

    /////////////////////////////////////////////////////////
    // METHOD 2: This does not ensure the graph is planar. //
    /////////////////////////////////////////////////////////
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            // Randomly make a line
            if (Math.random() < 0.8) {
                edges.push({ start: nodes[i], end: nodes[j] });
            }
        }
    }*/

    ///////////////////////////////////////////////////
    // METHOD 3: Randomized Incremental Construction //
    ///////////////////////////////////////////////////
    // Randomized Incremental Construction (RIC)
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            let isIntersect = false;

            // Check if the new edge intersects with existing edges
            for (let edge of edges) {
                const intersect = doLinesIntersect(
                    edge.start,
                    edge.end,
                    nodeA,
                    nodeB
                );
                if (intersect) {
                    isIntersect = true;
                    break;
                }
            }

            // If the new edge does not intersect, add it to the graph
            if (!isIntersect) {
                edges.push({ start: nodeA, end: nodeB });
                nodeA.degree++;
                nodeB.degree++;
            }
        }
    }

    // Check if any node has less than 2 edges and add new edges if necessary
    for (let node of nodes) {
        while (node.degree < 2) {
            // Filter nodes that are not already connected to 'node' and have at least 2 edges
            const availableNodes = nodes.filter(
                (n) =>
                    // Not the same node
                    n !== node &&
                    // Not already connected to 'node'
                    !edges.some(
                        (edge) =>
                            (edge.start === node && edge.end === n) ||
                            (edge.start === n && edge.end === node)
                    )
            );

            // If no available node, then break
            if (availableNodes.length === 0) break;

            // Select a random available node
            const otherNode =
                availableNodes[
                    Math.floor(Math.random() * availableNodes.length)
                ];

            // Add new edge between 'node' and 'otherNode'
            edges.push({ start: node, end: otherNode });
            node.degree++;
            otherNode.degree++;
        }
    }
}

function doLinesIntersect(a, b, c, d) {
    // Check if line segments AB and CD intersect
    const ccw = (a, b, c) => {
        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
    };

    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

// Once non-intersecting graph drawing is completed, shuffle the nodes
function shuffleNodes() {
    // Shuffle the nodes' positions
    for (let node of nodes) {
        node.x = Math.random() * canvas.clientWidth;
        node.y = Math.random() * canvas.height;
    }
    // Update edges' information based on the new node positions
    for (let edge of edges) {
        const startNode = edge.start;
        const endNode = edge.end;

        // Update the start and end points of the edge
        edge.start = { x: startNode.x, y: startNode.y };
        edge.end = { x: endNode.x, y: endNode.y };
    }
}

// drawLine
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

// Make highlights on nodes
function drawNodes(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
}

// drawLines
function drawLines() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // Draw all edges
    for (let edge of edges) {
        drawLine(edge.start.x, edge.start.y, edge.end.x, edge.end.y);
    }

    /////////////////////////////////////////////
    // An algorithm for checking intersections //
    /////////////////////////////////////////////
    // Check for intersections and update color
    for (let i = 0; i < edges.length; i++) {
        // Check if the current edge intersects with any other edge
        let isIntersect = false;
        for (let j = 0; j < edges.length; j++) {
            if (i !== j && doLinesIntersect(edges[i].start, edges[i].end, edges[j].start, edges[j].end)) {
                isIntersect = true;
                break;
            }
        }

        // Set color based on intersection
        if (isIntersect) {
            context.strokeStyle = 'red';
        } else {
            context.strokeStyle = 'black';
        }

        // Draw the current edge with updated color
        drawLine(edges[i].start.x, edges[i].start.y, edges[i].end.x, edges[i].end.y);
    }

    for (let node of nodes) {
        drawNodes(node.x, node.y, 5);
    }
}

export function draw() {
    drawLines();
}
