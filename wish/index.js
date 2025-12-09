const wishBtn = document.getElementById('wishBtn');
const initialContent = document.getElementById('initial-content');
const wishContent = document.getElementById('wish-content');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Confetti Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function initConfetti() {
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.update();
        p.draw();
    });
    animationId = requestAnimationFrame(animateConfetti);
}

wishBtn.addEventListener('click', () => {
    initialContent.style.display = 'none';
    wishContent.classList.remove('hidden');

    // Start confetti
    initConfetti();
    animateConfetti();

    // Play your recording
    const birthdaySound = new Audio('./happy-birthday-254480.mp3');
    birthdaySound.volume = 0.8;
    birthdaySound.play().catch(err => console.log('Sound play failed:', err));
});
