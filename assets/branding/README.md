# Attune Branding Assets

This folder contains two V1 app icon and splash directions:

- `flame-inside-rings`: the warmer primary candidate
- `twin-circles`: the calmer fallback candidate

Each direction includes:

- `icon-source.svg`: 1024x1024 square source for iOS and general use
- `icon-1024.png`: iOS/App Store icon export
- `icon-preview-512.png`: medium preview export
- `icon-preview-180.png`: small on-device preview export
- `adaptive-background.svg`: Android adaptive icon background source
- `adaptive-background.png`: Android adaptive icon background export
- `adaptive-foreground.svg`: Android adaptive icon foreground source
- `adaptive-foreground.png`: Android adaptive icon foreground export
- `splash-source.svg`: 1290x2796 splash source
- `splash-1290x2796.png`: tall splash export

The root `icon-comparison.png` file places the two 512px icon previews side by side.

Generated PNG exports are derived from these SVG files and can be regenerated with `rsvg-convert`.

Implementation note: the splash SVGs specify Cormorant Garamond and Jost to match the design system. If those fonts are not installed in the local export environment, PNG export tools may render fallback fonts. Once app font assets are added, regenerate or outline the wordmark for final store assets.

## Manual Flame Tweaks

For `flame-inside-rings`, the editable flame geometry is intentionally named the same way in all three source SVGs:

- `#flame-outer`: outer gradient flame path
- `#flame-inner`: inner pale flame path
- `#flame-aura`: soft oval glow behind the flame
- `#flame-mark`: wrapper that positions and scales the paths

The outer and inner `d` path values should stay identical across `icon-source.svg`, `adaptive-foreground.svg`, and `splash-source.svg`; each file uses a different `#flame-mark` transform to scale the same shape for that asset.

After manual SVG edits, regenerate the PNG exports:

```bash
rsvg-convert -w 1024 -h 1024 -o assets/branding/flame-inside-rings/icon-1024.png assets/branding/flame-inside-rings/icon-source.svg
rsvg-convert -w 512 -h 512 -o assets/branding/flame-inside-rings/icon-preview-512.png assets/branding/flame-inside-rings/icon-source.svg
rsvg-convert -w 180 -h 180 -o assets/branding/flame-inside-rings/icon-preview-180.png assets/branding/flame-inside-rings/icon-source.svg
rsvg-convert -w 432 -h 432 -o assets/branding/flame-inside-rings/adaptive-foreground.png assets/branding/flame-inside-rings/adaptive-foreground.svg
rsvg-convert -w 1290 -h 2796 -o assets/branding/flame-inside-rings/splash-1290x2796.png assets/branding/flame-inside-rings/splash-source.svg
magick assets/branding/flame-inside-rings/icon-1024.png -alpha off assets/branding/flame-inside-rings/icon-1024.png
magick assets/branding/twin-circles/icon-preview-512.png assets/branding/flame-inside-rings/icon-preview-512.png +append assets/branding/icon-comparison.png
```
