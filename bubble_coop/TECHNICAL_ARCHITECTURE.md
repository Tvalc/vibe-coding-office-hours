# BUBBLE COOP - TECHNICAL ARCHITECTURE

## Architecture Overview

The game will be built using a component-based architecture with a clear separation of concerns. This document outlines the core systems and how they interact to create a modular, scalable codebase that can accommodate future expansions.

## Core Systems

### 1. Engine Core

```
+-------------------------------------------+
|              Game Engine                  |
+-------------------------------------------+
| - GameLoop                                |
| - AssetLoader                             |
| - InputManager (PC and Mobile)            |
| - Renderer                                |
| - PhysicsSystem                           |
| - AudioManager                            |
| - FarcadeSDK Integration                  |
+-------------------------------------------+
```

### 2. Entity Component System (ECS)

All game objects will be constructed using an Entity Component System pattern:

```
+-------------------------------------------+
|                Entity                     |
+-------------------------------------------+
|  - Unique ID                              |
|  - Component List                         |
|  - Tags                                   |
+-------------------------------------------+
         |
         | has many
         v
+-------------------------------------------+
|              Component                    |
+-------------------------------------------+
|  - Transform (position, scale, rotation)  |
|  - Renderer (sprite, animation)           |
|  - Collider (hitbox)                      |
|  - Health                                 |
|  - Movement                               |
|  - AI                                     |
|  - BubbleGun                              |
|  - FollowerBehavior                       |
|  - etc.                                   |
+-------------------------------------------+
         |
         | processed by
         v
+-------------------------------------------+
|                System                     |
+-------------------------------------------+
|  - RenderSystem                           |
|  - PhysicsSystem                          |
|  - AISystem                               |
|  - PlayerControlSystem                    |
|  - BubbleSystem                           |
|  - FollowerSystem                         |
|  - etc.                                   |
+-------------------------------------------+
```

## Data-Driven Design

All gameplay elements will be defined in data files that can be loaded at runtime:

### Level Data Structure

```json
{
  "id": "level_1_1",
  "name": "Digital Dawn",
  "background": "arcade_background.png",
  "music": "arcade_theme.mp3",
  "platforms": [
    {"x": 100, "y": 300, "width": 200, "type": "normal"},
    {"x": 400, "y": 250, "width": 150, "type": "moving", "path": [{"x": 400, "y": 250}, {"x": 600, "y": 250}]}
  ],
  "enemies": [
    {"type": "scrubber", "x": 200, "y": 200, "behavior": "patrol"},
    {"type": "tanker", "x": 500, "y": 100, "behavior": "guard"}
  ],
  "items": [
    {"type": "health_pickup", "x": 300, "y": 150},
    {"type": "currency", "x": 450, "y": 200, "amount": 25}
  ],
  "checkpoints": [
    {"x": 100, "y": 100},
    {"x": 800, "y": 100}
  ],
  "boss": {
    "type": "moderator",
    "x": 900,
    "y": 150,
    "phases": 3
  }
}
```

### Enemy Definition Structure

```json
{
  "id": "scrubber",
  "name": "Scrubber",
  "sprites": {
    "idle": "scrubber_idle.png",
    "walk": "scrubber_walk.png",
    "attack": "scrubber_attack.png",
    "captured": "scrubber_captured.png",
    "follower": "scrubber_follower.png"
  },
  "stats": {
    "health": 50,
    "speed": 3,
    "attack": 10
  },
  "abilities": ["basic_attack", "retreat", "group_up"],
  "follower_abilities": ["quick_attack", "scavenger"],
  "ai_behaviors": {
    "patrol": {"range": 200, "speed": 2},
    "chase": {"activation_distance": 150, "speed": 3},
    "attack": {"range": 50, "cooldown": 1}
  },
  "evolution": {
    "level": 5,
    "evolved_type": "elite_scrubber",
    "visual_effect": "scrubber_evolution.png"
  },
  "xp_value": 25,
  "currency_value": 15
}
```

### Ability Definition Structure

```json
{
  "id": "double_jump",
  "name": "Double Jump",
  "description": "Jump again while in mid-air",
  "unlock_level": 2,
  "animation": "double_jump.png",
  "sound_effect": "jump_swoosh.mp3",
  "cooldown": 0,
  "effects": {
    "height_multiplier": 1.5,
    "invincibility_frames": 0
  },
  "controls": {
    "pc": {"key": "SPACE", "condition": "in_air"},
    "mobile": {"gesture": "tap_jump_button", "condition": "in_air"}
  }
}
```

## State Management

The game will use a finite state machine for managing game states:

```
+-------------------------------------------+
|             State Machine                 |
+-------------------------------------------+
| - MainMenu                                |
| - Tutorial                                |
| - Gameplay                                |
| - PauseMenu                               |
| - UpgradeShop                             |
| - GameOver                                |
| - LevelComplete                           |
+-------------------------------------------+
```

