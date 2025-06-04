# BUBBLE COOP - DATA SCHEMAS

This document defines the complete data schemas for all game objects, ensuring consistent structure for modular expansion.

## Player Schema

```json
{
  "id": "coop",
  "stats": {
    "baseHealth": 100,
    "baseSpeed": 5,
    "jumpHeight": 10,
    "bubbleCapacity": 3,
    "followerCapacity": 2
  },
  "levels": [
    {
      "level": 1,
      "healthBoost": 0,
      "speedBoost": 0,
      "newAbility": null
    },
    {
      "level": 2,
      "healthBoost": 20,
      "speedBoost": 0.5,
      "newAbility": "double_jump"
    },
    // Levels 3-10 defined similarly
  ],
  "animations": {
    "idle": {"frames": 4, "framerate": 8},
    "run": {"frames": 8, "framerate": 12},
    "jump": {"frames": 3, "framerate": 10},
    "shoot": {"frames": 5, "framerate": 15},
    "dash": {"frames": 4, "framerate": 20}
  },
  "hitbox": {"width": 40, "height": 60, "offsetX": 0, "offsetY": 0},
  "sounds": {
    "jump": "jump.mp3",
    "shoot": "bubble_shoot.mp3",
    "hit": "player_hit.mp3",
    "levelUp": "level_up.mp3"
  }
}
```

## Enemy Schema

```json
{
  "id": "unique_enemy_id",
  "type": "enemy_type",
  "name": "Display Name",
  "category": "scrubber|tanker|zipper|boss",
  "description": "Description for tutorials and help screens",
  "tier": 1,
  "stats": {
    "health": 50,
    "speed": 3,
    "damage": 10,
    "captureResistance": 2,
    "xpValue": 25,
    "currencyValue": 15
  },
  "behaviors": [
    {
      "id": "patrol",
      "parameters": {
        "range": 200,
        "speed": 2,
        "pauseDuration": 1
      }
    },
    {
      "id": "chase",
      "parameters": {
        "activationDistance": 150,
        "speed": 3,
        "maxDuration": 5
      }
    },
    {
      "id": "attack",
      "parameters": {
        "range": 50,
        "cooldown": 1,
        "damageMultiplier": 1
      }
    }
  ],
  "sprites": {
    "idle": "enemies/enemy_id/idle.png",
    "walk": "enemies/enemy_id/walk.png",
    "attack": "enemies/enemy_id/attack.png",
    "captured": "enemies/enemy_id/captured.png",
    "follower": "enemies/enemy_id/follower.png"
  },
  "animations": {
    "idle": {"frames": 4, "framerate": 8},
    "walk": {"frames": 6, "framerate": 10},
    "attack": {"frames": 5, "framerate": 12},
    "captured": {"frames": 3, "framerate": 6},
    "convert": {"frames": 8, "framerate": 15}
  },
  "hitbox": {"width": 50, "height": 50, "offsetX": 0, "offsetY": 0},
  "sounds": {
    "attack": "enemies/enemy_id/attack.mp3",
    "hit": "enemies/enemy_id/hit.mp3",
    "capture": "enemies/enemy_id/capture.mp3",
    "convert": "enemies/enemy_id/convert.mp3"
  },
  "follower": {
    "abilities": [
      {
        "id": "ability_id",
        "unlockLevel": 2,
        "parameters": {
          "cooldown": 5,
          "damage": 15,
          "range": 100
        }
      }
    ],
    "evolution": {
      "level": 5,
      "newType": "elite_enemy_id",
      "statBoosts": {
        "health": 50,
        "speed": 1,
        "damage": 10
      },
      "newAbilities": ["new_ability_id"]
    }
  },
  "drops": [
    {
      "type": "item_id",
      "chance": 0.2,
      "quantity": {"min": 1, "max": 3}
    }
  ]
}
```

## Level Schema

