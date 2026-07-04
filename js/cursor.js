export function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  const hoverTargets = document.querySelectorAll('.hover-target, a, button');

  if (!cursor) return;

  // Move cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
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
