# BUBBLE COOP - IMPLEMENTATION GUIDE (PART 2)

## Entity Component System

The Entity Component System (ECS) pattern is the foundation of Bubble Coop's modular architecture. This design separates entities (game objects) from their behavior (components) and logic (systems), enabling maximum flexibility and reusability.

### Entity Manager

The Entity Manager creates, updates, and destroys game entities:

```javascript
BubbleCoop.EntityManager = class {
    constructor() {
        this.entities = new Map();
        this.nextEntityId = 1;
        this.entitiesToAdd = [];
        this.entitiesToRemove = [];
        this.systems = [];
        
        // Entity collections for quick access by tag
        this.tags = new Map();
    }
    
    // Create a new entity
    create(tags = []) {
        const entity = new BubbleCoop.Entity(this.nextEntityId++);
        
        // Add tags
        tags.forEach(tag => entity.addTag(tag));
        
        // Queue for addition on next update
        this.entitiesToAdd.push(entity);
        
        return entity;
    }
    
    // Add entity to manager
    addEntity(entity) {
        this.entities.set(entity.id, entity);
        
        // Add to tag collections
        entity.tags.forEach(tag => {
            if (!this.tags.has(tag)) {
                this.tags.set(tag, new Set());
            }
            this.tags.get(tag).add(entity.id);
        });
    }
    
    // Remove entity from manager
    removeEntity(entityId) {
        const entity = this.entities.get(entityId);
        if (!entity) return;
        
        // Remove from tag collections
        entity.tags.forEach(tag => {
            if (this.tags.has(tag)) {
                this.tags.get(tag).delete(entityId);
            }
        });
        
        // Remove entity
        this.entities.delete(entityId);
    }
    
    // Mark entity for removal
    destroy(entityId) {
        this.entitiesToRemove.push(entityId);
    }
    
    // Add a system
    addSystem(system) {
        this.systems.push(system);
        system.init(this);
    }
    
    // Update all entities and systems
    update(dt) {
        // Add queued entities
        while (this.entitiesToAdd.length > 0) {
            this.addEntity(this.entitiesToAdd.pop());
        }
        
        // Remove queued entities
        while (this.entitiesToRemove.length > 0) {
            this.removeEntity(this.entitiesToRemove.pop());
        }
        
        // Update all systems
        for (const system of this.systems) {
            system.update(dt, this);
        }
    }
    
    // Render all entities
    render() {
        // Render all systems
        for (const system of this.systems) {
            if (system.render) {
                system.render(BubbleCoop.ctx, this);
            }
        }
    }
    
    // Get entity by ID
    getEntity(entityId) {
        return this.entities.get(entityId);
    }
    
    // Get entities by tag
    getEntitiesByTag(tag) {
        if (!this.tags.has(tag)) return [];
        
        const entities = [];
        for (const entityId of this.tags.get(tag)) {
            entities.push(this.entities.get(entityId));
        }
        
        return entities;
    }
    
    // Get entities with component
    getEntitiesWithComponent(componentType) {
        const entities = [];
        
        for (const entity of this.entities.values()) {
            if (entity.hasComponent(componentType)) {
                entities.push(entity);
            }
        }
        
        return entities;
    }
    
    // Clear all entities
    clear() {
        this.entities.clear();
        this.tags.clear();
        this.entitiesToAdd = [];
        this.entitiesToRemove = [];
    }
};
```

### Entity Class

The Entity class is a container for components:

