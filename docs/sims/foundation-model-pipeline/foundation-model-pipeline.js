// Foundation Model Training Pipeline - infographic MicroSim
// CANVAS_HEIGHT: 525
// Steps through the three stages that turn raw text into a useful AI assistant:
// pre-training, fine-tuning, and deployment. Each stage can be inspected on its
// own, and the example toggle swaps the plain-language explanation for concrete
// sample data.

let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

let prevButton;
let nextButton;
let resetButton;
let exampleCheckbox;

let selectedStage = 0;
let hoverStage = -1;

const boxTop = 62;
const boxHeight = 190;
const panelTop = 268;
const panelHeight = 200;
const arrowWidth = 96;

const stages = [
  {
    number: '1',
    label: 'Pre-Training',
    sub: 'Trillions of tokens from books, the web, and code',
    output: 'Foundation Model',
    fillColor: 'lightsteelblue',
    outputColor: 'aliceblue',
    explain: 'The model learns language patterns by predicting the next token billions of times. Nobody tells it grammar or facts directly. It infers both from statistical regularities in an enormous pile of text.',
    exampleTitle: 'Sample pre-training text',
    example: 'Input seen by the model:\n   "The capital of France is ___"\n\nThe model guesses a token, compares it to the real next token\n("Paris"), and nudges its weights. Repeat a few trillion times.\n\nCost: months of compute on thousands of GPUs. Done once.',
    icon: 'documents'
  },
  {
    number: '2',
    label: 'Fine-Tuning',
    sub: 'Instructions, conversations, and human feedback',
    output: 'Specialized Assistant',
    fillColor: 'cornflowerblue',
    outputColor: 'aliceblue',
    explain: 'The foundation model is adapted to follow instructions, be helpful, and refuse harmful requests. This stage is tiny compared to pre-training, but it is what makes the model feel like an assistant instead of an autocomplete engine.',
    exampleTitle: 'Sample fine-tuning instruction',
    example: 'Instruction:\n   "Summarize this email in two sentences."\nPreferred response:\n   "The client is asking for a deadline extension to Friday.\n    They need approval before the design review."\n\nHuman reviewers rank candidate responses. Higher-ranked\nanswers get reinforced. This is where tone and safety come from.',
    icon: 'feedback'
  },
  {
    number: '3',
    label: 'Your Prompt',
    sub: 'Inference: generating a response one token at a time',
    output: 'Response',
    fillColor: 'sandybrown',
    outputColor: 'papayawhip',
    explain: 'The fine-tuned model generates responses to your prompts using everything it learned. No further training happens here. Your prompt is the only lever you control, which is exactly why prompt engineering matters.',
    exampleTitle: 'Sample prompt and response',
    example: 'Your prompt:\n   "Write a warm follow-up email to a client who missed\n    a deadline. Keep the tone constructive."\n\nResponse (generated token by token):\n   "Hi Sam - checking in on the deliverable we discussed..."\n\nThe model weights never change. Only your prompt does.',
    icon: 'chat'
  }
];