```json
{
  "id": "level_1_1",
  "name": "Digital Dawn - Arcade Chaos",
  "zone": "Digital Dawn",
  "difficulty": 1,
  "timeLimit": 300,
  "width": 3000,
  "height": 720,
  "background": {
    "layers": [
      {
        "image": "backgrounds/arcade_bg_far.png",
        "scrollSpeed": 0.2,
        "repeat": true
      },
      {
        "image": "backgrounds/arcade_bg_mid.png",
        "scrollSpeed": 0.5,
        "repeat": true
      },
      {
        "image": "backgrounds/arcade_bg_near.png",
        "scrollSpeed": 0.8,
        "repeat": true
      }
    ]
  },
  "music": {
    "main": "music/arcade_theme.mp3",
    "boss": "music/boss_battle.mp3",
    "victory": "music/level_complete.mp3"
  },
  "platforms": [
    {
      "type": "static",
      "x": 0,
      "y": 650,
      "width": 500,
      "height": 70,
      "texture": "platforms/arcade_floor.png"
    },
    {
      "type": "moving",
      "x": 600,
      "y": 500,
      "width": 200,
      "height": 40,
      "texture": "platforms/arcade_platform.png",
      "movement": {
        "path": [
          {"x": 600, "y": 500},
          {"x": 800, "y": 500}
        ],
        "speed": 2,
        "looping": true
      }
    },
    {
      "type": "destructible",
      "x": 1000,
      "y": 450,
      "width": 150,
      "height": 30,
      "texture": "platforms/arcade_destructible.png",
      "health": 2
    }
  ],
  "hazards": [
    {
      "type": "spike",
      "x": 700,
      "y": 650,
      "width": 100,
      "height": 20,
      "damage": 10,
      "texture": "hazards/arcade_spikes.png"
    },
    {
      "type": "laser",
      "x": 1200,
      "y": 400,
      "width": 300,
      "height": 10,
      "damage": 15,
      "texture": "hazards/arcade_laser.png",
      "pattern": {
        "onDuration": 2,
        "offDuration": 1,
        "initialState": "off"
      }
    }
  ],
  "enemies": [
    {
      "type": "scrubber",
      "x": 300,
      "y": 600,
      "facing": "left",
      "initialBehavior": "patrol",
      "parameters": {
        "patrolRange": 200
      }
    },
    {
      "type": "tanker",
      "x": 800,
      "y": 450,
      "facing": "right",
      "initialBehavior": "guard",
      "parameters": {
        "guardRadius": 100
      }
    },
    {
      "type": "zipper",
      "x": 1500,
      "y": 400,
      "facing": "left",
      "initialBehavior": "ambush",
      "parameters": {
        "activationDistance": 150
      }
    }
  ],
  "items": [
    {
      "type": "health",
      "x": 400,
      "y": 550,
      "value": 25,
      "texture": "items/health_pickup.png"
    },
    {
      "type": "currency",
      "x": 900,
      "y": 400,
      "value": 15,
      "texture": "items/currency.png"
    },
    {
      "type": "powerup",
      "x": 1300,
      "y": 350,
      "powerupType": "bubble_size",
      "duration": 10,
      "texture": "items/powerup_bubble_size.png"
    }
  ],
  "checkpoints": [
    {
      "x": 0,
      "y": 600,
      "texture": "checkpoints/checkpoint_inactive.png",
      "textureActive": "checkpoints/checkpoint_active.png"
    },
    {
      "x": 1500,
      "y": 350,
      "texture": "checkpoints/checkpoint_inactive.png",
      "textureActive": "checkpoints/checkpoint_active.png"
    }
  ],
  "boss": {
    "type": "moderator",
    "x": 2800,
    "y": 500,
    "parameters": {
      "phases": 3,
      "arenaBoundaries": {"left": 2500, "right": 3000}
    }
  },
  "dialogues": [
    {
      "trigger": "levelStart",
      "character": "coop",
      "text": "Let's bubble up some baddies!",
      "duration": 3
    },
    {
      "trigger": "bossEncounter",
      "character": "moderator",
      "text": "Your account has been flagged for deletion!",
      "duration": 4
    }
  ],
  "objectives": [
    {
      "id": "reach_end",
      "description": "Reach the end of the level",
      "completionType": "position",
      "parameters": {
        "x": 2500
      }
    },
    {
      "id": "defeat_boss",
      "description": "Defeat the Moderator",
      "completionType": "defeatEnemy",
      "parameters": {
        "enemyType": "moderator"
      }
    }
  ],
  "rewards": {
    "xp": 500,
    "currency": 200,
    "items": [
      {
        "type": "upgrade_part",
        "id": "mod_badge",
        "texture": "items/mod_badge.png"
      }
    ]
  }
}
```

