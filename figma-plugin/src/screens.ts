import { C, FONT, H, W } from './tokens';
import {
  screenSplash,
  screenOnboarding,
  screenLogin,
  screenSignup,
  screenHome,
  screenHomeAstrologer,
  screenDrawer,
} from './screens-ref';
import {
  addText,
  chip,
  createScreenFrame,
  glassCard,
  goldButton,
  inputField,
  stars,
  statusBar,
  solid,
  goldGradient,
  zodiacWheel,
} from './utils';
import { kamyaBottomNav, whiteCard } from './ui-parts';

export {
  screenSplash,
  screenOnboarding,
  screenLogin,
  screenSignup,
  screenHome,
  screenHomeAstrologer,
  screenDrawer,
};

// ——— Additional screens (reference-inspired UI) ———

// ——— 7. ASTROLOGER LIST ———
export function screenAstrologerList(): FrameNode {
  const f = createScreenFrame('07_AstrologerList');
  stars(f, 15);
  statusBar(f);
  addText(f, '←', 24, 52, 20, C.gold, FONT.body);
  addText(f, 'Expert Astrologers', 24, 80, 24, C.gold, FONT.heading);
  let fx = 20;
  ['All', 'Tarot', 'Vedic', 'Numerology', 'Love'].forEach((fl, i) => {
    const c = chip(f, fl, fx, 120, i === 0);
    fx += c.width + 8;
  });
  let y = 170;
  [
    { name: 'Pandit Raj Sharma', exp: 'Vedic • 15 yrs • Hindi, English', rate: '₹18/min', rating: '4.9' },
    { name: 'Guru Meera Devi', exp: 'Tarot • 10 yrs • Hindi', rate: '₹12/min', rating: '4.8' },
    { name: 'Acharya Dev Nath', exp: 'Numerology • 8 yrs', rate: '₹15/min', rating: '4.7' },
  ].forEach((a) => {
    const card = whiteCard(f, 20, y, W - 40, 100, a.name);
    const av = figma.createEllipse();
    av.resize(48, 48);
    av.x = 16;
    av.y = 16;
    av.fills = [solid(C.purple)];
    av.strokes = [solid(C.gold, 0.5)];
    av.strokeWeight = 2;
    card.appendChild(av);
    addText(card, a.name, 76, 14, 14, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
    addText(card, a.exp, 76, 34, 10, { r: 0.45, g: 0.45, b: 0.5 }, FONT.body);
    addText(card, `★ ${a.rating}  ${a.rate}`, 76, 52, 10, { r: 0.55, g: 0.45, b: 0.15 }, FONT.bodyMed);
    y += 112;
  });
  kamyaBottomNav(f, 1);
  return f;
}

// ——— 8. ASTROLOGER PROFILE ———
export function screenAstrologerProfile(): FrameNode {
  const f = createScreenFrame('08_AstrologerProfile');
  stars(f, 15);
  statusBar(f);
  addText(f, '←', 24, 52, 20, C.gold, FONT.body);

  const hero = glassCard(W - 40, 200, 'ProfileHero');
  hero.x = 20;
  hero.y = 80;
  const av = figma.createEllipse();
  av.resize(80, 80);
  av.x = (W - 40) / 2 - 40;
  av.y = 20;
  av.fills = [solid(C.purple)];
  av.strokes = [solid(C.gold, 0.6)];
  av.strokeWeight = 3;
  hero.appendChild(av);
  addText(hero, 'Pandit Raj Sharma', 0, 110, 18, C.gold, FONT.headingReg);
  hero.children[hero.children.length - 1].x = 60;
  addText(hero, 'Vedic Astrology • ★ 4.9 (2.4k reviews)', 40, 140, 11, C.amber, FONT.body);
  f.appendChild(hero);

  addText(f, 'About', 24, 300, 16, C.gold, FONT.bodyBold);
  addText(
    f,
    'Renowned Vedic astrologer with 15+ years guiding souls through planetary wisdom and spiritual remedies.',
    24,
    325,
    13,
    C.cream,
    FONT.body,
    W - 48
  );
  addText(f, 'Skills', 24, 400, 16, C.gold, FONT.bodyBold);
  ['Kundali', 'Match Making', 'Remedies', 'Career'].forEach((sk, i) => {
    chip(f, sk, 24 + i * 80, 425, false);
  });
  addText(f, 'Consultation', 24, 480, 16, C.gold, FONT.bodyBold);
  addText(f, 'Chat: ₹18/min  •  Call: ₹25/min', 24, 505, 13, C.cream, FONT.body);
  addText(f, 'Available Slots Today', 24, 540, 14, C.amber, FONT.bodyMed);
  ['10:00 AM', '2:00 PM', '6:00 PM'].forEach((slot, i) => {
    chip(f, slot, 24 + i * 90, 565, i === 1);
  });
  goldButton(f, 'Start Chat', 24, H - 140, (W - 56) / 2);
  const callMain = glassCard((W - 56) / 2, 52, 'CallCTA');
  callMain.x = 24 + (W - 56) / 2 + 8;
  callMain.y = H - 140;
  addText(callMain, 'Voice Call', 30, 16, 14, C.gold, FONT.bodyBold);
  f.appendChild(callMain);
  return f;
}

// ——— 9. CHAT ———
export function screenChat(): FrameNode {
  const f = createScreenFrame('09_Chat');
  stars(f, 10);
  const header = glassCard(W, 100, 'ChatHeader');
  header.y = 0;
  header.cornerRadius = 0;
  addText(header, '←', 20, 52, 18, C.gold, FONT.body);
  addText(header, 'Pandit Raj', 60, 48, 16, C.cream, FONT.bodyBold);
  addText(header, '● Online', 60, 68, 11, C.green, FONT.body);
  addText(header, '📞  📹', W - 70, 52, 18, C.gold, FONT.body);
  f.appendChild(header);

  const bubbles = [
    { text: 'Namaste! How may I guide you today?', mine: false },
    { text: 'I want to know about my career prospects.', mine: true },
    { text: 'Please share your birth details or attach your Kundali.', mine: false },
  ];
  let by = 120;
  bubbles.forEach((b) => {
    const bw = Math.min(b.text.length * 7 + 32, W - 100);
    const bubble = glassCard(bw, 60, 'Bubble');
    bubble.x = b.mine ? W - bw - 20 : 20;
    bubble.y = by;
    if (b.mine) bubble.fills = [solid(C.gold, 0.2)];
    addText(bubble, b.text, 12, 12, 13, C.cream, FONT.body);
    f.appendChild(bubble);
    by += 72;
  });
  addText(f, 'typing...', 20, by, 11, C.muted, FONT.body);
  addText(f, '10:32 AM', W - 70, by, 10, C.muted, FONT.body);

  const inputBar = glassCard(W - 32, 52, 'ChatInput');
  inputBar.x = 16;
  inputBar.y = H - 120;
  addText(inputBar, '🎤  📎  Type a message...', 12, 16, 13, C.muted, FONT.body);
  f.appendChild(inputBar);
  const send = figma.createEllipse();
  send.resize(44, 44);
  send.x = W - 60;
  send.y = H - 116;
  send.fills = [goldGradient()];
  f.appendChild(send);
  addText(f, '➤', W - 48, H - 108, 18, C.navy, FONT.bodyBold);
  return f;
}

// ——— 10. KUNDALI ———
export function screenKundali(): FrameNode {
  const f = createScreenFrame('10_KundaliMatching');
  stars(f, 15);
  statusBar(f);
  addText(f, '←', 24, 52, 20, C.gold, FONT.body);
  addText(f, 'Kundali Matching', 24, 80, 24, C.gold, FONT.heading);
  addText(f, 'Bride Details', 24, 120, 14, C.amber, FONT.bodyBold);
  ['Date of Birth', 'Time of Birth', 'Place of Birth'].forEach((ph, i) => {
    inputField(f, ph, 24, 145 + i * 64, W - 48);
  });
  addText(f, 'Groom Details', 24, 340, 14, C.amber, FONT.bodyBold);
  ['Date of Birth', 'Time of Birth', 'Place of Birth'].forEach((ph, i) => {
    inputField(f, ph, 24, 365 + i * 64, W - 48);
  });
  goldButton(f, 'Generate Compatibility Report', 24, 560, W - 48);

  const result = glassCard(W - 40, 200, 'Result');
  result.x = 20;
  result.y = 630;
  zodiacWheel(result, 80, 100, 50);
  addText(result, 'Guna Score: 28/36', 150, 40, 14, C.gold, FONT.bodyBold);
  addText(result, 'Compatibility: 87%', 150, 65, 22, C.amber, FONT.headingReg);
  addText(result, 'Favorable for marriage ✦', 150, 100, 12, C.cream, FONT.body);
  addText(result, 'Remedies suggested →', 150, 130, 11, C.muted, FONT.bodyMed);
  f.appendChild(result);
  kamyaBottomNav(f, 2);
  return f;
}

// ——— 11. HOROSCOPE ———
export function screenHoroscope(): FrameNode {
  const f = createScreenFrame('11_DailyHoroscope');
  stars(f, 20);
  statusBar(f);
  addText(f, 'Daily Horoscope', 24, 80, 24, C.gold, FONT.heading);
  const signs = ['♈', '♉', '♊', '♋', '♌', '♍'];
  signs.forEach((s, i) => {
    const z = figma.createEllipse();
    z.resize(44, 44);
    z.x = 20 + i * 58;
    z.y = 120;
    z.fills = [solid(i === 0 ? C.gold : C.white, i === 0 ? 0.3 : 0.06)];
    z.strokes = [solid(C.gold, i === 0 ? 0.8 : 0.2)];
    z.strokeWeight = 1;
    f.appendChild(z);
    addText(f, s, 32 + i * 58, 130, 20, C.gold, FONT.body);
  });
  const card = glassCard(W - 40, 420, 'HoroscopeCard');
  card.x = 20;
  card.y = 190;
  addText(card, 'Aries — Today', 20, 20, 20, C.gold, FONT.headingReg);
  addText(card, 'The stars align in your favor today. Embrace new opportunities with courage.', 20, 55, 14, C.cream, FONT.body, W - 80);
  addText(card, 'Lucky Number: 7', 20, 130, 13, C.amber, FONT.bodyMed);
  addText(card, 'Lucky Color: Gold', 20, 155, 13, C.amber, FONT.bodyMed);
  addText(card, 'Career: Excellent prospects', 20, 200, 12, C.cream, FONT.body);
  addText(card, 'Love: Deep connections', 20, 225, 12, C.cream, FONT.body);
  addText(card, 'Health: Maintain balance', 20, 250, 12, C.cream, FONT.body);
  f.appendChild(card);
  return f;
}

// ——— 12. TAROT ———
export function screenTarot(): FrameNode {
  const f = createScreenFrame('12_TarotReading');
  stars(f, 25);
  statusBar(f);
  addText(f, 'Tarot Reading', 24, 80, 24, C.gold, FONT.heading);
  addText(f, 'Choose your spread', 24, 120, 13, C.muted, FONT.body);
  ['Daily Tarot', 'Three Card', 'Celtic Cross'].forEach((sp, i) => {
    chip(f, sp, 24 + i * 110, 150, i === 0);
  });
  for (let i = 0; i < 5; i++) {
    const card = figma.createRectangle();
    card.resize(56, 84);
    card.x = 30 + i * 66;
    card.y = 220;
    card.cornerRadius = 8;
    card.fills = [goldGradient()];
    card.strokes = [solid(C.amber, 0.5)];
    card.strokeWeight = 1;
    card.name = 'TarotCard';
    f.appendChild(card);
    addText(f, '✦', 48 + i * 66, 255, 16, C.navy, FONT.body);
  }
  const reading = glassCard(W - 40, 280, 'Interpretation');
  reading.x = 20;
  reading.y = 340;
  addText(reading, 'The Star', 20, 20, 22, C.gold, FONT.headingReg);
  addText(
    reading,
    'Hope and inspiration illuminate your path. Trust the universe — renewal is near.',
    20,
    55,
    14,
    C.cream,
    FONT.body,
    W - 80
  );
  addText(reading, '✧ AI Interpretation', 20, 200, 11, C.amber, FONT.bodyMed);
  f.appendChild(reading);
  goldButton(f, 'Draw New Cards', 24, H - 100, W - 48);
  return f;
}

// ——— 13. JOURNAL ———
export function screenJournal(): FrameNode {
  const f = createScreenFrame('13_SpiritualJournal');
  stars(f, 15);
  statusBar(f);
  addText(f, 'Spiritual Journal', 24, 80, 24, C.gold, FONT.heading);
  addText(f, 'How are you feeling?', 24, 120, 13, C.muted, FONT.body);
  ['🌙', '✨', '☀', '🔥', '💧'].forEach((m, i) => {
    const mood = glassCard(56, 56, `Mood${i}`);
    mood.x = 24 + i * 66;
    mood.y = 150;
    addText(mood, m, 16, 12, 24, C.gold, FONT.body);
    f.appendChild(mood);
  });
  const entry = glassCard(W - 40, 280, 'JournalEntry');
  entry.x = 20;
  entry.y = 230;
  addText(entry, 'Write your sacred thoughts...', 16, 16, 14, C.muted, FONT.body);
  f.appendChild(entry);
  addText(f, "Today's Affirmation", 24, 530, 14, C.amber, FONT.bodyBold);
  const aff = glassCard(W - 40, 80, 'Affirmation');
  aff.x = 20;
  aff.y = 555;
  addText(aff, '"I am aligned with divine light and cosmic wisdom."', 16, 24, 13, C.cream, FONT.body, W - 72);
  f.appendChild(aff);
  goldButton(f, 'Save Entry', 24, H - 100, W - 48);
  return f;
}

// ——— 14. STORE ———
export function screenStore(): FrameNode {
  const f = createScreenFrame('14_Store');
  stars(f, 15);
  statusBar(f);
  addText(f, 'Spiritual Store', 24, 80, 24, C.gold, FONT.heading);
  addText(f, '🛒', W - 48, 80, 22, C.gold, FONT.body);
  let y = 130;
  const products = [
    { name: '5 Mukhi Rudraksha', price: '₹499' },
    { name: 'Amethyst Crystal', price: '₹899' },
    { name: 'Shri Yantra', price: '₹1,299' },
    { name: 'Spiritual Book Set', price: '₹699' },
  ];
  products.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const card = glassCard(168, 200, p.name);
    card.x = 20 + col * 182;
    card.y = y + row * 215;
    const img = figma.createRectangle();
    img.resize(140, 100);
    img.x = 14;
    img.y = 14;
    img.cornerRadius = 12;
    img.fills = [solid(C.purple, 0.5)];
    card.appendChild(img);
    addText(card, p.name, 14, 122, 12, C.cream, FONT.bodyMed);
    addText(card, p.price, 14, 142, 14, C.amber, FONT.bodyBold);
    const cart = figma.createEllipse();
    cart.resize(32, 32);
    cart.x = 126;
    cart.y = 156;
    cart.fills = [goldGradient()];
    card.appendChild(cart);
    addText(card, '+', 135, 162, 16, C.navy, FONT.bodyBold);
    f.appendChild(card);
  });
  goldButton(f, 'View Cart (3)', 24, H - 100, W - 48);
  return f;
}

