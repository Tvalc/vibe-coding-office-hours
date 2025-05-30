# Infinite Single-Player Pong: Design Document

## 1. High-Level Game Design Overview

**Game Concept:**  
A single-player Pong variant where the player faces an AI opponent. Each level introduces new twists—powerups, obstacles, ball behaviors, and arena layouts. Levels are procedurally generated for infinite variety.

**Core Loop:**  
- Player vs. AI, first to 10 points wins the level.
- On win, advance to a new, more challenging or surprising level.
- Game continues infinitely, tracking high score (levels cleared).

---

## 2. Key Features & Level Variations

### Powerups (Examples)
- **Paddle Grow/Shrink:** Temporarily enlarge or shrink the player or AI paddle.
- **Multi-ball:** Spawn additional balls for a short period.
- **Speed Up/Slow Down:** Temporarily change ball or paddle speed.
- **Magnet Paddle:** Ball curves toward the player’s paddle for a few seconds.
- **Reverse Controls:** Player controls are inverted for a brief time.

### Obstacles & Arena Changes
- **Moving Walls:** Vertical or horizontal blocks that move and deflect the ball.
- **Portals:** Ball entering one portal exits at another location.
- **Bumpers:** Pinball-style bumpers bounce the ball unpredictably.
- **Split Arena:** A wall divides the playfield, with gaps for the ball to pass through.
- **Gravity Wells:** Areas that curve the ball’s path.

### Ball & Scoring Variations
- **Random Ball Trajectories:** Ball may curve or change speed mid-flight.
- **Score Multipliers:** Hit certain targets for extra points.
- **Timed Levels:** Beat the AI within a time limit for bonus rewards.

---

## 3. Core Architecture

### Main Modules

- **Game Engine:**  
  Handles game loop, physics, collision detection, and rendering.

- **Level Generator:**  
  Procedurally creates new level layouts, powerup schedules, and obstacle placements.

- **AI Controller:**  
  Controls the opponent paddle. Can be made more “human” by adding reaction delays or errors.

- **Powerup System:**  
  Manages spawning, activation, and expiration of powerups.

- **Obstacle System:**  
  Handles placement and movement of obstacles, and their collision logic.

- **UI/UX & Overlay System:**  
  Manages all screens and overlays: Start Screen, Pause Menu, Game Over, Instructions, Credits, and persistent display of score/high score. Handles modal/overlay navigation and integrates with game, cut scenes, and input. 
  - Pause is triggered by keyboard key (e.g., 'P' or 'Esc') on PC, or by tapping the center of the screen on mobile—there is no visible pause button.
  - Mobile controls are tap-based (e.g., tap left/right side to move paddle), not on-screen buttons.

- **Progression/Scoring:**  
  Tracks levels cleared, high score, and unlocks.

- **Cut Scene System:**  
  Presents story cut scenes between levels as a series of illustrations with dialogue/captions, similar to SNES RPGs. Handles sequencing, timing, and transitions.

---

## 3a. Input Handling (PC & Mobile)

- **PC/Desktop:**
  - Move paddle: Arrow keys or A/D.
  - Pause: Press 'P' or 'Esc'.
- **Mobile:**
  - Move paddle: Tap left or right half of the screen to move paddle in that direction.
  - Pause: Tap the center of the screen.
- No visible on-screen controls for mobile; all controls are gesture-based for a clean UI.

---

## 4. Example Level Generation Algorithm

1. **Choose Level Theme:**  
   Randomly select a set of features (e.g., “Bumpers + Multi-ball”, “Portals + Gravity Well”, etc.).
2. **Place Obstacles:**  
   Randomly (but fairly) place obstacles so both sides have a chance.
3. **Schedule Powerups:**  
   Decide which powerups will appear and when.
4. **Adjust AI Difficulty:**  
   Increase AI skill, reaction speed, or unpredictability as levels progress.
5. **Tweak Ball/Physics:**  
   Modify ball speed, paddle size, or arena shape for variety.

---

## 5. Example Data Structures (Pseudocode)

```python
class LevelConfig:
    powerups: List[PowerupType]
    obstacles: List[Obstacle]
    ai_difficulty: float
    ball_behavior: Dict
    arena_layout: Dict

class Powerup:
    type: PowerupType
    duration: float
    active: bool

class Obstacle:
    type: ObstacleType
    position: Tuple[int, int]
    movement_pattern: Optional[Callable]
```

---

## 6. Technical Considerations

- **Physics Engine:** Use simple 2D physics (rectangle/ball collisions, velocity, etc.).
- **Procedural Generation:** Seeded random for reproducibility (optional).
- **Extensibility:** Easy to add new powerups/obstacles by defining new classes and updating the generator.
- **Performance:** Optimize for smooth 60fps gameplay, even with multiple balls/obstacles.
- **Accessibility:** Colorblind-friendly palette, adjustable difficulty.

---

## 7. Cut Scenes Between Levels

**Purpose:**
- To provide narrative, humor, or world-building between levels, enhancing player engagement.

**Format:**
- Each cut scene consists of a sequence of simple illustrations (pixel art or minimalist SVG/canvas drawings) with text captions beneath, mimicking SNES RPG dialog scenes.
- The player advances through each scene by clicking or pressing a key.

**Technical Constraints:**
- All illustrations and logic must be embedded directly in the single HTML file (no external assets).
- Images can be SVG, CSS, or canvas-based pixel art, and text is rendered below each image.
- Cut scene content should be modular and easily extensible.

**Implementation Notes:**
- Create a `CutSceneManager` module to manage the queue and display of scenes.
- Allow easy authoring of new scenes by defining image/text pairs in a data structure.
- Ensure transitions (fade, slide, etc.) are lightweight and performant.

---

## 8. Art & Sound (Optional/Stretch)

- Minimalist, retro-inspired visuals.
- Sound effects for ball hits, powerups, and level transitions.
- Simple background music that changes with level themes.

---

## 8. Example User Story

_As a player, I want each new level to feel surprising and different, so that the game stays fun and challenging forever._
