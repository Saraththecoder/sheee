const fs = require('fs');

const originalLines = fs.readFileSync('styles/main.css', 'utf8').split('\n');

// Find the line where "/* Animations */" starts
const animIndex = originalLines.findIndex(l => l.includes('/* Animations */'));

// Keep everything up to the first rule of animations
let goodLines = originalLines.slice(0, animIndex);

const restOfCSS = `
/* Animations */
.reveal-text > span {
  display: block;
  overflow: hidden;
}

.reveal-text > span > span {
  display: inline-block;
  transform: translateY(100%);
}

/* Mobile Adjustments */
@media (max-width: 1024px) {
  .header {
    flex-wrap: wrap;
    padding: 1rem 5vw;
    background-color: rgba(10, 10, 10, 0.95);
  }
  .header-actions {
    display: none;
  }
  .nav-links {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0 0.5rem;
    justify-content: flex-start;
    gap: 1.5rem;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .nav-links::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 768px) {
  .story-grid {
    grid-template-columns: 1fr;
  }
  .story-text {
    padding-left: 0;
  }
  .exhibition-item, .exhibition-item:nth-child(even) {
    flex-direction: column;
  }
  .exhibition-image-wrap, .exhibition-info {
    width: 100%;
  }
  .exhibition-info {
    padding: 2rem 0;
  }
  
  [style*="grid-template-columns: 1fr 1fr"],
  [style*="grid-template-columns: 2fr 1fr"],
  [style*="grid-template-columns: 1.5fr"] {
    grid-template-columns: 1fr !important;
  }
  
  div[style*="rotate(-90deg)"] {
    display: none !important;
  }
  
  .hero-title {
    max-width: 100%;
  }
}

/* Glowing CTAs */
.glow-cta {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 229, 255, 0);
}
.glow-cta:hover {
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
  transform: translateY(-2px);
}
.glow-cta::before {
  content: "";
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: all 0.5s ease;
}
.glow-cta:hover::before {
  left: 100%;
}

/* Floating Elements */
.floating-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
}
.float-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--bg-graphite);
  border: 1px solid var(--support-silver);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  transition: all 0.3s ease;
  font-family: var(--font-heading);
}
.float-btn.whatsapp {
  background-color: #25D366;
  border-color: #25D366;
}
.float-btn:hover {
  transform: scale(1.1);
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background-color: var(--accent-blue);
  z-index: 1001;
}

/* Header Shrink */
.header {
  transition: padding 0.4s ease, background-color 0.4s ease;
}
.header.scrolled {
  padding: 1rem 5vw;
  background-color: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
}

/* Additional Mobile Adjustments */
@media (max-width: 768px) {
  .footer .grid, .footer-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  .story-section .grid, .section .grid {
    grid-template-columns: 1fr !important;
  }
  .floating-widget {
    bottom: 1rem;
    right: 1rem;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .gallery-item:nth-child(2n) {
    margin-top: 0;
  }
  .section {
    padding: 15vw 0;
  }
  .hero-content {
    margin-top: 15vh;
  }
}
`;

fs.writeFileSync('styles/main.css', goodLines.join('\n') + '\n' + restOfCSS.trim());
