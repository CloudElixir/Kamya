# KAMYA — Premium Astrology & Spiritual Guidance UI

**Tagline:** From Darkness To Divine Light

Complete mobile UI/UX design system and screen kit for **KAMYA** — a mystical, luxurious astrology and spiritual guidance platform.

## Live preview (share with client)

**https://cloudelixir.github.io/Kamya/**

Enable once in GitHub: **Settings → Pages → Build from branch `main` → folder `/docs` → Save.**

## Design approach

Your reference images are used **only as visual inspiration** — all screens are **rebuilt as native UI** (vectors, components, colors) in Figma and HTML. No reference PNGs are embedded.

**Open in Figma:** See **[documentation/OPEN-IN-FIGMA.md](documentation/OPEN-IN-FIGMA.md)**

- Figma plugin generates editable frames (splash mandala, onboarding phones, login forms, home, drawer, etc.)
- Browser preview: `prototype/index.html`

## Brand

| Token | Value |
|-------|-------|
| Cosmic Navy | `#060B2D` |
| Spiritual Purple | `#1C1240` |
| Divine Gold | `#D4AF37` |
| Soft Amber | `#F3C96A` |
| Frame Size | **390 × 844** (iOS/Android) |

**Typography:** Playfair Display (headings) · DM Sans (body)

---

## What's Included

### 1. Figma Plugin (Primary — generates live Figma files)

Path: [`figma-plugin/`](figma-plugin/)

Generates in one click:
- Full **Design System** page (colors, type, buttons, inputs, cards, spacing)
- **22 frames**: 18 mobile screens + 4 onboarding variants
- **Admin dashboard** (1440×900 web)
- Prototype flow notes
- Auto-layout frames, glassmorphism, gold gradients

**Install in Figma:**

1. Open **Figma Desktop** → Plugins → Development → **Import plugin from manifest**
2. Select: `figma-plugin/manifest.json`
3. Run **KAMYA Design Generator** → click **Generate Full Design System**

> Rebuild after edits: `cd figma-plugin && npm run build`

### 2. HTML Prototype Preview

Path: [`prototype/`](prototype/)

Open `prototype/index.html` in a browser for an immediate visual gallery of all screens.

```bash
# Optional local server
cd prototype && python3 -m http.server 8080
# Visit http://localhost:8080
```

### 3. Design Tokens (Developer Handoff)

Path: [`design-system/tokens.json`](design-system/tokens.json)

Export to CSS, React Native, Flutter, or Figma variables.

---

## Screen Inventory

| # | Screen | Frame Name |
|---|--------|------------|
| 1 | Splash | `01_Splash` |
| 2–5 | Onboarding (×4) | `02_Onboarding_1–4` |
| 6 | Login | `03_Login` |
| 7 | Signup | `04_Signup` |
| 8 | Home | `05_Home` |
| 9 | Side Drawer | `06_Drawer` |
| 10 | Astrologer List | `07_AstrologerList` |
| 11 | Astrologer Profile | `08_AstrologerProfile` |
| 12 | Chat | `09_Chat` |
| 13 | Kundali Matching | `10_KundaliMatching` |
| 14 | Daily Horoscope | `11_DailyHoroscope` |
| 15 | Tarot Reading | `12_TarotReading` |
| 16 | Spiritual Journal | `13_SpiritualJournal` |
| 17 | Store | `14_Store` |
| 18 | Profile | `15_Profile` |
| 19 | Notifications | `16_Notifications` |
| 20 | Forum | `17_Forum` |
| 21 | Admin Dashboard | `18_AdminDashboard` |

---

## Prototype Flow

```
Splash → Onboarding (1→4) → Login / Signup → Home
    ├── Astrologers → Profile → Chat
    ├── Kundali · Horoscope · Tarot · Journal · Store
    ├── Drawer menu → all destinations
    └── Bottom Nav: Home | Astrologers | Kundali | Forum | Profile
```

### Recommended Figma Prototype Animations

- **Smart Animate** between onboarding slides
- **Cosmic pulse** on primary CTA (opacity + glow)
- **Rotate** zodiac wheel on splash (360°, 30s loop)
- **Dissolve** for screen transitions
- Floating **star particles** (opacity oscillation)

---

## Layer Naming Conventions

```
Screen/
  Component/
    Element
```

Examples: `Button/Sign In`, `Input/Email`, `Card/AstrologerCard`, `BottomNav`

---

## Post-Generation Checklist (Figma)

1. Install fonts: **Playfair Display**, **DM Sans** (Google Fonts)
2. Replace unicode icon placeholders with **Phosphor** / **Lucide** icon set
3. Add **Figma Variables** from `design-system/tokens.json`
4. Link prototype connections per flow above
5. Enable **Dev Mode** for handoff specs
6. Export assets: `@1x`, `@2x`, `@3x` for mobile

---

## Quality Notes

- Glassmorphism: 6% white fill + background blur + gold border
- Premium cinematic feel: cosmic gradients, star fields, zodiac motifs
- Production-ready spacing scale: 4 / 8 / 16 / 24 / 32 / 48
- Unique KAMYA identity — not a copy of reference apps

---

*KAMYA — Netflix × Luxury Spiritual Platform × Modern Astrology Ecosystem*