```javascript
BubbleCoop.Entity = class {
    constructor(id) {
        this.id = id;
        this.components = new Map();
        this.tags = new Set();
    }
    
    // Add a component
    addComponent(component) {
        this.components.set(component.constructor.name, component);
        component.entity = this;
        return this;
    }
    
    // Remove a component
    removeComponent(componentType) {
        const componentName = typeof componentType === 'string' 
            ? componentType 
            : componentType.name;
            
        if (this.components.has(componentName)) {
            const component = this.components.get(componentName);
            component.entity = null;
            this.components.delete(componentName);
        }
        
        return this;
    }
    
    // Get a component
    getComponent(componentType) {
        const componentName = typeof componentType === 'string' 
            ? componentType 
            : componentType.name;
            
        return this.components.get(componentName);
    }
    
    // Check if entity has component
    hasComponent(componentType) {
        const componentName = typeof componentType === 'string' 
            ? componentType 
            : componentType.name;
            
        return this.components.has(componentName);
    }
    
    // Add a tag
    addTag(tag) {
        this.tags.add(tag);
        return this;
    }
    
    // Remove a tag
    removeTag(tag) {
        this.tags.delete(tag);
        return this;
    }
    
    // Check if entity has tag
    hasTag(tag) {
        return this.tags.has(tag);
    }
};
```

### Component Base Class

The Component class is the base for all components:

```javascript
BubbleCoop.Component = class {
    constructor() {
        this.entity = null;
    }
    
    // Get another component from the same entity
    getComponent(componentType) {
        if (!this.entity) return null;
        return this.entity.getComponent(componentType);
    }
};
```

### System Base Class

The System class processes entities with specific component combinations:

```javascript
BubbleCoop.System = class {
    constructor() {
        this.requiredComponents = [];
    }
    
    // Initialize system
    init(entityManager) {
        // Override in subclasses if needed
    }
    
    // Update system
    update(dt, entityManager) {
        const entities = this.getRelevantEntities(entityManager);
        
        for (const entity of entities) {
            this.processEntity(entity, dt);
        }
    }
    
    // Get entities with all required components
    getRelevantEntities(entityManager) {
        if (this.requiredComponents.length === 0) {
            return [];
        }
        
        const entities = entityManager.getEntitiesWithComponent(this.requiredComponents[0]);
        
        return entities.filter(entity => {
            for (let i = 1; i < this.requiredComponents.length; i++) {
                if (!entity.hasComponent(this.requiredComponents[i])) {
                    return false;
                }
            }
            return true;
        });
    }
    
    // Process a single entity
    processEntity(entity, dt) {
        // Override in subclasses
    }
};
```

### Core Components

Here are some essential components for Bubble Coop:

#### Transform Component

```javascript
BubbleCoop.TransformComponent = class extends BubbleCoop.Component {
    constructor(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super();
        this.position = { x, y };
        this.scale = { x: scaleX, y: scaleY };
        this.rotation = rotation;
        this.previousPosition = { x, y };
    }
    
    // Save position for next frame
    updatePreviousPosition() {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }
};
```

#### Sprite Component

```javascript
BubbleCoop.SpriteComponent = class extends BubbleCoop.Component {
    constructor(spriteId, width, height, offsetX = 0, offsetY = 0) {
        super();
        this.spriteId = spriteId;
        this.width = width;
        this.height = height;
        this.offset = { x: offsetX, y: offsetY };
        this.visible = true;
        this.alpha = 1;
        this.flippedX = false;
        this.flippedY = false;
        this.color = null; // For tinting
    }
    
    // Change sprite
    setSprite(spriteId) {
        this.spriteId = spriteId;
    }
};
```

#### Animation Component

```javascript
BubbleCoop.AnimationComponent = class extends BubbleCoop.Component {
    constructor() {
        super();
        this.animations = new Map();
        this.currentAnimation = null;
        this.frameIndex = 0;
        this.frameTime = 0;
        this.paused = false;
    }
    
    // Add animation
    addAnimation(name, spriteIds, frameDuration, loop = true) {
        this.animations.set(name, {
            spriteIds,
            frameDuration,
            loop
        });
        
        // Set as current if it's the first animation
        if (!this.currentAnimation) {
            this.play(name);
        }
    }
    
    // Play animation
    play(name, reset = true) {
        if (!this.animations.has(name)) return;
        
        if (this.currentAnimation !== name) {
            this.currentAnimation = name;
            if (reset) {
                this.frameIndex = 0;
                this.frameTime = 0;
            }
            this.paused = false;
        }
    }
    
    // Update animation
    update(dt) {
        if (this.paused || !this.currentAnimation) return;
        
        const animation = this.animations.get(this.currentAnimation);
        
        this.frameTime += dt;
        
        if (this.frameTime >= animation.frameDuration) {
            this.frameTime -= animation.frameDuration;
            this.frameIndex++;
            
            if (this.frameIndex >= animation.spriteIds.length) {
                if (animation.loop) {
                    this.frameIndex = 0;
                } else {
                    this.frameIndex = animation.spriteIds.length - 1;
                    this.paused = true;
                }
            }
        }
        
        // Update sprite component
        const spriteComponent = this.getComponent(BubbleCoop.SpriteComponent);
        if (spriteComponent) {
            spriteComponent.setSprite(animation.spriteIds[this.frameIndex]);
        }
    }
    
    // Check if animation has completed
    isComplete() {
        if (!this.currentAnimation) return false;
        
        const animation = this.animations.get(this.currentAnimation);
        return !animation.loop && this.frameIndex === animation.spriteIds.length - 1;
    }
};
```

