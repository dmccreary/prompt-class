// Prompt Iteration Cycle - Interactive Infographic
// CANVAS_HEIGHT: 545
// Visualizes the iterative prompt refinement loop with 5 nodes in a clockwise cycle
// Click nodes to see concrete examples; quality gauge advances with each full cycle

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Node definitions
let nodes = [];
let currentNode = -1; // -1 means no node selected
let iterationCount = 0;
let stepsInCurrentCycle = 0;
let maxIterations = 5;
let visitedInCycle = [false, false, false, false, false];

// Reset button
let resetButton;

// Example data for each node - shows progression across iterations
let examples = [
  { // Write Prompt
    title: "Write Prompt",
    iterations: [
      "\"Tell me about dogs\"",
      "\"Write a 200-word summary about golden retrievers for pet owners\"",
      "\"Write a 200-word summary about golden retrievers for first-time pet owners, covering temperament, exercise needs, and grooming\"",
      "\"As a veterinarian, write a 200-word guide for first-time golden retriever owners covering temperament, daily exercise needs, and weekly grooming routine. Use bullet points.\"",
      "\"As a veterinarian writing for first-time golden retriever owners: create a 200-word care guide with bullet points covering (1) temperament traits, (2) daily exercise plan, (3) weekly grooming checklist. Tone: warm but professional.\""
    ]
  },
  { // Send to Model
    title: "Send to Model",
    iterations: [
      "Model returns a generic 500-word essay about all dog breeds",
      "Model returns a focused 200-word summary about golden retrievers",
      "Model returns a good summary but misses grooming details",
      "Model returns a well-structured bullet-point guide with all topics",
      "Model returns a perfectly targeted, actionable care guide"
    ]
  },
  { // Evaluate Response
    title: "Evaluate Response",
    iterations: [
      "Too broad, wrong length, no focus on specific breed",
      "Right length and breed, but not targeted to audience",
      "Good focus, but format is a wall of text — hard to scan",
      "Great structure! But tone is a bit clinical for new owners",
      "Excellent! Meets all criteria: length, format, tone, content"
    ]
  },
  { // Diagnose Issues
    title: "Diagnose Issues",
    iterations: [
      "Diagnosis: Prompt too vague — no breed, length, or audience specified",
      "Diagnosis: Missing audience context — who is this for?",
      "Diagnosis: No format instruction — need bullet points or structure",
      "Diagnosis: Missing tone guidance — should feel welcoming, not clinical",
      "Diagnosis: No issues found — prompt is well-crafted!"
    ]
  },
  { // Refine Prompt
    title: "Refine Prompt",
    iterations: [
      "Fix: Add specific breed, word count, and target audience",
      "Fix: Add specific topics to cover (temperament, exercise, grooming)",
      "Fix: Add role (veterinarian) and format (bullet points)",
      "Fix: Add tone instruction (warm but professional)",
      "The prompt is optimized — save it as a template for future use!"
    ]
  }
];

// Colors
let blueNode = [70, 130, 200];
let orangeNode = [230, 140, 50];
let greenGauge = [60, 180, 80];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create Reset button
  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(10, drawHeight + 8);
  resetButton.mousePressed(resetSimulation);

  // Initialize nodes — positions are calculated in draw based on canvas size
  initNodes();

  describe('Interactive prompt iteration cycle diagram. Click each of the 5 nodes in clockwise order to see examples of prompt refinement. A quality gauge in the center fills as you complete cycles.', LABEL);
}

function initNodes() {
  let nodeLabels = [
    { label: "Write\nPrompt", color: blueNode, hover: "Draft your initial prompt with clear structure and specific instructions" },
    { label: "Send to\nModel", color: blueNode, hover: "Submit the prompt and receive the AI's response" },
    { label: "Evaluate\nResponse", color: orangeNode, hover: "Check relevance, accuracy, completeness, and conciseness" },
    { label: "Diagnose\nIssues", color: orangeNode, hover: "Identify what went wrong: too vague? missing context? wrong format?" },
    { label: "Refine\nPrompt", color: blueNode, hover: "Make targeted changes based on your diagnosis" }
  ];
  nodes = nodeLabels.map((n, i) => ({
    ...n,
    index: i
  }));
}

function getNodePositions() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 - 10;
  let radiusX = Math.min(canvasWidth * 0.32, 200);
  let radiusY = Math.min(drawHeight * 0.30, 160);
  let nodeRadius = Math.min(canvasWidth * 0.09, 55);

  let positions = [];
  for (let i = 0; i < 5; i++) {
    // Start from top (angle = -PI/2), go clockwise
    let angle = -PI / 2 + (TWO_PI / 5) * i;
    positions.push({
      x: centerX + radiusX * cos(angle),
      y: centerY + radiusY * sin(angle),
      radius: nodeRadius
    });
  }
  return { positions, centerX, centerY, radiusX, radiusY, nodeRadius };
}

