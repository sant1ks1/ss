const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
let columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops.push(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // Green color
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

function updateMatrix() {
    drawMatrix();
    requestAnimationFrame(updateMatrix);
}

updateMatrix();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops.push(1);
    }
});

// Счетчик посещений
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter-value');
    let visitorCount = localStorage.getItem('visitorCount');

    if (visitorCount === null) {
        visitorCount = 1;
    } else {
        visitorCount = parseInt(visitorCount) + 1;
    }

    localStorage.setItem('visitorCount', visitorCount);
    counterElement.textContent = visitorCount;
});
