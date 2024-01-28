import { nodes, draw } from './drawGraph.js';

const canvas = document.getElementById('gameCanvas');
var selectedNode = null;
var offset = { x: 0, y: 0 };

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check the mouse clicked node
    for (let node of nodes) {
        // distance between clicked and node positions
        let dist = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        if (dist < 5) {
            selectedNode = node;
            offset.x = mouseX - node.x;
            offset.y = mouseY - node.y;
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (selectedNode) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        selectedNode.x = mouseX - offset.x;
        selectedNode.y = mouseY - offset.y;
        draw();
    }
});

canvas.addEventListener('mouseup', (e) => {
    selectedNode = null;
});
