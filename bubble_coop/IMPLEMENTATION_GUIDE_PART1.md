# BUBBLE COOP - IMPLEMENTATION GUIDE (PART 1)

## Core Engine Implementation

This guide provides concrete code examples and patterns for implementing the Bubble Coop game in a modular, extensible way. It complements the TECHNICAL_ARCHITECTURE.md and DATA_SCHEMAS.md documents.

### HTML Shell

The game will be contained in a single HTML file for Farcade integration. Here's the basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Bubble Coop</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
            touch-action: none;
        }
        #game-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        canvas {
            display: block;
            margin: 0 auto;
        }
        /* Responsive design for different orientations */
        @media (orientation: portrait) {
            /* Portrait-specific styles */
        }
        @media (orientation: landscape) {
            /* Landscape-specific styles */
        }
    </style>
    <!-- Farcade SDK -->
    <script src="https://cdn.farcade.com/js/sdk-latest.js"></script>
</head>
<body>
    <div id="game-container">
        <canvas id="game-canvas"></canvas>
    </div>

    <!-- Core Engine -->
    <script>
        // Game code will be embedded here
        // This allows everything to be contained in a single file
    </script>
</body>
</html>
```

### Game Engine Core

The core engine provides the foundation for the game:

```javascript
// Engine namespace to avoid global scope pollution
const BubbleCoop = {
    // Configuration
    config: {
        width: 1280,
        height: 720,
        fps: 60,
        debug: false,
        defaultVolume: 0.7,
        mobileBreakpoint: 768
    },
    
    // Core systems
    game: null,        // Game instance
    assets: null,      // Asset loader
    input: null,       // Input manager
    renderer: null,    // Rendering system
    audio: null,       // Audio system
    physics: null,     // Physics system
    state: null,       // State machine
    entities: null,    // Entity manager
    ui: null,          // UI manager
    data: null,        // Data manager
    save: null,        // Save manager
    farcade: null,     // Farcade SDK wrapper
    
    // Initialization
    init: function() {
        console.log('Initializing Bubble Coop...');
        
        // Create canvas context
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size with resolution handling
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize core systems
        this.assets = new BubbleCoop.AssetLoader();
        this.input = new BubbleCoop.InputManager();
        this.renderer = new BubbleCoop.Renderer(this.canvas, this.ctx);
        this.audio = new BubbleCoop.AudioManager();
        this.physics = new BubbleCoop.PhysicsSystem();
        this.state = new BubbleCoop.StateMachine();
        this.entities = new BubbleCoop.EntityManager();
        this.ui = new BubbleCoop.UIManager();
        this.data = new BubbleCoop.DataManager();
        this.save = new BubbleCoop.SaveManager();
        this.farcade = new BubbleCoop.FarcadeIntegration();
        
        // Load core assets
        this.assets.loadGroup('core', () => {
            // Register states
            this.state.register('boot', new BubbleCoop.BootState());
            this.state.register('preload', new BubbleCoop.PreloadState());
            this.state.register('menu', new BubbleCoop.MenuState());
            this.state.register('tutorial', new BubbleCoop.TutorialState());
            this.state.register('gameplay', new BubbleCoop.GameplayState());
            this.state.register('upgrade', new BubbleCoop.UpgradeState());
            this.state.register('gameover', new BubbleCoop.GameOverState());
            
            // Start with boot state
            this.state.change('boot');
            
            // Start game loop
            this.lastTime = 0;
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        });
    },
    
    // Game loop
    gameLoop: function(timestamp) {
        // Calculate delta time
        const deltaTime = timestamp - (this.lastTime || timestamp);
        this.lastTime = timestamp;
        
        // Cap delta time to avoid spiral of death
        const dt = Math.min(deltaTime, 1000 / 30) / 1000;
        
        // Update current state
        this.state.update(dt);
        
        // Update input
        this.input.update();
        
        // Update entities
        this.entities.update(dt);
        
        // Update physics
        this.physics.update(dt);
        
        // Render everything
        this.renderer.clear();
        this.state.render();
        this.entities.render();
        this.ui.render();
        
        // Show FPS if debug mode is enabled
        if (this.config.debug) {
            this.renderer.drawText(`FPS: ${Math.round(1 / dt)}`, 10, 20, '#00FF00', '14px Arial');
        }
        
        // Continue loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    },
    
    // Canvas resize handler
    resizeCanvas: function() {
        const container = document.getElementById('game-container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate aspect ratio
        const gameRatio = this.config.width / this.config.height;
        const containerRatio = containerWidth / containerHeight;
        
        let newWidth, newHeight;
        
        if (containerRatio > gameRatio) {
            // Container is wider than game ratio
            newHeight = containerHeight;
            newWidth = newHeight * gameRatio;
        } else {
            // Container is taller than game ratio
            newWidth = containerWidth;
            newHeight = newWidth / gameRatio;
        }
        
        // Set canvas size
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        
        // Set canvas style for CSS scaling
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
        
        // Center canvas
        this.canvas.style.marginTop = `${(containerHeight - newHeight) / 2}px`;
        
        // Store scale for input calculations
        this.scale = {
            x: this.config.width / newWidth,
            y: this.config.height / newHeight
        };
        
        // Update input manager with new scale
        if (this.input) {
            this.input.updateScale(this.scale);
        }
        
        // Check if we're on mobile
        this.isMobile = containerWidth <= this.config.mobileBreakpoint;
        if (this.input) {
            this.input.setMobileMode(this.isMobile);
        }
    }
};

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => BubbleCoop.init());
```

### Asset Loader

The asset loader will handle preloading and caching of game assets:

```javascript
BubbleCoop.AssetLoader = class {
    constructor() {
        this.assets = {
            images: {},
            audio: {},
            json: {}
        };
        this.queue = [];
        this.loadedCount = 0;
        this.totalCount = 0;
        this.progress = 0;
    }
    
    // Load a group of assets defined in the asset manifest
    loadGroup(groupId, callback) {
        // Fetch the asset manifest
        fetch('assets/manifest.json')
            .then(response => response.json())
            .then(manifest => {
                const group = manifest.groups.find(g => g.id === groupId);
                if (!group) {
                    console.error(`Asset group '${groupId}' not found`);
                    if (callback) callback();
                    return;
                }
                
                // Reset loader state
                this.queue = [];
                this.loadedCount = 0;
                this.totalCount = group.assets.length;
                this.progress = 0;
                
                // If no assets, complete immediately
                if (this.totalCount === 0) {
                    this.progress = 1;
                    if (callback) callback();
                    return;
                }
                
                // Queue all assets
                group.assets.forEach(asset => {
                    switch (asset.type) {
                        case 'image':
                            this.loadImage(asset.id, asset.path, callback);
                            break;
                        case 'audio':
                            this.loadAudio(asset.id, asset.path, asset.streaming, callback);
                            break;
                        case 'json':
                            this.loadJSON(asset.id, asset.path, callback);
                            break;
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load asset manifest:', error);
                if (callback) callback();
            });
    }
    
    // Load an image
    loadImage(id, path, callback) {
        const img = new Image();
        img.onload = () => this.assetLoaded(callback);
        img.onerror = () => {
            console.error(`Failed to load image: ${path}`);
            this.assetLoaded(callback);
        };
        img.src = path;
        this.assets.images[id] = img;
    }
    
    // Load an audio file
    loadAudio(id, path, streaming, callback) {
        const audio = new Audio();
        audio.oncanplaythrough = () => this.assetLoaded(callback);
        audio.onerror = () => {
            console.error(`Failed to load audio: ${path}`);
            this.assetLoaded(callback);
        };
        audio.src = path;
        audio.preload = streaming ? 'metadata' : 'auto';
        this.assets.audio[id] = audio;
    }
    
    // Load a JSON file
    loadJSON(id, path, callback) {
        fetch(path)
            .then(response => response.json())
            .then(data => {
                this.assets.json[id] = data;
                this.assetLoaded(callback);
            })
            .catch(error => {
                console.error(`Failed to load JSON: ${path}`, error);
                this.assetLoaded(callback);
            });
    }
    
    // Track asset loading progress
    assetLoaded(callback) {
        this.loadedCount++;
        this.progress = this.loadedCount / this.totalCount;
        
        // Call callback when all assets are loaded
        if (this.loadedCount === this.totalCount && callback) {
            callback();
        }
    }
    
    // Get an asset by ID and type
    get(type, id) {
        if (!this.assets[type]) {
            console.error(`Asset type '${type}' not found`);
            return null;
        }
        
        if (!this.assets[type][id]) {
            console.error(`Asset '${id}' of type '${type}' not found`);
            return null;
        }
        
        return this.assets[type][id];
    }
    
    // Get an image
    getImage(id) {
        return this.get('images', id);
    }
    
    // Get an audio
    getAudio(id) {
        return this.get('audio', id);
    }
    
    // Get a JSON
    getJSON(id) {
        return this.get('json', id);
    }
};
```

### Input Manager

The input manager will handle keyboard, mouse, and touch inputs:

```javascript
BubbleCoop.InputManager = class {
    constructor() {
        // Keyboard state
        this.keys = {};
        this.previousKeys = {};
        
        // Mouse/touch state
        this.pointer = {
            x: 0,
            y: 0,
            isDown: false,
            wasDown: false
        };
        
        // Virtual buttons for mobile
        this.virtualButtons = {
            left: { x: 50, y: 650, radius: 40, isDown: false },
            right: { x: 150, y: 650, radius: 40, isDown: false },
            jump: { x: 1180, y: 650, radius: 40, isDown: false },
            shoot: { x: 1080, y: 650, radius: 40, isDown: false }
        };
        
        // Mobile mode flag
        this.isMobile = false;
        
        // Swipe detection
        this.swipe = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            direction: null,
            inProgress: false,
            threshold: 50
        };
        
        // Scale for input coordinate transformation
        this.scale = { x: 1, y: 1 };
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    // Initialize event listeners
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', e => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', e => {
            this.keys[e.code] = false;
        });
        
        // Mouse events
        window.addEventListener('mousedown', e => {
            this.updatePointerPosition(e);
            this.pointer.isDown = true;
            
            // Check for virtual button presses in mobile mode
            if (this.isMobile) {
                this.checkVirtualButtonPress();
            }
        });
        
        window.addEventListener('mousemove', e => {
            this.updatePointerPosition(e);
            
            // Update swipe in mobile mode
            if (this.isMobile && this.pointer.isDown) {
                this.updateSwipe();
            }
        });
        
        window.addEventListener('mouseup', e => {
            this.updatePointerPosition(e);
            this.pointer.isDown = false;
            
            // Complete swipe in mobile mode
            if (this.isMobile && this.swipe.inProgress) {
                this.completeSwipe();
            }
            
            // Reset virtual buttons in mobile mode
            if (this.isMobile) {
                this.resetVirtualButtons();
            }
        });
        
        // Touch events
        window.addEventListener('touchstart', e => {
            e.preventDefault();
            this.updateTouchPosition(e.touches[0]);
            this.pointer.isDown = true;
            
            // Start swipe
            this.swipe.startX = this.pointer.x;
            this.swipe.startY = this.pointer.y;
            this.swipe.inProgress = true;
            
            // Check for virtual button presses
            this.checkVirtualButtonPress();
        });
        
        window.addEventListener('touchmove', e => {
            e.preventDefault();
            this.updateTouchPosition(e.touches[0]);
            
            // Update swipe
            if (this.swipe.inProgress) {
                this.updateSwipe();
            }
        });
        
        window.addEventListener('touchend', e => {
            e.preventDefault();
            this.pointer.isDown = false;
            
            // Complete swipe
            if (this.swipe.inProgress) {
                this.completeSwipe();
            }
            
            // Reset virtual buttons
            this.resetVirtualButtons();
        });
        
        // Prevent context menu
        window.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
    }
    
    // Update input state
    update() {
        // Store previous keyboard state
        this.previousKeys = {...this.keys};
        
        // Store previous pointer state
        this.pointer.wasDown = this.pointer.isDown;
    }
    
    // Update input scale when canvas is resized
    updateScale(scale) {
        this.scale = scale;
    }
    
    // Set mobile mode
    setMobileMode(isMobile) {
        this.isMobile = isMobile;
    }
    
    // Update pointer position from mouse event
    updatePointerPosition(e) {
        const rect = BubbleCoop.canvas.getBoundingClientRect();
        this.pointer.x = (e.clientX - rect.left) * this.scale.x;
        this.pointer.y = (e.clientY - rect.top) * this.scale.y;
    }
    
    // Update pointer position from touch event
    updateTouchPosition(touch) {
        const rect = BubbleCoop.canvas.getBoundingClientRect();
        this.pointer.x = (touch.clientX - rect.left) * this.scale.x;
        this.pointer.y = (touch.clientY - rect.top) * this.scale.y;
    }
    
    // Check if a key was just pressed
    keyPressed(code) {
        return this.keys[code] && !this.previousKeys[code];
    }
    
    // Check if a key is currently down
    keyDown(code) {
        return !!this.keys[code];
    }
    
    // Check if a key was just released
    keyReleased(code) {
        return !this.keys[code] && this.previousKeys[code];
    }
    
    // Check if pointer was just pressed
    pointerPressed() {
        return this.pointer.isDown && !this.pointer.wasDown;
    }
    
    // Check if pointer was just released
    pointerReleased() {
        return !this.pointer.isDown && this.pointer.wasDown;
    }
    
    // Check if virtual button is pressed
    virtualButtonDown(button) {
        return this.isMobile && this.virtualButtons[button].isDown;
    }
    
    // Check for virtual button press
    checkVirtualButtonPress() {
        for (const [button, data] of Object.entries(this.virtualButtons)) {
            const dx = this.pointer.x - data.x;
            const dy = this.pointer.y - data.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= data.radius) {
                data.isDown = true;
            }
        }
    }
    
    // Reset virtual buttons
    resetVirtualButtons() {
        for (const button of Object.values(this.virtualButtons)) {
            button.isDown = false;
        }
    }
    
    // Update swipe state
    updateSwipe() {
        this.swipe.endX = this.pointer.x;
        this.swipe.endY = this.pointer.y;
    }
    
    // Complete swipe gesture and determine direction
    completeSwipe() {
        const dx = this.swipe.endX - this.swipe.startX;
        const dy = this.swipe.endY - this.swipe.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance >= this.swipe.threshold) {
            // Determine swipe direction
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            if (angle > -45 && angle <= 45) {
                this.swipe.direction = 'right';
            } else if (angle > 45 && angle <= 135) {
                this.swipe.direction = 'down';
            } else if (angle > 135 || angle <= -135) {
                this.swipe.direction = 'left';
            } else {
                this.swipe.direction = 'up';
            }
        } else {
            this.swipe.direction = null;
        }
        
        // Reset swipe state
        this.swipe.inProgress = false;
    }
    
    // Get swipe direction and reset
    getSwipe() {
        const direction = this.swipe.direction;
        this.swipe.direction = null;
        return direction;
    }
    
    // Render virtual buttons in mobile mode
    renderVirtualButtons(ctx) {
        if (!this.isMobile) return;
        
        // Set semi-transparent style
        ctx.globalAlpha = 0.5;
        
        // Draw each virtual button
        for (const [name, button] of Object.entries(this.virtualButtons)) {
            ctx.fillStyle = button.isDown ? '#FFCC00' : '#FFFFFF';
            ctx.beginPath();
            ctx.arc(button.x, button.y, button.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add button label
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name, button.x, button.y);
        }
        
        // Reset alpha
        ctx.globalAlpha = 1.0;
    }
};
```
