import { C, FONT, H, W } from './tokens';
import {
  addText,
  cosmicGradient,
  glassCard,
  goldGradient,
  solid,
  stars,
} from './utils';

export function cosmicBackground(f: FrameNode): void {
  f.fills = [cosmicGradient()];
  stars(f, 40);
  const planet = figma.createEllipse();
  planet.resize(120, 120);
  planet.x = W - 90;
  planet.y = 40;
  planet.fills = [
    {
      type: 'GRADIENT_RADIAL',
      gradientStops: [
        { position: 0, color: { r: 0.95, g: 0.75, b: 0.4, a: 0.9 } },
        { position: 1, color: { r: 0.2, g: 0.15, b: 0.35, a: 0.3 } },
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
    },
  ];
  planet.name = 'Planet';
  f.appendChild(planet);
}

export function onboardingChrome(f: FrameNode, activeIndex: number): void {
  addText(f, 'Skip', 24, 56, 14, C.cream, FONT.body);
  for (let i = 0; i < 4; i++) {
    const dot = figma.createEllipse();
    const on = i === activeIndex;
    dot.resize(on ? 8 : 6, on ? 8 : 6);
    dot.x = W / 2 - 20 + i * 14;
    dot.y = 60;
    dot.fills = [solid(on ? C.gold : C.cream, on ? 1 : 0.35)];
    f.appendChild(dot);
  }
  const next = figma.createEllipse();
  next.resize(44, 44);
  next.x = W - 68;
  next.y = 48;
  next.fills = [];
  next.strokes = [solid(C.gold, 0.8)];
  next.strokeWeight = 1.5;
  f.appendChild(next);
  addText(f, '→', W - 52, 60, 18, C.gold, FONT.bodyBold);
}

export function phoneMockup(
  parent: FrameNode,
  x: number,
  y: number,
  w: number,
  h: number,
  name = 'Phone'
): FrameNode {
  const phone = figma.createFrame();
  phone.name = name;
  phone.resize(w, h);
  phone.x = x;
  phone.y = y;
  phone.cornerRadius = 28;
  phone.fills = [solid({ r: 0.05, g: 0.05, b: 0.12 })];
  phone.strokes = [solid(C.gold, 0.25)];
  phone.strokeWeight = 2;
  phone.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.55 },
      offset: { x: 0, y: 12 },
      radius: 32,
      visible: true,
    },
  ];
  const notch = figma.createRectangle();
  notch.resize(80, 24);
  notch.x = w / 2 - 40;
  notch.y = 8;
  notch.cornerRadius = 12;
  notch.fills = [solid({ r: 0, g: 0, b: 0 })];
  phone.appendChild(notch);
  parent.appendChild(phone);
  return phone;
}

export function kamyaLogo(parent: FrameNode, x: number, y: number, size = 36): void {
  addText(parent, '☽', x + size * 2.2, y - 8, 14, C.gold, FONT.body);
  const bindu = figma.createEllipse();
  bindu.resize(5, 5);
  bindu.x = x + size * 2.35;
  bindu.y = y - 2;
  bindu.fills = [solid({ r: 0.77, g: 0.12, b: 0.23 })];
  parent.appendChild(bindu);
  addText(parent, 'KAMYA', x, y, size, C.gold, FONT.heading);
}

export function kamyaTagline(parent: FrameNode, y: number): void {
  const t = addText(parent, 'FROM DARKNESS TO DIVINE LIGHT', 0, y, 9, C.cream, FONT.body);
  t.letterSpacing = { value: 2, unit: 'PIXELS' };
  t.resize(W, 14);
  t.textAlignHorizontal = 'CENTER';
  t.x = 0;
}

export function goldDivider(parent: FrameNode, y: number): void {
  const line = figma.createRectangle();
  line.resize(W - 80, 1);
  line.x = 40;
  line.y = y;
  line.fills = [solid(C.gold, 0.4)];
  parent.appendChild(line);
  addText(parent, '✦', W / 2 - 6, y - 8, 12, C.gold, FONT.body);
}

export function purpleInputGroup(
  parent: FrameNode,
  x: number,
  y: number,
  w: number,
  fields: string[]
): FrameNode {
  const group = figma.createFrame();
  group.name = 'InputGroup';
  group.resize(w, fields.length * 52 + 8);
  group.x = x;
  group.y = y;
  group.cornerRadius = 16;
  group.fills = [solid(C.purple, 0.85)];
  group.strokes = [solid(C.gold, 0.15)];
  group.strokeWeight = 1;
  fields.forEach((ph, i) => {
    addText(group, ph, 20, 16 + i * 52, 14, C.muted, FONT.body);
    if (i < fields.length - 1) {
      const div = figma.createRectangle();
      div.resize(w - 40, 1);
      div.x = 20;
      div.y = (i + 1) * 52;
      div.fills = [solid(C.gold, 0.12)];
      group.appendChild(div);
    }
  });
  parent.appendChild(group);
  return group;
}

