# KAMYA — Figma Developer Handoff

## Color Variables (create in Figma)

| Name | Hex | Usage |
|------|-----|-------|
| `bg/cosmic-navy` | #060B2D | Primary background |
| `bg/spiritual-purple` | #1C1240 | Gradient mid-tone |
| `accent/divine-gold` | #D4AF37 | CTAs, borders, headings |
| `accent/soft-amber` | #F3C96A | Highlights, lucky elements |
| `text/primary` | #FFFFFF | Headlines on dark |
| `text/secondary` | #E8E0D4 | Body copy |
| `text/muted` | #B8A88A | Placeholders, captions |
| `semantic/online` | #22C55E | Astrologer online dot |
| `semantic/error` | #F87171 | Logout, errors |

## Typography Styles

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| Display | Playfair Display | 36 | Bold | 44 |
| H1 | Playfair Display | 28 | Bold | 36 |
| H2 | Playfair Display | 22 | SemiBold | 28 |
| H3 | Playfair Display | 18 | SemiBold | 24 |
| Body | DM Sans | 15 | Regular | 22 |
| Body Small | DM Sans | 13 | Regular | 18 |
| Caption | DM Sans | 11 | Medium | 14 |
| Label | DM Sans | 12 | SemiBold | 16 |

## Component Specs

### Primary Button
- Height: 52px · Radius: 14px
- Fill: linear `#D4AF37` → `#F3C96A`
- Text: DM Sans Bold 15px, `#060B2D`
- Shadow: `0 4px 16px rgba(212,175,55,0.35)`

### Glass Card
- Fill: `#FFFFFF` @ 6%
- Border: 1px `#D4AF37` @ 35%
- Radius: 16px · Blur: 24px
- Shadow: `0 8px 32px rgba(0,0,0,0.4)`

### Input Field
- Height: 52px · Radius: 12px
- Same glass treatment as card
- Placeholder: `#B8A88A` 14px

### Bottom Navigation
- Height: 80px
- 5 items: Home, Astrologers, Kundali, Forum, Profile
- Active icon: `#D4AF37` · Inactive: `#B8A88A`

## Spacing Grid
Base unit: **4px** — use 4, 8, 16, 24, 32, 48

## Export Settings
- Mobile: PNG @1x, @2x, @3x
- Icons: SVG
- Safe area: respect 44pt top / 34pt bottom on iOS

## Animation Tokens (implement in code)

| Token | Value |
|-------|-------|
| `duration/fast` | 200ms |
| `duration/normal` | 350ms |
| `duration/slow` | 600ms |
| `easing/smooth` | cubic-bezier(0.4, 0, 0.2, 1) |
| `glow/pulse` | box-shadow oscillate gold 0.2→0.45 opacity |