// ——— 15. PROFILE ———
export function screenProfile(): FrameNode {
  const f = createScreenFrame('15_Profile');
  stars(f, 15);
  statusBar(f);
  const av = figma.createEllipse();
  av.resize(80, 80);
  av.x = W / 2 - 40;
  av.y = 80;
  av.fills = [solid(C.purple)];
  av.strokes = [solid(C.gold, 0.6)];
  av.strokeWeight = 3;
  f.appendChild(av);
  addText(f, 'Priya Sharma', W / 2 - 55, 175, 20, C.gold, FONT.headingReg);
  addText(f, '♈ Aries  •  Born 15 Mar 1995', W / 2 - 80, 200, 12, C.muted, FONT.body);

  const menuItems = [
    ['Birth Chart Summary', 'View your cosmic map'],
    ['Subscription', 'Premium — Active'],
    ['Saved Reports', '12 reports'],
    ['Order History', '8 orders'],
    ['Wallet Balance', '₹250'],
  ];
  let y = 250;
  menuItems.forEach(([title, sub]) => {
    const row = glassCard(W - 40, 64, title);
    row.x = 20;
    row.y = y;
    addText(row, title, 16, 14, 14, C.cream, FONT.bodyBold);
    addText(row, sub, 16, 36, 11, C.muted, FONT.body);
    addText(row, '→', W - 72, 22, 16, C.gold, FONT.body);
    f.appendChild(row);
    y += 76;
  });
  kamyaBottomNav(f, 4);
  return f;
}

