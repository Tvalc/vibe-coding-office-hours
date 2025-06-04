// Animation Generator Tool - Core functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationSelect = document.getElementById('animationSelect');
    const promptTemplate = document.getElementById('promptTemplate');
    const copyPromptBtn = document.getElementById('copyPrompt');
    const framesNeeded = document.getElementById('framesNeeded');
    const frameUpload = document.getElementById('frameUpload');
    const framesContainer = document.getElementById('framesContainer');
    const previewCanvas = document.getElementById('previewCanvas');
    const ctx = previewCanvas.getContext('2d');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const loopBtn = document.getElementById('loopBtn');
    const fpsRange = document.getElementById('fpsRange');
    const fpsValue = document.getElementById('fpsValue');
    const downloadFramesBtn = document.getElementById('downloadFramesBtn');
    const generateSpriteSheetBtn = document.getElementById('generateSpriteSheetBtn');
    const exportGifBtn = document.getElementById('exportGifBtn');
    
    // Animation data
    let currentFrames = [];
    let isPlaying = false;
    let currentFrameIndex = 0;
    let animationInterval;
    let fps = 12;
    let loopAnimation = true;
    
    // Event Listeners
    animationSelect.addEventListener('change', updatePrompt);
    copyPromptBtn.addEventListener('click', copyPromptToClipboard);
    frameUpload.addEventListener('change', handleFrameUpload);
    playPauseBtn.addEventListener('click', togglePlayPause);
    loopBtn.addEventListener('click', toggleLoop);
    fpsRange.addEventListener('input', updateFPS);
    downloadFramesBtn.addEventListener('click', downloadFrames);
    generateSpriteSheetBtn.addEventListener('click', generateSpriteSheet);
    exportGifBtn.addEventListener('click', exportGif);
    
    // Initialize
    function init() {
        console.log('Animation Generator Tool initialized');
        
        // Set canvas size to match display size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    // Resize canvas to match display size
    function resizeCanvas() {
        const container = previewCanvas.parentElement;
        const containerWidth = container.clientWidth;
        const canvasSize = Math.min(containerWidth, 500);
        
        previewCanvas.width = canvasSize;
        previewCanvas.height = canvasSize;
        
        // Redraw if frames are loaded
        if (currentFrames.length > 0) {
            drawFrame(currentFrameIndex);
        }
    }
    
    // Update prompt template based on selected animation
    function updatePrompt() {
        const selectedOption = animationSelect.options[animationSelect.selectedIndex];
        if (!selectedOption.value) {
            promptTemplate.value = '';
            framesNeeded.textContent = 'Select an animation to see required frames';
            return;
        }
        
        const frames = selectedOption.getAttribute('data-frames');
        framesNeeded.textContent = `This animation requires ${frames} frames`;
        
        // Generate prompt
        const animationName = selectedOption.textContent.split(' (')[0];
        promptTemplate.value = `Please create a ${frames}-frame animation for Bubble Coop game showing "${animationName}".\n\nArt style: Vibrant, cartoony, cute with a hint of sci-fi\nConsistency: Maintain same character proportions and style across all frames\nResolution: 512x512 pixels\nBackground: Transparent background preferred\nOutput: ${frames} separate images numbered sequentially`;
    }
    
    // Copy prompt to clipboard
    function copyPromptToClipboard() {
        promptTemplate.select();
        document.execCommand('copy');
        alert('Prompt copied to clipboard!');
    }
    
    // Handle frame uploads
    function handleFrameUpload(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        // Sort files by name to ensure correct order
        files.sort((a, b) => a.name.localeCompare(b.name));
        
        framesContainer.innerHTML = ''; // Clear existing frames
        currentFrames = [];
        
        files.forEach((file, index) => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                // Create frame element
                const frameDiv = document.createElement('div');
                frameDiv.className = 'frame-item';
                
                // Create image
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    currentFrames[index] = img;
                    
                    // If all frames are loaded, draw the first one
                    if (currentFrames.filter(Boolean).length === files.length && index === 0) {
                        drawFrame(0);
                    }
                };
                
                // Create frame number label
                const frameNumber = document.createElement('div');
                frameNumber.className = 'frame-number';
                frameNumber.textContent = `Frame ${index + 1}`;
                
                // Add elements to container
                frameDiv.appendChild(img);
                frameDiv.appendChild(frameNumber);
                framesContainer.appendChild(frameDiv);
                
                // Add click event to preview this frame
                frameDiv.addEventListener('click', () => {
                    stopAnimation();
                    currentFrameIndex = index;
                    drawFrame(currentFrameIndex);
                });
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Draw a specific frame on the canvas
    function drawFrame(index) {
        if (!currentFrames[index]) return;
        
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        
        const img = currentFrames[index];
        const canvasSize = previewCanvas.width;
        
        // Calculate the scaled dimensions while maintaining aspect ratio
        let width, height;
        const aspectRatio = img.width / img.height;
        
        if (aspectRatio >= 1) {
            // Image is wider than tall
            width = Math.min(canvasSize, img.width);
            height = width / aspectRatio;
        } else {
            // Image is taller than wide
            height = Math.min(canvasSize, img.height);
            width = height * aspectRatio;
        }
        
        // Center the image on the canvas
        const x = (canvasSize - width) / 2;
        const y = (canvasSize - height) / 2;
        
        ctx.drawImage(img, x, y, width, height);
    }
    
    // Toggle animation play/pause
    function togglePlayPause() {
        if (currentFrames.length === 0) {
            alert('Please upload animation frames first');
            return;
        }
        
        if (isPlaying) {
            stopAnimation();
            playPauseBtn.textContent = '▶ Play';
        } else {
            startAnimation();
            playPauseBtn.textContent = '⏸ Pause';
        }
    }
    
    // Start the animation
    function startAnimation() {
        if (isPlaying) return;
        
        isPlaying = true;
        animationInterval = setInterval(() => {
            currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length;
            
            // Check if we need to stop at the last frame
            if (!loopAnimation && currentFrameIndex === 0) {
                stopAnimation();
                currentFrameIndex = currentFrames.length - 1;
            }
            
            drawFrame(currentFrameIndex);
        }, 1000 / fps);
    }
    
    // Stop the animation
    function stopAnimation() {
        if (!isPlaying) return;
        
        isPlaying = false;
        clearInterval(animationInterval);
        playPauseBtn.textContent = '▶ Play';
    }
    
    // Toggle looping
    function toggleLoop() {
        loopAnimation = !loopAnimation;
        loopBtn.textContent = loopAnimation ? 'Loop: ON' : 'Loop: OFF';
        loopBtn.classList.toggle('active', loopAnimation);
    }
    
    // Update FPS
    function updateFPS() {
        fps = parseInt(fpsRange.value);
        fpsValue.textContent = fps;
        
        // If animation is currently playing, restart it with the new FPS
        if (isPlaying) {
            stopAnimation();
            startAnimation();
        }
    }
    
    // Download individual frames
    function downloadFrames() {
        if (currentFrames.length === 0) {
            alert('No frames to download');
            return;
        }
        
        alert('Click OK to start downloading each frame individually');
        
        const selectedAnimation = animationSelect.options[animationSelect.selectedIndex].textContent.split(' (')[0];
        const animationName = selectedAnimation.toLowerCase().replace(/\s+/g, '_');
        
        currentFrames.forEach((img, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const link = document.createElement('a');
            link.download = `${animationName}_frame_${index + 1}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
    
    // Generate a sprite sheet
    function generateSpriteSheet() {
        if (currentFrames.length === 0) {
            alert('No frames to generate sprite sheet');
            return;
        }
        
        // Create a canvas for the sprite sheet
        const canvas = document.createElement('canvas');
        const img = currentFrames[0];
        
        // Determine layout (try to make it square-ish)
        const cols = Math.ceil(Math.sqrt(currentFrames.length));
        const rows = Math.ceil(currentFrames.length / cols);
        
        canvas.width = img.width * cols;
        canvas.height = img.height * rows;
        const ctx = canvas.getContext('2d');
        
        // Draw each frame onto the sprite sheet
        currentFrames.forEach((frameImg, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = col * img.width;
            const y = row * img.height;
            
            ctx.drawImage(frameImg, x, y);
        });
        
        // Download the sprite sheet
        const selectedAnimation = animationSelect.options[animationSelect.selectedIndex].textContent.split(' (')[0];
        const animationName = selectedAnimation.toLowerCase().replace(/\s+/g, '_');
        
        const link = document.createElement('a');
        link.download = `${animationName}_spritesheet.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    
    // Export as GIF (requires gif.js library which isn't included)
    function exportGif() {
        if (currentFrames.length === 0) {
            alert('No frames to export as GIF');
            return;
        }
        
        alert('GIF export functionality requires the gif.js library which is not included in this basic version. Add the library to enable this feature.');
    }
    
    // Initialize the app
    init();
});
