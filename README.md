# Game of Life

A dynamic and interactive implementation of Conway’s Game of Life using p5.js. This cellular automaton simulates the evolution of cell populations based on simple rules, demonstrating emergent complexity from basic principles.

[![Run on p5.js](https://img.shields.io/badge/Try%20Live%20Demo-p5.js-blue?style=for-the-badge)](https://editor.p5js.org/Usman_Ali/full/NeIYpD-Uf)

## 🔍 Features

- **Classic Conway’s Rules**:
  - Cells live, die, or are born based on neighbor counts.
- **Interactive Drawing**:
  - Add or erase cells using mouse clicks while paused.
  - Adjustable brush size for painting multiple cells.
- **Simulation Controls**:
  - Pause and resume the simulation with spacebar.
  - Toggle between draw and erase mode with ‘E’.
  - Increase/decrease simulation speed with '+' and '-'.
- **Visual Feedback**:
  - Current generation count displayed.
  - Display of mode (brush or eraser), brush size, speed, and simulation status.
- **Responsive Grid**:
  - Automatically adapts grid size based on window dimensions and cell scale.

## 🕹️ Interactivity

- **Mouse Controls**:
  - Click and drag on the grid to add cells when in draw mode.
  - Click and drag to erase cells when in erase mode.
- **Keyboard Controls**:
  - `Spacebar`: Toggle pause and resume simulation.
  - `E`: Switch between draw and erase modes.
  - `+` / `-`: Increase or decrease simulation speed (frames per second).
- **Mouse Wheel**:
  - Scroll up/down to increase or decrease brush size (affects how many cells are drawn/erased at once).

## 📁 File Structure

- `sketch.js` – Main p5.js sketch handling setup, drawing, simulation logic, and user interaction.
- Functions for:
  - Creating and updating the grid.
  - Counting neighbors for each cell.
  - Handling input and modifying cells.
  - Displaying status and information overlays.

## 🚀 Getting Started

### Prerequisites
- A modern web browser

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/UsmanAli404/Game-of-Life.git
   cd Game-of-Life
