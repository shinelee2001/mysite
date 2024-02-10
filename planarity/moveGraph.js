import { nodes, draw } from './drawGraph.js';

const canvas = document.getElementById('gameCanvas');
var selectedNode = null;
var offset = { x: 0, y: 0 };

// Define event types based on device type
const eventTypeDown = isMobile() ? 'touchstart' : 'mousedown';
const eventTypeMove = isMobile() ? 'touchmove' : 'mousemove';
const eventTypeUp = isMobile() ? 'touchend' : 'mouseup';

canvas.addEventListener(eventTypeDown, (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse clicked node
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

canvas.addEventListener(eventTypeMove, (e) => {
    if (selectedNode) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Move the selected node
        selectedNode.x = mouseX - offset.x;
        selectedNode.y = mouseY - offset.y;
        draw();
    }
});

canvas.addEventListener(eventTypeUp, (e) => {
    selectedNode = null;
});
