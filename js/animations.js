import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // --- Hero Section Animations ---
  const tl = gsap.timeline();

  // Initial Hero Image Scale
  tl.fromTo('.hero-bg', 
    { scale: 1.2 },
    { scale: 1, duration: 2, ease: 'power3.out' }
  );

  // Reveal Text Masks
  tl.fromTo('.reveal-text span span', 
    { y: '100%' },
    { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out' },
    '-=1.5'
  );

  tl.fromTo('.hero-sub',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
    '-=1'
  );

  tl.fromTo('.floating-action',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
    '-=0.8'
  );

  // --- Scroll Parallax & Triggers ---

  // Hero Parallax on Scroll
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Story Image Parallax
  gsap.to('#story-img-parallax', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.story-image-wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Fade In Up Elements
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Reveal Text on Scroll
  const revealTexts = document.querySelectorAll('.section .reveal-text span span');
  revealTexts.forEach(el => {
    gsap.fromTo(el,
      { y: '100%' },
      {
        y: '0%',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el.closest('.reveal-text'),
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Tech Lines Animation
  gsap.fromTo('#tech-line',
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '#blueprint-img',
        start: 'top 70%',
      }
    }
  );

  // Image Expansion on Scroll
  const expandWrappers = document.querySelectorAll('.image-expand-wrapper');
  expandWrappers.forEach(wrapper => {
    const inner = wrapper.querySelector('.image-expand-inner');
    if (inner) {
      gsap.to(inner, {
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        }
      });
    }
  });

  // Global Parallax Backgrounds
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  parallaxBgs.forEach(bg => {
    gsap.to(bg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Global Scroll Progress Bar
  gsap.to('.scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // Header Shrink on Scroll
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: '.header'}
  });

  // Process Timeline Animation
  gsap.to('.process-line-progress', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.process-steps',
      start: 'top center',
      end: 'bottom center',
      scrub: true
    }
  });
}
