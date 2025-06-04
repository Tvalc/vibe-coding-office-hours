# BUBBLE COOP - IMPLEMENTATION GUIDE (PART 3)

## Core Game Systems & Extension Points

This section focuses on the essential systems needed to make Bubble Coop modular and extensible, with concrete examples of how to add new content.

### Factory Pattern Implementation

Factory classes create complex game objects in a standardized way, making it easy to add new content types:

```javascript
BubbleCoop.EnemyFactory = class {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.enemyTypes = new Map();
    }
    
    // Register enemy types from data files
    registerEnemyTypes(enemyData) {
        for (const enemy of enemyData) {
            this.enemyTypes.set(enemy.id, enemy);
        }
    }
    
    // Create enemy of specified type
    createEnemy(enemyType, x, y, level = 1) {
        if (!this.enemyTypes.has(enemyType)) {
            console.error(`Enemy type '${enemyType}' not found`);
            return null;
        }
        
        const enemyData = this.enemyTypes.get(enemyType);
        
        // Create entity with appropriate tag
        const entity = this.entityManager.create(['enemy']);
        
        // Add components
        entity.addComponent(new BubbleCoop.TransformComponent(x, y));
        
        // Add sprite
        entity.addComponent(new BubbleCoop.SpriteComponent(
            enemyData.sprites.idle,
            enemyData.hitbox.width,
            enemyData.hitbox.height,
            enemyData.hitbox.offsetX,
            enemyData.hitbox.offsetY
        ));
        
        // Add animation
        const animComponent = new BubbleCoop.AnimationComponent();
        for (const [animName, animData] of Object.entries(enemyData.animations)) {
            // Create spriteIds array for this animation
            // In a real implementation, we would load these from a spritesheet
            const spriteIds = [];
            for (let i = 0; i < animData.frames; i++) {
                spriteIds.push(`${enemyData.sprites[animName]}_${i}`);
            }
            
            animComponent.addAnimation(
                animName,
                spriteIds,
                1 / animData.framerate
            );
        }
        entity.addComponent(animComponent);
        
        // Add collider
        entity.addComponent(new BubbleCoop.ColliderComponent(
            enemyData.hitbox.width,
            enemyData.hitbox.height,
            enemyData.hitbox.offsetX,
            enemyData.hitbox.offsetY
        ));
        
        // Add physics
        entity.addComponent(new BubbleCoop.PhysicsComponent(1));
        
        // Add health
        const health = new BubbleCoop.HealthComponent(enemyData.stats.health * level);
        health.onDeath = () => {
            // Handle enemy death
            if (entity.hasComponent('BubbleableComponent')) {
                // If bubbled, don't destroy yet
                return;
            }
            
            // Drop items based on enemy definition
            this.dropItems(enemyData, x, y);
            
            // Award XP
            BubbleCoop.EventBus.publish('xp_gained', {
                amount: enemyData.stats.xpValue * level
            });
            
            // Destroy entity
            this.entityManager.destroy(entity.id);
        };
        entity.addComponent(health);
        
        // Add AI
        const ai = new BubbleCoop.AIComponent(enemyData.category);
        ai.init();
        
        // Set AI behaviors based on enemy data
        for (const behavior of enemyData.behaviors) {
            ai.behaviors[behavior.id] = {
                ...ai.behaviors[behavior.id],
                ...behavior.parameters
            };
        }
        
        entity.addComponent(ai);
        
        // Add bubbleable component
        entity.addComponent(new BubbleCoop.BubbleableComponent(
            enemyData.stats.captureResistance,
            enemyData.follower.abilities
        ));
        
        return entity;
    }
    
    // Drop items when enemy is defeated
    dropItems(enemyData, x, y) {
        if (!enemyData.drops || enemyData.drops.length === 0) {
            return;
        }
        
        for (const drop of enemyData.drops) {
            // Random chance to drop
            if (Math.random() > drop.chance) {
                continue;
            }
            
            // Calculate quantity
            const quantity = Math.floor(
                Math.random() * (drop.quantity.max - drop.quantity.min + 1) + drop.quantity.min
            );
            
            // Create item entity
            BubbleCoop.ItemFactory.createItem(drop.type, x, y, quantity);
        }
    }
    
    // Convert enemy to follower
    convertToFollower(enemyEntity) {
        const bubbleable = enemyEntity.getComponent(BubbleCoop.BubbleableComponent);
        if (!bubbleable || !bubbleable.isCaptured) {
            return null;
        }
        
        // Get enemy position
        const transform = enemyEntity.getComponent(BubbleCoop.TransformComponent);
        if (!transform) {
            return null;
        }
        
        // Create follower entity
        const entity = this.entityManager.create(['follower']);
        
        // Add transform
        entity.addComponent(new BubbleCoop.TransformComponent(
            transform.position.x,
            transform.position.y
        ));
        
        // Add other components from the enemy
        const enemyType = bubbleable.enemyType;
        const enemyData = this.enemyTypes.get(enemyType);
        
        // Add sprite with follower variant
        entity.addComponent(new BubbleCoop.SpriteComponent(
            enemyData.sprites.follower,
            enemyData.hitbox.width,
            enemyData.hitbox.height,
            enemyData.hitbox.offsetX,
            enemyData.hitbox.offsetY
        ));
        
        // Add animation
        const animComponent = new BubbleCoop.AnimationComponent();
        // Similar to enemy creation but with follower animations
        entity.addComponent(animComponent);
        
        // Add collider
        entity.addComponent(new BubbleCoop.ColliderComponent(
            enemyData.hitbox.width,
            enemyData.hitbox.height,
            enemyData.hitbox.offsetX,
            enemyData.hitbox.offsetY,
            true // is trigger
        ));
        
        // Add health
        entity.addComponent(new BubbleCoop.HealthComponent(
            enemyData.stats.health * 0.8 // Followers have slightly less health
        ));
        
        // Add follower component
        const follower = new BubbleCoop.FollowerComponent(enemyType);
        
        // Add abilities based on enemy type
        for (const ability of enemyData.follower.abilities) {
            follower.addAbility(ability.id);
        }
        
        entity.addComponent(follower);
        
        // Destroy original enemy
        this.entityManager.destroy(enemyEntity.id);
        
        // Trigger follower created event
        BubbleCoop.EventBus.publish('follower_created', {
            followerType: enemyType,
            entity: entity
        });
        
        return entity;
    }
};
```

