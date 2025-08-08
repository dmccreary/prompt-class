# Bouncing Ball Slider

## Prompt

!!! prompt
  Generate a p5.js sketch with controls below a drawing region.

  Draw a green ball that bounces around the upper drawing region.

  Add a slider below the drawing region that allows the user to change the speed of the ball.

  Make the drawing region be 300 high.  Place the slider below the drawing region in a 50 high control region.

  Add both a label and value to the left of the slider.

  Make the slider span the region to the right of the label and value.

## Response

[Bouncing Ball With Slider](https://editor.p5js.org/dmccreary/sketches/et2sWNXZb)

```javascript
// bouncing ball with speed slider
// with radius added to edge check and drawing region above controls

let width = 500;
let height = 350;
let drawHeight = 320; // region for drawing
r = 20; // radius of the ball

// initial position
x = 100;
y = 100;
speed = 3; // default speed
// direction of motion
dx = speed;
dy = speed;
sliderLeftMargin = 90;

function setup() {
  const canvas = createCanvas(width, height);
  // canvas.parent('canvas-container');
  textSize(16);
  speedSlider = createSlider(0, 20, speed);
  speedSlider.position(sliderLeftMargin, drawHeight + 5);
  speedSlider.style('width', width - sliderLeftMargin - 15 + 'px');
}

function draw() {
  fill(240);
  noStroke();
  rect(0, 0, width, drawHeight+1); // fill drawing area with light gray
  fill('white');
  rect(0, drawHeight, width, height-drawHeight); // fill control with white
  
  // get the new speed from the UI
  speed = speedSlider.value();

  // adjust the x and y directions
  if (dx > 0) dx = speed;
     else dx = -speed;
  
  if (dy > 0) dy = speed;
     else dy = -speed;
  
  // Add the current speed to the position.
  x += dx;
  y += dy;

  // checks for edges right or left
  if ((x > width-r) || (x < r)) {
    dx = dx * -1; // change direction
  }
  if ((y > drawHeight - r) || (y < r)) {
    dy = dy * -1;
  }

  fill('blue');
  circle(x, y, r*2);
  fill('black');
  strokeWeight(0);
  text('Speed: ' + speed, 10, drawHeight+20)
}
```