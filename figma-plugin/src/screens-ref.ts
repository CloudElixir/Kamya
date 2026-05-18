import { C, FONT, H, W } from './tokens';
import {
  cosmicBackground,
  goldDivider,
  kamyaBottomNav,
  kamyaHeader,
  kamyaLogo,
  kamyaTagline,
  mandalaSplash,
  onboardingChrome,
  phoneMockup,
  pillGoldButton,
  purpleInputGroup,
  whiteCard,
} from './ui-parts';
import { addText, createScreenFrame, glassCard, solid } from './utils';

export function screenSplash(): FrameNode {
  const f = createScreenFrame('01_Splash');
  cosmicBackground(f);
  mandalaSplash(f, W / 2, 280, 130);
  kamyaLogo(f, W / 2 - 52, H - 200, 40);
  kamyaTagline(f, H - 148);
  return f;
}

const ONBOARD = [
  {
    title: 'Discover Your Destiny',
    desc: 'Unveil the cosmic patterns shaping your life and step into alignment with your true path.',
    phone: 'chat' as const,
  },
  {
    title: 'Connect with Expert Astrologers',
    desc: 'Consult experienced astrologers, tarot readers and spiritual healers for deep, personalized guidance.',
    phone: 'astrologers' as const,
  },
  {
    title: 'Daily Guidance & Remedies',
    desc: 'Receive daily insights, remedies, and spiritual practices to elevate your life.',
    phone: 'notifications' as const,
  },
  {
    title: 'Spiritual Journal',
    desc: 'A sacred space to reflect, record your thoughts, and stay aligned with your inner self.',
    phone: 'journal' as const,
  },
];