### Event System for Decoupling Components

The event system allows components to communicate without direct references:

```javascript
BubbleCoop.EventBus = {
    events: new Map(),
    
    // Subscribe to event
    subscribe: function(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const callbacks = this.events.get(event);
        callbacks.push(callback);
        
        // Return unsubscribe function
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        };
    },
    
    // Publish event
    publish: function(event, data) {
        if (!this.events.has(event)) {
            return;
        }
        
        const callbacks = this.events.get(event);
        for (const callback of callbacks) {
            callback(data);
        }
    },
    
    // Clear all events
    clear: function() {
        this.events.clear();
    }
};

// Example usage:
// Subscribe to enemy_captured event
const unsubscribe = BubbleCoop.EventBus.subscribe('enemy_captured', (data) => {
    console.log(`Enemy captured: ${data.enemyType}`);
    // Show capture effect
    // Update UI
});

// Later, when an enemy is captured
BubbleCoop.EventBus.publish('enemy_captured', {
    enemyType: 'scrubber',
    position: {x: 300, y: 200}
});

// To unsubscribe
unsubscribe();
```

### Data Manager for Loading JSON Content

The data manager handles loading and parsing game data files:

```javascript
BubbleCoop.DataManager = class {
    constructor() {
        this.data = {
            levels: [],
            enemies: [],
            abilities: [],
            items: [],
            upgrades: []
        };
        this.loaded = false;
    }
    
    // Load all game data
    loadAllData(callback) {
        Promise.all([
            this.loadJSON('levels'),
            this.loadJSON('enemies'),
            this.loadJSON('abilities'),
            this.loadJSON('items'),
            this.loadJSON('upgrades')
        ]).then(() => {
            this.loaded = true;
            if (callback) callback();
        }).catch(error => {
            console.error('Failed to load game data:', error);
        });
    }
    
    // Load specific JSON data
    loadJSON(dataType) {
        return fetch(`data/${dataType}.json`)
            .then(response => response.json())
            .then(data => {
                this.data[dataType] = data;
                console.log(`Loaded ${dataType} data:`, data.length, 'items');
            });
    }
    
    // Get data by type
    getData(dataType) {
        return this.data[dataType];
    }
    
    // Get specific item by type and id
    getItem(dataType, id) {
        const items = this.data[dataType];
        return items.find(item => item.id === id);
    }
    
    // Example: Get enemy data
    getEnemy(enemyId) {
        return this.getItem('enemies', enemyId);
    }
    
    // Example: Get level data
    getLevel(levelId) {
        return this.getItem('levels', levelId);
    }
};
```

### Adding New Content with Extension Points

Here's how to add new content types using our modular architecture:

#### 1. Adding a New Enemy Type

Create a new enemy definition in `data/enemies.json`:

