// AI Concepts Hierarchy - Nested Concentric Rounded Rectangles
// CANVAS_HEIGHT: 560
// Shows how 20 foundational AI concepts relate in a nested hierarchy
// Hover for definitions, click to highlight dependents

let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Currently hovered and selected concept
let hoveredConcept = null;
let selectedConcept = null;

// Tooltip text
let tooltipText = '';
let tooltipX = 0;
let tooltipY = 0;

// Reset button
let resetButton;

// Color palette
const colors = {
  ai:           [200, 220, 245],  // light blue
  ml:           [170, 200, 235],  // medium blue
  nn:           [140, 180, 225],  // deeper blue
  transformer:  [120, 165, 215],  // deep blue
  trainingData: [180, 210, 230],  // steel blue
  transferLearning: [160, 195, 225],
  nlp:          [255, 225, 180],  // light orange
  llm:          [255, 200, 140],  // medium orange
  foundation:   [255, 185, 120],  // deeper orange
  token:        [255, 210, 160],
  contextWindow:[255, 195, 145],
  modelParams:  [255, 180, 130],
  inference:    [255, 170, 115],
  genAI:        [255, 160, 105],
  preTrain:     [250, 200, 155],
  fineTune:     [250, 190, 145],
  api:          [220, 230, 200],  // light green
  chatbot:      [200, 220, 180],
  humanAI:      [180, 210, 165],
  tokenization: [255, 205, 155],
};

// Concept definitions
const definitions = {
  'Artificial Intelligence': 'The broad field of creating systems that can perform tasks typically requiring human intelligence.',
  'Machine Learning': 'A subset of AI where systems learn patterns from data rather than being explicitly programmed.',
  'Neural Network Basics': 'Computing systems inspired by biological neural networks, composed of layers of interconnected nodes.',
  'Transformer Architecture': 'A neural network design using self-attention mechanisms, the foundation of modern LLMs.',
  'Training Data': 'The dataset used to teach a machine learning model to recognize patterns and make predictions.',
  'Transfer Learning': 'Applying knowledge learned from one task to improve performance on a different but related task.',
  'Natural Language Processing': 'The branch of AI focused on enabling computers to understand, interpret, and generate human language.',
  'Large Language Model': 'Massive neural networks trained on vast text corpora that can generate and understand human language.',
  'Foundation Model': 'A large model pre-trained on broad data that can be adapted (fine-tuned) for many downstream tasks.',
  'Pre-Training': 'The initial phase where a model learns general language patterns from a very large corpus of text.',
  'Fine-Tuning': 'Adapting a pre-trained model for a specific task or domain using a smaller, targeted dataset.',
  'Token': 'A unit of text (word, subword, or character) that the model processes as a single element.',
  'Tokenization': 'The process of breaking text into tokens that a language model can process.',
  'Context Window': 'The maximum number of tokens a model can consider at once when generating a response.',
  'Model Parameters': 'The learned weights and biases within a neural network that define its behavior.',
  'Inference': 'The process of using a trained model to generate predictions or responses from new input.',
  'Generative AI': 'AI systems that can create new content (text, images, code) rather than just classifying existing data.',
  'API': 'Application Programming Interface - the structured way applications communicate with AI models.',
  'Chatbot Interface': 'A conversational user interface that lets humans interact with AI through natural language dialogue.',
  'Human-AI Interaction': 'The study and design of how people communicate with and use AI systems effectively.'
};

// Dependency map: concept -> list of concepts that depend on it
const dependents = {
  'Artificial Intelligence': ['Machine Learning', 'Natural Language Processing'],
  'Machine Learning': ['Neural Network Basics', 'Training Data', 'Transfer Learning'],
  'Neural Network Basics': ['Transformer Architecture'],
  'Natural Language Processing': ['Large Language Model', 'API'],
  'Large Language Model': ['Foundation Model', 'Token', 'Tokenization', 'Context Window', 'Model Parameters', 'Inference', 'Generative AI'],
  'Foundation Model': ['Pre-Training', 'Fine-Tuning'],
  'API': ['Chatbot Interface'],
  'Chatbot Interface': ['Human-AI Interaction'],
};

