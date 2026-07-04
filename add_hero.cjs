const fs = require('fs');
const cheerio = require('cheerio');

const pages = [
  { file: 'about.html', title: 'ABOUT SHEES', img: '/images/products/door_2_1.jpeg' },
  { file: 'products.html', title: 'THE COLLECTION', img: '/images/products/door_3_1.jpeg' },
  { file: 'why-shees.html', title: 'WHY SHEES', img: '/images/products/door_4_1.jpeg' },
  { file: 'gallery.html', title: 'GALLERY', img: '/images/products/door_5_1.jpeg' },
  { file: 'faqs.html', title: 'FAQS', img: '/images/products/door_6_1.jpeg' },
  { file: 'contact.html', title: 'CONTACT US', img: '/images/products/door_7_1.jpeg' }
];

pages.forEach(({ file, title, img }) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });
    
    // Check if hero already exists
    if ($('main .hero').length === 0) {
      const heroHTML = `
      <section class="hero" id="hero">
        <div class="parallax-bg" style="background-image: url('${img}'); position: absolute; top: -15%; left: 0; width: 100%; height: 130%; background-size: cover; background-position: center; z-index: -2; will-change: transform;"></div>
        <div class="hero-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, var(--bg-deep) 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0.8) 100%); z-index: -1;"></div>
        <div class="hero-content container" style="text-align: center;">
          <h1 class="hero-title text-huge reveal-text" style="margin: 0 auto; max-width: 100%;">
            <span><span>${title}</span></span>
          </h1>
        </div>
      </section>
      `;
      $('main').prepend(heroHTML);
      
      // Remove the inline padding-top: 25vh from the next section to avoid double spacing
      const firstSection = $('main > section.section').first();
      let style = firstSection.attr('style') || '';
      style = style.replace(/padding-top:\s*25vh;?/, '');
      firstSection.attr('style', style);
      
      fs.writeFileSync(file, $.html());
      console.log(`Added hero to ${file}`);
    }
  }
});
