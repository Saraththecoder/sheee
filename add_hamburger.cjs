const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// 1. Update HTML files
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add ID to nav-links if not present
  if (!content.includes('id="nav-links"')) {
    content = content.replace('<nav class="nav-links">', '<nav class="nav-links" id="nav-links">');
  }
  
  // Add hamburger icon before nav-links
  if (!content.includes('id="hamburger"')) {
    const hamburgerHTML = `
      <div class="hamburger hover-target" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="nav-links" id="nav-links">`;
    content = content.replace('<nav class="nav-links" id="nav-links">', hamburgerHTML);
  }
  
  fs.writeFileSync(file, content);
}

// 2. Update JS file
const jsPath = path.join(__dirname, 'js', 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');
if (!jsContent.includes('hamburger')) {
  jsContent += `

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
`;
  fs.writeFileSync(jsPath, jsContent);
}

// 3. Update CSS file
const cssPath = path.join(__dirname, 'styles', 'main.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace old mobile adjustments with new hamburger menu CSS
const oldCSS = `/* Mobile Adjustments */
@media (max-width: 1024px) {
  .header {
    flex-wrap: wrap;
    padding: 1rem 5vw;
    background-color: rgba(10, 10, 10, 0.95);
  }
  .header-actions {
    display: none; /* Hide header actions on smaller screens to save space */
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
}`;

const newCSS = `/* Mobile Adjustments */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
  z-index: 101;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: var(--text-white);
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 1024px) {
  .header {
    padding: 1rem 5vw;
    background-color: rgba(10, 10, 10, 0.95);
    flex-wrap: nowrap;
  }
  .header-actions {
    display: none; /* Hide extra actions to save space */
  }
  .hamburger {
    display: flex;
  }
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70vw;
    height: 100vh;
    background-color: var(--bg-deep);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: right 0.4s ease;
    z-index: 100;
    border-left: 1px solid rgba(255,255,255,0.1);
  }
  .nav-links.active {
    right: 0;
  }
}`;

if (cssContent.includes(oldCSS)) {
  cssContent = cssContent.replace(oldCSS, newCSS);
} else {
  // If exact match fails, just append (fallback)
  if (!cssContent.includes('.hamburger')) {
    cssContent += '\\n' + newCSS;
  }
}

fs.writeFileSync(cssPath, cssContent);

console.log('Hamburger menu implemented across all files.');
