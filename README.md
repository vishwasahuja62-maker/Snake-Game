# 🐍 Snake Game

A modern, stylish Snake Game built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no dependencies. Designed with a premium neon-dark aesthetic and packed with gameplay features.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔁 **Reverse Direction Protection** | Prevents instant 180° turns that would cause immediate self-collision |
| ⚡ **Dynamic Speed Scaling** | Game speed increases progressively as your score grows — keeps it challenging! |
| ⏸️ **Pause / Resume** | Press `Space` (or the on-screen ⏸ button) to pause and resume at any time |
| 📱 **Mobile D-Pad Controls** | On-screen directional pad automatically shown on touch devices |
| 👆 **Swipe Controls** | Swipe on the game board for an alternative mobile control method |
| ⌨️ **WASD + Arrow Keys** | Full keyboard support with both Arrow Keys and WASD |
| 🏆 **Persistent High Score** | High score is saved in `localStorage` and persists across sessions |
| 🎨 **Premium Dark Theme** | Neon green snake, glowing red food, purple accent UI with glassmorphism |
| 🐍 **Head Highlighting** | The snake head is visually distinct with a brighter glow |
| ⏱️ **Game Timer** | Tracks elapsed time per session |
| 📊 **Speed Level Indicator** | Shows the current speed level in real-time |

---

## 🎮 How to Play

1. **Open** `index.html` in your browser (or use a local server)
2. Click **▶ Start Game**
3. Use the controls below to guide the snake toward the food
4. Each food eaten increases your score by **10** and slightly increases the speed
5. Avoid hitting the **walls** or **yourself**!

### Controls

| Action | Keyboard | Mobile |
|---|---|---|
| Move Up | `↑` / `W` | D-pad ▲ or swipe up |
| Move Down | `↓` / `S` | D-pad ▼ or swipe down |
| Move Left | `←` / `A` | D-pad ◀ or swipe left |
| Move Right | `→` / `D` | D-pad ▶ or swipe right |
| Pause / Resume | `Space` | D-pad ⏸ button |

---

## 🚀 Getting Started

### Play Locally

No build tools or dependencies required! Just clone and open:

```bash
git clone https://github.com/vishwasahuja62/Snake-Game.git
cd Snake-Game
```

Then open `index.html` in your browser — that's it!

### Using Live Server (recommended for development)

If you have the **Live Server** VS Code extension installed:

1. Right-click `index.html`
2. Select **"Open with Live Server"**

---

## 📂 Project Structure

```
Snake-Game/
├── index.html      # Game markup & layout
├── style.css       # Styling, animations & responsive design
├── script.js       # Game logic, controls & state management
├── README.md       # Documentation (you are here)
└── LICENSE         # License file
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup with accessibility attributes
- **CSS3** — Custom properties, glassmorphism, CSS Grid, animations, responsive media queries
- **JavaScript (ES6+)** — Vanilla JS with no external dependencies
- **Google Fonts** — [Outfit](https://fonts.google.com/specimen/Outfit) for modern typography

---

## 🎯 Game Mechanics

### Speed Scaling

The game starts at **300ms** per tick. Each food increases speed by **15ms**, down to a minimum of **80ms** per tick — meaning the game gets noticeably faster as you progress!

| Food Eaten | Speed (ms/tick) | Speed Level |
|---|---|---|
| 0 | 300 | 1 |
| 5 | 225 | 6 |
| 10 | 150 | 11 |
| 14+ | 80 (max) | 15+ |

### Reverse Direction Protection

If you're moving **right**, pressing **left** is silently ignored. This prevents the classic frustration of accidentally reversing into your own body. The direction change is buffered and applied at the next game tick for consistent behavior.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Ideas for Contributions

- 🧱 Wall-wrap mode (go through walls)
- 🎵 Sound effects
- 🌈 Themes / skins selector
- 📈 Leaderboard with backend
- 🤖 AI autopilot mode

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vishwas Ahuja**

- GitHub: [@vishwasahuja62](https://github.com/vishwasahuja62)

---

<p align="center">
  Made with ❤️ and vanilla JavaScript
</p>