const arrowLabels = ['Transfer Learning', 'API / Chat Interface'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  prevButton = createButton('Prev Stage');
  prevButton.position(10, drawHeight + 8);
  prevButton.mousePressed(() => { selectedStage = (selectedStage + 2) % 3; });

  nextButton = createButton('Next Stage');
  nextButton.position(105, drawHeight + 8);
  nextButton.mousePressed(() => { selectedStage = (selectedStage + 1) % 3; });

  resetButton = createButton('Reset');
  resetButton.position(200, drawHeight + 8);
  resetButton.mousePressed(() => { selectedStage = 0; exampleCheckbox.checked(false); });

  exampleCheckbox = createCheckbox('Show Example Data', false);
  exampleCheckbox.position(268, drawHeight + 12);

  describe('A three stage pipeline showing how a language model is built: pre-training on trillions of tokens produces a foundation model, fine-tuning on instructions and human feedback produces a specialized assistant, and inference turns your prompt into a response. Each stage can be selected to read a detailed explanation or concrete example data.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const boxWidth = (canvasWidth - 2 * margin - 2 * arrowWidth) / 3;
  hoverStage = -1;
  for (let i = 0; i < 3; i++) {
    const x = margin + i * (boxWidth + arrowWidth);
    if (mouseX >= x && mouseX <= x + boxWidth && mouseY >= boxTop && mouseY <= boxTop + boxHeight) {
      hoverStage = i;
    }
  }

  for (let i = 0; i < 2; i++) {
    const ax = margin + (i + 1) * boxWidth + i * arrowWidth;
    drawArrow(ax, boxTop + boxHeight / 2, arrowWidth);
  }

  for (let i = 0; i < 3; i++) {
    drawStage(i, margin + i * (boxWidth + arrowWidth), boxWidth);
  }

  // Arrow labels are drawn last so the stage boxes never cover them
  for (let i = 0; i < 2; i++) {
    const ax = margin + (i + 1) * boxWidth + i * arrowWidth;
    drawArrowLabel(ax, boxTop + boxHeight / 2, arrowWidth, arrowLabels[i]);
  }

  drawTitle();
  drawDetailPanel();
  drawControlLabels();
}

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Foundation Model Training Pipeline', canvasWidth / 2, 14);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawStage(i, x, w) {
  const s = stages[i];
  const isSelected = selectedStage === i;
  const isHover = hoverStage === i;

  fill(s.fillColor);
  if (isSelected) {
    stroke('crimson');
    strokeWeight(3);
  } else if (isHover) {
    stroke('black');
    strokeWeight(2);
  } else {
    stroke('gray');
    strokeWeight(1);
  }
  rect(x, boxTop, w, boxHeight, 10);

  // Stage number badge
  fill('white');
  stroke('gray');
  strokeWeight(1);
  circle(x + 20, boxTop + 20, 26);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(15);
  text(s.number, x + 20, boxTop + 20);

  drawIcon(s.icon, x + w / 2, boxTop + 62, w);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(17);
  text(s.label, x + w / 2, boxTop + 88);

  fill('dimgray');
  textSize(12);
  text(s.sub, x + 8, boxTop + 112, w - 16, 46);

  // Output chip
  fill(s.outputColor);
  stroke('gray');
  strokeWeight(1);
  rect(x + 10, boxTop + boxHeight - 32, w - 20, 24, 6);
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, CENTER);
  text(s.output, x + w / 2, boxTop + boxHeight - 20);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawIcon(kind, cx, cy, boxW) {
  const scale = min(1, boxW / 190);
  push();
  translate(cx, cy);
  strokeWeight(1);
  stroke('dimgray');
  if (kind === 'documents') {
    fill('white');
    for (let i = 2; i >= 0; i--) {
      rect(-16 * scale + i * 6 * scale, -14 * scale - i * 4 * scale, 26 * scale, 30 * scale, 3);
    }
  } else if (kind === 'feedback') {
    fill('white');
    rect(-18 * scale, -14 * scale, 30 * scale, 30 * scale, 3);
    stroke('cornflowerblue');
    strokeWeight(2);
    for (let i = 0; i < 3; i++) {
      line(-13 * scale, (-7 + i * 7) * scale, 6 * scale, (-7 + i * 7) * scale);
    }
    noStroke();
    fill('mediumseagreen');
    circle(14 * scale, 10 * scale, 16 * scale);
    stroke('white');
    strokeWeight(2);
    line(10 * scale, 10 * scale, 13 * scale, 14 * scale);
    line(13 * scale, 14 * scale, 18 * scale, 6 * scale);
  } else {
    fill('white');
    rect(-22 * scale, -16 * scale, 28 * scale, 18 * scale, 5);
    fill('papayawhip');
    rect(-4 * scale, 2 * scale, 28 * scale, 18 * scale, 5);
  }
  pop();
}

function drawArrow(x, y, w) {
  stroke('dimgray');
  strokeWeight(2);
  const x2 = x + w - 10;
  line(x + 6, y, x2, y);
  noStroke();
  fill('dimgray');
  triangle(x2, y - 6, x2, y + 6, x2 + 9, y);
}

function drawArrowLabel(x, y, w, label) {
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(12);
  drawWrapped(label, x + w / 2, y - 24, w - 6, 14);
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

function drawDetailPanel() {
  const s = stages[selectedStage];
  const showExample = exampleCheckbox.checked();

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, panelTop, canvasWidth - 2 * margin, panelHeight, 10);

  noStroke();
  fill(s.fillColor);
  rect(margin, panelTop, 8, panelHeight, 10, 0, 0, 10);

  fill('black');
  textAlign(LEFT, TOP);
  textSize(17);
  text('Stage ' + s.number + ': ' + (showExample ? s.exampleTitle : s.label),
    margin + 20, panelTop + 12);

  fill('dimgray');
  if (showExample) {
    textSize(13);
    textAlign(LEFT, TOP);
    const lines = s.example.split('\n');
    lines.forEach((l, i) => text(l, margin + 20, panelTop + 44 + i * 18));
  } else {
    textSize(15);
    text(s.explain, margin + 20, panelTop + 44, canvasWidth - 2 * margin - 36, panelHeight - 60);
  }

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawControlLabels() {
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('Stage ' + (selectedStage + 1) + ' of 3', canvasWidth - 12, drawHeight + 22);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function mousePressed() {
  if (hoverStage >= 0) selectedStage = hoverStage;
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
