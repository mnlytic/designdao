# DesignDAO Portfolio

## Tech Stack
- Vanilla HTML/CSS/JS — keine Frameworks
- CSS 3D Transforms für Scroll-basierte Video-Kipp-Effekte
- Deployment: Vercel (auto-deploy via GitHub)

## Projektstruktur
```
index.html      — Single-page, Hero + 3 Video-Sektionen
style.css       — Styles, 3D-Container Setup
script.js       — rAF Lerp-Loop, Scroll-Progress, Rotation
_assets/        — Video-Dateien (.mp4)
```

## Kernmechanik: 3D Video Fold
- Jede Video-Section ist 300vh (Scroll-Raum)
- `position: sticky` auf `.video-sticky` hält Video im Viewport
- Scroll-Progress (0–1) wird über cubic S-Kurve (`t³`) auf Rotation gemappt
- Lerp (Faktor 0.25) smootht die Rotation per rAF
- Opacity: 50% bei vollem Tilt, 100% bei frontal
- `perspective(1500px) rotateX()` + `transform-origin: center center`

## Deployment
- GitHub: github.com/mnlytic/designdao
- Vercel Team: design-dao
- Push auf `main` → auto-deploy

## Dev
```bash
npx serve .
```

## Hinweise
- Cache-Busting: `script.js?v=N` in index.html bei JS-Änderungen hochzählen
- `overflow-x: hidden` auf body wegen 3D-Perspective-Overflow