// ——— 16. NOTIFICATIONS ———
export function screenNotifications(): FrameNode {
  const f = createScreenFrame('16_Notifications');
  stars(f, 10);
  statusBar(f);
  addText(f, '←', 24, 52, 20, C.gold, FONT.body);
  addText(f, 'Notifications', 24, 80, 24, C.gold, FONT.heading);
  const notifs = [
    { title: 'Daily Horoscope Ready', sub: 'Your Aries horoscope for today', time: '2m ago', icon: '☽' },
    { title: 'Pandit Raj is Online', sub: 'Start a consultation now', time: '15m ago', icon: '☆' },
    { title: 'Consultation Reminder', sub: 'Your session at 6:00 PM', time: '1h ago', icon: '◈' },
    { title: 'Spiritual Guidance', sub: 'Meditation tip for the evening', time: '3h ago', icon: '✦' },
  ];
  let y = 130;
  notifs.forEach((n) => {
    const card = glassCard(W - 40, 80, n.title);
    card.x = 20;
    card.y = y;
    addText(card, n.icon, 16, 24, 24, C.gold, FONT.body);
    addText(card, n.title, 56, 16, 14, C.cream, FONT.bodyBold);
    addText(card, n.sub, 56, 36, 11, C.muted, FONT.body);
    addText(card, n.time, W - 100, 16, 10, C.muted, FONT.body);
    f.appendChild(card);
    y += 92;
  });
  return f;
}

