// Prompt Iteration Cycle - infographic MicroSim
// CANVAS_HEIGHT: 565
// A five step loop showing how prompt refinement works. Advancing through the
// cycle raises the quality gauge in the centre, making the abstract idea of
// "the prompt got better" concrete. Iteration is a loop, not a failure.

let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

let nextButton;
let resetButton;

let currentStep = 0;
let stepCount = 0;
let selectedStep = 0;
let hoverStep = -1;

const circleTop = 50;
const circleBottom = 390;
const panelTop = 396;
const panelHeight = 112;

const steps = [
  {
    label: 'Write Prompt',
    kind: 'action',
    desc: 'Draft your initial prompt with clear structure and specific instructions.',
    example: 'First draft: "Write about our product launch."\nIt has a topic but no audience, no length, and no format.'
  },
  {
    label: 'Send to Model',
    kind: 'action',
    desc: 'Submit the prompt and receive the AI\'s response.',
    example: 'The model answers instantly and confidently.\nConfidence is not the same as correctness, so read carefully.'
  },
  {
    label: 'Evaluate Response',
    kind: 'evaluate',
    desc: 'Check relevance, accuracy, completeness, and conciseness.',
    example: 'Result: 600 words of generic marketing filler.\nRelevance is fine, but completeness and conciseness both fail.'
  },
  {
    label: 'Diagnose Issues',
    kind: 'evaluate',
    desc: 'Identify what went wrong: too vague? missing context? wrong format?',
    example: 'Response was too generic.\n  Diagnosis: the prompt lacked specificity.\n  Fix: add a word count and name the audience.'
  },
  {
    label: 'Refine Prompt',
    kind: 'action',
    desc: 'Make targeted changes based on your diagnosis, then run the loop again.',
    example: 'Revised: "Write a 150-word launch announcement for existing\ncustomers. Lead with what changes for them. Warm, not salesy."'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  angleMode(DEGREES);

  nextButton = createButton('Next Step');
  nextButton.position(10, drawHeight + 8);
  nextButton.mousePressed(advanceStep);

  resetButton = createButton('Reset');
  resetButton.position(100, drawHeight + 8);
  resetButton.mousePressed(resetCycle);

  describe('A circular five step prompt refinement loop: write prompt, send to model, evaluate response, diagnose issues, refine prompt. A quality gauge in the centre climbs from red to green as the learner advances around the cycle, and each step shows a concrete worked example.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const cx = canvasWidth / 2;
  const cy = (circleTop + circleBottom) / 2 + 2;
  const r = min(canvasWidth * 0.33, 150);
  const nodeW = min(132, canvasWidth * 0.26);
  const nodeH = 40;

  hoverStep = -1;
  for (let i = 0; i < 5; i++) {
    const p = nodePos(cx, cy, r, i);
    if (mouseX >= p.x - nodeW / 2 && mouseX <= p.x + nodeW / 2 &&
        mouseY >= p.y - nodeH / 2 && mouseY <= p.y + nodeH / 2) {
      hoverStep = i;
    }
  }

  drawCycleArrows(cx, cy, r);
  drawQualityGauge(cx, cy);
  for (let i = 0; i < 5; i++) drawStepNode(cx, cy, r, i, nodeW, nodeH);

  drawTitle();
  drawExamplePanel();
  drawControlLabels();
}

function nodePos(cx, cy, r, i) {
  const a = -90 + i * 72;
  return { x: cx + r * cos(a), y: cy + r * sin(a), angle: a };
}

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Prompt Iteration Cycle', canvasWidth / 2, 14);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawCycleArrows(cx, cy, r) {
  noFill();
  stroke('cadetblue');
  strokeWeight(2.5);
  for (let i = 0; i < 5; i++) {
    const a1 = -90 + i * 72 + 16;
    const a2 = -90 + (i + 1) * 72 - 16;
    arc(cx, cy, r * 2, r * 2, a1, a2);
    const hx = cx + r * cos(a2);
    const hy = cy + r * sin(a2);
    push();
    translate(hx, hy);
    rotate(a2 + 90);
    noStroke();
    fill('cadetblue');
    triangle(-5, 0, 5, 0, 0, 9);
    pop();
    noFill();
    stroke('cadetblue');
    strokeWeight(2.5);
  }
}

function drawQualityGauge(cx, cy) {
  const quality = min(1, 0.15 + stepCount * 0.055);
  const gr = 52;

  noFill();
  stroke('gainsboro');
  strokeWeight(11);
  circle(cx, cy, gr * 2);

  if (quality > 0) {
    const gaugeColor = lerpColor(color('crimson'), color('seagreen'), quality);
    stroke(gaugeColor);
    strokeWeight(11);
    arc(cx, cy, gr * 2, gr * 2, -90, -90 + 360 * quality);
  }

  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(22);
  text(round(quality * 100) + '%', cx, cy - 8);
  fill('dimgray');
  textSize(12);
  text('response quality', cx, cy + 14);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawStepNode(cx, cy, r, i, nodeW, nodeH) {
  const p = nodePos(cx, cy, r, i);
  const s = steps[i];
  const isCurrent = currentStep === i;
  const isSelected = selectedStep === i;
  const isHover = hoverStep === i;

  fill(s.kind === 'action' ? 'lightsteelblue' : 'navajowhite');
  if (isCurrent) {
    stroke('crimson');
    strokeWeight(3);
  } else if (isSelected || isHover) {
    stroke('black');
    strokeWeight(2);
  } else {
    stroke('gray');
    strokeWeight(1);
  }
  rect(p.x - nodeW / 2, p.y - nodeH / 2, nodeW, nodeH, 8);

  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(11);
  text(i + 1, p.x - nodeW / 2 + 10, p.y - nodeH / 2 + 4);

  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  drawWrapped(s.label, p.x, p.y + 2, nodeW - 12, 15);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawWrapped(str, cx, cy, maxW, lineH) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line.length === 0 ? word : line + ' ' + word;
    if (textWidth(test) > maxW && line.length > 0) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line.length > 0) lines.push(line);
  const startY = cy - ((lines.length - 1) * lineH) / 2;
  lines.forEach((l, i) => text(l, cx, startY + i * lineH));
}

function drawExamplePanel() {
  const s = steps[selectedStep];

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, panelTop, canvasWidth - 2 * margin, panelHeight, 10);

  noStroke();
  fill(s.kind === 'action' ? 'lightsteelblue' : 'navajowhite');
  rect(margin, panelTop, 8, panelHeight, 10, 0, 0, 10);

  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Step ' + (selectedStep + 1) + ': ' + s.label, margin + 20, panelTop + 9);

  fill('dimgray');
  textSize(13);
  text(s.desc, margin + 20, panelTop + 32, canvasWidth - 2 * margin - 36, 20);

  fill('black');
  textSize(13);
  const lines = s.example.split('\n');
  lines.forEach((l, i) => text(l, margin + 20, panelTop + 56 + i * 17));

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawControlLabels() {
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(RIGHT, CENTER);
  const laps = floor(stepCount / 5);
  text('Steps taken: ' + stepCount + '   Full cycles: ' + laps, canvasWidth - 12, drawHeight + 22);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function advanceStep() {
  currentStep = (currentStep + 1) % 5;
  selectedStep = currentStep;
  stepCount++;
}

function resetCycle() {
  currentStep = 0;
  selectedStep = 0;
  stepCount = 0;
}

function mousePressed() {
  if (hoverStep >= 0) selectedStep = hoverStep;
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