#### Collider Component

```javascript
BubbleCoop.ColliderComponent = class extends BubbleCoop.Component {
    constructor(width, height, offsetX = 0, offsetY = 0, isTrigger = false) {
        super();
        this.width = width;
        this.height = height;
        this.offset = { x: offsetX, y: offsetY };
        this.isTrigger = isTrigger; // Trigger doesn't block movement
        this.collidingWith = new Set(); // Entities currently colliding with
    }
    
    // Get collider bounds based on transform
    getBounds() {
        const transform = this.getComponent(BubbleCoop.TransformComponent);
        if (!transform) return null;
        
        return {
            x: transform.position.x + this.offset.x,
            y: transform.position.y + this.offset.y,
            width: this.width,
            height: this.height
        };
    }
    
    // Check collision with another collider
    isColliding(otherCollider) {
        const bounds = this.getBounds();
        const otherBounds = otherCollider.getBounds();
        
        if (!bounds || !otherBounds) return false;
        
        return bounds.x < otherBounds.x + otherBounds.width &&
               bounds.x + bounds.width > otherBounds.x &&
               bounds.y < otherBounds.y + otherBounds.height &&
               bounds.y + bounds.height > otherBounds.y;
    }
};
```

#### Physics Component

```javascript
BubbleCoop.PhysicsComponent = class extends BubbleCoop.Component {
    constructor(mass = 1) {
        super();
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
        this.mass = mass;
        this.gravity = 980; // Pixels per second squared
        this.friction = 0.8; // Horizontal friction
        this.restitution = 0.2; // Bounciness
        this.isGrounded = false;
        this.isOnWall = false;
        this.maxVelocity = { x: 500, y: 1000 };
    }
    
    // Apply force to object
    applyForce(x, y) {
        this.acceleration.x += x / this.mass;
        this.acceleration.y += y / this.mass;
    }
    
    // Apply impulse (immediate velocity change)
    applyImpulse(x, y) {
        this.velocity.x += x / this.mass;
        this.velocity.y += y / this.mass;
    }
    
    // Reset acceleration
    resetAcceleration() {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }
};
```

#### Player Controller Component

