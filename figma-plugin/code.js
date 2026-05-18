"use strict";
(() => {
  // src/tokens.ts
  var W = 390;
  var H = 844;
  var C = {
    navy: { r: 6 / 255, g: 11 / 255, b: 45 / 255 },
    purple: { r: 28 / 255, g: 18 / 255, b: 64 / 255 },
    gold: { r: 212 / 255, g: 175 / 255, b: 55 / 255 },
    amber: { r: 243 / 255, g: 201 / 255, b: 106 / 255 },
    white: { r: 1, g: 1, b: 1 },
    cream: { r: 232 / 255, g: 224 / 255, b: 212 / 255 },
    muted: { r: 184 / 255, g: 168 / 255, b: 138 / 255 },
    green: { r: 34 / 255, g: 197 / 255, b: 94 / 255 },
    red: { r: 248 / 255, g: 113 / 255, b: 113 / 255 }
  };
  var FONT = {
    heading: { family: "Playfair Display", style: "Bold" },
    headingReg: { family: "Playfair Display", style: "Regular" },
    body: { family: "DM Sans", style: "Regular" },
    bodyMed: { family: "DM Sans", style: "Medium" },
    bodyBold: { family: "DM Sans", style: "Bold" }
  };

  // src/utils.ts
  async function loadFonts() {
    const fonts = [
      FONT.heading,
      FONT.headingReg,
      FONT.body,
      FONT.bodyMed,
      FONT.bodyBold,
      { family: "Inter", style: "Regular" },
      { family: "Inter", style: "Medium" },
      { family: "Inter", style: "Bold" }
    ];
    for (const f of fonts) {
      try {
        await figma.loadFontAsync(f);
      } catch (e) {
        await figma.loadFontAsync({ family: "Inter", style: f.style });
      }
    }
  }
  function rgb(c, a = 1) {
    return { r: c.r, g: c.g, b: c.b, a };
  }
  function solid(c, a = 1) {
    return { type: "SOLID", color: { r: c.r, g: c.g, b: c.b }, opacity: a };
  }
  function cosmicGradient() {
    return {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: rgb(C.navy) },
        { position: 0.5, color: rgb(C.purple) },
        { position: 1, color: { r: 13 / 255, g: 8 / 255, b: 40 / 255, a: 1 } }
      ],
      gradientTransform: [
        [0, 1, 0],
        [-1, 0, 1]
      ]
    };
  }
  function goldGradient() {
    return {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: rgb(C.gold) },
        { position: 1, color: rgb(C.amber) }
      ],
      gradientTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ]
    };
  }
  function createScreenFrame(name) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(W, H);
    frame.clipsContent = true;
    frame.fills = [cosmicGradient()];
    frame.layoutMode = "NONE";
    return frame;
  }
  function glassCard(w, h, name = "Card") {
    const card = figma.createFrame();
    card.name = name;
    card.resize(w, h);
    card.cornerRadius = 16;
    card.fills = [solid(C.white, 0.06)];
    card.strokes = [solid(C.gold, 0.35)];
    card.strokeWeight = 1;
    card.effects = [
      {
        type: "BACKGROUND_BLUR",
        radius: 24,
        visible: true
      },
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.4 },
        offset: { x: 0, y: 8 },
        radius: 32,
        visible: true
      }
    ];
    return card;
  }
  function addText(parent, chars, x, y, size, color, font = FONT.body, width) {
    const t = figma.createText();
    t.fontName = font;
    t.characters = chars;
    t.fontSize = size;
    t.fills = [solid(color)];
    t.x = x;
    t.y = y;
    if (width) {
      t.resize(width, t.height);
      t.textAutoResize = "HEIGHT";
    }
    parent.appendChild(t);
    return t;
  }
  function goldButton(parent, label, x, y, w, h = 52) {
    const btn = figma.createFrame();
    btn.name = `Button/${label}`;
    btn.resize(w, h);
    btn.x = x;
    btn.y = y;
    btn.cornerRadius = 14;
    btn.fills = [goldGradient()];
    btn.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 212 / 255, g: 175 / 255, b: 55 / 255, a: 0.35 },
        offset: { x: 0, y: 4 },
        radius: 16,
        visible: true
      }
    ];
    const t = addText(btn, label, 0, 0, 15, C.navy, FONT.bodyBold);
    t.textAlignHorizontal = "CENTER";
    t.resize(w, h);
    t.textAlignVertical = "CENTER";
    t.x = 0;
    t.y = (h - 18) / 2;
    parent.appendChild(btn);
    return btn;
  }
  function inputField(parent, placeholder, x, y, w) {
    const field = glassCard(w, 52, `Input/${placeholder}`);
    field.x = x;
    field.y = y;
    addText(field, placeholder, 16, 16, 14, C.muted, FONT.body);
    parent.appendChild(field);
    return field;
  }
  function statusBar(parent) {
    addText(parent, "9:41", 24, 12, 14, C.cream, FONT.bodyMed);
    addText(parent, "\u25CF\u25CF\u25CF \u25AE\u25AE", W - 80, 12, 12, C.cream, FONT.body);
  }
  function stars(parent, count = 30) {
    for (let i = 0; i < count; i++) {
      const s = figma.createEllipse();
      s.resize(Math.random() * 2 + 1, Math.random() * 2 + 1);
      s.x = Math.random() * W;
      s.y = Math.random() * H * 0.6;
      s.fills = [solid(C.amber, Math.random() * 0.5 + 0.2)];
      s.name = "Star";
      parent.appendChild(s);
    }
  }
  function zodiacWheel(parent, cx, cy, r) {
    const wheel = figma.createEllipse();
    wheel.resize(r * 2, r * 2);
    wheel.x = cx - r;
    wheel.y = cy - r;
    wheel.fills = [];
    wheel.strokes = [solid(C.gold, 0.6)];
    wheel.strokeWeight = 2;
    wheel.dashPattern = [4, 6];
    wheel.name = "ZodiacWheel";
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
  function chip(parent, label, x, y, active = false) {
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

  // src/components.ts
  function buildDesignSystem(parent) {
    parent.name = "\u{1F3A8} Design System";
    parent.resize(1200, 2400);
    parent.fills = [{ type: "SOLID", color: { r: 0.04, g: 0.05, b: 0.12 } }];
    addText(parent, "KAMYA Design System", 40, 40, 36, C.gold, FONT.heading);
    addText(parent, "From Darkness To Divine Light", 40, 88, 14, C.muted, FONT.body);
    addText(parent, "Colors", 40, 140, 22, C.cream, FONT.headingReg);
    const swatches = [
      ["Cosmic Navy", C.navy],
      ["Spiritual Purple", C.purple],
      ["Divine Gold", C.gold],
      ["Soft Amber", C.amber],
      ["Soft Cream", C.cream]
    ];
    swatches.forEach(([name, col], i) => {
      const s = figma.createRectangle();
      s.resize(80, 80);
      s.x = 40 + i * 100;
      s.y = 180;
      s.cornerRadius = 12;
      s.fills = [solid(col)];
      parent.appendChild(s);
      addText(parent, name, 40 + i * 100, 268, 10, C.muted, FONT.body);
    });
    addText(parent, "Typography", 40, 320, 22, C.cream, FONT.headingReg);
    addText(parent, "Display Heading", 40, 360, 36, C.gold, FONT.heading);
    addText(parent, "Section Heading", 40, 410, 22, C.cream, FONT.headingReg);
    addText(parent, "Body text for descriptions and content.", 40, 450, 15, C.cream, FONT.body);
    addText(parent, "Caption / Label", 40, 480, 11, C.muted, FONT.bodyMed);
    addText(parent, "Buttons", 40, 540, 22, C.cream, FONT.headingReg);
    goldButton(parent, "Primary CTA", 40, 580, 200);
    const sec = figma.createFrame();
    sec.resize(200, 52);
    sec.x = 260;
    sec.y = 580;
    sec.cornerRadius = 14;
    sec.fills = [];
    sec.strokes = [solid(C.gold, 0.6)];
    sec.strokeWeight = 1.5;
    addText(sec, "Secondary", 60, 16, 15, C.gold, FONT.bodyMed);
    parent.appendChild(sec);
    addText(parent, "Inputs", 40, 660, 22, C.cream, FONT.headingReg);
    inputField(parent, "Email or Phone", 40, 700, 320);
    inputField(parent, "Password", 40, 764, 320);
    addText(parent, "Cards", 40, 860, 22, C.cream, FONT.headingReg);
    const card = glassCard(160, 120, "FeatureCard");
    card.x = 40;
    card.y = 900;
    addText(card, "\u263D", 16, 16, 28, C.gold, FONT.body);
    addText(card, "Daily\nHoroscope", 16, 56, 14, C.cream, FONT.bodyMed);
    parent.appendChild(card);
    const astro = glassCard(280, 100, "AstrologerCard");
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
    addText(astro, "Pandit Raj", 80, 20, 14, C.cream, FONT.bodyBold);
    addText(astro, "Vedic \u2022 12 yrs", 80, 40, 11, C.muted, FONT.body);
    addText(astro, "\u2605 4.9", 80, 58, 11, C.amber, FONT.body);
    const online = figma.createEllipse();
    online.resize(8, 8);
    online.x = 52;
    online.y = 52;
    online.fills = [solid({ r: 34 / 255, g: 197 / 255, b: 94 / 255 })];
    astro.appendChild(online);
    parent.appendChild(astro);
    addText(parent, "Navigation", 40, 1060, 22, C.cream, FONT.headingReg);
    const navDemo = glassCard(390, 80, "BottomNav/Component");
    navDemo.x = 40;
    navDemo.y = 1100;
    parent.appendChild(navDemo);
    addText(parent, "Icon Set (Unicode placeholders)", 40, 1220, 22, C.cream, FONT.headingReg);
    const icons = "\u263D \u2606 \u25CE \u2726 \u2648 \u2649 \u264A \u25C8 \u26B9 \u2638 \u2727 \u25C9";
    addText(parent, icons, 40, 1260, 24, C.gold, FONT.body);
    addText(parent, "Spacing Scale", 40, 1320, 22, C.cream, FONT.headingReg);
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

  // src/ui-parts.ts
  function cosmicBackground(f) {
    f.fills = [cosmicGradient()];
    stars(f, 40);
    const planet = figma.createEllipse();
    planet.resize(120, 120);
    planet.x = W - 90;
    planet.y = 40;
    planet.fills = [
      {
        type: "GRADIENT_RADIAL",
        gradientStops: [
          { position: 0, color: { r: 0.95, g: 0.75, b: 0.4, a: 0.9 } },
          { position: 1, color: { r: 0.2, g: 0.15, b: 0.35, a: 0.3 } }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      }
    ];
    planet.name = "Planet";
    f.appendChild(planet);
  }
  function onboardingChrome(f, activeIndex) {
    addText(f, "Skip", 24, 56, 14, C.cream, FONT.body);
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
    addText(f, "\u2192", W - 52, 60, 18, C.gold, FONT.bodyBold);
  }
  function phoneMockup(parent, x, y, w, h, name = "Phone") {
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
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.55 },
        offset: { x: 0, y: 12 },
        radius: 32,
        visible: true
      }
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
  function kamyaLogo(parent, x, y, size = 36) {
    addText(parent, "\u263D", x + size * 2.2, y - 8, 14, C.gold, FONT.body);
    const bindu = figma.createEllipse();
    bindu.resize(5, 5);
    bindu.x = x + size * 2.35;
    bindu.y = y - 2;
    bindu.fills = [solid({ r: 0.77, g: 0.12, b: 0.23 })];
    parent.appendChild(bindu);
    addText(parent, "KAMYA", x, y, size, C.gold, FONT.heading);
  }
  function kamyaTagline(parent, y) {
    const t = addText(parent, "FROM DARKNESS TO DIVINE LIGHT", 0, y, 9, C.cream, FONT.body);
    t.letterSpacing = { value: 2, unit: "PIXELS" };
    t.resize(W, 14);
    t.textAlignHorizontal = "CENTER";
    t.x = 0;
  }
  function goldDivider(parent, y) {
    const line = figma.createRectangle();
    line.resize(W - 80, 1);
    line.x = 40;
    line.y = y;
    line.fills = [solid(C.gold, 0.4)];
    parent.appendChild(line);
    addText(parent, "\u2726", W / 2 - 6, y - 8, 12, C.gold, FONT.body);
  }
  function purpleInputGroup(parent, x, y, w, fields) {
    const group = figma.createFrame();
    group.name = "InputGroup";
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
  function pillGoldButton(parent, label, x, y, w) {
    const btn = figma.createFrame();
    btn.resize(w, 54);
    btn.x = x;
    btn.y = y;
    btn.cornerRadius = 27;
    btn.fills = [goldGradient()];
    const t = addText(btn, label, 0, 0, 16, C.navy, FONT.bodyBold);
    t.resize(w, 54);
    t.textAlignHorizontal = "CENTER";
    t.textAlignVertical = "CENTER";
    parent.appendChild(btn);
    return btn;
  }
  function kamyaHeader(parent, y = 48) {
    const menu = glassCard(40, 40, "Menu");
    menu.x = 20;
    menu.y = y;
    menu.cornerRadius = 10;
    addText(menu, "\u2630", 12, 8, 18, C.gold, FONT.body);
    parent.appendChild(menu);
    kamyaLogo(parent, W / 2 - 48, y + 4, 22);
    addText(parent, "\u{1F514}", W - 72, y + 8, 18, C.gold, FONT.body);
    addText(parent, "\u{1F4AC}", W - 40, y + 8, 18, C.gold, FONT.body);
    const search = glassCard(W - 40, 44, "Search");
    search.x = 20;
    search.y = y + 52;
    addText(search, "\u{1F50D}  Search astrologers, horoscope...", 14, 13, 13, C.muted, FONT.body);
    parent.appendChild(search);
    return y + 110;
  }
  function kamyaBottomNav(parent, active = 0) {
    const nav = figma.createFrame();
    nav.name = "BottomNav";
    nav.resize(W, 76);
    nav.x = 0;
    nav.y = H - 76;
    nav.fills = [solid(C.purple, 0.95)];
    nav.strokes = [{ type: "SOLID", color: { r: C.gold.r, g: C.gold.g, b: C.gold.b }, opacity: 0.15 }];
    nav.strokeWeight = 1;
    const items = ["Home", "Astrologer", "Find Love", "Forum", "Profile"];
    const icons = ["\u2302", "\u2606", "\u2661", "\u25C8", "\u25C9"];
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
      lbl.textAlignHorizontal = "CENTER";
      nav.appendChild(col);
    });
    parent.appendChild(nav);
  }
  function whiteCard(parent, x, y, w, h, name) {
    const card = figma.createFrame();
    card.name = name;
    card.resize(w, h);
    card.x = x;
    card.y = y;
    card.cornerRadius = 14;
    card.fills = [solid({ r: 1, g: 1, b: 1 }, 0.96)];
    card.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.25 },
        offset: { x: 0, y: 4 },
        radius: 16,
        visible: true
      }
    ];
    parent.appendChild(card);
    return card;
  }
  function mandalaSplash(parent, cx, cy, r) {
    const signs = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"];
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
      const angle = i / 12 * Math.PI * 2 - Math.PI / 2;
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
    addText(parent, "\u2726", cx - 8, cy - 10, 18, C.gold, FONT.body);
  }

  // src/screens-ref.ts
  function screenSplash() {
    const f = createScreenFrame("01_Splash");
    cosmicBackground(f);
    mandalaSplash(f, W / 2, 280, 130);
    kamyaLogo(f, W / 2 - 52, H - 200, 40);
    kamyaTagline(f, H - 148);
    return f;
  }
  var ONBOARD = [
    {
      title: "Discover Your Destiny",
      desc: "Unveil the cosmic patterns shaping your life and step into alignment with your true path.",
      phone: "chat"
    },
    {
      title: "Connect with Expert Astrologers",
      desc: "Consult experienced astrologers, tarot readers and spiritual healers for deep, personalized guidance.",
      phone: "astrologers"
    },
    {
      title: "Daily Guidance & Remedies",
      desc: "Receive daily insights, remedies, and spiritual practices to elevate your life.",
      phone: "notifications"
    },
    {
      title: "Spiritual Journal",
      desc: "A sacred space to reflect, record your thoughts, and stay aligned with your inner self.",
      phone: "journal"
    }
  ];
  function fillPhone(phone, type) {
    const inner = figma.createFrame();
    inner.resize(phone.width - 16, phone.height - 48);
    inner.x = 8;
    inner.y = 36;
    inner.cornerRadius = 20;
    inner.fills = [solid(C.purple, 0.9)];
    inner.clipsContent = true;
    phone.appendChild(inner);
    if (type === "chat") {
      addText(inner, "Chat", 16, 12, 16, C.gold, FONT.headingReg);
      const b1 = whiteCard(inner, 12, 44, inner.width - 24, 48, "Bubble");
      addText(b1, "Namaste! Share your birth details.", 10, 10, 10, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
      const b2 = whiteCard(inner, 12, 100, inner.width - 60, 40, "Bubble2");
      addText(b2, "DOB: 15 Mar 1995, Mumbai", 10, 10, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
    } else if (type === "astrologers") {
      addText(inner, "Astrologers", 16, 12, 14, C.gold, FONT.bodyBold);
      ["Aditi \xB7 \u26055", "Raj \xB7 \u26054.9", "Meera \xB7 \u26054.8"].forEach((n, i) => {
        const c = whiteCard(inner, 12, 44 + i * 72, inner.width - 24, 64, n);
        addText(c, n, 12, 12, 11, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
        addText(c, "\u20B960/min \xB7 Chat \xB7 Call", 12, 32, 9, { r: 0.4, g: 0.4, b: 0.5 }, FONT.body);
      });
    } else if (type === "notifications") {
      addText(inner, "11:11", inner.width / 2 - 20, 20, 28, C.cream, FONT.heading);
      addText(inner, "Friday, 11 March 2026", 40, 56, 10, C.muted, FONT.body);
      const n1 = whiteCard(inner, 12, 80, inner.width - 24, 56, "Notif");
      addText(n1, "Pisces \u2014 Today focuses on balancing emotions...", 12, 12, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
      const n2 = whiteCard(inner, 12, 144, inner.width - 24, 56, "Notif2");
      addText(n2, "Astrologer is Live \u2014 personalized guidance", 12, 12, 9, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
    } else {
      addText(inner, "Spiritual Journal", 16, 12, 13, C.gold, FONT.bodyBold);
      ["Today I pause and listen within...", "The universe whispers patience..."].forEach((t, i) => {
        const jc = whiteCard(inner, 12, 44 + i * 80, inner.width - 24, 72, "Entry");
        addText(jc, t, 12, 12, 10, { r: 0.2, g: 0.2, b: 0.3 }, FONT.body);
        addText(jc, "Read More...", jc.width - 72, 52, 8, { r: 0.5, g: 0.5, b: 0.55 }, FONT.body);
      });
    }
  }
  function screenOnboarding(index) {
    const d = ONBOARD[index];
    const f = createScreenFrame(`02_Onboarding_${index + 1}`);
    cosmicBackground(f);
    onboardingChrome(f, index);
    const title = addText(f, d.title, 24, 100, 26, C.gold, FONT.heading, W - 48);
    title.textAlignHorizontal = "CENTER";
    title.x = 24;
    const desc = addText(f, d.desc, 32, 150, 14, C.cream, FONT.body, W - 64);
    desc.textAlignHorizontal = "CENTER";
    const phone = phoneMockup(f, (W - 260) / 2, 220, 260, 420, `Phone/${d.phone}`);
    fillPhone(phone, d.phone);
    return f;
  }
  function screenLogin() {
    const f = createScreenFrame("03_Login");
    cosmicBackground(f);
    kamyaLogo(f, W / 2 - 48, 72, 28);
    kamyaTagline(f, 118);
    goldDivider(f, 145);
    const welcome = addText(f, "Welcome to Kamya", 0, 168, 22, C.gold, FONT.heading);
    welcome.resize(W, 28);
    welcome.textAlignHorizontal = "CENTER";
    const sub = addText(f, "Talk. Connect. Understand. Align with the universe", 40, 200, 13, C.cream, FONT.body, W - 80);
    sub.textAlignHorizontal = "CENTER";
    purpleInputGroup(f, 24, 250, W - 48, ["\u2709  Email or Phone Number", "\u{1F512}  Password"]);
    addText(f, "Forgot password?", W - 130, 370, 12, C.amber, FONT.bodyMed);
    pillGoldButton(f, "Sign in", 24, 400, W - 48);
    addText(f, "or continue with", W / 2 - 40, 475, 12, C.muted, FONT.body);
    let sx = 50;
    ["Apple", "Google", "Facebook"].forEach((s) => {
      const box = glassCard(88, 72, s);
      box.x = sx;
      box.y = 500;
      box.cornerRadius = 14;
      box.fills = [solid(C.purple, 0.8)];
      addText(box, s, 20, 28, 11, C.cream, FONT.bodyMed);
      f.appendChild(box);
      sx += 102;
    });
    const foot = addText(f, "Don't have an account? Sign up \u2192", 60, H - 48, 13, C.cream, FONT.body);
    return f;
  }
  function screenSignup() {
    const f = createScreenFrame("04_Signup");
    cosmicBackground(f);
    const title = addText(f, "Create Your Kamya Account", 24, 64, 24, C.gold, FONT.heading, W - 48);
    title.textAlignHorizontal = "CENTER";
    const sub = addText(f, "Begin your journey of self-discovery and align with your true path.", 32, 100, 13, C.cream, FONT.body, W - 64);
    sub.textAlignHorizontal = "CENTER";
    inputFieldStyled(f, "Full Name", 24, 150, W - 48);
    const row = figma.createFrame();
    row.resize(W - 48, 52);
    row.x = 24;
    row.y = 214;
    row.fills = [solid(C.purple, 0.85)];
    row.cornerRadius = 14;
    row.strokes = [solid(C.gold, 0.15)];
    addText(row, "\u{1F4C5}  Select Date", 16, 16, 13, C.muted, FONT.body);
    addText(row, "\u{1F550}  Time: 04:30 PM", row.width / 2, 16, 12, C.muted, FONT.body);
    f.appendChild(row);
    inputFieldStyled(f, "Place of Birth", 24, 276, W - 48);
    inputFieldStyled(f, "Email Address / Phone Number", 24, 338, W - 48);
    inputFieldStyled(f, "Password", 24, 400, W - 48);
    inputFieldStyled(f, "Confirm Password", 24, 462, W - 48);
    addText(f, "Your information is secure and kept private.", 50, 530, 11, C.amber, FONT.body);
    pillGoldButton(f, "Sign up", 24, 560, W - 48);
    addText(f, "Already have an account? Sign in \u2192", 70, H - 40, 12, C.cream, FONT.body);
    return f;
  }
  function inputFieldStyled(parent, ph, x, y, w) {
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
  function screenHome() {
    const f = createScreenFrame("05_Home");
    cosmicBackground(f);
    let y = kamyaHeader(f, 44);
    const services = ["Horoscope", "Kundli", "Tarot", "Panchang", "Matching"];
    let sx = 16;
    services.forEach((s) => {
      const box = glassCard(68, 72, s);
      box.x = sx;
      box.y = y;
      addText(box, "\u2726", 24, 14, 20, C.gold, FONT.body);
      const lbl = addText(box, s, 4, 44, 8, C.cream, FONT.body);
      lbl.resize(60, 20);
      lbl.textAlignHorizontal = "CENTER";
      f.appendChild(box);
      sx += 74;
    });
    y += 88;
    const promo = whiteCard(f, 20, y, W - 40, 100, "Promo");
    addText(promo, "Confused about Career or Business?", 16, 16, 13, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
    addText(promo, "Let the stars guide your path.", 16, 38, 11, { r: 0.35, g: 0.35, b: 0.45 }, FONT.body);
    y += 115;
    addText(f, "Consult a Jyotish Acharya", 20, y, 16, C.gold, FONT.bodyBold);
    addText(f, "View all \u2192", W - 80, y, 12, C.amber, FONT.bodyMed);
    y += 28;
    const astro = whiteCard(f, 20, y, 200, 150, "Aditi");
    const av = figma.createEllipse();
    av.resize(48, 48);
    av.x = 16;
    av.y = 16;
    av.fills = [solid(C.purple)];
    av.strokes = [solid(C.gold, 0.5)];
    av.strokeWeight = 2;
    astro.appendChild(av);
    addText(astro, "Aditi", 72, 20, 14, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
    addText(astro, "\u2605 4.0 \xB7 Chat \u20B95 \xB7 Call \u20B99", 72, 42, 10, { r: 0.45, g: 0.4, b: 0.2 }, FONT.body);
    kamyaBottomNav(f, 0);
    return f;
  }
  function screenHomeAstrologer() {
    const f = createScreenFrame("05b_Home_Astrologer");
    cosmicBackground(f);
    kamyaHeader(f, 44);
    const featured = glassCard(W - 40, 120, "Featured");
    featured.x = 20;
    featured.y = 160;
    addText(featured, "Aditi Ji", 80, 20, 16, C.cream, FONT.bodyBold);
    addText(featured, "Tarot reader offering guidance in career, relationships...", 80, 44, 11, C.muted, FONT.body, W - 120);
    f.appendChild(featured);
    const card = whiteCard(f, 20, 300, 170, 180, "Card");
    addText(card, "Aditi", 50, 60, 14, { r: 0.15, g: 0.15, b: 0.25 }, FONT.bodyBold);
    addText(card, "\u2605 4.0 (1k Calls)", 30, 85, 10, { r: 0.5, g: 0.4, b: 0.15 }, FONT.body);
    kamyaBottomNav(f, 1);
    return f;
  }
  function screenDrawer() {
    const f = createScreenFrame("06_Drawer");
    cosmicBackground(f);
    const overlay = figma.createRectangle();
    overlay.resize(W, H);
    overlay.fills = [solid({ r: 0, g: 0, b: 0 }, 0.45)];
    f.appendChild(overlay);
    const panel = figma.createFrame();
    panel.resize(300, H);
    panel.fills = [solid(C.purple, 0.92)];
    panel.cornerRadius = 0;
    panel.effects = [{ type: "BACKGROUND_BLUR", radius: 20, visible: true }];
    const av = figma.createEllipse();
    av.resize(56, 56);
    av.x = 24;
    av.y = 72;
    av.fills = [solid(C.amber, 0.6)];
    panel.appendChild(av);
    addText(panel, "Tanya", 92, 80, 18, C.cream, FONT.bodyBold);
    addText(panel, "ID: CUS000001", 92, 104, 11, C.muted, FONT.body);
    const items = [
      "My Profile",
      "Orders",
      "Journal",
      "Forum",
      "Chat History",
      "Chat with Astrologer",
      "Sign up as Astrologer",
      "Shop",
      "About Kamya",
      "Privacy Policy",
      "Contact Us",
      "Logout"
    ];
    let my = 150;
    items.forEach((item) => {
      addText(panel, item, 24, my, 14, item === "Logout" ? C.red : C.cream, FONT.body);
      my += 36;
    });
    addText(panel, "\u25C9 \u25CE \u2726 \u2606", 24, H - 48, 18, C.gold, FONT.body);
    f.appendChild(panel);
    return f;
  }

  // src/screens.ts
  function screenAstrologerList() {
    const f = createScreenFrame("07_AstrologerList");
    stars(f, 15);
    statusBar(f);
    addText(f, "\u2190", 24, 52, 20, C.gold, FONT.body);
    addText(f, "Expert Astrologers", 24, 80, 24, C.gold, FONT.heading);
    let fx = 20;
    ["All", "Tarot", "Vedic", "Numerology", "Love"].forEach((fl, i) => {
      const c = chip(f, fl, fx, 120, i === 0);
      fx += c.width + 8;
    });
    let y = 170;
    [
      { name: "Pandit Raj Sharma", exp: "Vedic \u2022 15 yrs \u2022 Hindi, English", rate: "\u20B918/min", rating: "4.9" },
      { name: "Guru Meera Devi", exp: "Tarot \u2022 10 yrs \u2022 Hindi", rate: "\u20B912/min", rating: "4.8" },
      { name: "Acharya Dev Nath", exp: "Numerology \u2022 8 yrs", rate: "\u20B915/min", rating: "4.7" }
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
      addText(card, `\u2605 ${a.rating}  ${a.rate}`, 76, 52, 10, { r: 0.55, g: 0.45, b: 0.15 }, FONT.bodyMed);
      y += 112;
    });
    kamyaBottomNav(f, 1);
    return f;
  }
  function screenAstrologerProfile() {
    const f = createScreenFrame("08_AstrologerProfile");
    stars(f, 15);
    statusBar(f);
    addText(f, "\u2190", 24, 52, 20, C.gold, FONT.body);
    const hero = glassCard(W - 40, 200, "ProfileHero");
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
    addText(hero, "Pandit Raj Sharma", 0, 110, 18, C.gold, FONT.headingReg);
    hero.children[hero.children.length - 1].x = 60;
    addText(hero, "Vedic Astrology \u2022 \u2605 4.9 (2.4k reviews)", 40, 140, 11, C.amber, FONT.body);
    f.appendChild(hero);
    addText(f, "About", 24, 300, 16, C.gold, FONT.bodyBold);
    addText(
      f,
      "Renowned Vedic astrologer with 15+ years guiding souls through planetary wisdom and spiritual remedies.",
      24,
      325,
      13,
      C.cream,
      FONT.body,
      W - 48
    );
    addText(f, "Skills", 24, 400, 16, C.gold, FONT.bodyBold);
    ["Kundali", "Match Making", "Remedies", "Career"].forEach((sk, i) => {
      chip(f, sk, 24 + i * 80, 425, false);
    });
    addText(f, "Consultation", 24, 480, 16, C.gold, FONT.bodyBold);
    addText(f, "Chat: \u20B918/min  \u2022  Call: \u20B925/min", 24, 505, 13, C.cream, FONT.body);
    addText(f, "Available Slots Today", 24, 540, 14, C.amber, FONT.bodyMed);
    ["10:00 AM", "2:00 PM", "6:00 PM"].forEach((slot, i) => {
      chip(f, slot, 24 + i * 90, 565, i === 1);
    });
    goldButton(f, "Start Chat", 24, H - 140, (W - 56) / 2);
    const callMain = glassCard((W - 56) / 2, 52, "CallCTA");
    callMain.x = 24 + (W - 56) / 2 + 8;
    callMain.y = H - 140;
    addText(callMain, "Voice Call", 30, 16, 14, C.gold, FONT.bodyBold);
    f.appendChild(callMain);
    return f;
  }
  function screenChat() {
    const f = createScreenFrame("09_Chat");
    stars(f, 10);
    const header = glassCard(W, 100, "ChatHeader");
    header.y = 0;
    header.cornerRadius = 0;
    addText(header, "\u2190", 20, 52, 18, C.gold, FONT.body);
    addText(header, "Pandit Raj", 60, 48, 16, C.cream, FONT.bodyBold);
    addText(header, "\u25CF Online", 60, 68, 11, C.green, FONT.body);
    addText(header, "\u{1F4DE}  \u{1F4F9}", W - 70, 52, 18, C.gold, FONT.body);
    f.appendChild(header);
    const bubbles = [
      { text: "Namaste! How may I guide you today?", mine: false },
      { text: "I want to know about my career prospects.", mine: true },
      { text: "Please share your birth details or attach your Kundali.", mine: false }
    ];
    let by = 120;
    bubbles.forEach((b) => {
      const bw = Math.min(b.text.length * 7 + 32, W - 100);
      const bubble = glassCard(bw, 60, "Bubble");
      bubble.x = b.mine ? W - bw - 20 : 20;
      bubble.y = by;
      if (b.mine)
        bubble.fills = [solid(C.gold, 0.2)];
      addText(bubble, b.text, 12, 12, 13, C.cream, FONT.body);
      f.appendChild(bubble);
      by += 72;
    });
    addText(f, "typing...", 20, by, 11, C.muted, FONT.body);
    addText(f, "10:32 AM", W - 70, by, 10, C.muted, FONT.body);
    const inputBar = glassCard(W - 32, 52, "ChatInput");
    inputBar.x = 16;
    inputBar.y = H - 120;
    addText(inputBar, "\u{1F3A4}  \u{1F4CE}  Type a message...", 12, 16, 13, C.muted, FONT.body);
    f.appendChild(inputBar);
    const send = figma.createEllipse();
    send.resize(44, 44);
    send.x = W - 60;
    send.y = H - 116;
    send.fills = [goldGradient()];
    f.appendChild(send);
    addText(f, "\u27A4", W - 48, H - 108, 18, C.navy, FONT.bodyBold);
    return f;
  }
  function screenKundali() {
    const f = createScreenFrame("10_KundaliMatching");
    stars(f, 15);
    statusBar(f);
    addText(f, "\u2190", 24, 52, 20, C.gold, FONT.body);
    addText(f, "Kundali Matching", 24, 80, 24, C.gold, FONT.heading);
    addText(f, "Bride Details", 24, 120, 14, C.amber, FONT.bodyBold);
    ["Date of Birth", "Time of Birth", "Place of Birth"].forEach((ph, i) => {
      inputField(f, ph, 24, 145 + i * 64, W - 48);
    });
    addText(f, "Groom Details", 24, 340, 14, C.amber, FONT.bodyBold);
    ["Date of Birth", "Time of Birth", "Place of Birth"].forEach((ph, i) => {
      inputField(f, ph, 24, 365 + i * 64, W - 48);
    });
    goldButton(f, "Generate Compatibility Report", 24, 560, W - 48);
    const result = glassCard(W - 40, 200, "Result");
    result.x = 20;
    result.y = 630;
    zodiacWheel(result, 80, 100, 50);
    addText(result, "Guna Score: 28/36", 150, 40, 14, C.gold, FONT.bodyBold);
    addText(result, "Compatibility: 87%", 150, 65, 22, C.amber, FONT.headingReg);
    addText(result, "Favorable for marriage \u2726", 150, 100, 12, C.cream, FONT.body);
    addText(result, "Remedies suggested \u2192", 150, 130, 11, C.muted, FONT.bodyMed);
    f.appendChild(result);
    kamyaBottomNav(f, 2);
    return f;
  }
  function screenHoroscope() {
    const f = createScreenFrame("11_DailyHoroscope");
    stars(f, 20);
    statusBar(f);
    addText(f, "Daily Horoscope", 24, 80, 24, C.gold, FONT.heading);
    const signs = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D"];
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
    const card = glassCard(W - 40, 420, "HoroscopeCard");
    card.x = 20;
    card.y = 190;
    addText(card, "Aries \u2014 Today", 20, 20, 20, C.gold, FONT.headingReg);
    addText(card, "The stars align in your favor today. Embrace new opportunities with courage.", 20, 55, 14, C.cream, FONT.body, W - 80);
    addText(card, "Lucky Number: 7", 20, 130, 13, C.amber, FONT.bodyMed);
    addText(card, "Lucky Color: Gold", 20, 155, 13, C.amber, FONT.bodyMed);
    addText(card, "Career: Excellent prospects", 20, 200, 12, C.cream, FONT.body);
    addText(card, "Love: Deep connections", 20, 225, 12, C.cream, FONT.body);
    addText(card, "Health: Maintain balance", 20, 250, 12, C.cream, FONT.body);
    f.appendChild(card);
    return f;
  }
  function screenTarot() {
    const f = createScreenFrame("12_TarotReading");
    stars(f, 25);
    statusBar(f);
    addText(f, "Tarot Reading", 24, 80, 24, C.gold, FONT.heading);
    addText(f, "Choose your spread", 24, 120, 13, C.muted, FONT.body);
    ["Daily Tarot", "Three Card", "Celtic Cross"].forEach((sp, i) => {
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
      card.name = "TarotCard";
      f.appendChild(card);
      addText(f, "\u2726", 48 + i * 66, 255, 16, C.navy, FONT.body);
    }
    const reading = glassCard(W - 40, 280, "Interpretation");
    reading.x = 20;
    reading.y = 340;
    addText(reading, "The Star", 20, 20, 22, C.gold, FONT.headingReg);
    addText(
      reading,
      "Hope and inspiration illuminate your path. Trust the universe \u2014 renewal is near.",
      20,
      55,
      14,
      C.cream,
      FONT.body,
      W - 80
    );
    addText(reading, "\u2727 AI Interpretation", 20, 200, 11, C.amber, FONT.bodyMed);
    f.appendChild(reading);
    goldButton(f, "Draw New Cards", 24, H - 100, W - 48);
    return f;
  }
  function screenJournal() {
    const f = createScreenFrame("13_SpiritualJournal");
    stars(f, 15);
    statusBar(f);
    addText(f, "Spiritual Journal", 24, 80, 24, C.gold, FONT.heading);
    addText(f, "How are you feeling?", 24, 120, 13, C.muted, FONT.body);
    ["\u{1F319}", "\u2728", "\u2600", "\u{1F525}", "\u{1F4A7}"].forEach((m, i) => {
      const mood = glassCard(56, 56, `Mood${i}`);
      mood.x = 24 + i * 66;
      mood.y = 150;
      addText(mood, m, 16, 12, 24, C.gold, FONT.body);
      f.appendChild(mood);
    });
    const entry = glassCard(W - 40, 280, "JournalEntry");
    entry.x = 20;
    entry.y = 230;
    addText(entry, "Write your sacred thoughts...", 16, 16, 14, C.muted, FONT.body);
    f.appendChild(entry);
    addText(f, "Today's Affirmation", 24, 530, 14, C.amber, FONT.bodyBold);
    const aff = glassCard(W - 40, 80, "Affirmation");
    aff.x = 20;
    aff.y = 555;
    addText(aff, '"I am aligned with divine light and cosmic wisdom."', 16, 24, 13, C.cream, FONT.body, W - 72);
    f.appendChild(aff);
    goldButton(f, "Save Entry", 24, H - 100, W - 48);
    return f;
  }
  function screenStore() {
    const f = createScreenFrame("14_Store");
    stars(f, 15);
    statusBar(f);
    addText(f, "Spiritual Store", 24, 80, 24, C.gold, FONT.heading);
    addText(f, "\u{1F6D2}", W - 48, 80, 22, C.gold, FONT.body);
    let y = 130;
    const products = [
      { name: "5 Mukhi Rudraksha", price: "\u20B9499" },
      { name: "Amethyst Crystal", price: "\u20B9899" },
      { name: "Shri Yantra", price: "\u20B91,299" },
      { name: "Spiritual Book Set", price: "\u20B9699" }
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
      addText(card, "+", 135, 162, 16, C.navy, FONT.bodyBold);
      f.appendChild(card);
    });
    goldButton(f, "View Cart (3)", 24, H - 100, W - 48);
    return f;
  }
  function screenProfile() {
    const f = createScreenFrame("15_Profile");
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
    addText(f, "Priya Sharma", W / 2 - 55, 175, 20, C.gold, FONT.headingReg);
    addText(f, "\u2648 Aries  \u2022  Born 15 Mar 1995", W / 2 - 80, 200, 12, C.muted, FONT.body);
    const menuItems = [
      ["Birth Chart Summary", "View your cosmic map"],
      ["Subscription", "Premium \u2014 Active"],
      ["Saved Reports", "12 reports"],
      ["Order History", "8 orders"],
      ["Wallet Balance", "\u20B9250"]
    ];
    let y = 250;
    menuItems.forEach(([title, sub]) => {
      const row = glassCard(W - 40, 64, title);
      row.x = 20;
      row.y = y;
      addText(row, title, 16, 14, 14, C.cream, FONT.bodyBold);
      addText(row, sub, 16, 36, 11, C.muted, FONT.body);
      addText(row, "\u2192", W - 72, 22, 16, C.gold, FONT.body);
      f.appendChild(row);
      y += 76;
    });
    kamyaBottomNav(f, 4);
    return f;
  }
  function screenNotifications() {
    const f = createScreenFrame("16_Notifications");
    stars(f, 10);
    statusBar(f);
    addText(f, "\u2190", 24, 52, 20, C.gold, FONT.body);
    addText(f, "Notifications", 24, 80, 24, C.gold, FONT.heading);
    const notifs = [
      { title: "Daily Horoscope Ready", sub: "Your Aries horoscope for today", time: "2m ago", icon: "\u263D" },
      { title: "Pandit Raj is Online", sub: "Start a consultation now", time: "15m ago", icon: "\u2606" },
      { title: "Consultation Reminder", sub: "Your session at 6:00 PM", time: "1h ago", icon: "\u25C8" },
      { title: "Spiritual Guidance", sub: "Meditation tip for the evening", time: "3h ago", icon: "\u2726" }
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
  function screenForum() {
    const f = createScreenFrame("17_Forum");
    stars(f, 10);
    statusBar(f);
    addText(f, "Community", 24, 80, 24, C.gold, FONT.heading);
    goldButton(f, "+ Ask Anonymously", 24, 120, W - 48, 44);
    const posts = [
      { user: "Seeker_2847", text: "What remedies help with Saturn Sade Sati?", likes: 42 },
      { user: "MoonChild", text: "Best time for marriage muhurat in 2026?", likes: 28 }
    ];
    let y = 180;
    posts.forEach((p) => {
      const card = glassCard(W - 40, 120, "Post");
      card.x = 20;
      card.y = y;
      addText(card, p.user, 16, 16, 12, C.amber, FONT.bodyMed);
      addText(card, p.text, 16, 40, 14, C.cream, FONT.body, W - 72);
      addText(card, `\u2661 ${p.likes}   \u{1F4AC} 12   \u2197 Share`, 16, 90, 11, C.muted, FONT.body);
      f.appendChild(card);
      y += 132;
    });
    kamyaBottomNav(f, 3);
    return f;
  }
  function screenAdmin() {
    const f = createScreenFrame("18_AdminDashboard");
    const pad = 24;
    addText(f, "KAMYA", pad, 56, 28, C.gold, FONT.heading);
    addText(f, "Admin Panel", pad, 92, 12, C.muted, FONT.body);
    let tx = pad;
    ["Dashboard", "Users", "Revenue"].forEach((tab, i) => {
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
    addText(f, "Dashboard Overview", pad, 188, 20, C.gold, FONT.heading);
    const metrics = [
      ["12.4k", "Users"],
      ["342", "Astrologers"],
      ["\u20B98.4L", "Revenue"],
      ["1,204", "Bookings Today"]
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
    const chart = glassCard(W - pad * 2, 140, "RevenueChart");
    chart.x = pad;
    chart.y = 400;
    addText(chart, "Revenue Analytics", 16, 14, 14, C.cream, FONT.bodyBold);
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
  function buildAllScreens() {
    const screens = [
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
      screenAdmin()
    ];
    return screens;
  }

  // src/main.ts
  figma.showUI(__html__, { width: 320, height: 420 });
  figma.ui.onmessage = async (msg) => {
    if (msg.type !== "generate")
      return;
    try {
      await loadFonts();
      const page = figma.currentPage;
      page.name = "KAMYA \u2014 Mobile UI Kit";
      const dsFrame = figma.createFrame();
      buildDesignSystem(dsFrame);
      dsFrame.x = 0;
      dsFrame.y = 0;
      page.appendChild(dsFrame);
      const screens = buildAllScreens();
      const COLS = 6;
      const GAP_X = 48;
      const GAP_Y = 48;
      const START_X = 1300;
      const START_Y = 0;
      screens.forEach((screen, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        screen.x = START_X + col * (390 + GAP_X);
        screen.y = START_Y + row * (844 + GAP_Y);
        page.appendChild(screen);
      });
      const flowNote = figma.createFrame();
      flowNote.name = "\u{1F4CB} Prototype Flow Notes";
      flowNote.resize(500, 400);
      flowNote.x = 0;
      flowNote.y = 2500;
      flowNote.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.08, b: 0.18 } }];
      const noteText = figma.createText();
      noteText.fontName = { family: "Inter", style: "Regular" };
      noteText.characters = `KAMYA \u2014 Reference-backed UI Kit

REFERENCE SCREENS (client PNG artwork):
01 Splash, 02-05 Onboarding, 06 Login, 07 Signup,
05 Home (full), 05b Home Astrologer, 06 Drawer

STYLED SCREENS (match reference design system):
Astrologers, Chat, Kundali, Horoscope, Tarot, Journal,
Store, Profile, Notifications, Forum, Admin

Prototype: Splash \u2192 Onboarding \u2192 Login/Signup \u2192 Home
Bottom Nav: Home | Astrologer | Find Love | Forum | Profile`;
      noteText.fontSize = 12;
      noteText.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.88, b: 0.83 } }];
      noteText.resize(460, 360);
      noteText.x = 20;
      noteText.y = 20;
      flowNote.appendChild(noteText);
      page.appendChild(flowNote);
      figma.viewport.scrollAndZoomIntoView([dsFrame, ...screens]);
      figma.ui.postMessage({
        type: "done",
        text: `Created ${screens.length} screens + design system. Ready for handoff!`
      });
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      figma.ui.postMessage({ type: "error", text: err });
    }
  };
})();
