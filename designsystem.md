# Attune — Design System
**Version 1.0 · May 2026**

---

## 1. Design Philosophy

Attune is built around one feeling: the app should disappear. The couple should feel present with each other, not with their phones. Every design decision flows from this.

- **Dark** — reduces screen stimulation, encourages intimacy
- **Typographic** — words are the product; they deserve respect
- **Unhurried** — generous spacing, no urgency cues
- **Sensual not clinical** — warmth over sterility
- **Premium but not precious** — feels special, not complicated

---

## 2. Color System

### 2.1 Base Palette

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| `void` | `#0D0A12` | Void | App background |
| `surface` | `#1C1528` | Surface | Card backgrounds, tiles |
| `surface2` | `#241D33` | Surface 2 | Elevated surfaces, card back |
| `surface3` | `#2E2542` | Surface 3 | Progress track, inactive bars |
| `rim` | `#3D3255` | Rim | Borders, dividers |
| `rim2` | `#524569` | Rim 2 | Card borders, highlighted borders |
| `plum` | `#7B4FA6` | Plum | Primary CTA, key headings |
| `plumLight` | `#9B6EC8` | Plum Light | Hover states, active dots |
| `plumGlow` | `#C49AE8` | Plum Glow | Category labels, glow accents |
| `rose` | `#C4708A` | Rose | Secondary accent, physical category |
| `roseLight` | `#E8A0B8` | Rose Light | Gradient partner to Plum Glow |
| `gold` | `#C8A96E` | Gold | Challenges category accent |
| `text` | `#F0EAF8` | Text | Primary text |
| `textSoft` | `#B8A8D0` | Text Soft | Secondary text, metadata |
| `textFaint` | `#7A6A90` | Text Faint | Placeholders, labels, hints |
| `textGhost` | `#3D3255` | Text Ghost | Disabled, very subtle text |

### 2.2 Category Accent Colors

| Token | Hex | Category |
|-------|-----|----------|
| `warmup` | `#8BB88A` | 🌱 Warmup |
| `connection` | `#7A9EC4` | 💬 Connection |
| `depth` | `#9B6EC8` | 🌊 Depth |
| `physical` | `#C4708A` | 🔥 Physical |
| `challenges` | `#C8A96E` | 🎯 Challenges |
| `spicy` | `#E8A0B8` | 💑 Spicy |

### 2.3 Gradients

| Name | Value | Usage |
|------|-------|-------|
| CTA button | `135deg, #7B4FA6 → #9B50C8` | Draw a Card button |
| Headline text | `135deg, #C49AE8 → #E8A0B8` | Home screen headline accent |
| Card back | `160deg, #241D33 → #1C1528` | Card back face |
| Ambient glow | `radial, rgba(123,79,166,0.25) → transparent` | Top of screen atmosphere |
| Progress bar | `90deg, #7B4FA6 → #C49AE8` | Category detail progress fill |

---

## 3. Typography

### 3.1 Fonts

| Font | Weights Used | Source | License |
|------|-------------|--------|---------|
| Cormorant Garamond | 300, 300 Italic, 600 | Google Fonts | OFL (free commercial use) |
| Jost | 300, 400, 500 | Google Fonts | OFL (free commercial use) |

### 3.2 Type Scale

| Role | Font | Size | Weight | Style | Usage |
|------|------|------|--------|-------|-------|
| Display | Cormorant Garamond | 42pt | 300 | Italic | Home headline |
| Category Name | Cormorant Garamond | 38pt | 300 | Italic | Category detail screen |
| Stats Headline | Cormorant Garamond | 36pt | 300 | Italic | Stats screen heading |
| Stat Value | Cormorant Garamond | 38pt | 300 | Normal | Numbers on stat cards |
| Card Text | Cormorant Garamond | 21pt | 300 | Italic | Card back question text |
| Card Wordmark | Cormorant Garamond | 32pt | 300 | Italic | Card front logo |
| UI Body | Jost | 13pt | 400 | Normal | Descriptions, body copy |
| Button | Jost | 15pt | 500 | Normal | CTAs |
| Pill Text | Jost | 12pt | 400 | Normal | Streak, session pills |
| Tile Name | Jost | 13pt | 500 | Normal | Category tile name |
| Label / Cap | Jost | 10pt | 500 | Uppercase | Section labels |
| Meta / Hint | Jost | 10–11pt | 400 | Normal | Counts, hints, hints |

### 3.3 Font Files

```
assets/fonts/
  CormorantGaramond-Light.ttf
  CormorantGaramond-LightItalic.ttf
  CormorantGaramond-SemiBold.ttf
  Jost-Light.ttf
  Jost-Regular.ttf
  Jost-Medium.ttf
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space.xs` | 4px | Tight internal spacing |
| `space.sm` | 8px | Grid gap, pill gap |
| `space.md` | 16px | Standard padding, card actions |
| `space.lg` | 24px | Screen horizontal padding |
| `space.xl` | 28px | Section padding, header padding |
| `space.2xl` | 48px | Large section breaks |