```json
{
  "id": "new_enemy_type",
  "name": "New Enemy",
  "category": "zipper",
  "description": "A fast-moving enemy that teleports around the player",
  "tier": 2,
  "stats": {
    "health": 70,
    "speed": 5,
    "damage": 15,
    "captureResistance": 3,
    "xpValue": 35,
    "currencyValue": 20
  },
  "behaviors": [
    {
      "id": "teleport",
      "parameters": {
        "cooldown": 3,
        "range": 300
      }
    },
    {
      "id": "chase",
      "parameters": {
        "activationDistance": 200,
        "speed": 4
      }
    }
  ],
  "sprites": {
    "idle": "enemies/new_enemy/idle.png",
    "walk": "enemies/new_enemy/walk.png",
    "attack": "enemies/new_enemy/attack.png",
    "captured": "enemies/new_enemy/captured.png",
    "follower": "enemies/new_enemy/follower.png"
  },
  "animations": {
    "idle": {"frames": 4, "framerate": 8},
    "walk": {"frames": 6, "framerate": 12},
    "attack": {"frames": 5, "framerate": 15}
  },
  "hitbox": {"width": 45, "height": 60, "offsetX": 0, "offsetY": 0},
  "sounds": {
    "attack": "enemies/new_enemy/attack.mp3",
    "hit": "enemies/new_enemy/hit.mp3"
  },
  "follower": {
    "abilities": [
      {
        "id": "teleport_ally",
        "unlockLevel": 2
      }
    ],
    "evolution": {
      "level": 5,
      "newType": "elite_new_enemy"
    }
  },
  "drops": [
    {
      "type": "teleport_shard",
      "chance": 0.3,
      "quantity": {"min": 1, "max": 2}
    }
  ]
}
```

Then add the enemy to a level in `data/levels.json`:

```json
"enemies": [
  // Existing enemies...
  {
    "type": "new_enemy_type",
    "x": 1200,
    "y": 400,
    "facing": "left",
    "initialBehavior": "teleport"
  }
]
```

No code changes required! The data-driven approach allows adding new enemy types without modifying the codebase.

#### 2. Adding a New Ability

Create a new ability definition in `data/abilities.json`:

```json
{
  "id": "teleport_dash",
  "name": "Teleport Dash",
  "description": "Quickly teleport a short distance in any direction",
  "type": "active",
  "category": "movement",
  "owner": "player",
  "unlockRequirements": {
    "level": 4,
    "currency": 800,
    "previousAbilities": ["dash"]
  },
  "effects": [
    {
      "type": "teleport",
      "distance": 200,
      "invincibilityFrames": 20
    }
  ],
  "cooldown": 5,
  "energyCost": 30,
  "animation": {
    "spritesheet": "abilities/teleport_dash.png",
    "frames": 10,
    "framerate": 24
  },
  "sounds": {
    "activation": "abilities/teleport_activation.mp3",
    "effect": "abilities/teleport_effect.mp3"
  },
  "controls": {
    "pc": {"key": "SHIFT", "modifiers": ["SPACE"]},
    "mobile": {"type": "swipe", "direction": "any", "modifiers": ["double"]}
  }
}
```

Then add it to the player's ability list at the appropriate level:

```javascript
// Inside the level-up logic in the player progress system
if (player.level === 4) {
    // Check if ability is unlocked
    const teleportDashData = BubbleCoop.DataManager.getItem('abilities', 'teleport_dash');
    
    if (teleportDashData && player.currency >= teleportDashData.unlockRequirements.currency) {
        // Add ability to player
        player.addAbility('teleport_dash');
        player.currency -= teleportDashData.unlockRequirements.currency;
        
        // Show unlock notification
        BubbleCoop.EventBus.publish('ability_unlocked', {
            abilityId: 'teleport_dash',
            name: teleportDashData.name
        });
    }
}
```

#### 3. Adding a New Level

Create a new level definition in `data/levels.json`:

```json
{
  "id": "level_2_1",
  "name": "Neon Nightmares",
  "zone": "Digital Dawn",
  "difficulty": 2,
  "width": 3500,
  "height": 720,
  "background": {
    "layers": [
      {"image": "backgrounds/neon_bg_far.png", "scrollSpeed": 0.2},
      {"image": "backgrounds/neon_bg_mid.png", "scrollSpeed": 0.5},
      {"image": "backgrounds/neon_bg_near.png", "scrollSpeed": 0.8}
    ]
  },
  "music": {
    "main": "music/neon_theme.mp3",
    "boss": "music/neon_boss.mp3"
  },
  "platforms": [
    // Platform definitions...
  ],
  "hazards": [
    // New hazard type: laser grid
    {
      "type": "laser_grid",
      "x": 1000,
      "y": 500,
      "width": 200,
      "height": 150,
      "damage": 20,
      "pattern": {
        "onDuration": 1,
        "offDuration": 1.5
      }
    }
  ],
  "enemies": [
    // Enemy placements...
  ],
  "boss": {
    "type": "data_harvester",
    "x": 3200,
    "y": 500,
    "phases": 4
  }
}
```

