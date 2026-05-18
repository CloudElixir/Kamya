# How to Open KAMYA in Figma

Yes — you can open and edit everything in **Figma**. Screens are **built from your references** (layout, colors, typography) as native Figma layers — **not pasted images**.

## Quick start

```bash
cd /home/godfather/Client/Kamya/APP/figma-plugin
npm install
npm run build
```

1. Open **Figma Desktop**
2. **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`
4. New file → **Plugins → KAMYA Design Generator** → **Generate Full Design System**

## What you get

| Built from your references | Additional screens (same design system) |
|---------------------------|----------------------------------------|
| Splash (mandala + KAMYA logo) | Astrologer list & profile |
| Onboarding ×4 (phone mockups) | Chat, Kundali, Horoscope, Tarot |
| Login & Signup | Journal, Store, Notifications, Forum |
| Home & Drawer | Admin dashboard |

All frames are **390×844**, editable, with components you can refine.

## After generating

1. Install fonts: **Playfair Display**, **DM Sans**
2. Replace placeholder icons with your icon set
3. Add prototype links: Splash → Onboarding → Login → Home
4. Use **Dev Mode** for handoff

## Browser preview (optional)

```bash
cd prototype && python3 -m http.server 8080
```

Open http://localhost:8080 — CSS-built preview, also without embedded reference PNGs.