// Get all transitive dependents
function getAllDependents(concept) {
  let result = new Set();
  let queue = [concept];
  while (queue.length > 0) {
    let current = queue.shift();
    if (dependents[current]) {
      for (let dep of dependents[current]) {
        if (!result.has(dep)) {
          result.add(dep);
          queue.push(dep);
        }
      }
    }
  }
  return result;
}

// Concept rectangles calculated dynamically based on canvas width
let conceptRects = [];

function calculateLayout() {
  conceptRects = [];
  let w = canvasWidth;
  let h = drawHeight;
  let m = margin;
  let pad = 8;
  let cornerR = 12;

  // Outermost: AI
  let aiRect = { name: 'Artificial Intelligence', x: m, y: m + 10, w: w - 2*m, h: h - 2*m - 15, color: colors.ai, r: cornerR };
  conceptRects.push(aiRect);

  // Two main branches side by side inside AI
  let innerX = aiRect.x + pad;
  let innerY = aiRect.y + 28;
  let innerW = aiRect.w - 2*pad;
  let innerH = aiRect.h - 35;

  // ML takes left ~45%, NLP takes right ~53%
  let mlW = innerW * 0.44;
  let nlpW = innerW * 0.53;
  let gap = innerW - mlW - nlpW;

  // ML branch
  let mlRect = { name: 'Machine Learning', x: innerX, y: innerY, w: mlW, h: innerH, color: colors.ml, r: cornerR };
  conceptRects.push(mlRect);

  // Inside ML
  let mlInnerX = mlRect.x + pad;
  let mlInnerY = mlRect.y + 25;
  let mlInnerW = mlRect.w - 2*pad;
  let mlInnerH = mlRect.h - 32;

  // Neural Networks at top of ML
  let nnH = mlInnerH * 0.48;
  let nnRect = { name: 'Neural Network Basics', x: mlInnerX, y: mlInnerY, w: mlInnerW, h: nnH, color: colors.nn, r: cornerR };
  conceptRects.push(nnRect);

  // Transformer inside NN
  let transRect = { name: 'Transformer Architecture', x: nnRect.x + pad, y: nnRect.y + 24, w: nnRect.w - 2*pad, h: nnH - 32, color: colors.transformer, r: cornerR };
  conceptRects.push(transRect);

  // Training Data and Transfer Learning below NN
  let bottomY = mlInnerY + nnH + pad;
  let bottomH = mlInnerH - nnH - pad;
  let halfW = (mlInnerW - pad) / 2;

  let tdRect = { name: 'Training Data', x: mlInnerX, y: bottomY, w: halfW, h: bottomH, color: colors.trainingData, r: cornerR };
  conceptRects.push(tdRect);

  let tlRect = { name: 'Transfer Learning', x: mlInnerX + halfW + pad, y: bottomY, w: halfW, h: bottomH, color: colors.transferLearning, r: cornerR };
  conceptRects.push(tlRect);

  // NLP branch
  let nlpX = innerX + mlW + gap;
  let nlpRect = { name: 'Natural Language Processing', x: nlpX, y: innerY, w: nlpW, h: innerH, color: colors.nlp, r: cornerR };
  conceptRects.push(nlpRect);

  // Inside NLP: LLM takes top ~75%, API takes bottom ~23%
  let nlpInnerX = nlpRect.x + pad;
  let nlpInnerY = nlpRect.y + 25;
  let nlpInnerW = nlpRect.w - 2*pad;
  let nlpInnerH = nlpRect.h - 32;

  let llmH = nlpInnerH * 0.73;
  let llmRect = { name: 'Large Language Model', x: nlpInnerX, y: nlpInnerY, w: nlpInnerW, h: llmH, color: colors.llm, r: cornerR };
  conceptRects.push(llmRect);

  // Inside LLM - grid of concepts
  let llmInnerX = llmRect.x + pad;
  let llmInnerY = llmRect.y + 24;
  let llmInnerW = llmRect.w - 2*pad;
  let llmInnerH = llmRect.h - 32;

  // Foundation Model at top spanning full width
  let fmH = llmInnerH * 0.35;
  let fmRect = { name: 'Foundation Model', x: llmInnerX, y: llmInnerY, w: llmInnerW, h: fmH, color: colors.foundation, r: cornerR };
  conceptRects.push(fmRect);

  // Pre-Training and Fine-Tuning inside Foundation Model
  let fmInnerX = fmRect.x + pad;
  let fmInnerY = fmRect.y + 22;
  let fmInnerW = fmRect.w - 2*pad;
  let fmInnerH = fmH - 28;
  let fmHalfW = (fmInnerW - pad) / 2;

  let ptRect = { name: 'Pre-Training', x: fmInnerX, y: fmInnerY, w: fmHalfW, h: fmInnerH, color: colors.preTrain, r: cornerR };
  conceptRects.push(ptRect);

  let ftRect = { name: 'Fine-Tuning', x: fmInnerX + fmHalfW + pad, y: fmInnerY, w: fmHalfW, h: fmInnerH, color: colors.fineTune, r: cornerR };
  conceptRects.push(ftRect);

  // Below Foundation Model: 2 rows of concepts
  let row2Y = llmInnerY + fmH + pad;
  let remainH = llmInnerH - fmH - pad;
  let rowH = (remainH - pad) / 2;
  let col3W = (llmInnerW - 2*pad) / 3;

  // Row 2: Token, Tokenization, Context Window
  let tokRect = { name: 'Token', x: llmInnerX, y: row2Y, w: col3W, h: rowH, color: colors.token, r: cornerR };
  conceptRects.push(tokRect);

  let toknRect = { name: 'Tokenization', x: llmInnerX + col3W + pad, y: row2Y, w: col3W, h: rowH, color: colors.tokenization, r: cornerR };
  conceptRects.push(toknRect);

  let cwRect = { name: 'Context Window', x: llmInnerX + 2*(col3W + pad), y: row2Y, w: col3W, h: rowH, color: colors.contextWindow, r: cornerR };
  conceptRects.push(cwRect);

  // Row 3: Model Parameters, Inference, Generative AI
  let row3Y = row2Y + rowH + pad;

  let mpRect = { name: 'Model Parameters', x: llmInnerX, y: row3Y, w: col3W, h: rowH, color: colors.modelParams, r: cornerR };
  conceptRects.push(mpRect);

  let infRect = { name: 'Inference', x: llmInnerX + col3W + pad, y: row3Y, w: col3W, h: rowH, color: colors.inference, r: cornerR };
  conceptRects.push(infRect);

  let gaRect = { name: 'Generative AI', x: llmInnerX + 2*(col3W + pad), y: row3Y, w: col3W, h: rowH, color: colors.genAI, r: cornerR };
  conceptRects.push(gaRect);

  // API section below LLM
  let apiY = nlpInnerY + llmH + pad;
  let apiH = nlpInnerH - llmH - pad;
  let apiRect = { name: 'API', x: nlpInnerX, y: apiY, w: nlpInnerW, h: apiH, color: colors.api, r: cornerR };
  conceptRects.push(apiRect);

  // Chatbot inside API
  let cbRect = { name: 'Chatbot Interface', x: apiRect.x + pad, y: apiRect.y + 22, w: apiRect.w * 0.55, h: apiH - 28, color: colors.chatbot, r: cornerR };
  conceptRects.push(cbRect);

  // Human-AI Interaction inside Chatbot
  let haiRect = { name: 'Human-AI Interaction', x: cbRect.x + pad, y: cbRect.y + 20, w: cbRect.w - 2*pad, h: cbRect.h - 26, color: colors.humanAI, r: cornerR };
  conceptRects.push(haiRect);
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + 18);
  resetButton.mousePressed(function() {
    selectedConcept = null;
  });
  resetButton.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  calculateLayout();

  describe('Interactive hierarchy diagram of 20 AI concepts shown as nested rounded rectangles. Hover for definitions, click to highlight dependents.', LABEL);
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
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Recalculate layout for responsiveness
  calculateLayout();

  // Determine hovered concept (check from last to first for z-order)
  hoveredConcept = null;
  for (let i = conceptRects.length - 1; i >= 0; i--) {
    let c = conceptRects[i];
    if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) {
      hoveredConcept = c.name;
      break;
    }
  }

  // Get highlighted dependents if a concept is selected
  let highlightedSet = new Set();
  if (selectedConcept) {
    highlightedSet = getAllDependents(selectedConcept);
    highlightedSet.add(selectedConcept);
  }

  // Draw all concept rectangles
  for (let c of conceptRects) {
    let col = c.color;
    let isHighlighted = highlightedSet.has(c.name);
    let isHovered = (hoveredConcept === c.name);
    let isDimmed = selectedConcept && !isHighlighted;

    if (isDimmed) {
      fill(col[0], col[1], col[2], 80);
      stroke(180, 180, 180, 80);
      strokeWeight(1);
    } else if (isHighlighted) {
      fill(col[0], col[1], col[2]);
      stroke(40, 100, 200);
      strokeWeight(2.5);
    } else {
      fill(col[0], col[1], col[2]);
      stroke(100, 100, 100, 120);
      strokeWeight(1);
    }

    if (isHovered && !isDimmed) {
      strokeWeight(3);
      stroke(30, 80, 180);
    }

    rect(c.x, c.y, c.w, c.h, c.r);
    strokeWeight(1);

    // Draw label
    noStroke();
    fill(isDimmed ? color(80, 80, 80, 80) : color(30, 30, 30));

    // Scale text size based on rectangle size
    let labelSize = constrain(c.w * 0.06, 9, 15);
    textSize(labelSize);
    textAlign(LEFT, TOP);

    // Truncate text if too wide
    let displayName = c.name;
    let maxTextW = c.w - 10;
    while (textWidth(displayName) > maxTextW && displayName.length > 3) {
      displayName = displayName.slice(0, -4) + '...';
    }

    text(displayName, c.x + 6, c.y + 4);
  }

  // Draw tooltip if hovering
  if (hoveredConcept && definitions[hoveredConcept]) {
    drawTooltip(hoveredConcept);
  }

  // Draw control area text
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  let instructions = selectedConcept
    ? 'Selected: ' + selectedConcept + '  (dependents highlighted)'
    : 'Hover for definitions. Click a concept to highlight its dependents.';
  text(instructions, 70, drawHeight + controlHeight/2);

  // Reset text defaults
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawTooltip(conceptName) {
  let def = definitions[conceptName];
  let tipX = mouseX + 15;
  let tipY = mouseY - 10;
  let tipW = min(300, canvasWidth * 0.45);

  textSize(12);
  let titleH = 18;

  // Word wrap the definition
  let words = def.split(' ');
  let lines = [];
  let currentLine = '';
  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) > tipW - 16) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let lineH = 15;
  let tipH = titleH + lines.length * lineH + 14;

  // Keep tooltip on screen
  if (tipX + tipW > canvasWidth - 5) tipX = mouseX - tipW - 15;
  if (tipY + tipH > drawHeight - 5) tipY = drawHeight - tipH - 5;
  if (tipY < 5) tipY = 5;

  // Draw tooltip background
  fill(255, 255, 240, 240);
  stroke(100, 100, 100);
  strokeWeight(1);
  rect(tipX, tipY, tipW, tipH, 6);

  // Draw concept name
  noStroke();
  fill(20, 60, 140);
  textSize(13);
  textAlign(LEFT, TOP);
  text(conceptName, tipX + 8, tipY + 5);

  // Draw definition
  fill(40, 40, 40);
  textSize(12);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], tipX + 8, tipY + titleH + 2 + i * lineH);
  }
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;

  // Find the most specific concept clicked (last in array = most nested)
  let clicked = null;
  for (let i = conceptRects.length - 1; i >= 0; i--) {
    let c = conceptRects[i];
    if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) {
      clicked = c.name;
      break;
    }
  }

  if (clicked) {
    selectedConcept = (selectedConcept === clicked) ? null : clicked;
  } else {
    selectedConcept = null;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
