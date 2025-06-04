# Bubble Coop - Animation Frame Guide

This document provides frame count specifications for each animation required for the Bubble Coop game. These specifications can be used when requesting image generation from ChatGPT or other AI tools.

## Character Animations (Coop)

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Idle stance** | 4 | Subtle breathing animation with occasional blink | 1) Standard pose, 2) Subtle inhale, 3) Exhale, 4) Blink variant |
| **Walking cycle** | 6 | Smooth left to right walking motion | Key steps of a complete walk cycle including contact, passing, and swing phases |
| **Running cycle** | 8 | Energetic run with exaggerated movement | Complete run cycle with mid-air phases and arm pumping |
| **Basic jump** | 5 | Simple vertical jump | 1) Pre-jump crouch, 2) Launch, 3) Peak, 4) Falling, 5) Landing |
| **Double jump** | 7 | Jump with mid-air second activation | First jump (3 frames) + mid-air boost effect + second apex + landing |
| **Landing** | 3 | Soft landing after jump | 1) Contact with ground, 2) Absorption, 3) Recovery stance |
| **Hard landing** | 4 | Impact from greater height | 1) Pre-impact, 2) Impact with ground effect, 3) Deep crouch absorption, 4) Slow recovery |
| **Sliding move** | 4 | Ducking slide | 1) Entry to slide, 2-3) Sliding motion, 4) Exit from slide |
| **Dodge roll** | 6 | Sideways tumble | Complete roll sequence from initiation through full rotation to recovery |
| **Wall jump** | 5 | Push off wall | 1) Wall contact, 2) Compression, 3) Push-off, 4) Mid-air, 5) Recovery |
| **Air dash** | 4 | Mid-air horizontal burst | 1) Wind-up, 2) Dash initiation with effect, 3) Mid-dash blur, 4) Dash completion |
| **Ground pound** | 5 | Downward attack | 1) Wind-up above, 2) Descent, 3) Impact, 4) Ground effect, 5) Recovery |
| **Bubble gun shooting (standard)** | 3 | Basic bubble shot | 1) Pre-fire, 2) Firing with muzzle effect, 3) Recoil/follow through |
| **Bubble gun variants** | 6 | Different upgrade effects | One key frame for each of the 6 major gun upgrades showing their unique effects |
| **Capture mode visual** | 2 | Blue gun effect | 1) Gun in neutral state, 2) Gun with blue capture mode effect active |
| **Destroy mode visual** | 2 | Red gun effect | 1) Gun in neutral state, 2) Gun with red destroy mode effect active |
| **Mode switching transition** | 5 | Color change sequence | Complete transition from blue to red or vice versa with intermediate frames |
| **Inventory full warning** | 3 | Visual alert | 1) Initial flash, 2) Peak warning brightness, 3) Warning with mode transition indicator |
| **Taking damage** | 4 | Hit reaction | 1) Normal pose, 2) Impact, 3) Recoil, 4) Recovery stance |
| **Knocked back** | 5 | Major impact reaction | 1) Initial impact, 2-3) Flying backward, 4) Landing, 5) Prone position |
| **Counter move** | 5 | Defensive reaction | 1) Ready stance, 2) Block position, 3) Energy absorption, 4) Counter activation, 5) Counter release |
| **Combo finisher** | 6 | Special attack sequence | Complete sequence from wind-up through execution to impact and follow-through |
| **Super mode activation** | 5 | Power-up sequence | 1) Starting pose, 2) Energy gathering, 3) Transformation mid-point, 4) Full activation, 5) Powered stance |
| **Super mode deactivation** | 4 | Power-down sequence | 1) Powered state, 2) Initial flicker, 3) Energy dispersal, 4) Return to normal |

## Enemy Animations

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Enemy idle stances** | 4 × 3 types | Basic movement for each enemy type | 4 frames per enemy type (Scrubbers, Tankers, Zippers) showing subtle motion |
| **Enemy movement cycles** | 6 × 3 types | Walking/movement animations | 6 frames per enemy type showing complete movement cycle |
| **Attack preparation** | 3 × 3 types | Telegraph before attack | 3 frames per enemy type showing wind-up animation |
| **Attack execution** | 4 × 3 types | Attack delivery | 4 frames per enemy type showing attack sequence |
| **Enemy hit reaction** | 3 × 3 types | Taking damage | 3 frames per enemy type showing impact reaction |
| **Capture in bubble** | 5 × 3 types | Being trapped | 5 frames showing enemy being encapsulated and struggling |
| **Bubble float/drift** | 4 | Captured enemy movement | 4 frames of gentle floating motion with bubble physics |
| **Breaking free** | 5 | Escape sequence | 5 frames from initial crack to full bubble bursting and enemy escape |
| **Death/destruction** | 5 × 3 types | Defeat animation | 5 frames per enemy type showing defeat sequence |
| **XP/resource drop** | 3 | Resource appearance | 3 frames showing resources appearing from defeated enemy |
| **Type-specific abilities** | 5 × 4 types | Special moves | 5 frames each for Scrubber quick attack, Tanker shield bash, Tanker taunt, and Zipper dash |
| **Boss attacks** | 6 | Boss signature moves | 6 frames showing boss special attack sequence |
| **Boss ultimates** | 8 | Screen-wide ability | 8 frames showing complete ultimate attack with effects |

