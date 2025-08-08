# Bouncing Ball

Building on the last p5.js ball, lets now add some animation.

## Prompt

!!! prompt
  Generate a p5.js sketch on a 400x400 canvas.
  Draw a green ball that bounces around the canvas.

[Run the Simulation on P5.js Editor](https://editor.p5js.org/dmccrearytg/sketches/llAbyJ5-G)

## Sample Code

```javascript
let x, y;
let vx, vy;
let radius = 20;

function setup() {
  createCanvas(400, 400);
  // Initialize position in the middle of the canvas
  x = width / 2;
  y = height / 2;
  // Initialize velocity with random values
  vx = random(-5, 5);
  vy = random(-5, 5);
}

function draw() {
  background(220);

  // Move the ball by updating its position with its velocity
  x += vx;
  y += vy;

  // Check for collision with the canvas edges and reverse velocity if needed
  if (x + radius > width || x - radius < 0) {
    vx *= -1; // Reverse x velocity
  }
  if (y + radius > height || y - radius < 0) {
    vy *= -1; // Reverse y velocity
  }

  // Draw the ball
  fill('green');
  ellipse(x, y, radius * 2, radius * 2);
}
```

[https://editor.p5js.org/](https://editor.p5js.org/)
