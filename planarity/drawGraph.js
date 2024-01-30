// Get node numbers
const nodeForm = document.getElementById('nodeForm');
nodeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const numNodes = document.getElementById('numNodes').value;
    generateGraph(numNodes);
    draw();
});

// Drawing graphs
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const lines = []; // Lines for a graph
export const nodes = [];

// drawGraph
function generateGraph(numNodes) {
    lines.length = 0;
    nodes.length = 0;
    // create nodes on canvas
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.clientWidth,
            y: Math.random() * canvas.height,
        });
    }

    // create lines between nods
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            // Randomly make a line
            if (Math.random() < 0.8) {
                lines.push({ start: nodes[i], end: nodes[j] });
            }
        }
    }
}

// drawLine
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

// Points nodes
function drawNodes(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
}

// drawLines
function drawLines() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);
    context.strokeStyle = 'black';
    for (let line of lines) {
        drawLine(line.start.x, line.start.y, line.end.x, line.end.y);
    }
    for (let node of nodes) {
        drawNodes(node.x, node.y, 5);
    }
}

export function draw() {
    drawLines();
}
