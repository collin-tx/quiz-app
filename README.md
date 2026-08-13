# 🧠 Trivia Quest

A slick, dark-themed trivia game built with **pure vanilla JS** — no frameworks, no build step, just open and play.

40 questions spanning four categories: **Philosophy**, **Technology**, **Sports**, and **Pop Culture**. Questions are shuffled every round, so no two games feel the same.

---

## Screenshot

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420" style="border-radius:14px;font-family:-apple-system,Segoe UI,system-ui,sans-serif;">
    <!-- App background -->
    <rect width="640" height="420" fill="#0f1117"/>
    <!-- Subtle purple glow at top -->
    <ellipse cx="320" cy="-30" rx="340" ry="160" fill="rgba(108,99,255,0.1)"/>

    <!-- Card -->
    <rect x="120" y="40" width="400" height="340" rx="20" fill="#1a1d27" stroke="#2e3347" stroke-width="1"/>

    <!-- Logo mark -->
    <rect x="288" y="64" width="64" height="64" rx="14"
          fill="url(#lg1)"/>
    <defs>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6c63ff"/>
        <stop offset="100%" stop-color="#9b59f5"/>
      </linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8eaf2" stop-opacity="1"/>
        <stop offset="100%" stop-color="#a78bfa" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <text x="320" y="106" text-anchor="middle" fill="white" font-size="22" font-weight="800" letter-spacing="-0.5">TQ</text>

    <!-- Title -->
    <text x="320" y="160" text-anchor="middle" fill="#e8eaf2" font-size="28" font-weight="800" letter-spacing="-1">Trivia Quest</text>

    <!-- Subtitle -->
    <text x="320" y="183" text-anchor="middle" fill="#737a9b" font-size="11">40 questions · Philosophy · Technology · Sports · Pop Culture</text>

    <!-- Category pills -->
    <!-- Philosophy -->
    <rect x="145" y="196" width="82" height="22" rx="11" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.3)" stroke-width="1"/>
    <text x="186" y="212" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="600">Philosophy</text>
    <!-- Technology -->
    <rect x="234" y="196" width="80" height="22" rx="11" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.3)" stroke-width="1"/>
    <text x="274" y="212" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="600">Technology</text>
    <!-- Sports -->
    <rect x="321" y="196" width="58" height="22" rx="11" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.3)" stroke-width="1"/>
    <text x="350" y="212" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="600">Sports</text>
    <!-- Pop Culture -->
    <rect x="386" y="196" width="80" height="22" rx="11" fill="rgba(244,114,182,0.15)" stroke="rgba(244,114,182,0.3)" stroke-width="1"/>
    <text x="426" y="212" text-anchor="middle" fill="#f472b6" font-size="10" font-weight="600">Pop Culture</text>

    <!-- Start button -->
    <rect x="220" y="234" width="200" height="46" rx="14" fill="url(#btnGrad)"/>
    <defs>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6c63ff"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <text x="320" y="263" text-anchor="middle" fill="white" font-size="15" font-weight="600">Start Quiz</text>

    <!-- Divider -->
    <line x1="140" y1="308" x2="500" y2="308" stroke="#2e3347" stroke-width="1"/>

    <!-- Quiz screen preview strip -->
    <!-- Question counter + category badge -->
    <text x="148" y="328" fill="#737a9b" font-size="10" font-weight="700">3 / 40</text>
    <rect x="190" y="317" width="100" height="18" rx="9" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.3)" stroke-width="1"/>
    <text x="240" y="330" text-anchor="middle" fill="#38bdf8" font-size="9" font-weight="600">History of Technology</text>
    <!-- Live score -->
    <text x="430" y="328" fill="#22c55e" font-size="10" font-weight="700">✓ 2</text>
    <text x="455" y="328" fill="#2e3347" font-size="10">·</text>
    <text x="465" y="328" fill="#ef4444" font-size="10" font-weight="700">✗ 0</text>

    <!-- Progress bar track -->
    <rect x="140" y="335" width="360" height="4" rx="2" fill="#22263a"/>
    <rect x="140" y="335" width="90" height="4" rx="2" fill="url(#pbGrad)"/>
    <defs>
      <linearGradient id="pbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6c63ff"/>
        <stop offset="100%" stop-color="#a78bfa"/>
      </linearGradient>
    </defs>

    <!-- Question text -->
    <text x="148" y="358" fill="#e8eaf2" font-size="11" font-weight="600">Who is credited with inventing the World Wide Web?</text>

    <!-- Answer buttons (2×2 grid preview) -->
    <rect x="140" y="368" width="168" height="32" rx="8" fill="#22263a" stroke="#6c63ff" stroke-width="2"/>
    <rect x="148" y="376" width="18" height="18" rx="5" fill="#6c63ff"/>
    <text x="157" y="389" text-anchor="middle" fill="white" font-size="9" font-weight="700">A</text>
    <text x="175" y="389" fill="#e8eaf2" font-size="9">Tim Berners-Lee</text>

    <rect x="316" y="368" width="164" height="32" rx="8" fill="#22263a" stroke="#2e3347" stroke-width="1.5"/>
    <rect x="324" y="376" width="18" height="18" rx="5" fill="#2e3347"/>
    <text x="333" y="389" text-anchor="middle" fill="#737a9b" font-size="9" font-weight="700">B</text>
    <text x="350" y="389" fill="#e8eaf2" font-size="9">Bill Gates</text>
  </svg>
</p>

---

## Features

- 🎲 **Shuffled every round** — questions are randomised on each play
- ⚡ **Instant feedback** — correct answers pop in green, wrong ones shake in red
- 📊 **Live score tracker** — running ✓/✗ tally shown throughout the quiz
- 🏆 **Results screen** — animated score ring + per-category breakdown bars
- 📱 **Responsive** — answers collapse to a single column on small screens
- 🚫 **Zero dependencies** — no npm, no bundler, just three files

## Getting Started

Because questions are loaded via `fetch`, you need a local server (not `file://`):

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then open **http://localhost:8080** in your browser.

## Project Structure

```
quiz-app/
├── index.html       # Markup & screen templates
├── style.css        # Dark theme, animations, responsive layout
├── app.js           # All game logic (pure vanilla JS)
└── questions.json   # 40 trivia questions across 4 categories
```

## Categories

| Category | Colour |
|---|---|
| History of Philosophy | 🟣 Purple |
| History of Technology | 🔵 Sky blue |
| History of Sports | 🟢 Green |
| Pop Culture | 🩷 Pink |

## License

MIT
