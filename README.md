# Tetris

> The classic Tetris game built with TypeScript and rendered on an HTML Canvas. Started as a challenge and grew into a full-featured implementation with levels, scoring, and gamepad support.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)

## Features

- Classic Tetris gameplay on a 14x30 HTML Canvas board
- Next piece preview panel
- Levels and progressive speed increase (50ms faster per level)
- Scoring based on the original BPS system (40 / 100 / 300 / 1200 points)
- Keyboard and gamepad support
- Pause and restart at any time
- Unit tests with Vitest

## Controls

| Key | Action |
|---|---|
| Arrow Left / Right | Move piece horizontally |
| Arrow Down | Soft drop |
| Arrow Up | Rotate piece |
| P | Pause / Resume |
| R | Restart |

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Tech Stack

- TypeScript
- HTML Canvas API
- Vite
- Vitest + vitest-canvas-mock
