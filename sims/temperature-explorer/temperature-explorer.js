// Temperature Explorer - Interactive Token Probability Distribution
// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Controls
let tempSlider;
let generateOneBtn, generateTenBtn, resetBtn;
let promptInput;

// Token data - simulated candidate tokens for "The best way to learn is"
let baseTokens = [
  { word: "to", prob: 0.28 },
  { word: "by", prob: 0.18 },
  { word: "through", prob: 0.14 },
  { word: "from", prob: 0.10 },
  { word: "a", prob: 0.08 },
  { word: "practice", prob: 0.06 },
  { word: "with", prob: 0.05 },
  { word: "not", prob: 0.04 },
  { word: "actually", prob: 0.04 },
  { word: "something", prob: 0.03 }
];

// Alternative token sets for subsequent tokens
let tokenSets = [
  [
    { word: "practice", prob: 0.22 }, { word: "do", prob: 0.18 },
    { word: "experiment", prob: 0.12 }, { word: "try", prob: 0.10 },
    { word: "make", prob: 0.09 }, { word: "build", prob: 0.07 },
    { word: "explore", prob: 0.06 }, { word: "dance", prob: 0.05 },
    { word: "fail", prob: 0.06 }, { word: "juggle", prob: 0.05 }
  ],
  [
    { word: "and", prob: 0.20 }, { word: "things", prob: 0.16 },
    { word: "mistakes", prob: 0.14 }, { word: "it", prob: 0.12 },
    { word: "new", prob: 0.10 }, { word: "stuff", prob: 0.08 },
    { word: "fearlessly", prob: 0.06 }, { word: "wildly", prob: 0.05 },
    { word: "backwards", prob: 0.05 }, { word: "upside-down", prob: 0.04 }
  ],
  [
    { word: "every", prob: 0.18 }, { word: "then", prob: 0.16 },
    { word: "again", prob: 0.14 }, { word: "often", prob: 0.12 },
    { word: "with", prob: 0.10 }, { word: "while", prob: 0.08 },
    { word: "creatively", prob: 0.07 }, { word: "together", prob: 0.06 },
    { word: "loudly", prob: 0.05 }, { word: "underwater", prob: 0.04 }
  ]
];

