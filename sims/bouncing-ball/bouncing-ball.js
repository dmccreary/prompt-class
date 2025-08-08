// Bouncing Ball MicroSim with speed control
// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 300;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Ball properties
let ballRadius = 20;
let ballX = 100;
let ballY = 100;
let speed = 3; // default speed
let ballVelX = speed;
let ballVelY = speed;

// UI Controls
let speedSlider;

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    
    // Create speed slider
    speedSlider = createSlider(1, 15, 3);
    speedSlider.position(sliderLeftMargin, drawHeight + 15);
    speedSlider.size(containerWidth - sliderLeftMargin - margin);
    
    describe('A bouncing green ball with adjustable speed control.', LABEL);
}

function draw() {
    // Draw the main drawing area with light blue background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);
    
    // Draw the controls area with white background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);
    
    // Get the current speed from the slider
    speed = speedSlider.value();
    
    // Update ball velocity directions based on speed
    if (ballVelX > 0) ballVelX = speed;
    else ballVelX = -speed;
    
    if (ballVelY > 0) ballVelY = speed;
    else ballVelY = -speed;
    
    // Update ball position
    ballX += ballVelX;
    ballY += ballVelY;
    
    // Check for collisions with edges of the drawing area
    if ((ballX > canvasWidth - ballRadius) || (ballX < ballRadius)) {
        ballVelX = ballVelX * -1; // reverse horizontal direction
    }
    if ((ballY > drawHeight - ballRadius) || (ballY < ballRadius)) {
        ballVelY = ballVelY * -1; // reverse vertical direction
    }
    
    // Draw the green ball
    fill('green');
    stroke('darkgreen');
    strokeWeight(2);
    circle(ballX, ballY, ballRadius * 2);
    
    // Draw control labels and values
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Speed: ' + speed, margin, drawHeight + 25);
}

function windowResized() {
    // Update canvas size when the container resizes
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
    
    // Resize the slider to match the new canvasWidth
    speedSlider.size(containerWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    // Get the exact dimensions of the container
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);  // Avoid fractional pixels
    canvasWidth = containerWidth;
}