## Ability Schema

```json
{
  "id": "ability_id",
  "name": "Display Name",
  "description": "Description for UI and tutorials",
  "type": "active|passive",
  "category": "movement|combat|utility",
  "owner": "player|follower|both",
  "unlockRequirements": {
    "level": 3,
    "currency": 500,
    "previousAbilities": ["prerequisite_ability_id"]
  },
  "effects": [
    {
      "type": "stat_boost",
      "stat": "speed",
      "value": 2,
      "duration": 5
    },
    {
      "type": "damage",
      "value": 15,
      "radius": 100,
      "damageType": "normal"
    }
  ],
  "cooldown": 10,
  "energyCost": 25,
  "animation": {
    "spritesheet": "abilities/ability_id.png",
    "frames": 8,
    "framerate": 15
  },
  "sounds": {
    "activation": "abilities/ability_activation.mp3",
    "effect": "abilities/ability_effect.mp3"
  },
  "particles": {
    "onActivation": "particles/ability_activation.json",
    "during": "particles/ability_during.json",
    "onEnd": "particles/ability_end.json"
  },
  "controls": {
    "pc": {"key": "Q", "modifiers": ["SHIFT"]},
    "mobile": {"type": "button", "position": "bottom-right"}
  },
  "upgrades": [
    {
      "level": 1,
      "name": "Enhanced Ability",
      "description": "Increases damage by 50%",
      "cost": 1000,
      "effects": [
        {
          "type": "damage",
          "multiplier": 1.5
        }
      ]
    },
    {
      "level": 2,
      "name": "Extended Ability",
      "description": "Increases duration by 2 seconds",
      "cost": 2000,
      "effects": [
        {
          "type": "duration",
          "value": 2
        }
      ]
    }
  ],
  "ai": {
    "usageConditions": [
      {
        "type": "health_below",
        "value": 30,
        "priority": 10
      },
      {
        "type": "enemies_nearby",
        "count": 3,
        "range": 150,
        "priority": 8
      }
    ],
    "targetSelection": {
      "type": "closest|weakest|strongest",
      "range": 200
    }
  }
}
```

## Item Schema

```json
{
  "id": "item_id",
  "name": "Display Name",
  "description": "Item description for UI",
  "type": "pickup|collectible|quest|upgrade",
  "rarity": "common|uncommon|rare|epic|legendary",
  "sprite": "items/item_id.png",
  "animation": {
    "idle": {"frames": 4, "framerate": 8},
    "collected": {"frames": 6, "framerate": 12}
  },
  "sounds": {
    "pickup": "items/item_pickup.mp3"
  },
  "effects": [
    {
      "type": "heal",
      "value": 25
    },
    {
      "type": "currency",
      "value": 50
    }
  ],
  "duration": 15,
  "cooldown": 0,
  "stackable": true,
  "maxStack": 5,
  "price": 100,
  "requiredLevel": 3,
  "upgradePath": [
    {
      "level": 1,
      "cost": 500,
      "effects": [{"type": "heal", "value": 35}]
    },
    {
      "level": 2,
      "cost": 1000,
      "effects": [{"type": "heal", "value": 50}]
    }
  ]
}
```

## UI Element Schema

