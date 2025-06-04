# BUBBLE COOP - DESIGN DOCUMENT

## Game Concept
"Bubble Coop" is a side-scrolling beat 'em up game where the main character, Coop, uses a bubble gun to capture enemies. Players can toggle between "capture mode" and "destroy mode" to either collect enemies or immediately destroy them for resources. 

In capture mode, enemies are stored in the player's inventory (initially limited to 1 slot, expandable up to 50 with upgrades). When the inventory reaches maximum capacity, the game automatically switches to destroy mode until space is freed up. Players can manually discard captured enemies from their inventory to make room for new captures.

Captured enemies can either be converted into followers or destroyed to collect XP and currency. These resources are used to level up Coop, expand inventory capacity, and enhance any followers acquired through bubble conversion.

## Core Mechanics

### Movement & Controls

#### PC Controls
- **Left/Right Arrow Keys:** Move Coop horizontally
- **Up/Down Arrow Keys:** Move Coop vertically (limited range)
- **Z Key:** Fire bubble gun
- **X Key:** Convert captured enemy to follower
- **C Key:** Destroy captured enemy for resources
- **P Key:** Pause game

#### Mobile Controls
- **Left/Right Virtual Buttons:** Move Coop horizontally
- **Up/Down Virtual Buttons:** Move Coop vertically (limited range)
- **Bubble Button:** Fire bubble gun
- **Convert Button:** Convert captured enemy to follower
- **Destroy Button:** Destroy captured enemy for resources
- **Pause Button:** Pause game

#### Alternative Mobile Controls
- **Swipe Left/Right:** Move Coop horizontally
- **Swipe Up/Down:** Move Coop vertically (limited range)
- **Tap Screen:** Fire bubble gun
- **Hold on Bubbled Enemy + Swipe Up:** Convert to follower
- **Hold on Bubbled Enemy + Swipe Down:** Destroy for resources

### Bubble Gun Mechanics
- Fires bubbles that can capture enemies when they make contact
- Captured enemies float in bubbles for a limited time before breaking free
- Players must decide quickly whether to convert or destroy captured enemies

### Conversion System
- **Convert:** Turn enemies into followers who fight alongside Coop
- **Destroy:** Burst the bubble to defeat the enemy and collect XP and currency
- Different enemy types offer different advantages as followers

### Progression System
- **XP:** Used to level up Coop and followers
- **Currency:** Used to upgrade bubble gun, abilities, and follower capacity
- **Enemy Inventory:** Initially limited to 1 captured enemy, expands with level progression up to 50 slots
- **Capture/Destroy Mode:** Toggle between capturing enemies (storing in inventory) or destroying them for immediate resources
- Leveling up unlocks new abilities, increases stats, and expands inventory capacity

#### Coop's Leveling Benefits
| **Level** | **Stat Improvements** | **New Abilities**  | **Bubble Gun Upgrades**                       | **Inventory Expansion** |
|:-------:|:---------------------|:-----------------|:---------------------------------------------|:-----------------------|
| 1       | Base Stats           | Basic Jump/Attack  | Standard bubbles                             | 1 enemy slot            |
| 2       | +10% Health          | Double Jump       | Faster bubble firing rate                    | +4 slots (5 total)      |
| 3       | +15% Speed           | Slide Move        | Larger bubbles (can capture bigger enemies)  | +5 slots (10 total)     |
| 4       | +10% Health          | Dodge Roll        | Multi-bubble shot (2 bubbles at once)        | +5 slots (15 total)     |
| 5       | +20% Attack Power    | Ground Pound      | Explosive bubbles (area damage on pop)       | +5 slots (20 total)     |
| 6       | +15% Health          | Wall Jump         | Homing bubbles (slight tracking capability)  | +5 slots (25 total)     |
| 7       | +20% Speed           | Air Dash          | Bubble shield (temporary defensive barrier)  | +5 slots (30 total)     |
| 8       | +15% Attack Power    | Counter Move      | Elemental bubbles (fire, ice, electric)      | +5 slots (35 total)     |
| 9       | +20% Health          | Combo Finisher    | Chain bubbles (connect multiple enemies)     | +5 slots (40 total)     |
| 10      | +25% All Stats       | Super Mode        | Mega bubble (captures multiple enemies)      | +10 slots (50 total)    |

#### Follower Leveling Benefits

All followers gain these general improvements when leveling up:
- +10% Health per level
- +5% Attack Power per level
- +5% Speed per level
- Increased AI responsiveness

Additionally, each follower type gains unique benefits:

**Scrubbers:**
| **Level** | **Unique Benefits** |
|:-------:|:------------------------------------------------|
| 2       | Quick Attack: Can perform rapid strikes           |
| 3       | Scavenger: Occasionally finds extra currency      |
| 4       | Swarm Tactics: Coordinates attacks with other Scrubbers |
| 5       | Evolution: Transforms into an Elite Scrubber with doubled stats |

