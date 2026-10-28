# Tic-Tac-Toe

A simple two-player tic-tac-toe game built with Svelte 5 and SvelteKit. Two people take turns on the same screen, and the game tracks the score between rounds.

## Features

- Two players, X and O, taking turns on one device
- Turn indicator
- Win detection, with the winning line highlighted
- Tie detection
- Score tracking for X wins, ties, and O wins
- Result popup after each game, with **New Game** and **Reset Stats** options
- Reset button to clear the board at any time

## Built with

- [Svelte 5](https://svelte.dev) (runes: `$state`)
- [SvelteKit](https://svelte.dev/docs/kit)
- Plain JavaScript, HTML, and CSS

## Running locally

You need [Node.js](https://nodejs.org) installed.

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

To make a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  routes/
    +page.svelte    # the game: state, UI, and styles
  lib/
    ...             # winner-check logic
```

## How it works

The board is an array of 9 squares held in Svelte state. Clicking a square places the current player's mark and switches turns. After each move, the game checks all 8 winning lines (3 rows, 3 columns, 2 diagonals). If one is complete, that player wins. If the board is full with no winner, it's a tie.

## Roadmap

Ideas for future versions:

- [ ] **Play against AI:** a single-player mode with a computer opponent
- [ ] **Online multiplayer:** log in, create a room, and play against another person remotely
- [ ] Game logic written in Rust and compiled to WebAssembly