export function pillGoldButton(parent: FrameNode, label: string, x: number, y: number, w: number): FrameNode {
  const btn = figma.createFrame();
  btn.resize(w, 54);
  btn.x = x;
  btn.y = y;
  btn.cornerRadius = 27;
  btn.fills = [goldGradient()];
  const t = addText(btn, label, 0, 0, 16, C.navy, FONT.bodyBold);
  t.resize(w, 54);
  t.textAlignHorizontal = 'CENTER';
  t.textAlignVertical = 'CENTER';
  parent.appendChild(btn);
  return btn;
}

export function kamyaHeader(parent: FrameNode, y = 48): number {
  const menu = glassCard(40, 40, 'Menu');
  menu.x = 20;
  menu.y = y;
  menu.cornerRadius = 10;
  addText(menu, '☰', 12, 8, 18, C.gold, FONT.body);
  parent.appendChild(menu);
  kamyaLogo(parent, W / 2 - 48, y + 4, 22);
  addText(parent, '🔔', W - 72, y + 8, 18, C.gold, FONT.body);
  addText(parent, '💬', W - 40, y + 8, 18, C.gold, FONT.body);
  const search = glassCard(W - 40, 44, 'Search');
  search.x = 20;
  search.y = y + 52;
  addText(search, '🔍  Search astrologers, horoscope...', 14, 13, 13, C.muted, FONT.body);
  parent.appendChild(search);
  return y + 110;
}

export function kamyaBottomNav(parent: FrameNode, active = 0): void {
  const nav = figma.createFrame();
  nav.name = 'BottomNav';
  nav.resize(W, 76);
  nav.x = 0;
  nav.y = H - 76;
  nav.fills = [solid(C.purple, 0.95)];
  nav.strokes = [{ type: 'SOLID', color: { r: C.gold.r, g: C.gold.g, b: C.gold.b }, opacity: 0.15 }];
  nav.strokeWeight = 1;
  const items = ['Home', 'Astrologer', 'Find Love', 'Forum', 'Profile'];
  const icons = ['⌂', '☆', '♡', '◈', '◉'];
  const iw = W / 5;
  items.forEach((label, i) => {
    const col = figma.createFrame();
    col.resize(iw, 60);
    col.x = i * iw;
    col.y = 8;
    col.fills = [];
    const colr = i === active ? C.gold : C.muted;
    addText(col, icons[i], iw / 2 - 8, 2, 18, colr, FONT.body);
    const lbl = addText(col, label, 0, 26, 8, colr, FONT.body);
    lbl.resize(iw, 10);
    lbl.textAlignHorizontal = 'CENTER';
    nav.appendChild(col);
  });
  parent.appendChild(nav);
}

export function whiteCard(parent: FrameNode, x: number, y: number, w: number, h: number, name: string): FrameNode {
  const card = figma.createFrame();
  card.name = name;
  card.resize(w, h);
  card.x = x;
  card.y = y;
  card.cornerRadius = 14;
  card.fills = [solid({ r: 1, g: 1, b: 1 }, 0.96)];
  card.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 4 },
      radius: 16,
      visible: true,
    },
  ];
  parent.appendChild(card);
  return card;
}

export function mandalaSplash(parent: FrameNode, cx: number, cy: number, r: number): void {
  const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  for (let ring = 0; ring < 3; ring++) {
    const rr = r - ring * 28;
    const circle = figma.createEllipse();
    circle.resize(rr * 2, rr * 2);
    circle.x = cx - rr;
    circle.y = cy - rr;
    circle.fills = [];
    circle.strokes = [solid(C.gold, 0.35 - ring * 0.08)];
    circle.strokeWeight = 1;
    parent.appendChild(circle);
  }
  signs.forEach((s, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const sx = cx + Math.cos(angle) * (r - 10) - 8;
    const sy = cy + Math.sin(angle) * (r - 10) - 8;
    addText(parent, s, sx, sy, 14, C.amber, FONT.body);
  });
  const core = figma.createEllipse();
  core.resize(40, 40);
  core.x = cx - 20;
  core.y = cy - 20;
  core.fills = [solid(C.gold, 0.12)];
  core.strokes = [solid(C.gold, 0.5)];
  parent.appendChild(core);
  addText(parent, '✦', cx - 8, cy - 10, 18, C.gold, FONT.body);
}
