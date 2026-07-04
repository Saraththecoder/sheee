import gsap from 'gsap';

export function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  const hoverTargets = document.querySelectorAll('.hover-target, a, button');
  const magneticTargets = document.querySelectorAll('.magnetic');

  if (!cursor) return;

  // Move cursor with GSAP for smoother tracking
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    // Lerp for smooth cursor
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  });

  // Hover effect
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });

  // Magnetic Button Effect
  magneticTargets.forEach((target) => {
    target.addEventListener('mousemove', (e) => {
      const rect = target.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(target, {
        x: relX * 0.3,
        y: relY * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    target.addEventListener('mouseleave', () => {
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Hide default cursor when leaving window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = '0';
    }
  });

  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
  });
}