To support the new laser grid hazard, add a new hazard system component:

```javascript
BubbleCoop.LaserGridComponent = class extends BubbleCoop.Component {
    constructor(width, height, damage, onDuration, offDuration) {
        super();
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.onDuration = onDuration;
        this.offDuration = offDuration;
        this.timer = 0;
        this.isActive = false;
    }
    
    update(dt) {
        this.timer += dt;
        
        if (this.isActive) {
            if (this.timer >= this.onDuration) {
                this.isActive = false;
                this.timer = 0;
            }
        } else {
            if (this.timer >= this.offDuration) {
                this.isActive = true;
                this.timer = 0;
            }
        }
    }
};
```

Then extend the hazard factory to support the new hazard type:

```javascript
// Inside the HazardFactory.createHazard method
case 'laser_grid':
    hazard.addComponent(new BubbleCoop.LaserGridComponent(
        data.width,
        data.height,
        data.damage,
        data.pattern.onDuration,
        data.pattern.offDuration
    ));
    break;
```

### Save System for Game Progress

The save system persists player progress between game sessions:

```javascript
BubbleCoop.SaveManager = class {
    constructor() {
        this.saveKey = 'bubble_coop_save';
    }
    
    // Save game state
    save(gameState) {
        const saveData = JSON.stringify(gameState);
        localStorage.setItem(this.saveKey, saveData);
    }
    
    // Load game state
    load() {
        const saveData = localStorage.getItem(this.saveKey);
        if (!saveData) return null;
        
        try {
            return JSON.parse(saveData);
        } catch (error) {
            console.error('Failed to parse save data:', error);
            return null;
        }
    }
    
    // Delete save
    delete() {
        localStorage.removeItem(this.saveKey);
    }
    
    // Check if save exists
    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }
    
    // Create a new game state
    createNewGame() {
        return {
            player: {
                level: 1,
                xp: 0,
                currency: 0,
                health: {
                    current: 100,
                    max: 100
                },
                abilities: [],
                upgrades: {
                    bubble_capacity: {
                        level: 1,
                        value: 3
                    },
                    bubble_strength: {
                        level: 1,
                        value: 1
                    },
                    follower_capacity: {
                        level: 1,
                        value: 2
                    }
                }
            },
            followers: [],
            progress: {
                currentLevel: '1-1',
                levelsCompleted: [],
                bossesDefeated: []
            },
            settings: {
                audio: {
                    master: 0.8,
                    music: 0.7,
                    sfx: 0.9
                },
                controls: {
                    scheme: 'default'
                }
            },
            timestamp: Date.now()
        };
    }
};
```

### Farcade SDK Integration

Integrate with Farcade SDK for deployment on the platform:

```javascript
BubbleCoop.FarcadeIntegration = class {
    constructor() {
        this.isInitialized = false;
        this.isMuted = false;
    }
    
    // Initialize Farcade SDK
    init() {
        if (typeof Farcade === 'undefined') {
            console.warn('Farcade SDK not found, running in standalone mode');
            return;
        }
        
        // Set up event listeners
        Farcade.addEventListener('play_again', () => {
            this.handlePlayAgain();
        });
        
        Farcade.addEventListener('toggle_mute', (event) => {
            this.handleToggleMute(event.detail.muted);
        });
        
        this.isInitialized = true;
        console.log('Farcade SDK initialized');
    }
    
    // Signal game ready
    ready() {
        if (!this.isInitialized) return;
        Farcade.ready();
    }
    
    // Signal game over with score
    gameOver(score) {
        if (!this.isInitialized) return;
        Farcade.gameOver(score);
    }
    
    // Trigger haptic feedback
    hapticFeedback(intensity) {
        if (!this.isInitialized) return;
        Farcade.hapticFeedback(intensity);
    }
    
    // Handle play again event
    handlePlayAgain() {
        // Reset game state
        BubbleCoop.state.change('gameplay');
        
        // Publish event for other systems
        BubbleCoop.EventBus.publish('game_restart', {});
    }
    
    // Handle toggle mute event
    handleToggleMute(muted) {
        this.isMuted = muted;
        
        // Update audio system
        if (BubbleCoop.audio) {
            BubbleCoop.audio.setMuted(muted);
        }
    }
};
```

## Putting It All Together

By following these patterns, Bubble Coop can be built in a modular, extensible way that makes it easy to:

1. Add new enemy types through data files
2. Create new abilities and upgrades
3. Design new levels with unique hazards and challenges
4. Implement new follower types and behaviors
5. Extend the game with new systems and mechanics

All while maintaining a clean, organized codebase that's easy to maintain and scale as the game grows.
