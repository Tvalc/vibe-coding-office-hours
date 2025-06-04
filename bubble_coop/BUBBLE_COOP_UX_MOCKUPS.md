# BUBBLE COOP - UX MOCKUPS

## Main Game Screen Layout

```
+--------------------------------------------------+
|                                                  |
| LEVEL: 1-1       SCORE: 00000       BUBBLES: 05 |
+--------------------------------------------------+
|                                                  |
|                                                  |
|                                                  |
|    [Platform]                                    |
|                                                  |
|              [Coop]      [Enemy]                 |
|  [Follower]  /🧪\        /👾\                   |
|              ‾‾‾‾        ‾‾‾‾                    |
|                                                  |
| [Platform]                     [Platform]        |
|                                                  |
|                                                  |
+--------------------------------------------------+
| HEALTH: [########--]    CURRENCY: 💰 125        |
| XP: [#####-----]        FOLLOWERS: 1/3          |
+--------------------------------------------------+
```

## HUD Elements

### Top Bar
- **Level Indicator:** Shows current level and section
- **Score:** Running total of points earned
- **Bubble Counter:** Available bubble ammo

### Bottom Bar
- **Health Bar:** Visual representation of Coop's current health
- **XP Bar:** Progress toward next level
- **Currency:** Amount of currency collected
- **Follower Counter:** Current/maximum followers

## Character States

### Coop
```
  Normal         Shooting       Taking Damage
   /🧪\           /🧪\           /🧪\
   ‾‾‾‾           ‾‾O→          ‾\\‾‾
```

### Enemies
```
  Normal         Bubbled        Converting     Follower
   /👾\          (👾)            (👾→🤖)        /🤖\
   ‾‾‾‾          ‾‾‾‾            ‾‾‾‾           ‾‾‾‾
```

## Main Menu Flow
```
+-------------------------+
|                         |
|      BUBBLE COOP        |
|                         |
| +---------------------+ |
| |      PLAY GAME      | |
| +---------------------+ |
|                         |
| +---------------------+ |
| |      TUTORIAL       | |
| +---------------------+ |
|                         |
| +---------------------+ |
| |      CONTROLS       | |
| +---------------------+ |
|                         |
| +---------------------+ |
| |       CREDITS       | |
| +---------------------+ |
|                         |
+-------------------------+
```

## Game Interactions

### Bubble Capture Sequence
```
1. [Coop] --fires bubble--> [Enemy]
2. [Enemy] --gets captured--> [(Enemy)]
3. Player chooses:
   a. Convert: [(Enemy)] --transform--> [Follower]
   b. Destroy: [(Enemy)] --pop--> [XP/Currency particles]
```