### 4.2 Border Radius

| Element | Radius |
|---------|--------|
| Cards | 24px |
| Category tiles | 20px |
| Stat cards | 18px |
| Buttons | 14–16px |
| Pills / badges | 100px (fully rounded) |
| Progress bars | 100px (fully rounded) |

### 4.3 Shadows & Glow

| Element | Value |
|---------|-------|
| Playing card | `drop-shadow(0 24px 48px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(123,79,166,0.2))` |
| CTA button | `0 8px 32px rgba(123,79,166,0.4), 0 2px 8px rgba(0,0,0,0.3)` |
| Ambient screen glow | Radial gradient at top, `rgba(123,79,166,0.25)` |
| Stat card glow | Radial at top-right corner, `rgba(123,79,166,0.12)` |

---

## 5. Component Specs

### 5.1 Category Tile

| Property | Value |
|----------|-------|
| Layout | Flex, ~50% width minus gap |
| Background | `#1C1528` (Surface) |
| Border | 1px solid, category rgba border |
| Border radius | 20px |
| Padding | 16px 15px 14px |
| Press state | `scale(0.96)`, 180ms |

### 5.2 Card

| Property | Value |
|----------|-------|
| Max width | 316px |
| Aspect ratio | 2.8 : 4 |
| Front background | Surface + 28px grid overlay (rgba plum 6%) + orb glow |
| Back background | Gradient `Surface2 → Surface` at 160deg |
| Border | 1px solid `#524569` (Rim 2) |
| Corner ornaments | 22×22px L-bracket, top-right and bottom-left |
| Flip axis | Y-axis |
| Flip duration | 650ms |
| Flip easing | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 5.3 CTA Button (Draw a Card)

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #7B4FA6, #9B50C8)` |
| Highlight overlay | `linear-gradient(135deg, rgba(255,255,255,0.12), transparent)` |
| Text | Jost 15pt / 500 / white / letter-spacing 0.04em |
| Border radius | 16px |
| Padding | 17px |
| Shadow | `0 8px 32px rgba(123,79,166,0.4)` |
| Hover | opacity 0.9, translateY(-1px) |

### 5.4 Progress Bar

| Property | Value |
|----------|-------|
| Track height | 3px (detail screen), 2px (tile) |
| Track color | `#2E2542` (Surface 3) |
| Fill — detail screen | Gradient `#7B4FA6 → #C49AE8` |
| Fill — tile | Category accent color |
| Border radius | 100px |

### 5.5 Pill Badge

| Property | Value |
|----------|-------|
| Background | `#241D33` (Surface 2) |
| Border | 1px solid `#3D3255` (Rim) |
| Border radius | 100px |
| Padding | 7px 14px |
| Dot size | 6px circle |
| Dot color | `#9B6EC8` (streak) or `#C4708A` (session) |
| Text | Jost 12pt / 400 / Text Soft |

### 5.6 Bottom Navigation

| Property | Value |
|----------|-------|
| Background | `linear-gradient(to top, #0D0A12, rgba(13,10,18,0.95))` |
| Border top | 1px solid `#3D3255` |
| Padding | 14px 20px 30px |
| Icon size | 20px |
| Label | Jost 10pt / 500 / Text Soft |
| Inactive opacity | 0.35 |
| Active opacity | 1.0 |

---

## 6. Motion & Animation

### 6.1 Card Flip

| Property | Value |
|----------|-------|
| Library | React Native Reanimated 3 |
| Duration | 650ms |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Front | `rotateY(0deg → 180deg)` |
| Back | `rotateY(180deg → 360deg)` |
| Both faces | `backfaceVisibility: hidden` |

### 6.2 Screen Enter

| Property | Value |
|----------|-------|
| Type | Fade + slide |
| From | `opacity: 0, translateY: 10px` |
| To | `opacity: 1, translateY: 0` |
| Duration | 400ms |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 6.3 Next Card Spring

| Property | Value |
|----------|-------|
| Trigger | Next Card button press |
| Compress | `scale(0.9) translateY(6px)`, 0ms |
| Release | Spring back, `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Duration | 350ms |

### 6.4 Tile Press

| Property | Value |
|----------|-------|
| Scale | 0.96 on press |
| Duration | 180ms |
| Easing | Linear (no bounce) |

---

## 7. Iconography

Using `@expo/vector-icons` (Ionicons set).

| Element | Icon |
|---------|------|
| Decks tab | `grid-outline` |
| Journey tab | `radio-button-on-outline` |
| Back button | `chevron-back` |
| Streak | 🔥 emoji |
| Session | ⏱ emoji |

---

*Attune · Design System · v1.0*