```javascript
BubbleCoop.PlayerControllerComponent = class extends BubbleCoop.Component {
    constructor() {
        super();
        this.moveSpeed = 300; // Pixels per second
        this.jumpForce = 600;
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
        this.canWallJump = false;
        this.canDash = false;
        this.isDashing = false;
        this.dashSpeed = 600;
        this.dashDuration = 0.2;
        this.dashTimer = 0;
        this.dashCooldown = 1;
        this.dashCooldownTimer = 0;
        this.facing = 1; // 1 for right, -1 for left
        this.isInvulnerable = false;
        this.invulnerabilityTimer = 0;
    }
    
    // Called when player is damaged
    takeDamage(amount) {
        if (this.isInvulnerable) return;
        
        const healthComponent = this.getComponent(BubbleCoop.HealthComponent);
        if (healthComponent) {
            healthComponent.damage(amount);
            
            // Set invulnerability
            this.isInvulnerable = true;
            this.invulnerabilityTimer = 1; // 1 second
        }
    }
    
    // Update invulnerability
    updateInvulnerability(dt) {
        if (this.isInvulnerable) {
            this.invulnerabilityTimer -= dt;
            
            if (this.invulnerabilityTimer <= 0) {
                this.isInvulnerable = false;
            }
        }
    }
    
    // Update dash
    updateDash(dt) {
        // Update dash cooldown
        if (this.dashCooldownTimer > 0) {
            this.dashCooldownTimer -= dt;
        }
        
        // Update dash
        if (this.isDashing) {
            this.dashTimer -= dt;
            
            if (this.dashTimer <= 0) {
                this.isDashing = false;
            }
        }
    }
    
    // Perform dash
    dash() {
        if (!this.canDash || this.isDashing || this.dashCooldownTimer > 0) {
            return false;
        }
        
        this.isDashing = true;
        this.dashTimer = this.dashDuration;
        this.dashCooldownTimer = this.dashCooldown;
        
        return true;
    }
    
    // Reset abilities on landing
    onLand() {
        this.hasDoubleJumped = false;
    }
};
```

#### Bubble Gun Component

```javascript
BubbleCoop.BubbleGunComponent = class extends BubbleCoop.Component {
    constructor() {
        super();
        this.bubbleCapacity = 3;
        this.bubbleCount = this.bubbleCapacity;
        this.bubbleRechargeTime = 1; // Seconds per bubble
        this.bubbleRechargeTimer = 0;
        this.bubbleSpeed = 400;
        this.bubbleSize = 1.0;
        this.bubbleStrength = 1;
        this.shootCooldown = 0.5;
        this.shootCooldownTimer = 0;
    }
    
    // Shoot a bubble
    shoot(direction) {
        if (this.bubbleCount <= 0 || this.shootCooldownTimer > 0) {
            return null;
        }
        
        this.bubbleCount--;
        this.shootCooldownTimer = this.shootCooldown;
        
        return {
            direction,
            speed: this.bubbleSpeed,
            size: this.bubbleSize,
            strength: this.bubbleStrength
        };
    }
    
    // Update cooldowns
    update(dt) {
        // Update shoot cooldown
        if (this.shootCooldownTimer > 0) {
            this.shootCooldownTimer -= dt;
        }
        
        // Recharge bubbles
        if (this.bubbleCount < this.bubbleCapacity) {
            this.bubbleRechargeTimer += dt;
            
            if (this.bubbleRechargeTimer >= this.bubbleRechargeTime) {
                this.bubbleRechargeTimer -= this.bubbleRechargeTime;
                this.bubbleCount++;
            }
        }
    }
};
```

#### Health Component

```javascript
BubbleCoop.HealthComponent = class extends BubbleCoop.Component {
    constructor(maxHealth) {
        super();
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.isDead = false;
        
        // Callbacks
        this.onDamage = null;
        this.onHeal = null;
        this.onDeath = null;
    }
    
    // Take damage
    damage(amount) {
        if (this.isDead) return;
        
        this.currentHealth -= amount;
        
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isDead = true;
            
            if (this.onDeath) {
                this.onDeath();
            }
        } else if (this.onDamage) {
            this.onDamage(amount);
        }
    }
    
    // Heal health
    heal(amount) {
        if (this.isDead) return;
        
        this.currentHealth += amount;
        
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        
        if (this.onHeal) {
            this.onHeal(amount);
        }
    }
    
    // Get health percentage (0-1)
    getHealthPercentage() {
        return this.currentHealth / this.maxHealth;
    }
    
    // Reset health
    reset() {
        this.currentHealth = this.maxHealth;
        this.isDead = false;
    }
};
```

#### AI Component

