const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content);
  let modified = false;

  $('.story-image-wrap').each((i, el) => {
    $(el).addClass('image-expand-wrapper');
    modified = true;
  });

  $('.story-image').each((i, el) => {
    $(el).addClass('image-expand-inner layer-visual');
    modified = true;
  });

  $('.exhibition-image-wrap').each((i, el) => {
    $(el).addClass('image-expand-wrapper');
    modified = true;
  });

  $('.exhibition-image').each((i, el) => {
    $(el).addClass('image-expand-inner layer-visual');
    modified = true;
  });

  if (modified) {
    fs.writeFileSync(file, $.html());
    console.log(`Updated ${file}`);
  }
});
