/* --- 1. CANVAS FLOATING YELLOW PETALS --- */
const canvas = document.getElementById('petalsCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let petals = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.6 + 0.3;
        
        // Color palette: sunflower yellow to gold
        const colors = ['#f5be18', '#ffd166', '#fff3b0', '#d4af37'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 20) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(this.size, -this.size / 2, this.size, -this.size);
        ctx.quadraticCurveTo(0, -this.size * 1.5, -this.size, -this.size);
        ctx.quadraticCurveTo(-this.size, -this.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
    }
}

function initPetals() {
    petals = [];
    const count = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < count; i++) {
        const petal = new Petal();
        petal.y = Math.random() * height; // Distribute initially
        petals.push(petal);
    }
}

function animatePetals() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animatePetals);
}

initPetals();
animatePetals();

/* --- 2. SVG FLOWER RE-BLOOM TRIGGER --- */
function triggerBloom() {
    const svg = document.getElementById('flowerSVG');
    const clone = svg.cloneNode(true);
    svg.parentNode.replaceChild(clone, svg);

    // Trigger burst of extra floating petals
    for (let i = 0; i < 15; i++) {
        const petal = new Petal();
        petal.x = width / 2 + (Math.random() * 200 - 100);
        petal.y = height / 2 + (Math.random() * 200 - 100);
        petals.push(petal);
    }
}

/* --- 3. MODAL CONTROLS --- */
function openModal() {
    document.getElementById('letterModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('letterModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('letterModal').addEventListener('click', (e) => {
    if (e.target.id === 'letterModal') closeModal();
});

/* --- 4. CONTROL DE AUDIO MP3 --- */
const bgMusic = document.getElementById('bg-music');

function toggleAudio() {
    const btnText = document.getElementById('musicText');
    const btnIcon = document.getElementById('musicIcon');

    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            btnText.textContent = 'Pausar Violín';
            btnIcon.className = 'fa-solid fa-pause text-sunflower';
        }).catch(err => {
            console.error("Error al reproducir audio:", err);
        });
    } else {
        bgMusic.pause();
        btnText.textContent = 'Melodía Operística';
        btnIcon.className = 'fa-solid fa-music text-sunflower';
    }
}