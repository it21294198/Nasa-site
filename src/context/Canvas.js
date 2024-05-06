import React from 'react'
import fb from '../../public/fb.png'

export function Canvas(context,canvas) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    // Particle class
    class Particle {
        constructor() {
            this.x = canvas.width *2/ 3;
            this.y = canvas.height / 3;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.size = 4; // Initial size
            this.ax = Math.random() * 0.2 - 0.01; // Random acceleration in x-direction
            this.ay = Math.random() * 0.01 - 0.1; // Random acceleration in y-direction
            this.color = this.generateRandomColor();
        }

        generateRandomColor() {
            // Generate a random value between 0.1 and 1 for brightness to ensure colors are not too dark
            const brightness = Math.random() * 0.9 + 0.1;
            // Generate random values for red, green, and blue components in the orange range
            const red = 255;
            const green = Math.floor(Math.random() * 128 + 128);
            const blue = Math.floor(Math.random() * 64);
            return `rgba(${red}, ${green}, ${blue}, ${brightness})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.size+=0.02
        }

        draw() {
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < 75; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    // Animation loop
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas with window
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetAnimation();
    });

    // Reset animation after 1 minute
    const resetAnimation = () => {
        createParticles();
        setTimeout(resetAnimation, 20000); // 1 minute in milliseconds
    };

    resetAnimation();

    // Cleanup
    return () => {
        window.removeEventListener('resize');
    };
}
