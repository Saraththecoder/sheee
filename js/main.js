import Lenis from 'lenis';
import { initCursor } from './cursor.js';
import { initAnimations } from './animations.js';

// Preloader Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
      preloader.remove();
    }, 800);
  }
});

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 2.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 0.8,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize Custom Cursor
initCursor();

// Initialize GSAP Animations
window.addEventListener('load', () => {
  initAnimations();
});


// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
});
