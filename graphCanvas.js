window.onload = function () {
    var canvas = document.getElementById('graphCanvas');
    var ctx = canvas.getContext('2d');
    var heartSize = 10;
    var xPos = -100;

    // Function to draw a heart shape
    function drawHeart(x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.quadraticCurveTo(x, y, x + size / 4, y);
        ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
        ctx.quadraticCurveTo(x + size / 2, y, x + (size * 3) / 4, y);
        ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
        ctx.quadraticCurveTo(
            x + size,
            y + size / 2,
            x + (size * 3) / 4,
            y + (size * 3) / 4
        );
        ctx.lineTo(x + size / 2, y + size);
        ctx.lineTo(x + size / 4, y + (size * 3) / 4);
        ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    // Animation function
    function animate() {
        if (heartSize < 100) {
            heartSize += 1; // Increase heart size
            xPos += 2; // Move heart to the right
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawHeart(xPos, canvas.height / 2 - heartSize / 2, heartSize);
            requestAnimationFrame(animate);
        }
    }

    // Start animation
    animate();
};