let generatedTokens = [];
let currentTokenSet = 0;
let selectedBarIndex = -1;
let animationTimer = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Row 1: Temperature slider
  let row1 = createDiv();
  row1.parent(document.querySelector('main'));
  row1.position(10, drawHeight + 8);
  row1.style('display', 'flex');
  row1.style('align-items', 'center');
  row1.style('font-family', 'Arial, Helvetica, sans-serif');
  row1.style('font-size', '14px');

  let tempLabel = createSpan('Temperature: ');
  tempLabel.parent(row1);
  tempLabel.style('display', 'inline-block');
  tempLabel.style('width', '110px');
  tempLabel.style('font-weight', 'bold');

  tempSlider = createSlider(0, 20, 7, 1);
  tempSlider.parent(row1);
  tempSlider.style('width', '180px');

  // Row 2: Buttons
  let row2 = createDiv();
  row2.parent(document.querySelector('main'));
  row2.position(10, drawHeight + 42);
  row2.style('font-family', 'Arial, Helvetica, sans-serif');

  generateOneBtn = createButton('Generate Next Token');
  generateOneBtn.parent(row2);
  generateOneBtn.mousePressed(generateOneToken);
  generateOneBtn.style('margin-right', '8px');
  generateOneBtn.style('padding', '4px 12px');
  generateOneBtn.style('font-size', '14px');
  generateOneBtn.style('cursor', 'pointer');

  generateTenBtn = createButton('Generate 10 Tokens');
  generateTenBtn.parent(row2);
  generateTenBtn.mousePressed(generateTenTokens);
  generateTenBtn.style('margin-right', '8px');
  generateTenBtn.style('padding', '4px 12px');
  generateTenBtn.style('font-size', '14px');
  generateTenBtn.style('cursor', 'pointer');

  resetBtn = createButton('Reset');
  resetBtn.parent(row2);
  resetBtn.mousePressed(resetGeneration);
  resetBtn.style('padding', '4px 12px');
  resetBtn.style('font-size', '14px');
  resetBtn.style('cursor', 'pointer');

  // Row 3: Prompt input
  let row3 = createDiv();
  row3.parent(document.querySelector('main'));
  row3.position(10, drawHeight + 76);
  row3.style('display', 'flex');
  row3.style('align-items', 'center');
  row3.style('font-family', 'Arial, Helvetica, sans-serif');
  row3.style('font-size', '14px');

  let promptLabel = createSpan('Prompt: ');
  promptLabel.parent(row3);
  promptLabel.style('display', 'inline-block');
  promptLabel.style('width', '60px');
  promptLabel.style('font-weight', 'bold');

  promptInput = createInput('The best way to learn is');
  promptInput.parent(row3);
  promptInput.style('width', '300px');
  promptInput.style('padding', '4px 8px');
  promptInput.style('font-size', '14px');
  promptInput.changed(resetGeneration);

  describe('Interactive temperature explorer showing how temperature affects token probability distribution in language models', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let temperature = tempSlider.value() / 10;

  // Title
  fill('black');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Temperature Explorer', canvasWidth / 2, 8);

  // Temperature value display
  textSize(16);
  textAlign(LEFT, TOP);
  let tempColor = lerpColor(color('blue'), color('red'), temperature / 2.0);
  fill(tempColor);
  noStroke();
  text('T = ' + temperature.toFixed(1), canvasWidth - 80, 12);

  // Calculate adjusted probabilities
  let adjustedProbs = applyTemperature(baseTokens, temperature);

  // Draw bar chart
  drawBarChart(adjustedProbs, temperature);

  // Draw generated sentence
  drawSentence();

  // Draw temperature description
  drawTempDescription(temperature);

  // Reset text defaults
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function applyTemperature(tokens, temp) {
  if (temp === 0) {
    // Greedy: all probability on the top token
    let result = tokens.map((t, i) => ({
      word: t.word,
      prob: i === 0 ? 1.0 : 0.0
    }));
    return result;
  }

  // Apply temperature scaling via softmax
  let logits = tokens.map(t => Math.log(t.prob + 1e-10));
  let scaledLogits = logits.map(l => l / temp);
  let maxLogit = Math.max(...scaledLogits);
  let expLogits = scaledLogits.map(l => Math.exp(l - maxLogit));
  let sumExp = expLogits.reduce((a, b) => a + b, 0);
  let probs = expLogits.map(e => e / sumExp);

  return tokens.map((t, i) => ({
    word: t.word,
    prob: probs[i]
  }));
}

function drawBarChart(tokens, temperature) {
  let chartLeft = 70;
  let chartRight = canvasWidth - 20;
  let chartTop = 55;
  let chartBottom = 280;
  let chartWidth = chartRight - chartLeft;
  let chartHeight = chartBottom - chartTop;
  let barWidth = (chartWidth / tokens.length) * 0.75;
  let barGap = (chartWidth / tokens.length) * 0.25;

  // Y-axis
  stroke('gray');
  strokeWeight(1);
  line(chartLeft, chartTop, chartLeft, chartBottom);
  line(chartLeft, chartBottom, chartRight, chartBottom);

  // Y-axis labels
  noStroke();
  fill('gray');
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let y = chartBottom - (i / 4) * chartHeight;
    let val = (i / 4 * 100).toFixed(0) + '%';
    text(val, chartLeft - 5, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(chartLeft, y, chartRight, y);
    noStroke();
  }

  // Draw bars
  for (let i = 0; i < tokens.length; i++) {
    let x = chartLeft + i * (barWidth + barGap) + barGap / 2;
    let barH = tokens[i].prob * chartHeight;
    let y = chartBottom - barH;

    // Color gradient from blue (high prob) to orange (low prob)
    let t = i / (tokens.length - 1);
    let barColor = lerpColor(color(65, 105, 225), color(255, 140, 0), t);

    // Highlight selected bar
    if (i === selectedBarIndex && animationTimer > 0) {
      fill(0, 200, 0, 200);
      stroke(0, 150, 0);
    } else {
      fill(barColor);
      stroke(red(barColor) * 0.7, green(barColor) * 0.7, blue(barColor) * 0.7);
    }
    strokeWeight(1);
    rect(x, y, barWidth, barH);

    // Token labels (rotated)
    push();
    noStroke();
    fill('black');
    textSize(13);
    textAlign(RIGHT, CENTER);
    translate(x + barWidth / 2, chartBottom + 8);
    rotate(PI / 4);
    text(tokens[i].word, 0, 0);
    pop();

    // Probability value on top of bar
    noStroke();
    fill('black');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    if (tokens[i].prob > 0.01) {
      text((tokens[i].prob * 100).toFixed(1) + '%', x + barWidth / 2, y - 2);
    }
  }

  // Subtitle
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Probability Distribution of Next Token', canvasWidth / 2, 36);

  // Decrease animation timer
  if (animationTimer > 0) animationTimer--;
}

function drawSentence() {
  let sentenceY = 330;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Generated text:', margin, sentenceY - 18);

  // Build sentence
  let sentence = promptInput.value();
  if (generatedTokens.length > 0) {
    sentence += ' ' + generatedTokens.join(' ');
  }

  // Word wrap the sentence
  fill('darkblue');
  textSize(15);
  let maxWidth = canvasWidth - margin * 2;
  let words = sentence.split(' ');
  let lines = [];
  let currentLine = '';

  for (let w of words) {
    let testLine = currentLine ? currentLine + ' ' + w : w;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  for (let i = 0; i < Math.min(lines.length, 3); i++) {
    text(lines[i], margin, sentenceY + i * 20);
  }
  if (lines.length > 3) {
    text('...', margin, sentenceY + 60);
  }
}

function drawTempDescription(temperature) {
  let descY = drawHeight - 18;
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);

  if (temperature === 0) {
    fill('blue');
    text('Greedy decoding: Always picks the most probable token (deterministic)', canvasWidth / 2, descY);
  } else if (temperature <= 0.5) {
    fill('teal');
    text('Low temperature: Strongly favors high-probability tokens (focused)', canvasWidth / 2, descY);
  } else if (temperature <= 1.0) {
    fill('darkgreen');
    text('Moderate temperature: Balanced between probable and surprising tokens', canvasWidth / 2, descY);
  } else if (temperature <= 1.5) {
    fill('darkorange');
    text('High temperature: More random, creative, and unpredictable output', canvasWidth / 2, descY);
  } else {
    fill('red');
    text('Very high temperature: Nearly random selection, often incoherent', canvasWidth / 2, descY);
  }
}

function generateOneToken() {
  let temperature = tempSlider.value() / 10;
  let tokens = getCurrentTokenSet();
  let adjustedProbs = applyTemperature(tokens, temperature);

  // Sample from the distribution
  let selectedIndex = sampleFromDistribution(adjustedProbs);
  selectedBarIndex = selectedIndex;
  animationTimer = 30;

  generatedTokens.push(adjustedProbs[selectedIndex].word);
  currentTokenSet = (currentTokenSet + 1) % tokenSets.length;
}

function generateTenTokens() {
  for (let i = 0; i < 10; i++) {
    // Use setTimeout for visual effect
    setTimeout(() => {
      let temperature = tempSlider.value() / 10;
      let tokens = getCurrentTokenSet();
      let adjustedProbs = applyTemperature(tokens, temperature);
      let selectedIndex = sampleFromDistribution(adjustedProbs);
      selectedBarIndex = selectedIndex;
      animationTimer = 15;
      generatedTokens.push(adjustedProbs[selectedIndex].word);
      currentTokenSet = (currentTokenSet + 1) % tokenSets.length;
    }, i * 200);
  }
}

function resetGeneration() {
  generatedTokens = [];
  currentTokenSet = 0;
  selectedBarIndex = -1;
  animationTimer = 0;
}

function getCurrentTokenSet() {
  if (currentTokenSet === 0) return baseTokens;
  return tokenSets[(currentTokenSet - 1) % tokenSets.length];
}

function sampleFromDistribution(tokens) {
  let r = random();
  let cumulative = 0;
  for (let i = 0; i < tokens.length; i++) {
    cumulative += tokens[i].prob;
    if (r <= cumulative) return i;
  }
  return tokens.length - 1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (promptInput) {
      promptInput.style('width', Math.max(150, canvasWidth - 100) + 'px');
    }
  }
}
