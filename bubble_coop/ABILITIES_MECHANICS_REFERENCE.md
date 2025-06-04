# BUBBLE COOP - ABILITIES & MECHANICS REFERENCE

## Coop's Abilities

### Movement Abilities

| **Ability**        | **Description**                                   | **PC Controls**                      | **Mobile Controls**                                   | **Effect**                                                               | **Cooldown**                |
|:-----------------|:------------------------------------------------|:-------------------------------------|:---------------------------------------------------|:-------------------------------------------------------------------------|:----------------------------|
| **Double Jump**  | Allows Coop to jump again while in mid-air      | Press Space/W/Up while in air        | Tap Jump again in air or double-tap screen         | +50% additional height compared to regular jump                          | None                        |
| **Slide Move**   | Slides along ground, passing under obstacles     | S/Down + D/Right while running       | Swipe down while moving or Slide button            | Reduces hitbox height by 50%, continues momentum for 1 second            | 3 seconds                   |
| **Dodge Roll**   | Evasive roll with brief invulnerability         | Double-tap direction + Space/W/Up    | Swipe quickly in direction or Dodge button         | 0.5s invulnerability, moves 1.5x regular distance                        | 2 seconds                   |
| **Ground Pound** | Downward attack damaging nearby enemies         | S/Down + Z/Attack while in air       | Swipe down sharply in air or Pound button          | Creates shockwave damaging/stunning enemies within 100px radius          | 5 seconds                   |
| **Wall Jump**    | Jump off walls to reach higher areas            | Space/W/Up while touching wall       | Tap Jump or tap screen while touching wall         | Propels away from wall at 45° angle, 75% height of regular jump          | None                        |
| **Air Dash**     | Quick horizontal burst of speed while airborne  | Double-tap direction key in air      | Swipe quickly in direction in air or Dash button   | Moves 2x distance in chosen direction, no gravity during dash            | 3 seconds                   |
| **Counter Move** | Reflects projectiles and counters melee attacks | C/Block right before impact          | Tap Counter with proper timing or two-finger tap   | Returns projectiles at 1.5x speed, stuns attackers for 1s                | 5 seconds                   |
| **Combo Finisher** | Powerful attack ending a combo sequence       | Z/Attack after 3 consecutive hits    | Auto-activates after 3 shots or Finisher button    | 3x damage of regular attack, small knockback effect                      | Auto-activates after combo  |
| **Super Mode**   | Powered-up state with enhanced abilities        | V/Special when super meter is full   | Tap Super when meter full or hold with two fingers | All stats doubled, unlimited bubbles, auto-converts captured enemies     | 30s duration, charges over time |

### Bubble Gun Upgrades

| **Upgrade**          | **Description**                        | **Effect**                                      | **Implementation Details**                         |
|:---------------------|:--------------------------------------|:------------------------------------------------|:------------------------------------------------|
| **Faster Firing**    | Increases rate of bubble projection    | -30% cooldown between bubble shots               | Reduce firing cooldown from 0.8s to 0.5s          |
| **Larger Bubbles**   | Increases bubble size                  | +50% bubble radius, can capture larger enemies   | Increase collision sphere from 30px to 45px       |
| **Multi-Bubble**     | Fires multiple bubbles at once         | Shoots 2 bubbles in a slight spread pattern     | 15° angle between bubbles, same damage each       |
| **Explosive Bubbles**| Bubbles explode when popped           | Deals damage in 75px radius when destroyed      | 50% of original bubble damage to all in radius     |
| **Homing Bubbles**   | Bubbles track toward nearby enemies    | Slight homing effect toward closest enemy        | 30° maximum turn angle, 500px detection radius    |
| **Bubble Shield**    | Creates protective bubble around Coop  | Absorbs up to 3 hits before popping             | 10 second duration, 30 second cooldown           |
| **Elemental Bubbles**| Adds elemental effects to bubbles      | Random element effect (fire, ice, electric)     | Fire: DoT, Ice: Slow, Electric: Chain damage     |
| **Chain Bubbles**    | Bubbles can link captured enemies      | Connects up to 3 enemies in bubbles             | Connected enemies share same fate (convert/destroy)|
| **Mega Bubble**      | Creates enormous bubble                | Captures multiple enemies in single shot         | 3x normal size, can capture up to 3 enemies       |

## Enemy Abilities

### Base Enemy Types

#### Scrubbers
| **Ability**       | **Description**                  | **Trigger**                      | **Effect**                                 |
|:------------------|:--------------------------------|:--------------------------------|:----------------------------------------|
| **Basic Attack**  | Simple melee strike              | When within 50px of player      | Deals 10 damage, 1 second cooldown       |
| **Retreat**       | Back away from player            | When health below 30%           | Moves away at 1.5x speed for 3 seconds   |
| **Group Up**      | Coordinate with other Scrubbers  | When 3+ Scrubbers in proximity  | Attack timing synchronized, +20% damage   |

