import { C, FONT, H, W } from './tokens';

export async function loadFonts(): Promise<void> {
  const fonts = [
  FONT.heading,
  FONT.headingReg,
  FONT.body,
  FONT.bodyMed,
  FONT.bodyBold,
  { family: 'Inter', style: 'Regular' as const },
  { family: 'Inter', style: 'Medium' as const },
  { family: 'Inter', style: 'Bold' as const },
  ];
  for (const f of fonts) {
    try {
      await figma.loadFontAsync(f);
    } catch {
      await figma.loadFontAsync({ family: 'Inter', style: f.style });
    }
  }
}

export function rgb(c: { r: number; g: number; b: number }, a = 1): RGBA {
  return { r: c.r, g: c.g, b: c.b, a };
}

export function solid(c: { r: number; g: number; b: number }, a = 1): SolidPaint {
  return { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: a };
}

export function cosmicGradient(): GradientPaint {
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: rgb(C.navy) },
      { position: 0.5, color: rgb(C.purple) },
      { position: 1, color: { r: 13 / 255, g: 8 / 255, b: 40 / 255, a: 1 } },
    ],
    gradientTransform: [
      [0, 1, 0],
      [-1, 0, 1],
    ],
  };
}

export function goldGradient(): GradientPaint {
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: rgb(C.gold) },
      { position: 1, color: rgb(C.amber) },
    ],
    gradientTransform: [
      [1, 0, 0],
      [0, 1, 0],
    ],
  };
}

export function createScreenFrame(name: string): FrameNode {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(W, H);
  frame.clipsContent = true;
  frame.fills = [cosmicGradient()];
  frame.layoutMode = 'NONE';
  return frame;
}

export function glassCard(w: number, h: number, name = 'Card'): FrameNode {
  const card = figma.createFrame();
  card.name = name;
  card.resize(w, h);
  card.cornerRadius = 16;
  card.fills = [solid(C.white, 0.06)];
  card.strokes = [solid(C.gold, 0.35)];
  card.strokeWeight = 1;
  card.effects = [
    {
      type: 'BACKGROUND_BLUR',
      radius: 24,
      visible: true,
    },
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.4 },
      offset: { x: 0, y: 8 },
      radius: 32,
      visible: true,
    },
  ];
  return card;
}

export function addText(
  parent: FrameNode | PageNode,
  chars: string,
  x: number,
  y: number,
  size: number,
  color: { r: number; g: number; b: number },
  font: { family: string; style: string } = FONT.body,
  width?: number
): TextNode {
  const t = figma.createText();
  t.fontName = font;
  t.characters = chars;
  t.fontSize = size;
  t.fills = [solid(color)];
  t.x = x;
  t.y = y;
  if (width) {
    t.resize(width, t.height);
    t.textAutoResize = 'HEIGHT';
  }
  parent.appendChild(t);
  return t;
}

export function goldButton(
  parent: FrameNode,
  label: string,
  x: number,
  y: number,
  w: number,
  h = 52
): FrameNode {
  const btn = figma.createFrame();
  btn.name = `Button/${label}`;
  btn.resize(w, h);
  btn.x = x;
  btn.y = y;
  btn.cornerRadius = 14;
  btn.fills = [goldGradient()];
  btn.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 212 / 255, g: 175 / 255, b: 55 / 255, a: 0.35 },
      offset: { x: 0, y: 4 },
      radius: 16,
      visible: true,
    },
  ];
  const t = addText(btn, label, 0, 0, 15, C.navy, FONT.bodyBold);
  t.textAlignHorizontal = 'CENTER';
  t.resize(w, h);
  t.textAlignVertical = 'CENTER';
  t.x = 0;
  t.y = (h - 18) / 2;
  parent.appendChild(btn);
  return btn;
}

export function inputField(
  parent: FrameNode,
  placeholder: string,
  x: number,
  y: number,
  w: number
): FrameNode {
  const field = glassCard(w, 52, `Input/${placeholder}`);
  field.x = x;
  field.y = y;
  addText(field, placeholder, 16, 16, 14, C.muted, FONT.body);
  parent.appendChild(field);
  return field;
}

export function bottomNav(parent: FrameNode, active = 0): FrameNode {
  const nav = glassCard(W, 80, 'BottomNav');
  nav.x = 0;
  nav.y = H - 80;
  nav.cornerRadius = 0;
  const items = ['Home', 'Astrologers', 'Kundali', 'Forum', 'Profile'];
  const icons = ['⌂', '☆', '◎', '◈', '◉'];
  const iw = W / 5;
  items.forEach((label, i) => {
    const col = figma.createFrame();
    col.resize(iw, 60);
    col.x = i * iw;
    col.y = 10;
    col.fills = [];
    const iconColor = i === active ? C.gold : C.muted;
    addText(col, icons[i], iw / 2 - 8, 4, 18, iconColor, FONT.body);
    const lbl = addText(col, label, 0, 28, 9, iconColor, FONT.body);
    lbl.resize(iw, 12);
    lbl.textAlignHorizontal = 'CENTER';
    nav.appendChild(col);
  });
  parent.appendChild(nav);
  return nav;
}

export function statusBar(parent: FrameNode): void {
  addText(parent, '9:41', 24, 12, 14, C.cream, FONT.bodyMed);
  addText(parent, '●●● ▮▮', W - 80, 12, 12, C.cream, FONT.body);
}

export function stars(parent: FrameNode, count = 30): void {
  for (let i = 0; i < count; i++) {
    const s = figma.createEllipse();
    s.resize(Math.random() * 2 + 1, Math.random() * 2 + 1);
    s.x = Math.random() * W;
    s.y = Math.random() * H * 0.6;
    s.fills = [solid(C.amber, Math.random() * 0.5 + 0.2)];
    s.name = 'Star';
    parent.appendChild(s);
  }
}

export function zodiacWheel(parent: FrameNode, cx: number, cy: number, r: number): EllipseNode {
  const wheel = figma.createEllipse();
  wheel.resize(r * 2, r * 2);
  wheel.x = cx - r;
  wheel.y = cy - r;
  wheel.fills = [];
  wheel.strokes = [solid(C.gold, 0.6)];
  wheel.strokeWeight = 2;
  wheel.dashPattern = [4, 6];
  wheel.name = 'ZodiacWheel';
  parent.appendChild(wheel);
  const inner = figma.createEllipse();
  inner.resize(r * 1.4, r * 1.4);
  inner.x = cx - r * 0.7;
  inner.y = cy - r * 0.7;
  inner.fills = [solid(C.gold, 0.08)];
  inner.strokes = [solid(C.amber, 0.3)];
  inner.strokeWeight = 1;
  parent.appendChild(inner);
  return wheel;
}

export function sectionTitle(parent: FrameNode, title: string, y: number): number {
  addText(parent, title, 20, y, 20, C.gold, FONT.heading);
  return y + 32;
}

export function chip(parent: FrameNode, label: string, x: number, y: number, active = false): FrameNode {
  const c = figma.createFrame();
  c.name = `Chip/${label}`;
  const tw = label.length * 7 + 24;
  c.resize(tw, 32);
  c.x = x;
  c.y = y;
  c.cornerRadius = 16;
  c.fills = active ? [goldGradient()] : [solid(C.white, 0.08)];
  c.strokes = active ? [] : [solid(C.gold, 0.25)];
  c.strokeWeight = 1;
  const tc = active ? C.navy : C.cream;
  const t = addText(c, label, 12, 8, 12, tc, FONT.bodyMed);
  parent.appendChild(c);
  return c;
}