// ——— 17. FORUM ———
export function screenForum(): FrameNode {
  const f = createScreenFrame('17_Forum');
  stars(f, 10);
  statusBar(f);
  addText(f, 'Community', 24, 80, 24, C.gold, FONT.heading);
  goldButton(f, '+ Ask Anonymously', 24, 120, W - 48, 44);
  const posts = [
    { user: 'Seeker_2847', text: 'What remedies help with Saturn Sade Sati?', likes: 42 },
    { user: 'MoonChild', text: 'Best time for marriage muhurat in 2026?', likes: 28 },
  ];
  let y = 180;
  posts.forEach((p) => {
    const card = glassCard(W - 40, 120, 'Post');
    card.x = 20;
    card.y = y;
    addText(card, p.user, 16, 16, 12, C.amber, FONT.bodyMed);
    addText(card, p.text, 16, 40, 14, C.cream, FONT.body, W - 72);
    addText(card, `♡ ${p.likes}   💬 12   ↗ Share`, 16, 90, 11, C.muted, FONT.body);
    f.appendChild(card);
    y += 132;
  });
  kamyaBottomNav(f, 3);
  return f;
}

// ——— 18. ADMIN (mobile 390×844, aligned layout) ———
export function screenAdmin(): FrameNode {
  const f = createScreenFrame('18_AdminDashboard');
  const pad = 24;

  addText(f, 'KAMYA', pad, 56, 28, C.gold, FONT.heading);
  addText(f, 'Admin Panel', pad, 92, 12, C.muted, FONT.body);

  let tx = pad;
  ['Dashboard', 'Users', 'Revenue'].forEach((tab, i) => {
    const tabW = tab.length * 8 + 28;
    const tabFrame = figma.createFrame();
    tabFrame.resize(tabW, 32);
    tabFrame.x = tx;
    tabFrame.y = 120;
    tabFrame.cornerRadius = 16;
    tabFrame.fills = i === 0 ? [goldGradient()] : [solid(C.white, 0.06)];
    tabFrame.strokes = i === 0 ? [] : [solid(C.gold, 0.25)];
    tabFrame.strokeWeight = 1;
    addText(tabFrame, tab, 12, 8, 12, i === 0 ? C.navy : C.cream, FONT.bodyMed);
    f.appendChild(tabFrame);
    tx += tabW + 8;
  });

  const divider = figma.createRectangle();
  divider.resize(W - pad * 2, 1);
  divider.x = pad;
  divider.y = 168;
  divider.fills = [solid(C.gold, 0.15)];
  f.appendChild(divider);

  addText(f, 'Dashboard Overview', pad, 188, 20, C.gold, FONT.heading);

  const metrics = [
    ['12.4k', 'Users'],
    ['342', 'Astrologers'],
    ['₹8.4L', 'Revenue'],
    ['1,204', 'Bookings Today'],
  ];
  const cardW = (W - pad * 2 - 12) / 2;
  metrics.forEach(([val, label], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const card = glassCard(cardW, 72, label);
    card.x = pad + col * (cardW + 12);
    card.y = 228 + row * 84;
    addText(card, val, 16, 14, 22, C.amber, FONT.headingReg);
    addText(card, label, 16, 42, 11, C.muted, FONT.body);
    f.appendChild(card);
  });

  const chart = glassCard(W - pad * 2, 140, 'RevenueChart');
  chart.x = pad;
  chart.y = 400;
  addText(chart, 'Revenue Analytics', 16, 14, 14, C.cream, FONT.bodyBold);
  const barHeights = [40, 65, 50, 80, 55, 90];
  const barW = (chart.width - 48) / barHeights.length - 4;
  barHeights.forEach((h, i) => {
    const bar = figma.createRectangle();
    bar.resize(barW, h);
    bar.x = 16 + i * (barW + 6);
    bar.y = 120 - h;
    bar.fills = [goldGradient()];
    bar.cornerRadius = 3;
    chart.appendChild(bar);
  });
  f.appendChild(chart);

  return f;
}

export function buildAllScreens(): FrameNode[] {
  const screens: FrameNode[] = [
    screenSplash(),
    ...[0, 1, 2, 3].map((i) => screenOnboarding(i)),
    screenLogin(),
    screenSignup(),
    screenHome(),
    screenHomeAstrologer(),
    screenDrawer(),
    screenAstrologerList(),
    screenAstrologerProfile(),
    screenChat(),
    screenKundali(),
    screenHoroscope(),
    screenTarot(),
    screenJournal(),
    screenStore(),
    screenProfile(),
    screenNotifications(),
    screenForum(),
    screenAdmin(),
  ];
  return screens;
}