Each state will have its own update and render loops, and can transition to other states based on player actions or game events.

## Module System

The game code will be organized into modules that can be loaded and unloaded as needed:

```
/scripts
  /core
    - engine.js
    - input.js
    - renderer.js
    - audio.js
    - farcade.js
  /ecs
    - entity.js
    - component.js
    - system.js
  /components
    - transform.js
    - sprite.js
    - animation.js
    - collider.js
    - health.js
    - movement.js
    - player_controller.js
    - enemy_ai.js
    - bubble_gun.js
    - follower.js
  /systems
    - render_system.js
    - physics_system.js
    - ai_system.js
    - player_system.js
    - bubble_system.js
    - follower_system.js
    - level_system.js
  /states
    - state_machine.js
    - main_menu.js
    - tutorial.js
    - gameplay.js
    - pause_menu.js
    - upgrade_shop.js
    - game_over.js
    - level_complete.js
  /data
    - level_loader.js
    - enemy_factory.js
    - ability_manager.js
    - item_factory.js
  /ui
    - ui_manager.js
    - hud.js
    - menu.js
    - tutorial_ui.js
    - controls_ui.js
  /utils
    - math.js
    - event_bus.js
    - pool.js
    - save_manager.js
```

## Extension Points

The following extension points will be defined to allow for easy addition of new content:

1. **Level Extension**: Add new level JSON files to the levels directory
2. **Enemy Extension**: Add new enemy definitions to the enemies directory
3. **Ability Extension**: Add new ability definitions to the abilities directory
4. **Item Extension**: Add new item definitions to the items directory
5. **Visual Effect Extension**: Add new effects to the effects directory
6. **UI Theme Extension**: Add new themes to the themes directory

## Asset Pipeline

Assets will be organized into categories and loaded dynamically:

```
/assets
  /sprites
    /player
    /enemies
    /followers
    /effects
    /ui
  /backgrounds
  /animations
  /audio
    /music
    /sfx
  /fonts
```

## Save System

The game will use a structured save format to store player progress:

```json
{
  "player": {
    "level": 5,
    "xp": 1250,
    "currency": 780,
    "health": 100,
    "abilities_unlocked": ["double_jump", "slide_move", "dodge_roll"],
    "upgrades": {
      "bubble_capacity": 3,
      "bubble_strength": 2,
      "follower_capacity": 2
    }
  },
  "followers": [
    {"type": "scrubber", "level": 3, "abilities": ["quick_attack", "scavenger"]},
    {"type": "tanker", "level": 2, "abilities": ["damage_reduction"]}
  ],
  "progress": {
    "levels_completed": ["1-1", "1-2", "1-3", "1-4", "1-5", "2-1"],
    "current_level": "2-2",
    "bosses_defeated": ["moderator"],
    "tutorial_completed": true
  },
  "settings": {
    "audio": {"music": 0.7, "sfx": 0.9},
    "controls": {"control_scheme": "default"}
  }
}
```

## Event System

A publish-subscribe event system will allow different parts of the code to communicate without tight coupling:

```javascript
// Publishing an event
EventBus.publish('enemy_captured', { 
  enemyType: 'scrubber', 
  position: {x: 300, y: 200} 
});

// Subscribing to an event
EventBus.subscribe('enemy_captured', (data) => {
  // Handle enemy capture event
  showCaptureEffect(data.position);
  updateHUD();
});
```

## Performance Considerations

1. **Object Pooling**: Reuse objects like bubbles, particles, and projectiles
2. **Sprite Batching**: Combine sprites into batches to minimize draw calls
3. **Level Chunking**: Load level data in chunks based on player position
4. **Asset Preloading**: Preload assets for the current and next level
5. **Adaptive Quality**: Scale visual effects based on device performance

## Scaling Strategy

1. **New Levels**: Add new JSON level definitions
2. **New Enemies**: Add new enemy definition files and sprites
3. **New Abilities**: Add new ability definition files and effects
4. **New Items**: Add new item definition files and sprites
5. **New Game Modes**: Add new game state modules
6. **Cosmetics**: Add new sprite variations with the same hitboxes

## Implementation Phases

1. **Core Engine**: Basic rendering, input, physics
2. **Player Character**: Movement, jumping, basic bubble gun
3. **Enemy System**: Basic enemies, AI behaviors
4. **Bubble System**: Capture, convert, destroy mechanics
5. **Follower System**: Follower behaviors and commands
6. **Level System**: Platforms, hazards, checkpoints
7. **Progression**: XP, currency, upgrades
8. **UI/UX**: Menus, tutorial, HUD
9. **Polish**: Effects, sounds, feedback
10. **Farcade Integration**: SDK events and optimizations

This architecture provides a solid foundation for scaling the game with new content while maintaining code quality and performance.
