const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../assets/splash-reference.png');
const out = path.join(__dirname, '../src/splash-image.ts');

const b64 = fs.readFileSync(src).toString('base64');
fs.writeFileSync(
  out,
  `// Auto-generated — do not edit\nexport const SPLASH_B64 = '${b64}';\n`
);
console.log(`Embedded splash (${(b64.length / 1024).toFixed(0)} KB base64)`);