```javascript
BubbleCoop.AIComponent = class extends BubbleCoop.Component {
    constructor(behaviorType) {
        super();
        this.behaviorType = behaviorType;
        this.behaviors = {
            patrol: {
                range: 200,
                speed: 2,
                direction: 1,
                startX: 0
            },
            chase: {
                activationDistance: 250,
                speed: 3,
                maxDuration: 3,
                timer: 0,
                active: false
            },
            attack: {
                range: 50,
                cooldown: 1,
                cooldownTimer: 0,
                damage: 10
            }
        };
        this.state = 'idle'; // idle, patrol, chase, attack
        this.targetEntity = null;
    }
    
    // Initialize AI
    init() {
        // Store starting position for patrol
        const transform = this.getComponent(BubbleCoop.TransformComponent);
        if (transform) {
            this.behaviors.patrol.startX = transform.position.x;
        }
    }
    
    // Set target entity
    setTarget(entity) {
        this.targetEntity = entity;
    }
    
    // Update AI state
    update(dt) {
        // Reset cooldowns
        if (this.behaviors.attack.cooldownTimer > 0) {
            this.behaviors.attack.cooldownTimer -= dt;
        }
        
        // Update chase timer
        if (this.state === 'chase' && this.behaviors.chase.timer > 0) {
            this.behaviors.chase.timer -= dt;
            
            if (this.behaviors.chase.timer <= 0) {
                this.state = 'patrol';
            }
        }
        
        // Decision making based on target position
        if (this.targetEntity) {
            const transform = this.getComponent(BubbleCoop.TransformComponent);
            const targetTransform = this.targetEntity.getComponent(BubbleCoop.TransformComponent);
            
            if (transform && targetTransform) {
                const distance = Math.abs(transform.position.x - targetTransform.position.x);
                
                // Attack if in range
                if (distance <= this.behaviors.attack.range && this.behaviors.attack.cooldownTimer <= 0) {
                    this.state = 'attack';
                    this.behaviors.attack.cooldownTimer = this.behaviors.attack.cooldown;
                    return;
                }
                
                // Chase if in activation distance
                if (distance <= this.behaviors.chase.activationDistance) {
                    this.state = 'chase';
                    this.behaviors.chase.timer = this.behaviors.chase.maxDuration;
                    return;
                }
            }
        }
        
        // Default to patrol if not chasing or attacking
        if (this.state !== 'chase' && this.state !== 'attack') {
            this.state = 'patrol';
        }
    }
};
```

#### Follower Component

```javascript
BubbleCoop.FollowerComponent = class extends BubbleCoop.Component {
    constructor(followerType) {
        super();
        this.followerType = followerType;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.abilities = [];
        this.targetOffset = { x: -50, y: 0 }; // Position relative to player
        this.leaderEntity = null;
        this.state = 'follow'; // follow, attack, defend, ability
        this.stateTimer = 0;
    }
    
    // Set leader to follow
    setLeader(entity) {
        this.leaderEntity = entity;
    }
    
    // Add ability
    addAbility(abilityId) {
        this.abilities.push({
            id: abilityId,
            cooldown: 5,
            cooldownTimer: 0
        });
    }
    
    // Update ability cooldowns
    updateCooldowns(dt) {
        for (const ability of this.abilities) {
            if (ability.cooldownTimer > 0) {
                ability.cooldownTimer -= dt;
            }
        }
    }
    
    // Use ability if available
    useAbility(abilityIndex) {
        if (abilityIndex >= this.abilities.length) return false;
        
        const ability = this.abilities[abilityIndex];
        
        if (ability.cooldownTimer <= 0) {
            ability.cooldownTimer = ability.cooldown;
            return true;
        }
        
        return false;
    }
    
    // Add XP and handle level up
    addXP(amount) {
        this.xp += amount;
        
        while (this.xp >= this.xpToNextLevel) {
            this.xp -= this.xpToNextLevel;
            this.levelUp();
        }
    }
    
    // Level up follower
    levelUp() {
        this.level++;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        
        // Increase stats
        const healthComponent = this.getComponent(BubbleCoop.HealthComponent);
        if (healthComponent) {
            healthComponent.maxHealth *= 1.2;
            healthComponent.heal(healthComponent.maxHealth); // Full heal on level up
        }
        
        // Check for new abilities
        // This would be handled by a data-driven approach in the full implementation
    }
};
```
