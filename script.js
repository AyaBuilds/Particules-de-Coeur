const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createHeartParticles() {
    particles = [];
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        
        particles.push({
            x: canvas.width / 2 + x * 15,
            y: canvas.height / 2 - y * 15,
            size: Math.random() * 4 + 2,
            speedX: 0,
            speedY: 0,
            baseX: canvas.width / 2 + x * 15,
            baseY: canvas.height / 2 - y * 15
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 0, 100, 0.8)";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

canvas.addEventListener("mousemove", (event) => {
    particles.forEach(p => {
        let dx = event.clientX - p.x;
        let dy = event.clientY - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
            p.x += dx * 0.1;
            p.y += dy * 0.1;
        } else {
            p.x += (p.baseX - p.x) * 0.02;
            p.y += (p.baseY - p.y) * 0.02;
        }
    });
});

createHeartParticles();
drawParticles();
