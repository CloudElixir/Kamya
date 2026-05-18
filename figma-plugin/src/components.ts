import { C, FONT, W } from './tokens';
import {
  addText,
  glassCard,
  goldButton,
  inputField,
  solid,
  goldGradient,
} from './utils';

export function buildDesignSystem(parent: FrameNode): void {
  parent.name = '🎨 Design System';
  parent.resize(1200, 2400);
  parent.fills = [{ type: 'SOLID', color: { r: 0.04, g: 0.05, b: 0.12 } }];

  addText(parent, 'KAMYA Design System', 40, 40, 36, C.gold, FONT.heading);
  addText(parent, 'From Darkness To Divine Light', 40, 88, 14, C.muted, FONT.body);

  // Colors
  addText(parent, 'Colors', 40, 140, 22, C.cream, FONT.headingReg);
  const swatches = [
    ['Cosmic Navy', C.navy],
    ['Spiritual Purple', C.purple],
    ['Divine Gold', C.gold],
    ['Soft Amber', C.amber],
    ['Soft Cream', C.cream],
  ];
  swatches.forEach(([name, col], i) => {
    const s = figma.createRectangle();
    s.resize(80, 80);
    s.x = 40 + i * 100;
    s.y = 180;
    s.cornerRadius = 12;
    s.fills = [solid(col as { r: number; g: number; b: number })];
    parent.appendChild(s);
    addText(parent, name as string, 40 + i * 100, 268, 10, C.muted, FONT.body);
  });

  // Typography
  addText(parent, 'Typography', 40, 320, 22, C.cream, FONT.headingReg);
  addText(parent, 'Display Heading', 40, 360, 36, C.gold, FONT.heading);
  addText(parent, 'Section Heading', 40, 410, 22, C.cream, FONT.headingReg);
  addText(parent, 'Body text for descriptions and content.', 40, 450, 15, C.cream, FONT.body);
  addText(parent, 'Caption / Label', 40, 480, 11, C.muted, FONT.bodyMed);

  // Buttons
  addText(parent, 'Buttons', 40, 540, 22, C.cream, FONT.headingReg);
  goldButton(parent, 'Primary CTA', 40, 580, 200);
  const sec = figma.createFrame();
  sec.resize(200, 52);
  sec.x = 260;
  sec.y = 580;
  sec.cornerRadius = 14;
  sec.fills = [];
  sec.strokes = [solid(C.gold, 0.6)];
  sec.strokeWeight = 1.5;
  addText(sec, 'Secondary', 60, 16, 15, C.gold, FONT.bodyMed);
  parent.appendChild(sec);

  // Inputs
  addText(parent, 'Inputs', 40, 660, 22, C.cream, FONT.headingReg);
  inputField(parent, 'Email or Phone', 40, 700, 320);
  inputField(parent, 'Password', 40, 764, 320);

  // Cards
  addText(parent, 'Cards', 40, 860, 22, C.cream, FONT.headingReg);
  const card = glassCard(160, 120, 'FeatureCard');
  card.x = 40;
  card.y = 900;
  addText(card, '☽', 16, 16, 28, C.gold, FONT.body);
  addText(card, 'Daily\nHoroscope', 16, 56, 14, C.cream, FONT.bodyMed);
  parent.appendChild(card);

  const astro = glassCard(280, 100, 'AstrologerCard');
  astro.x = 220;
  astro.y = 900;
  const av = figma.createEllipse();
  av.resize(48, 48);
  av.x = 16;
  av.y = 16;
  av.fills = [solid(C.purple)];
  av.strokes = [solid(C.gold, 0.5)];
  av.strokeWeight = 2;
  astro.appendChild(av);
  addText(astro, 'Pandit Raj', 80, 20, 14, C.cream, FONT.bodyBold);
  addText(astro, 'Vedic • 12 yrs', 80, 40, 11, C.muted, FONT.body);
  addText(astro, '★ 4.9', 80, 58, 11, C.amber, FONT.body);
  const online = figma.createEllipse();
  online.resize(8, 8);
  online.x = 52;
  online.y = 52;
  online.fills = [solid({ r: 34 / 255, g: 197 / 255, b: 94 / 255 })];
  astro.appendChild(online);
  parent.appendChild(astro);

  // Bottom nav component
  addText(parent, 'Navigation', 40, 1060, 22, C.cream, FONT.headingReg);
  const navDemo = glassCard(390, 80, 'BottomNav/Component');
  navDemo.x = 40;
  navDemo.y = 1100;
  parent.appendChild(navDemo);

  // Icons row
  addText(parent, 'Icon Set (Unicode placeholders)', 40, 1220, 22, C.cream, FONT.headingReg);
  const icons = '☽ ☆ ◎ ✦ ♈ ♉ ♊ ◈ ⚹ ☸ ✧ ◉';
  addText(parent, icons, 40, 1260, 24, C.gold, FONT.body);

  // Spacing
  addText(parent, 'Spacing Scale', 40, 1320, 22, C.cream, FONT.headingReg);
  [4, 8, 16, 24, 32, 48].forEach((sp, i) => {
    const bar = figma.createRectangle();
    bar.resize(sp * 4, 12);
    bar.x = 40;
    bar.y = 1360 + i * 24;
    bar.fills = [solid(C.gold, 0.5)];
    bar.cornerRadius = 4;
    parent.appendChild(bar);
    addText(parent, `${sp}px`, 40 + sp * 4 + 12, 1356 + i * 24, 11, C.muted, FONT.body);
  });
}