```json
{
  "id": "ui_element_id",
  "type": "button|panel|slider|text|image",
  "position": {
    "x": 20,
    "y": 20,
    "anchor": "top-left|top-right|bottom-left|bottom-right|center"
  },
  "size": {
    "width": 200,
    "height": 50,
    "responsive": true,
    "minWidth": 100,
    "maxWidth": 300
  },
  "appearance": {
    "normal": {
      "background": "ui/button_normal.png",
      "textColor": "#FFFFFF",
      "fontSize": 16,
      "fontFamily": "Arial"
    },
    "hover": {
      "background": "ui/button_hover.png",
      "textColor": "#FFFF00",
      "scale": 1.1
    },
    "pressed": {
      "background": "ui/button_pressed.png",
      "textColor": "#CCCCCC"
    },
    "disabled": {
      "background": "ui/button_disabled.png",
      "textColor": "#888888"
    }
  },
  "content": {
    "text": "Button Text",
    "icon": "ui/icon.png",
    "iconPosition": "left|right|top|bottom"
  },
  "behavior": {
    "onClick": "function_name",
    "onHover": "function_name",
    "onDrag": "function_name"
  },
  "children": [
    // Nested UI elements
  ],
  "animation": {
    "entry": {
      "type": "fade|slide|scale",
      "duration": 0.3,
      "easing": "ease-in-out"
    },
    "exit": {
      "type": "fade|slide|scale",
      "duration": 0.3,
      "easing": "ease-in-out"
    }
  },
  "responsiveRules": [
    {
      "breakpoint": 768,
      "changes": {
        "position": {"x": 10, "y": 10},
        "size": {"width": 150, "height": 40},
        "appearance": {"normal": {"fontSize": 14}}
      }
    }
  ]
}
```

## Progress Schema

```json
{
  "player": {
    "level": 5,
    "xp": 1250,
    "totalXp": 2500,
    "xpToNextLevel": 1250,
    "currency": 780,
    "health": {
      "current": 85,
      "max": 150
    },
    "abilities": [
      {
        "id": "double_jump",
        "level": 2
      },
      {
        "id": "slide_move",
        "level": 1
      }
    ],
    "upgrades": {
      "bubble_capacity": {
        "level": 3,
        "value": 5
      },
      "bubble_strength": {
        "level": 2,
        "value": 3
      }
    },
    "stats": {
      "enemies_bubbled": 125,
      "followers_converted": 42,
      "damage_dealt": 5680,
      "jumps_performed": 1240
    }
  },
  "followers": [
    {
      "id": "follower_1",
      "type": "scrubber",
      "name": "Scrappy",
      "level": 3,
      "xp": 350,
      "health": {
        "current": 75,
        "max": 80
      },
      "abilities": [
        {
          "id": "quick_attack",
          "level": 2
        }
      ],
      "behavior": "aggressive",
      "loyaltyDuration": 120
    }
  ],
  "game": {
    "currentLevel": "2-2",
    "levelsCompleted": [
      {
        "id": "1-1",
        "stars": 3,
        "score": 12500,
        "time": 125,
        "collectibles": 8,
        "secretsFound": 1
      }
    ],
    "bossesDefeated": ["moderator"],
    "achievements": [
      {
        "id": "first_follower",
        "unlockedAt": "2025-06-02T15:32:25Z"
      }
    ],
    "collectibles": [
      {
        "id": "mod_badge",
        "count": 1
      }
    ],
    "timePlayed": 7200
  },
  "settings": {
    "audio": {
      "master": 0.8,
      "music": 0.7,
      "sfx": 0.9
    },
    "controls": {
      "scheme": "default",
      "custom": {
        "jump": "SPACE",
        "shoot": "Z"
      }
    },
    "display": {
      "fullscreen": false,
      "particleEffects": "high",
      "screenShake": true
    }
  }
}
```

## Asset Management Schema

```json
{
  "groups": [
    {
      "id": "core",
      "loadTime": "startup",
      "assets": [
        {"type": "image", "id": "logo", "path": "ui/logo.png"},
        {"type": "font", "id": "main_font", "path": "fonts/main_font.ttf"},
        {"type": "audio", "id": "main_theme", "path": "audio/main_theme.mp3", "streaming": true}
      ]
    },
    {
      "id": "level_1",
      "loadTime": "level_load",
      "unloadTime": "level_complete",
      "assets": [
        {"type": "image", "id": "level_1_bg", "path": "backgrounds/level_1.png"},
        {"type": "sprite", "id": "enemy_scrubber", "path": "sprites/enemies/scrubber.png"}
      ]
    }
  ],
  "preload": {
    "enabled": true,
    "lookahead": 1,
    "cacheSize": "50MB"
  }
}
```
