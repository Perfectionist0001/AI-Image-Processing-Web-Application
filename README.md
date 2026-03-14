# ✦ PixelAI — AI Image Enhancer

A browser-based image enhancement tool built with vanilla HTML, CSS, and JavaScript. No backend, no uploads, no sign-up — everything runs locally in your browser using the Canvas API.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-7c3aed?style=flat)

---

## Features

- **9 Filter Presets** — Vivid, Cool, Warm, Dramatic, Fade, Noir, Vintage, Neon, Original
- **Manual Adjustments** — Brightness, Contrast, Saturation, Sharpness sliders
- **Before/After Compare Slider** — Drag to compare original vs enhanced
- **100% Private** — Images never leave your device; processed via Canvas API
- **Free Download** — Export enhanced image as high-quality JPEG, no watermarks
- **Dark/Light Theme** — Persistent theme toggle saved to localStorage
- **Drag & Drop Upload** — Drop an image or click to browse (JPG/PNG, max 10MB)
- **Animated Progress Bar** — Visual feedback during enhancement processing
- **Responsive Design** — Works on desktop and mobile

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Main tool — upload, enhance, compare, download |
| `about.html` | Features overview, how it works, tech stack |
| `contact.html` | Feedback/bug report form (demo, no data sent) |

---

## Tech Stack

- **HTML5 Canvas API** — pixel-level image manipulation via `getImageData` / `putImageData`
- **Vanilla JavaScript (ES6+)** — zero dependencies, zero frameworks
- **CSS Custom Properties** — theme variables for dark/light mode
- **IntersectionObserver API** — scroll-triggered animations and counter increments
- **FileReader API** — local file reading without any server

---

## Getting Started

No build tools or dependencies required.

```bash
git clone https://github.com/your-username/pixelai.git
cd pixelai
```

Then open `index.html` in your browser — or serve it with any static file server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

---

## Project Structure

```
pixelai/
├── index.html      # Main enhancer tool
├── about.html      # About page
├── contact.html    # Contact/feedback page
├── styles.css      # All styles (minimal dark theme)
└── script.js       # Theme toggle, scroll reveal, counters, compare slider
```

---

## How the Enhancement Works

1. Image is loaded into an off-screen `<canvas>` element
2. `getImageData()` extracts raw RGBA pixel data
3. Per-pixel math applies brightness, contrast, and saturation adjustments
4. `putImageData()` writes the modified pixels back to the canvas
5. Sharpness is applied via `globalCompositeOperation: overlay`
6. `canvas.toDataURL('image/jpeg', 0.93)` exports the final image

---

## License

MIT — free to use, modify, and distribute.
