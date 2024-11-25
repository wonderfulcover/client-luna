<template>
  <canvas id="drawable" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Reactive canvas reference
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Particle settings
const particleNumber = 1000;
const updateFrequency = 16; // ~60 FPS (1000ms / 60)
const angleDemul = 500;
const zAngleDemul = 150;
const maxRadius = 5;
const minRadius = 0.5;

// Animation variables
let particles = [];
let animationFrameId: number | null = null;

// Helper function to get random color from violet, blue, and white
function getRandomColor() {
  const colors = ["rgb(138,43,226)", "rgb(0,0,255)", "rgb(255,255,255)"]; // Violet, Blue, White
  return colors[Math.floor(Math.random() * colors.length)];
}

// Particle constructor
function Particle(centerX: number, centerY: number, range: number) {
  this.angle = Math.random() * 2 * Math.PI;
  this.vangle = Math.random() / angleDemul;
  this.zangle = Math.random() * 2 * Math.PI;
  this.zvelangle = Math.random() / zAngleDemul;
  this.r = maxRadius * Math.random();
  this.color = getRandomColor();

  this.x = 0;
  this.y = 0;

  this.move = function () {
    this.y = centerY + range * Math.cos(this.angle);
    this.x = centerX + range * Math.cos(this.zangle) * Math.sin(this.angle);

    this.angle += this.vangle;
    this.zangle += this.zvelangle;

    if (Math.sin(this.zangle) > 0.5 && this.r < maxRadius) {
      this.r += 0.01;
    } else if (this.r > minRadius) {
      this.r -= 0.01;
    }
  };
}

function generateParticles(centerX: number, centerY: number, range: number) {
  for (let i = 0; i < particleNumber; i++) {
    particles.push(new Particle(centerX, centerY, range));
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: any) {
  ctx.beginPath();
  ctx.fillStyle = particle.color;
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
  ctx.fill();
}

function updateParticles(ctx: CanvasRenderingContext2D) {
  for (const particle of particles) {
    particle.move();
    drawParticle(ctx, particle);
  }
}

function clearBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Transparent background
}

function animateCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const range = Math.min(centerX - 100, centerY - 100);

  clearBackground(ctx, canvas);
  updateParticles(ctx);

  animationFrameId = requestAnimationFrame(() => animateCanvas(canvas));
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const range = Math.min(centerX - 100, centerY - 100);

  // Generate particles
  generateParticles(centerX, centerY, range);

  // Start animation
  animateCanvas(canvas);
});

onUnmounted(() => {
  // Cancel animation frame on unmount
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
  background-color: transparent; /* Transparent background */
}
</style>
