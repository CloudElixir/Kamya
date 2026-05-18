const fs = require('fs');
const path = require('path');

const REF_DIR = path.join(__dirname, '../assets/references');
const OUT = path.join(__dirname, '../src/reference-images.ts');

const FILES = {
  SPLASH: '01-splash.png',
  ONBOARD_1: '02-onboarding-1.png',
  ONBOARD_2: '03-onboarding-2.png',
  ONBOARD_3: '04-onboarding-3.png',
  ONBOARD_4: '05-onboarding-4.png',
  LOGIN: '06-login.png',
  SIGNUP: '07-signup.png',
  HOME_ASTROLOGER: '08-home-astrologer.png',
  DRAWER: '09-drawer.png',
  HOME_FULL: '10-home-full.png',
};

let total = 0;
const lines = ['// Auto-generated — do not edit', 'export const REF_IMAGES: Record<string, string> = {'];

for (const [key, file] of Object.entries(FILES)) {
  const fp = path.join(REF_DIR, file);
  if (!fs.existsSync(fp)) {
    console.error('Missing:', fp);
    process.exit(1);
  }
  const b64 = fs.readFileSync(fp).toString('base64');
  total += b64.length;
  lines.push(`  ${key}: '${b64}',`);
}

lines.push('};', '');
fs.writeFileSync(OUT, lines.join('\n'));
console.log(`Embedded ${Object.keys(FILES).length} references (${(total / 1024).toFixed(0)} KB base64)`);