function fillPhone(phone: FrameNode, type: string): void {
  const inner = figma.createFrame();
  inner.resize(phone.width - 16, phone.height - 48);
  inner.x = 8;
  inner.y = 36;
  inner.cornerRadius = 20;
  inner.fills = [solid(C.purple, 0.9)];
  inner.clipsContent = true;
  phone.appendChild(inner);

  if (type === 'chat') {
    addText(inner, 'Chat', 16, 12, 16, C.gold, FONT.headingReg);
    const b1 = whiteCard(inner, 12, 44, inner.width - 24, 48, 'Bubble');
    addText(b1, 'Namaste! Share your birth details.', 10, 10, 10, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
    const b2 = whiteCard(inner, 12, 100, inner.width - 60, 40, 'Bubble2');
    addText(b2, 'DOB: 15 Mar 1995, Mumbai', 10, 10, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
  } else if (type === 'astrologers') {
    addText(inner, 'Astrologers', 16, 12, 14, C.gold, FONT.bodyBold);
    ['Aditi · ★5', 'Raj · ★4.9', 'Meera · ★4.8'].forEach((n, i) => {
      const c = whiteCard(inner, 12, 44 + i * 72, inner.width - 24, 64, n);
      addText(c, n, 12, 12, 11, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
      addText(c, '₹60/min · Chat · Call', 12, 32, 9, { r: 0.4, g: 0.4, b: 0.5 }, FONT.body);
    });
  } else if (type === 'notifications') {
    addText(inner, '11:11', inner.width / 2 - 20, 20, 28, C.cream, FONT.heading);
    addText(inner, 'Friday, 11 March 2026', 40, 56, 10, C.muted, FONT.body);
    const n1 = whiteCard(inner, 12, 80, inner.width - 24, 56, 'Notif');
    addText(n1, 'Pisces — Today focuses on balancing emotions...', 12, 12, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
    const n2 = whiteCard(inner, 12, 144, inner.width - 24, 56, 'Notif2');
    addText(n2, 'Astrologer is Live — personalized guidance', 12, 12, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
  } else {
    addText(inner, 'Spiritual Journal', 16, 12, 13, C.gold, FONT.bodyBold);
    ['Today I pause and listen within...', 'The universe whispers patience...'].forEach((t, i) => {
      const jc = whiteCard(inner, 12, 44 + i * 80, inner.width - 24, 72, 'Entry');
      addText(jc, t, 12, 12, 10, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
      addText(jc, 'Read More...', jc.width - 72, 52, 8, { r: 0.5, g: 0.5, b: 0.55 }, FONT.body);
    });
  }
}

export function screenOnboarding(index: number): FrameNode {
  const d = ONBOARD[index];
  const f = createScreenFrame(`02_Onboarding_${index + 1}`);
  cosmicBackground(f);
  onboardingChrome(f, index);
  const title = addText(f, d.title, 24, 100, 26, C.gold, FONT.heading, W - 48);
  title.textAlignHorizontal = 'CENTER';
  title.x = 24;
  const desc = addText(f, d.desc, 32, 150, 14, C.cream, FONT.body, W - 64);
  desc.textAlignHorizontal = 'CENTER';
  const phone = phoneMockup(f, (W - 260) / 2, 220, 260, 420, `Phone/${d.phone}`);
  fillPhone(phone, d.phone);
  return f;
}

export function screenLogin(): FrameNode {
  const f = createScreenFrame('03_Login');
  cosmicBackground(f);
  kamyaLogo(f, W / 2 - 48, 72, 28);
  kamyaTagline(f, 118);
  goldDivider(f, 145);
  const welcome = addText(f, 'Welcome to Kamya', 0, 168, 22, C.gold, FONT.heading);
  welcome.resize(W, 28);
  welcome.textAlignHorizontal = 'CENTER';
  const sub = addText(f, 'Talk. Connect. Understand. Align with the universe', 40, 200, 13, C.cream, FONT.body, W - 80);
  sub.textAlignHorizontal = 'CENTER';
  purpleInputGroup(f, 24, 250, W - 48, ['✉  Email or Phone Number', '🔒  Password']);
  addText(f, 'Forgot password?', W - 130, 370, 12, C.amber, FONT.bodyMed);
  pillGoldButton(f, 'Sign in', 24, 400, W - 48);
  addText(f, 'or continue with', W / 2 - 40, 475, 12, C.muted, FONT.body);
  let sx = 50;
  ['Apple', 'Google', 'Facebook'].forEach((s) => {
    const box = glassCard(88, 72, s);
    box.x = sx;
    box.y = 500;
    box.cornerRadius = 14;
    box.fills = [solid(C.purple, 0.8)];
    addText(box, s, 20, 28, 11, C.cream, FONT.bodyMed);
    f.appendChild(box);
    sx += 102;
  });
  const foot = addText(f, "Don't have an account? Sign up →", 60, H - 48, 13, C.cream, FONT.body);
  return f;
}

export function screenSignup(): FrameNode {
  const f = createScreenFrame('04_Signup');
  cosmicBackground(f);
  const title = addText(f, 'Create Your Kamya Account', 24, 64, 24, C.gold, FONT.heading, W - 48);
  title.textAlignHorizontal = 'CENTER';
  const sub = addText(f, 'Begin your journey of self-discovery and align with your true path.', 32, 100, 13, C.cream, FONT.body, W - 64);
  sub.textAlignHorizontal = 'CENTER';
  inputFieldStyled(f, 'Full Name', 24, 150, W - 48);
  const row = figma.createFrame();
  row.resize(W - 48, 52);
  row.x = 24;
  row.y = 214;
  row.fills = [solid(C.purple, 0.85)];
  row.cornerRadius = 14;
  row.strokes = [solid(C.gold, 0.15)];
  addText(row, '📅  Select Date', 16, 16, 13, C.muted, FONT.body);
  addText(row, '🕐  Time: 04:30 PM', row.width / 2, 16, 12, C.muted, FONT.body);
  f.appendChild(row);
  inputFieldStyled(f, 'Place of Birth', 24, 276, W - 48);
  inputFieldStyled(f, 'Email Address / Phone Number', 24, 338, W - 48);
  inputFieldStyled(f, 'Password', 24, 400, W - 48);
  inputFieldStyled(f, 'Confirm Password', 24, 462, W - 48);
  addText(f, 'Your information is secure and kept private.', 50, 530, 11, C.amber, FONT.body);
  pillGoldButton(f, 'Sign up', 24, 560, W - 48);
  addText(f, 'Already have an account? Sign in →', 70, H - 40, 12, C.cream, FONT.body);
  return f;
}

function inputFieldStyled(parent: FrameNode, ph: string, x: number, y: number, w: number): void {
  const field = figma.createFrame();
  field.resize(w, 52);
  field.x = x;
  field.y = y;
  field.cornerRadius = 14;
  field.fills = [solid(C.purple, 0.85)];
  field.strokes = [solid(C.gold, 0.12)];
  field.strokeWeight = 1;
  addText(field, ph, 20, 16, 14, C.muted, FONT.body);
  parent.appendChild(field);
}

export function screenHome(): FrameNode {
  const f = createScreenFrame('05_Home');
  cosmicBackground(f);
  let y = kamyaHeader(f, 44);
  const services = ['Horoscope', 'Kundli', 'Tarot', 'Panchang', 'Matching'];
  let sx = 16;
  services.forEach((s) => {
    const box = glassCard(68, 72, s);
    box.x = sx;
    box.y = y;
    addText(box, '✦', 24, 14, 20, C.gold, FONT.body);
    const lbl = addText(box, s, 4, 44, 8, C.cream, FONT.body);
    lbl.resize(60, 20);
    lbl.textAlignHorizontal = 'CENTER';
    f.appendChild(box);
    sx += 74;
  });
  y += 88;
  const promo = whiteCard(f, 20, y, W - 40, 100, 'Promo');
  addText(promo, 'Confused about Career or Business?', 16, 16, 13, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
  addText(promo, 'Let the stars guide your path.', 16, 38, 11, { r: 0.35, g: 0.35, b: 0.45 }, FONT.body);
  y += 115;
  addText(f, 'Consult a Jyotish Acharya', 20, y, 16, C.gold, FONT.bodyBold);
  addText(f, 'View all →', W - 80, y, 12, C.amber, FONT.bodyMed);
  y += 28;
  const astro = whiteCard(f, 20, y, 200, 150, 'Aditi');
  const av = figma.createEllipse();
  av.resize(48, 48);
  av.x = 16;
  av.y = 16;
  av.fills = [solid(C.purple)];
  av.strokes = [solid(C.gold, 0.5)];
  av.strokeWeight = 2;
  astro.appendChild(av);
  addText(astro, 'Aditi', 72, 20, 14, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
  addText(astro, '★ 4.0 · Chat ₹5 · Call ₹9', 72, 42, 10, { r: 0.45, g: 0.4, b: 0.2 }, FONT.body);
  kamyaBottomNav(f, 0);
  return f;
}

export function screenHomeAstrologer(): FrameNode {
  const f = createScreenFrame('05b_Home_Astrologer');
  cosmicBackground(f);
  kamyaHeader(f, 44);
  const featured = glassCard(W - 40, 120, 'Featured');
  featured.x = 20;
  featured.y = 160;
  addText(featured, 'Aditi Ji', 80, 20, 16, C.cream, FONT.bodyBold);
  addText(featured, 'Tarot reader offering guidance in career, relationships...', 80, 44, 11, C.muted, FONT.body, W - 120);
  f.appendChild(featured);
  const card = whiteCard(f, 20, 300, 170, 180, 'Card');
  addText(card, 'Aditi', 50, 60, 14, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
  addText(card, '★ 4.0 (1k Calls)', 30, 85, 10, { r: 0.5, g: 0.4, b: 0.15 }, FONT.body);
  kamyaBottomNav(f, 1);
  return f;
}

export function screenDrawer(): FrameNode {
  const f = createScreenFrame('06_Drawer');
  cosmicBackground(f);
  const overlay = figma.createRectangle();
  overlay.resize(W, H);
  overlay.fills = [solid({ r: 0, g: 0, b: 0 }, 0.45)];
  f.appendChild(overlay);
  const panel = figma.createFrame();
  panel.resize(300, H);
  panel.fills = [solid(C.purple, 0.92)];
  panel.cornerRadius = 0;
  panel.effects = [{ type: 'BACKGROUND_BLUR', radius: 20, visible: true }];
  const av = figma.createEllipse();
  av.resize(56, 56);
  av.x = 24;
  av.y = 72;
  av.fills = [solid(C.amber, 0.6)];
  panel.appendChild(av);
  addText(panel, 'Tanya', 92, 80, 18, C.cream, FONT.bodyBold);
  addText(panel, 'ID: CUS000001', 92, 104, 11, C.muted, FONT.body);
  const items = [
    'My Profile', 'Orders', 'Journal', 'Forum', 'Chat History',
    'Chat with Astrologer', 'Sign up as Astrologer', 'Shop',
    'About Kamya', 'Privacy Policy', 'Contact Us', 'Logout',
  ];
  let my = 150;
  items.forEach((item) => {
    addText(panel, item, 24, my, 14, item === 'Logout' ? C.red : C.cream, FONT.body);
    my += 36;
  });
  addText(panel, '◉ ◎ ✦ ☆', 24, H - 48, 18, C.gold, FONT.body);
  f.appendChild(panel);
  return f;
}
