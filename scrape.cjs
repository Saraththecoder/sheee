const https = require('https');
const fs = require('fs');

https.get('https://akgroupinfra.com/assets/index-DoHuhIzl.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract everything between double quotes that has a space and at least 2 words
    const strings = data.match(/"[A-Za-z]+(?:\s+[A-Za-z]+){1,}"/g);
    if (strings) {
      const uniqueStrings = [...new Set(strings)];
      fs.writeFileSync('ak_text.txt', uniqueStrings.slice(0, 100).join('\n'));
      console.log('Saved ' + uniqueStrings.length + ' strings.');
    } else {
      console.log('No matches');
    }
  });
});
