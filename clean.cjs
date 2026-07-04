const fs = require('fs');

const files = ['about.html', 'contact.html', 'faqs.html', 'gallery.html', 'index.html', 'products.html', 'why-shees.html'];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<a href=\"#\" class=\"hover-target\"[^>]*>FB<\/a>\s*/g, '');
  content = content.replace(/\s*<a href=\"#\" class=\"hover-target\"[^>]*>YT<\/a>/g, '');
  fs.writeFileSync(file, content);
}
console.log('Removed FB and YT placeholders');