#### Tankers
| Ability | Description | Trigger | Effect |
|---------|-------------|---------|--------|
| **Heavy Strike** | Slow but powerful attack | When within 75px of player | Deals 25 damage, 3 second cooldown |
| **Stomp** | Area of effect attack | Every 10 seconds | Creates shockwave dealing 15 damage in 100px radius |
| **Charge** | Rush toward player | When player is between 200-400px away | Deals 20 damage on impact, 8 second cooldown |
| **Armor** | Damage reduction | Passive | 25% damage reduction from all sources |

#### Zippers
| Ability | Description | Trigger | Effect |
|---------|-------------|---------|--------|
| **Quick Strike** | Fast attack sequence | When within 60px of player | 3 hits of 5 damage each, 0.2s between hits |
| **Teleport Dodge** | Avoid incoming attacks | When bubble approaches | 80% chance to dodge bubble attacks |
| **Flank** | Circle around to attack from behind | Every 5 seconds | Attempts to position behind player for +30% damage |
| **Speed Burst** | Temporary speed increase | When health below 50% | 2x movement speed for 3 seconds |

#### Bosses
| Ability | Description | Trigger | Effect |
|---------|-------------|---------|--------|
| **Special Attack** | Unique powerful attack | Every 15 seconds | Varies by boss, high damage and special effects |
| **Minion Summon** | Call for reinforcements | When health below 75%, 50%, 25% | Spawns 2-3 basic enemies of matching type |
| **Enrage** | Powered-up state | When health below 30% | +50% attack and speed, new attack patterns |
| **Phase Shift** | Change attack patterns | At 75%, 50%, and 25% health | New attack patterns and abilities for each phase |
| **Bubble Resistance** | Resistance to bubble capture | Passive | Requires 3 bubble hits to capture, breaks free faster |

## Follower Abilities (When Converted)

### Converted Scrubbers
| Ability | Description | AI Behavior | Cooldown |
|---------|-------------|-------------|----------|
| **Quick Attack** | Rapid strikes against enemies | Targets nearest enemy, performs 3-hit combo | 2 seconds |
| **Scavenger** | Find extra resources | 15% chance to generate extra currency when enemy is defeated | Passive |
| **Swarm Tactics** | Coordinate with other Scrubbers | Multiple Scrubber followers attack same target with timing advantage | Passive |
| **Elite Form** | Enhanced version after level 5 | All stats doubled, gains small bubble attack | One-time evolution |

### Converted Tankers
| Ability | Description | AI Behavior | Cooldown |
|---------|-------------|-------------|----------|
| **Damage Reduction** | Take less damage for team | 15% of damage dealt to Coop is redirected to Tanker | Passive |
| **Taunt** | Draw enemy attention | Forces enemies within 200px to target Tanker for 5 seconds | 15 seconds |
| **Shield Bash** | Stun enemies | Charges toward group of enemies, stunning them for 2 seconds | 10 seconds |
| **Elite Form** | Enhanced version after level 5 | Creates protective aura reducing damage by 25% for all allies within 150px | One-time evolution |

### Converted Zippers
| Ability | Description | AI Behavior | Cooldown |
|---------|-------------|-------------|----------|
| **Scout** | Reveal hidden items | Automatically moves toward and reveals hidden pickups | Passive |
| **Distraction** | Confuse enemies | Dashes around target enemy, reducing its accuracy by 50% | 8 seconds |
| **Blitz Attack** | Line attack through enemies | Charges through multiple enemies dealing damage to all in path | 12 seconds |
| **Elite Form** | Enhanced version after level 5 | Gains teleportation ability to instantly appear next to threatened allies | One-time evolution |

### Converted Bosses
| Ability | Description | AI Behavior | Cooldown |
|---------|-------------|-------------|----------|
| **Signature Move** | Use former boss attack | Uses scaled-down version of main boss attack | 20 seconds |
| **Command Aura** | Boost other followers | +20% attack and speed for all other followers within 200px | Passive |
| **Ultimate Ability** | Screen-wide attack | Powerful attack affecting all enemies on screen, varies by boss type | 45 seconds |
| **Ultimate Form** | Enhanced version after level 5 | Unique transformation with new abilities and appearance | One-time evolution |

## Implementation Guidelines

### Animation Requirements
- Each ability needs unique animation states
- Visual effects should clearly communicate ability activation and effect
- Hit indicators and damage numbers for feedback
- Color-coding for different ability types (movement: blue, attack: red, special: yellow)

### Sound Design
- Distinct sound effects for each ability
- Volume and pitch variation based on ability power
- Stereo positioning based on where ability is used
- Success/failure audio cues for timed abilities

### Ability Balancing
- Cooldowns prevent ability spamming
- Resource costs (bubble energy) for more powerful abilities
- Risk/reward tradeoffs (e.g., counter move requires precise timing)
- Progression path ensures power curve matches difficulty curve

### Technical Considerations
- Hitbox/hurtbox adjustments during ability animations
- Physics modifications for movement abilities
- Particle effect systems for visual feedback
- State machine for handling ability interruptions and cancellations
- Ability queuing system for responsive controls
