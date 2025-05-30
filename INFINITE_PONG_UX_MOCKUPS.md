# Infinite Single-Player Pong: UX Mockups & Navigation

This document provides text-based mockups for each major screen and overlay in the game, along with navigation notes. Use these to guide implementation and for feedback on the player experience.

---

## 1. Start Screen
```
+-------------------------------------------------+
|           INFINITE PONG: THE QUEST              |
|                                                 |
|                [▶️  START GAME]                 |
|                                                 |
|   High Score: 123                               |
|                                                 |
|   [How to Play]   [Credits]                     |
+-------------------------------------------------+
```
- **Navigation:**  Start Game, How to Play, Credits, High Score display.

---

## 2. Gameplay Screen
```
+-------------------------------------------------+
| Level: 7              Score: 3   High: 123      |
|                                                 |
|        ---                                     |
|      AI Paddle (top)                            |
|                                                 |
|      #   *   [O]   #                            |
|   Obstacle Powerup Ball Obstacle                |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
|        ---                                      |
|     Player Paddle (bottom)                      |
+-------------------------------------------------+
```
- **Input:**
  - PC: Move paddle with Arrow keys or A/D. Pause with 'P' or 'Esc'.
  - Mobile: Tap left/right half of screen to move paddle. Tap center to pause.
- **No visible pause button. No on-screen controls for mobile.**
- **Visual Legend:**
  - [O] = Ball (moves vertically between paddles)
  - --- = Paddle (top: AI, bottom: Player)
  - # = Obstacle (in playfield, can block ball or paddle)
  - * = Powerup (spawns above, falls downward)

---

## 3. Pause Menu (Overlay)
```
+-----------------------------+
|         GAME PAUSED         |
|                             |
|   [▶️ Resume]               |
|   [Restart Level]           |
|   [Main Menu]               |
+-----------------------------+
```
- **Navigation:**  Resume, Restart, Main Menu.

---

## 4. Level Complete (Cut Scene)
```
+-------------------------------------------------+
|   [Illustration: e.g., hero celebrates]         |
|                                                 |
|   "You bested Level 7! The journey continues..."|
|                                                 |
|   [Next Level ▶️]                               |
+-------------------------------------------------+
```
- **Navigation:**  Advance with click/key, proceed to next level.

---

## 5. Game Over Screen
```
+-------------------------------------------------+
|                GAME OVER                        |
|                                                 |
|   Score: 8     High Score: 123                  |
|                                                 |
|   [Restart]   [Main Menu]                       |
+-------------------------------------------------+
```
- **Navigation:**  Restart, Main Menu.

---

## 6. How to Play / Instructions (Modal)
```
+-------------------------------------------------+
|              HOW TO PLAY                        |
|                                                 |
|   - Move paddle: [Arrow Keys] or [A]/[D]        |
|   - Defeat the AI to advance                    |
|   - Each level adds new twists!                 |
|   - Collect powerups, dodge obstacles           |
|                                                 |
|   [Close]                                       |
+-------------------------------------------------+
```

---

## 7. Credits (Modal)
```
+-------------------------------------------------+
|                   CREDITS                       |
|   Code: You & Cascade                           |
|   Art: [Your Name]                              |
|   Music: [Your Name or Source]                  |
|                                                 |
|   [Close]                                       |
+-------------------------------------------------+
```

---

### Navigation Summary
- All overlays can be closed with a button or keyboard (Esc).
- Main menu and game over allow quick restart or return.
- Cut scenes advance with click or key, never block progress.
