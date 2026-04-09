// Foundation Model Training Pipeline - Interactive Infographic
// CANVAS_HEIGHT: 520
// Illustrates the three-stage pipeline: Pre-Training -> Fine-Tuning -> Deployment
// Bloom Level: Understand (L2) - hover/click to explore each stage

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Stage data
let stages = [];
let arrows = [];
let hoveredStage = -1;
let expandedStage = -1;

// Color palette - blue gradient with orange accents
let stageColors;
let stageHoverColors;
let accentColor;

// Example data for expanded view
let exampleData = [
  {
    title: "Sample Pre-Training Data",
    lines: [
      "\"The mitochondria is the powerhouse",
      "of the cell. It produces ATP through",
      "cellular respiration...\"",
      "",
      "\"def quicksort(arr):",
      "    if len(arr) <= 1: return arr\"",
      "",
      "Source: books, websites, code repos"
    ]
  },
  {
    title: "Sample Fine-Tuning Instruction",
    lines: [
      "User: Explain photosynthesis",
      "in simple terms.",
      "",
      "Assistant: Photosynthesis is how",
      "plants make food using sunlight.",
      "They take in CO2 and water, then",
      "use light energy to make sugar",
      "and release oxygen."
    ]
  },
  {
    title: "Sample Prompt & Response",
    lines: [
      "You: Write a haiku about coding.",
      "",
      "AI: Fingers on the keys,",
      "Logic flows like mountain streams,",
      "Bugs dissolve in dawn.",
      "",
      "(Generated token by token)"
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  // Colors
  stageColors = [color(173, 216, 240), color(100, 160, 220), color(50, 120, 190)];
  stageHoverColors = [color(150, 200, 235), color(80, 145, 215), color(35, 105, 185)];
  accentColor = color(255, 140, 50);

  describe('Interactive infographic showing the three-stage foundation model pipeline: pre-training, fine-tuning, and deployment. Hover over stages for details, click to see examples.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  background(245, 248, 252);

  // Draw border
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth - 1, drawHeight - 1);

  // Title
  fill(30, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text('Foundation Model Training Pipeline', canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Subtitle
  fill(100, 120, 140);
  textSize(13);
  text('Hover over each stage for details. Click to see examples.', canvasWidth / 2, 42);

  // Calculate stage layout
  let stageTopY = 75;
  let stageHeight = 160;
  let totalStageWidth = canvasWidth - 2 * margin;
  let stageGap = totalStageWidth * 0.08;
  let arrowWidth = totalStageWidth * 0.07;
  let numStages = 3;
  let numGaps = 2;
  let stageWidth = (totalStageWidth - numGaps * (stageGap + arrowWidth)) / numStages;

  // Build stage rectangles
  stages = [];
  for (let i = 0; i < numStages; i++) {
    let sx = margin + i * (stageWidth + stageGap + arrowWidth);
    stages.push({ x: sx, y: stageTopY, w: stageWidth, h: stageHeight });
  }

  // Stage labels and descriptions
  let stageLabels = ['Pre-Training', 'Fine-Tuning', 'Your Prompt'];
  let stageSubLabels = [
    'Trillions of tokens from\nbooks, web, code',
    'Instructions, conversations,\nhuman feedback',
    'Inference: generating\nresponses token by token'
  ];
  let stageOutputs = ['Foundation Model', 'Specialized Assistant', 'Response'];
  let hoverTexts = [
    'The model learns language patterns by\npredicting the next token billions of times.\nThis requires massive compute and data.',
    'The foundation model is adapted to follow\ninstructions, be helpful, and refuse harmful\nrequests via RLHF and instruction tuning.',
    'The fine-tuned model generates responses\nto your prompts using everything it learned.\nTokens are produced one at a time.'
  ];

  // Draw arrows between stages
  for (let i = 0; i < 2; i++) {
    let arrowLabels = ['Transfer Learning', 'API / Chat Interface'];
    let fromStage = stages[i];
    let toStage = stages[i + 1];
    let ax1 = fromStage.x + fromStage.w + 4;
    let ax2 = toStage.x - 4;
    let ay = stageTopY + stageHeight / 2;

    // Arrow shaft
    stroke(80, 120, 170);
    strokeWeight(3);
    line(ax1, ay, ax2 - 10, ay);

    // Arrow head
    fill(80, 120, 170);
    noStroke();
    triangle(ax2, ay, ax2 - 14, ay - 8, ax2 - 14, ay + 8);

    // Arrow label
    fill(60, 90, 130);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(ITALIC);
    let labelLines = arrowLabels[i].split(' ');
    for (let li = 0; li < labelLines.length; li++) {
      text(labelLines[li], (ax1 + ax2) / 2, ay + 14 + li * 13);
    }
    textStyle(NORMAL);
  }

  // Draw stages
  for (let i = 0; i < numStages; i++) {
    let s = stages[i];
    let isHovered = (hoveredStage === i);
    let isExpanded = (expandedStage === i);

    // Stage box with rounded corners
    if (isHovered || isExpanded) {
      fill(stageHoverColors[i]);
      stroke(50, 90, 150);
      strokeWeight(3);
    } else {
      fill(stageColors[i]);
      stroke(80, 120, 170);
      strokeWeight(1.5);
    }
    rect(s.x, s.y, s.w, s.h, 12);

    // Icon area
    noStroke();
    drawStageIcon(i, s.x + s.w / 2, s.y + 35, s.w);

    // Stage label
    let textCol = (i === 2) ? color(255) : color(20, 40, 70);
    fill(textCol);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text(stageLabels[i], s.x + s.w / 2, s.y + 70);
    textStyle(NORMAL);

    // Sub-label
    let subCol = (i === 2) ? color(220, 230, 240) : color(50, 70, 100);
    fill(subCol);
    textSize(11);
    let subLines = stageSubLabels[i].split('\n');
    for (let li = 0; li < subLines.length; li++) {
      text(subLines[li], s.x + s.w / 2, s.y + 92 + li * 14);
    }

    // Output label with pill background
    let pillY = s.y + s.h - 35;
    let pillW = s.w - 20;
    let pillH = 26;
    if (i === 2) {
      fill(accentColor);
    } else {
      fill(255, 255, 255, 180);
    }
    noStroke();
    rect(s.x + 10, pillY, pillW, pillH, 13);

    fill(i === 2 ? color(255) : color(30, 60, 100));
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(stageOutputs[i], s.x + s.w / 2, pillY + pillH / 2);
    textStyle(NORMAL);
  }

  // Draw hover tooltip or expanded example
  if (expandedStage >= 0) {
    drawExpandedPanel(expandedStage);
  } else if (hoveredStage >= 0) {
    drawHoverPanel(hoveredStage, hoverTexts[hoveredStage]);
  }

  // Footer instruction
  fill(140, 155, 170);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(11);
  textStyle(ITALIC);
  text('Click a stage to see example data. Click again to close.', canvasWidth / 2, drawHeight - 8);
  textStyle(NORMAL);

  // Update cursor
  cursor(hoveredStage >= 0 ? HAND : ARROW);
}

function drawStageIcon(stageIndex, cx, cy, boxWidth) {
  // Simple iconic representations for each stage
  push();
  let iconCol = (stageIndex === 2) ? color(255, 200, 120) : color(50, 90, 150);

  if (stageIndex === 0) {
    // Stack of documents icon
    fill(iconCol);
    noStroke();
    for (let j = 0; j < 3; j++) {
      let offset = j * 6;
      rect(cx - 18 + offset, cy - 12 - offset, 28, 20, 3);
      // Lines on document
      stroke(stageColors[0]);
      strokeWeight(1);
      line(cx - 13 + offset, cy - 6 - offset, cx + 5 + offset, cy - 6 - offset);
      line(cx - 13 + offset, cy - 1 - offset, cx + 2 + offset, cy - 1 - offset);
      noStroke();
    }
  } else if (stageIndex === 1) {
    // Human feedback / annotation icon
    fill(iconCol);
    noStroke();
    rect(cx - 15, cy - 12, 30, 22, 3);
    // Checkmark
    stroke(stageColors[1]);
    strokeWeight(2.5);
    noFill();
    line(cx - 6, cy, cx - 1, cy + 5);
    line(cx - 1, cy + 5, cx + 8, cy - 6);
    noStroke();
  } else {
    // Chat bubble icon
    fill(accentColor);
    noStroke();
    // User bubble
    rect(cx - 20, cy - 15, 22, 14, 5);
    triangle(cx - 14, cy - 1, cx - 10, cy - 1, cx - 17, cy + 5);
    // Assistant bubble
    fill(255, 255, 255, 200);
    rect(cx, cy - 5, 22, 14, 5);
    triangle(cx + 16, cy + 9, cx + 12, cy + 9, cx + 19, cy + 15);
  }
  pop();
}

function drawHoverPanel(stageIndex, hoverText) {
  let panelY = stages[0].y + stages[0].h + 20;
  let panelW = canvasWidth - 2 * margin - 20;
  let panelH = 80;
  let panelX = margin + 10;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(80, 120, 170);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  // Stage name header
  let stageNames = ['Pre-Training', 'Fine-Tuning', 'Your Prompt'];
  fill(30, 60, 100);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text(stageNames[stageIndex], panelX + 12, panelY + 8);
  textStyle(NORMAL);

  // Hover text
  fill(50, 70, 100);
  textSize(12);
  let lines = hoverText.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], panelX + 12, panelY + 28 + i * 16);
  }
}

function drawExpandedPanel(stageIndex) {
  let panelY = stages[0].y + stages[0].h + 20;
  let panelW = canvasWidth - 2 * margin - 20;
  let panelH = 170;
  let panelX = margin + 10;

  // Panel background
  fill(252, 253, 255);
  stroke(50, 90, 150);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title bar
  let barH = 28;
  fill(stageColors[stageIndex]);
  noStroke();
  rect(panelX + 1, panelY + 1, panelW - 2, barH, 7, 7, 0, 0);

  fill(20, 40, 70);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(exampleData[stageIndex].title, panelX + 12, panelY + barH / 2 + 1);
  textStyle(NORMAL);

  // Close indicator
  fill(100, 120, 150);
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('click to close', panelX + panelW - 12, panelY + barH / 2 + 1);

  // Example content in monospace style
  fill(40, 55, 80);
  textAlign(LEFT, TOP);
  textSize(12);
  textFont('monospace');
  let lines = exampleData[stageIndex].lines;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], panelX + 16, panelY + barH + 10 + i * 16);
  }
  textFont('sans-serif');
}

function mouseMoved() {
  hoveredStage = -1;
  for (let i = 0; i < stages.length; i++) {
    let s = stages[i];
    if (mouseX >= s.x && mouseX <= s.x + s.w && mouseY >= s.y && mouseY <= s.y + s.h) {
      hoveredStage = i;
      break;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < stages.length; i++) {
    let s = stages[i];
    if (mouseX >= s.x && mouseX <= s.x + s.w && mouseY >= s.y && mouseY <= s.y + s.h) {
      if (expandedStage === i) {
        expandedStage = -1;
      } else {
        expandedStage = i;
      }
      return;
    }
  }
  // Click outside stages closes expanded panel
  expandedStage = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