### Level Completion Screen
```
+--------------------------------------------------+
|                                                  |
|               LEVEL COMPLETE!                    |
|                                                  |
|     Enemies Captured: 12                         |
|     Followers Gained: 3                          |
|     Currency Earned: 250                         |
|     XP Earned: 320                              |
|                                                  |
|  +------------------+    +------------------+    |
|  |   CONTINUE       |    |   UPGRADE SHOP   |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

## Upgrade Shop Interface
```
+--------------------------------------------------+
|                                                  |
|               UPGRADE SHOP                       |
|                                                  |
|  +-------------------+                           |
|  | BUBBLE CAPACITY   |  COST: 100 💰             |
|  | [##--------]      |  LEVEL: 2/10              |
|  +-------------------+                           |
|                                                  |
|  +-------------------+                           |
|  | BUBBLE STRENGTH   |  COST: 150 💰             |
|  | [###-------]      |  LEVEL: 3/10              |
|  +-------------------+                           |
|                                                  |
|  +-------------------+                           |
|  | FOLLOWER CAPACITY |  COST: 200 💰             |
|  | [#---------]      |  LEVEL: 1/10              |
|  +-------------------+                           |
|                                                  |
|  Currency: 250 💰                                |
|                                                  |
|  +----------------+    +----------------+        |
|  |     UPGRADE    |    |     RETURN     |        |
|  +----------------+    +----------------+        |
|                                                  |
+--------------------------------------------------+
```

## Game Over Screen
```
+--------------------------------------------------+
|                                                  |
|                  GAME OVER                       |
|                                                  |
|               Final Score: 12540                 |
|               Levels Completed: 3                |
|               Followers Converted: 8             |
|                                                  |
|  +------------------+    +------------------+    |
|  |    TRY AGAIN     |    |    MAIN MENU     |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

## Responsive Design Considerations

For mobile or smaller screens, the game layout will adjust:
- Controls will appear as touch buttons at the bottom
- HUD elements will be minimized or hidden when not in focus
- Menu elements will stack vertically instead of side-by-side

```
+---------------------------+
| LEVEL: 1-1    HEALTH: 80% |
+---------------------------+
|                           |
|                           |
|        [Game Area]        |
|                           |
|                           |
+---------------------------+
| [←] [→] [BUBBLE] [ACTION] |
+---------------------------+
```

## Tutorial Screens

### Tutorial Welcome Screen
```
+--------------------------------------------------+
|                                                  |
|             WELCOME TO BUBBLE COOP!              |
|                                                  |
|  Learn the basics in this quick tutorial         |
|  to start capturing and converting enemies!      |
|                                                  |
|  [Character image of Coop with bubble gun]       |
|                                                  |
|  +------------------+    +------------------+    |
|  |      START       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 1: Movement
```
+--------------------------------------------------+
|                                                  |
|                   MOVEMENT                       |
|                                                  |
|  [Animated gif showing movement]                 |
|                                                  |
|  PC: Use Arrow Keys or WASD to move              |
|  Mobile: Use Left/Right buttons or swipe         |
|                                                  |
|  Try moving left and right to continue           |
|                                                  |
|  +------------------+    +------------------+    |
|  |       NEXT       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 2: Jumping
```
+--------------------------------------------------+
|                                                  |
|                   JUMPING                        |
|                                                  |
|  [Animated gif showing jumping]                  |
|                                                  |
|  PC: Press SPACE to jump                         |
|  Mobile: Tap JUMP button or swipe up             |
|                                                  |
|  Try jumping to continue                         |
|                                                  |
|  +------------------+    +------------------+    |
|  |       NEXT       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 3: Shooting Bubbles
```
+--------------------------------------------------+
|                                                  |
|              SHOOTING BUBBLES                    |
|                                                  |
|  [Animated gif showing bubble shooting]          |
|                                                  |
|  PC: Press Z to fire bubbles                     |
|  Mobile: Tap BUBBLE button or tap screen         |
|                                                  |
|  Try shooting a bubble to continue               |
|                                                  |
|  +------------------+    +------------------+    |
|  |       NEXT       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 4: Capturing Enemies
```
+--------------------------------------------------+
|                                                  |
|             CAPTURING ENEMIES                    |
|                                                  |
|  [Animated gif showing enemy capture]            |
|                                                  |
|  Shoot bubbles at enemies to capture them        |
|  Captured enemies will float in bubbles          |
|  Act quickly before they break free!             |
|                                                  |
|  Try capturing an enemy to continue              |
|                                                  |
|  +------------------+    +------------------+    |
|  |       NEXT       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 5: Converting vs Destroying
```
+--------------------------------------------------+
|                                                  |
|           CONVERT OR DESTROY?                    |
|                                                  |
|  [Animated gif showing both options]             |
|                                                  |
|  CONVERT (X key/Convert button):                 |
|  Turn enemies into followers who fight for you   |
|                                                  |
|  DESTROY (C key/Destroy button):                 |
|  Burst bubbles to earn XP and currency           |
|                                                  |
|  Try both options to continue                    |
|                                                  |
|  +------------------+    +------------------+    |
|  |       NEXT       |    |       SKIP       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Tutorial Step 6: Advanced Moves
```
+--------------------------------------------------+
|                                                  |
|             ADVANCED MOVES                       |
|                                                  |
|  [Animated gif showing special moves]            |
|                                                  |
|  As you level up, you'll unlock special moves:   |
|  • Double Jump                                   |
|  • Slide Move                                    |
|  • Dodge Roll                                    |
|  • And many more!                                |
|                                                  |
|  +------------------+    +------------------+    |
|  |     COMPLETE     |    |   VIEW CONTROLS   |   |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

## Help Screens

### PC Controls Help Screen
```
+--------------------------------------------------+
|                                                  |
|                 PC CONTROLS                      |
|                                                  |
|  MOVEMENT:                                       |
|  • Arrow Keys / WASD: Move Coop                  |
|  • Space / W / Up: Jump                          |
|                                                  |
|  ACTIONS:                                        |
|  • Z: Fire Bubble Gun                            |
|  • X: Convert Captured Enemy                     |
|  • C: Destroy Captured Enemy                     |
|  • V: Activate Super Mode (when meter is full)   |
|                                                  |
|  SPECIAL MOVES:                                  |
|  • Double Jump: Press Space while in air         |
|  • Slide: Down + Right while running             |
|  • Dodge: Double-tap direction + Jump            |
|  • More moves unlock as you level up!            |
|                                                  |
|  +------------------+    +------------------+    |
|  |  MOBILE CONTROLS  |    |     BACK        |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### Mobile Controls Help Screen
```
+--------------------------------------------------+
|                                                  |
|               MOBILE CONTROLS                    |
|                                                  |
|  TOUCH CONTROLS:                                 |
|  • Left/Right Buttons: Move Coop                 |
|  • Jump Button: Jump                             |
|  • Bubble Button: Fire Bubble Gun                |
|  • Convert Button: Convert Enemy                 |
|  • Destroy Button: Destroy Enemy                 |
|                                                  |
|  GESTURE CONTROLS:                               |
|  • Swipe Left/Right: Move                        |
|  • Swipe Up: Jump                                |
|  • Tap Screen: Fire Bubble                       |
|  • Hold + Swipe Up on Bubble: Convert            |
|  • Hold + Swipe Down on Bubble: Destroy          |
|                                                  |
|  +------------------+    +------------------+    |
|  |   PC CONTROLS    |    |       BACK       |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

### In-Game Quick Help (Accessible via Pause Menu)
```
+--------------------------------------------------+
|                                                  |
|                 QUICK HELP                       |
|                                                  |
|  [Character icons showing basic actions]         |
|                                                  |
|  BASIC CONTROLS:                                 |
|  • Move: Arrow Keys / Touch Buttons              |
|  • Jump: Space / Jump Button                     |
|  • Shoot: Z / Bubble Button                      |
|  • Convert: X / Convert Button                   |
|  • Destroy: C / Destroy Button                   |
|                                                  |
|  +------------------+    +------------------+    |
|  |  DETAILED HELP   |    |      RESUME      |    |
|  +------------------+    +------------------+    |
|                                                  |
+--------------------------------------------------+
```

## Animation Keyframes

### Bubble Capture
```
Frame 1: Bubble fired      ○→
Frame 2: Contact with enemy (👾
Frame 3: Encapsulation     (👾)
Frame 4: Floating          (👾)↑
```

### Conversion
```
Frame 1: Selection         (👾)✓
Frame 2: Transformation    (🔄)
Frame 3: Completion        /🤖\
Frame 4: Follower active   /🤖\→
```