## Follower Animations

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Follower idle** | 4 × 3 types | Hovering near player | 4 frames per follower type showing subtle hovering motion |
| **Follower movement** | 5 × 3 types | Following player | 5 frames per type showing movement pattern that follows player |
| **Follower attacks** | 5 × 3 types | Basic attack sequence | 5 frames per type showing attack animations |
| **Follower abilities** | 4 × 3 types | Special ability use | 4 frames per type showing special ability activation |
| **Evolution/transformation** | 6 × 3 types | Level 5 upgrade | 6 frames per type showing complete transformation sequence |
| **Follower defeat** | 4 × 3 types | Follower loss | 4 frames per type showing defeat or dismissal animation |

## UI & Feedback Animations

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Inventory opening** | 4 | UI transition | Complete sequence from closed to fully open inventory |
| **Inventory closing** | 3 | UI transition | Sequence from open to closed state |
| **Selection highlight** | 3 | UI feedback | Highlighting sequence for selected inventory item |
| **Enemy discard** | 5 | Inventory action | Complete animation of discarding an enemy |
| **Conversion animation** | 6 | Transformation | Sequence showing enemy converting to follower |
| **Sorting animation** | 4 | UI movement | Showing items rearranging in inventory |
| **Capacity upgrade** | 4 | UI feedback | Visual sequence showing inventory slot increase |
| **Toggle button** | 3 | UI interaction | Button press and mode change animation |
| **Health bar effects** | 4 | UI feedback | Sequences for damage, healing, and critical states |
| **XP gain visualization** | 3 | UI feedback | Animation showing XP being added to player |
| **Level up celebration** | 5 | Major UI feedback | Complete level up sequence with effects |
| **Ability unlock** | 4 | Notification | Animation for new ability notification appearing |
| **Tutorial highlights** | 3 | Guide element | Animation for tutorial element highlighting |
| **Objective completion** | 4 | UI feedback | Sequence showing objective being completed |

## Environmental & Effects

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Bubble pop (standard)** | 4 | Basic effect | Complete pop sequence with debris |
| **Bubble pop (explosive)** | 5 | Enhanced effect | Explosive variant with larger effect radius |
| **Elemental bubbles** | 3 × 3 types | Element effects | 3 frames each for fire, ice, and electric bubble effects |
| **Chain bubble connection** | 4 | Special effect | Animation showing bubbles connecting in chain |
| **Bubble shield** | 5 | Defensive effect | Formation, stable state, and breaking sequences |
| **Hazard animations** | 4 × 3 types | Environmental dangers | 4 frames for 3 different environmental hazards |
| **Interactive highlights** | 3 | Object feedback | Sequence showing interactive object highlight |
| **Platform movement** | 5 | Level element | Animation showing platform complete movement cycle |
| **Background elements** | 6 | Environment | Animation for parallax background elements |
| **Level completion** | 6 | Celebration | Complete celebration sequence with effects |

## Special Abilities & Power-ups

| Animation | Frames | Description | Key Poses |
|-----------|--------|-------------|-----------|
| **Homing bubble** | 5 | Tracking motion | Complete motion sequence showing tracking behavior |
| **Multi-bubble shot** | 3 | Attack pattern | Multiple bubble projection pattern |
| **Mega bubble** | 4 | Special attack | Formation and movement of oversized bubble |
| **Swarm tactics** | 5 | Follower ability | Animation showing Scrubbers coordinating attack |
| **Protection aura** | 4 | Follower ability | Tanker's aura formation and effect |
| **Teleportation** | 6 | Follower ability | Zipper's complete teleport sequence |
| **Command aura** | 4 | Boss follower ability | Animation showing aura affecting other followers |

## Animation Implementation Notes

1. **Frame Rate Guidelines:**
   - Basic movements: 12 fps (83ms per frame)
   - Fast actions: 15 fps (66ms per frame)
   - Very fast/impacts: 24 fps (42ms per frame)

2. **In-between Frames:**
   - The frame counts listed represent key poses
   - For smoother animation, in-between frames can be generated through interpolation
   - Critical animations may require additional hand-crafted frames

3. **Sprite Sheet Organization:**
   - Group related animations in the same sprite sheet
   - Use consistent frame sizes within character types
   - Include frame data in JSON format for easy implementation

4. **Hitbox/Collision Frame Data:**
   - Active frames for attacks should be marked in animation metadata
   - Vulnerability frames during recovery animations should be noted
   - Collision box adjustments needed per animation frame

5. **Animation Transitions:**
   - Plan for smooth transitions between animations
   - Prioritize responsive controls over animation completion
   - Include cancellable frames in longer animations

6. **Mobile Optimization:**
   - Consider simplified animation variants for low-power devices
   - Optimize sprite sheet packing for memory constraints
   - Use texture compression where appropriate