**Tankers:**
| **Level** | **Unique Benefits** |
|:-------:|:------------------------------------------------|
| 2       | Damage Reduction: Takes 15% less damage          |
| 3       | Taunt: Can draw enemy attention away from Coop   |
| 4       | Shield Bash: Stuns enemies briefly              |
| 5       | Evolution: Transforms into an Elite Tanker with area-of-effect protection |

**Zippers:**
| **Level** | **Unique Benefits** |
|:-------:|:------------------------------------------------|
| 2       | Scout: Reveals hidden items on the level         |
| 3       | Distraction: Confuses enemies temporarily       |
| 4       | Blitz Attack: Performs charging attacks through multiple enemies |
| 5       | Evolution: Transforms into an Elite Zipper with teleportation abilities |

**Boss Converts:**
| **Level** | **Unique Benefits** |
|:-------:|:------------------------------------------------|
| 2       | Signature Move: Can use their boss special attack (limited) |
| 3       | Command Aura: Boosts other followers' effectiveness |
| 4       | Ultimate Ability: Powerful screen-wide attack (long cooldown) |
| 5       | Evolution: Transforms into their Ultimate Form with a new appearance and abilities |

## Characters

### Coop (Protagonist)
- Young scientist who invented the bubble conversion technology
- Starting stats: Medium speed, low attack power, medium health
- Special ability: Can modify bubble properties as he levels up

### Enemy Types
1. **Scrubbers:** Basic enemies with low health and attack power
   - As followers: Provide minor attack support
   - When destroyed: Small XP and currency gain
   
2. **Tankers:** Heavy enemies with high health and slow movement
   - As followers: Provide defensive capabilities
   - When destroyed: Medium XP and high currency gain
   
3. **Zippers:** Fast enemies with quick attacks
   - As followers: Increase overall movement speed
   - When destroyed: High XP and low currency gain
   
4. **Bosses:** Unique enemies with special abilities
   - As followers: Provide powerful special abilities
   - When destroyed: Massive XP and currency gain

## Level Design
- Side-scrolling environments with multiple platforms
- 5 distinct levels with increasing difficulty
- Each level culminates in a boss battle
- Environmental hazards and obstacles that require strategic navigation

## Visual Style
- Colorful, cartoony art style
- Vibrant bubble effects with transparency
- Smooth animations for bubble captures and conversions
- Distinct visual indicators for enemy states (free, captured, converted)

## Responsive Design
- **Dynamic Layout:** Automatically adjusts to different screen sizes
- **PC Layout:** HUD elements positioned at top and bottom of screen
- **Mobile Layout:** Simplified HUD, touch controls at bottom of screen
- **Orientation Support:** Optimized for landscape mode, but supports portrait with adjusted layout
- **Scaling:** Game elements scale based on device resolution while maintaining gameplay balance
- **Touch Targets:** Large, accessible buttons for mobile interactions (min 44×44 pixels)
- **Performance Optimization:** Reduced effects and simpler animations on lower-end devices

## Audio Design
- Upbeat, quirky background music
- Satisfying "pop" sounds for bubble interactions
- Unique sound effects for conversion and destruction
- Character-specific voice effects

## Technical Implementation
- Single HTML file containing all game code (HTML, CSS, JavaScript)
- Canvas-based rendering for smooth animations
- Sprite-based character animations
- Collision detection system for bubble-enemy interactions
- Simple physics for bubble floating and enemy movement

## Farcade Integration

### SDK Integration
- Load the Farcade SDK via CDN:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@farcade/game-sdk@latest/dist/index.min.js"></script>
  ```

### Required SDK Events
- **Game Ready:**
  ```javascript
  // When the game is fully loaded and ready to play
  window.FarcadeSDK.singlePlayer.actions.ready();
  ```

- **Game Over:**
  ```javascript
  // When the player loses or completes the game
  window.FarcadeSDK.singlePlayer.actions.gameOver({ score: scoreValue });
  ```

- **Haptic Feedback:**
  ```javascript
  // For important game events (bubble captures, conversions, etc.)
  window.FarcadeSDK.singlePlayer.actions.hapticFeedback();
  ```

### Event Listeners
- **Play Again:**
  ```javascript
  window.FarcadeSDK.on('play_again', () => {
    // Reset the game state here
    resetGame(); // or equivalent function
  });
  ```

- **Toggle Mute:**
  ```javascript
  window.FarcadeSDK.on('toggle_mute', (data) => {
    // Set game audio based on data.isMuted
    setMuted(data.isMuted); // or equivalent function
  });
  ```

### Implementation Guidelines
- Call the ready event when game assets are loaded and gameplay can begin
- Call gameOver when player dies or completes a level
- Trigger haptic feedback for key gameplay moments:
  - Capturing enemies in bubbles
  - Converting or destroying enemies
  - Taking damage
  - Collecting power-ups
  - Level completion

## Progression Curve
- Level 1: Introduction to basic mechanics
- Level 2: Introduction to enemy variety
- Level 3: More complex level design with hazards
- Level 4: Challenging enemy combinations
- Level 5: Final boss with complex patterns requiring strategic use of followers

## Future Expansion Possibilities
- Additional enemy types
- New levels and environments
- Special power-ups and bubble modifications
- Multiplayer capabilities