function draw() {
  updateCanvasSize();

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let layout = getNodePositions();
  let { positions, centerX, centerY, radiusX, radiusY, nodeRadius } = layout;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(Math.min(24, canvasWidth * 0.05));
  text('Prompt Iteration Cycle', canvasWidth / 2, 10);

  // Draw curved arrows between nodes
  drawArrows(positions, nodeRadius);

  // Draw quality gauge in center
  drawQualityGauge(centerX, centerY, nodeRadius * 0.9);

  // Draw nodes
  let hoveredNode = -1;
  for (let i = 0; i < 5; i++) {
    let p = positions[i];
    let d = dist(mouseX, mouseY, p.x, p.y);
    let isHovered = d < p.radius;
    let isSelected = i === currentNode;
    let isVisited = visitedInCycle[i];

    if (isHovered) hoveredNode = i;

    // Node circle
    strokeWeight(isSelected ? 4 : 2);
    stroke(isSelected ? 'gold' : (isVisited ? [100, 100, 100] : 'white'));

    let col = nodes[i].color;
    if (isSelected) {
      fill(col[0] + 40, col[1] + 40, col[2] + 40);
    } else if (isHovered) {
      fill(col[0] + 20, col[1] + 20, col[2] + 20);
    } else {
      fill(col[0], col[1], col[2]);
    }
    ellipse(p.x, p.y, p.radius * 2);

    // Node label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(Math.min(13, nodeRadius * 0.42));
    text(nodes[i].label, p.x, p.y);

    // Step number
    textSize(Math.min(11, nodeRadius * 0.32));
    fill(255, 255, 255, 180);
    text("Step " + (i + 1), p.x, p.y - nodeRadius * 0.65);
  }

  // Draw hover tooltip
  if (hoveredNode >= 0 && currentNode < 0) {
    drawTooltip(hoveredNode, positions[hoveredNode]);
  }

  // Draw example panel if a node is selected
  if (currentNode >= 0) {
    drawExamplePanel();
  }

  // Control area labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  let iterText = 'Iteration: ' + iterationCount + ' / ' + maxIterations;
  text(iterText, 70, drawHeight + 22);

  // Instructions
  textAlign(RIGHT, CENTER);
  textSize(Math.min(14, canvasWidth * 0.03));
  fill(100);
  text('Click nodes clockwise to iterate', canvasWidth - 10, drawHeight + 22);
}

function drawArrows(positions, nodeRadius) {
  for (let i = 0; i < 5; i++) {
    let from = positions[i];
    let to = positions[(i + 1) % 5];

    // Calculate arrow start/end just outside the node circles
    let angle = atan2(to.y - from.y, to.x - from.x);
    let startX = from.x + cos(angle) * (nodeRadius + 4);
    let startY = from.y + sin(angle) * (nodeRadius + 4);
    let endX = to.x - cos(angle) * (nodeRadius + 10);
    let endY = to.y - sin(angle) * (nodeRadius + 10);

    // Determine if this arrow represents a completed step
    let isCompleted = visitedInCycle[i] && visitedInCycle[(i + 1) % 5];

    stroke(isCompleted ? [60, 180, 80] : [180, 180, 180]);
    strokeWeight(isCompleted ? 3 : 2);
    noFill();

    // Curved arrow using bezier - curve outward from center
    let cx = canvasWidth / 2;
    let cy = drawHeight / 2 - 10;
    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;
    // Push control point away from center for curve effect
    let pushX = (midX - cx) * 0.3;
    let pushY = (midY - cy) * 0.3;
    let cpX = midX + pushX;
    let cpY = midY + pushY;

    // Draw quadratic bezier as line segments
    beginShape();
    noFill();
    for (let t = 0; t <= 1; t += 0.05) {
      let bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
      let by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;
      vertex(bx, by);
    }
    endShape();

    // Arrowhead
    let arrowAngle = atan2(endY - cpY, endX - cpX);
    let arrowSize = 10;
    fill(isCompleted ? [60, 180, 80] : [180, 180, 180]);
    noStroke();
    triangle(
      endX, endY,
      endX - arrowSize * cos(arrowAngle - 0.4), endY - arrowSize * sin(arrowAngle - 0.4),
      endX - arrowSize * cos(arrowAngle + 0.4), endY - arrowSize * sin(arrowAngle + 0.4)
    );
  }
}

function drawQualityGauge(cx, cy, radius) {
  let gaugeRadius = radius * 0.8;
  let quality = iterationCount / maxIterations; // 0 to 1

  // Background circle
  fill(240);
  stroke('silver');
  strokeWeight(1);
  ellipse(cx, cy, gaugeRadius * 2);

  // Quality arc - from red through yellow to green
  noFill();
  strokeWeight(gaugeRadius * 0.35);

  // Background arc (gray)
  stroke(220);
  arc(cx, cy, gaugeRadius * 1.4, gaugeRadius * 1.4, -PI * 0.8, PI * 0.8);

  // Filled arc based on quality
  if (quality > 0) {
    let arcEnd = -PI * 0.8 + quality * PI * 1.6;
    // Color interpolation: red -> yellow -> green
    let r, g, b;
    if (quality < 0.5) {
      r = 220;
      g = Math.floor(80 + quality * 2 * 160);
      b = 50;
    } else {
      r = Math.floor(220 - (quality - 0.5) * 2 * 160);
      g = 180;
      b = Math.floor(50 + (quality - 0.5) * 2 * 30);
    }
    stroke(r, g, b);
    arc(cx, cy, gaugeRadius * 1.4, gaugeRadius * 1.4, -PI * 0.8, arcEnd);
  }

  // Quality label
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(Math.min(11, gaugeRadius * 0.4));
  text('Quality', cx, cy - gaugeRadius * 0.2);
  textSize(Math.min(16, gaugeRadius * 0.55));
  fill(quality >= 0.8 ? [60, 150, 60] : (quality >= 0.4 ? [180, 140, 30] : [200, 80, 50]));
  text(Math.round(quality * 100) + '%', cx, cy + gaugeRadius * 0.2);
}

function drawTooltip(nodeIndex, pos) {
  let hoverText = nodes[nodeIndex].hover;
  let boxWidth = Math.min(280, canvasWidth * 0.55);
  let boxHeight = 50;
  let boxX = constrain(pos.x - boxWidth / 2, 5, canvasWidth - boxWidth - 5);
  let boxY = pos.y + pos.radius + 10;
  if (boxY + boxHeight > drawHeight - 10) {
    boxY = pos.y - pos.radius - boxHeight - 10;
  }

  fill(50, 50, 50, 230);
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 8);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(Math.min(12, canvasWidth * 0.028));
  text(hoverText, boxX + boxWidth / 2, boxY + boxHeight / 2, boxWidth - 16);
}

function drawExamplePanel() {
  let iter = Math.min(iterationCount, maxIterations - 1);
  let ex = examples[currentNode];
  let panelHeight = 80;
  let panelY = drawHeight - panelHeight - 5;
  let panelWidth = canvasWidth - 20;
  let panelX = 10;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(nodes[currentNode].color[0], nodes[currentNode].color[1], nodes[currentNode].color[2]);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Panel title
  noStroke();
  fill(nodes[currentNode].color[0], nodes[currentNode].color[1], nodes[currentNode].color[2]);
  textAlign(LEFT, TOP);
  textSize(Math.min(14, canvasWidth * 0.032));
  text(ex.title + ' — Iteration ' + (iter + 1), panelX + 10, panelY + 6);

  // Panel content
  fill(50);
  textSize(Math.min(12, canvasWidth * 0.028));
  textAlign(LEFT, TOP);
  let content = ex.iterations[iter];
  text(content, panelX + 10, panelY + 24, panelWidth - 20, panelHeight - 30);
}

function mousePressed() {
  let layout = getNodePositions();
  let positions = layout.positions;

  for (let i = 0; i < 5; i++) {
    let p = positions[i];
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < p.radius) {
      // Check if clicking the expected next node in sequence
      let expectedNext = getExpectedNextNode();

      if (i === expectedNext || currentNode < 0) {
        currentNode = i;
        visitedInCycle[i] = true;
        stepsInCurrentCycle++;

        // Check if we completed a full cycle
        if (stepsInCurrentCycle >= 5 && allVisited()) {
          if (iterationCount < maxIterations) {
            iterationCount++;
          }
          // Reset for next cycle (but keep iteration count)
          if (iterationCount < maxIterations) {
            visitedInCycle = [false, false, false, false, false];
            stepsInCurrentCycle = 0;
            currentNode = -1;
          }
        }
      } else {
        // Clicked wrong node — just show it but highlight expected
        currentNode = i;
      }
      return;
    }
  }

  // Clicked outside all nodes — deselect
  currentNode = -1;
}

function getExpectedNextNode() {
  if (currentNode < 0) return 0; // Start with node 0
  // Find first unvisited node in clockwise order after current
  for (let step = 1; step <= 5; step++) {
    let next = (currentNode + step) % 5;
    if (!visitedInCycle[next]) return next;
  }
  return (currentNode + 1) % 5;
}

function allVisited() {
  return visitedInCycle.every(v => v);
}

function resetSimulation() {
  currentNode = -1;
  iterationCount = 0;
  stepsInCurrentCycle = 0;
  visitedInCycle = [false, false, false, false, false];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
