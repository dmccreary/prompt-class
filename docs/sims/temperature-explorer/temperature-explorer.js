// Temperature Explorer - token sampling MicroSim
// CANVAS_HEIGHT: 565
// Shows how the temperature parameter reshapes the probability distribution
// over candidate next tokens, and lets the learner sample from it. Raw
// probabilities and temperature-adjusted probabilities are shown side by side
// so the softmax is visible rather than assumed.

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 190;

let promptSelect;
let tempSlider;
let nextTokenButton;
let tenTokensButton;
let resetButton;

let generated = [];
let lastPickedIndex = -1;

const chartTop = 74;
const chartBottom = 310;
const sentenceTop = 334;
const sentenceHeight = 104;

const stems = {
  'The best way to learn is': [
    [['to', 0.32], ['by', 0.24], ['through', 0.16], ['practice', 0.10], ['simply', 0.06], ['honestly', 0.05], ['purple', 0.04], ['backwards', 0.03]],
    [['teach', 0.22], ['practice', 0.20], ['build', 0.16], ['read', 0.12], ['fail', 0.10], ['ask', 0.08], ['dance', 0.07], ['argue', 0.05]],
    [['something', 0.24], ['often', 0.20], ['daily', 0.16], ['badly', 0.12], ['together', 0.10], ['loudly', 0.08], ['sideways', 0.06], ['twice', 0.04]],
    [['until', 0.26], ['and', 0.22], ['without', 0.16], ['before', 0.12], ['because', 0.10], ['unless', 0.07], ['although', 0.05], ['whenever', 0.02]],
    [['it', 0.30], ['you', 0.24], ['the', 0.18], ['your', 0.12], ['everything', 0.08], ['nothing', 0.05], ['someone', 0.02], ['chaos', 0.01]],
    [['clicks', 0.28], ['sticks', 0.22], ['works', 0.18], ['matters', 0.12], ['hurts', 0.10], ['sings', 0.06], ['explodes', 0.03], ['rhymes', 0.01]]
  ],
  'In summary, the results': [
    [['show', 0.30], ['suggest', 0.22], ['indicate', 0.16], ['were', 0.12], ['demonstrate', 0.09], ['imply', 0.06], ['shimmer', 0.03], ['disagree', 0.02]],
    [['a', 0.26], ['that', 0.24], ['significant', 0.16], ['no', 0.12], ['strong', 0.10], ['surprising', 0.07], ['purple', 0.03], ['modest', 0.02]],
    [['improvement', 0.28], ['effect', 0.22], ['change', 0.18], ['difference', 0.12], ['trend', 0.09], ['decline', 0.06], ['cartwheel', 0.03], ['mystery', 0.02]],
    [['in', 0.30], ['across', 0.22], ['over', 0.16], ['for', 0.12], ['within', 0.10], ['despite', 0.06], ['beneath', 0.03], ['regarding', 0.01]],
    [['all', 0.26], ['most', 0.22], ['the', 0.18], ['several', 0.12], ['both', 0.10], ['every', 0.07], ['three', 0.04], ['countless', 0.01]],
    [['conditions', 0.30], ['groups', 0.22], ['cases', 0.16], ['trials', 0.12], ['samples', 0.10], ['categories', 0.06], ['galaxies', 0.03], ['opinions', 0.01]]
  ],
  'Once upon a time there was a': [
    [['young', 0.24], ['small', 0.20], ['lonely', 0.16], ['brave', 0.12], ['tiny', 0.10], ['curious', 0.08], ['purple', 0.07], ['bureaucratic', 0.03]],
    [['girl', 0.24], ['boy', 0.20], ['dragon', 0.16], ['village', 0.12], ['robot', 0.10], ['king', 0.08], ['accountant', 0.07], ['teapot', 0.03]],
    [['who', 0.34], ['that', 0.24], ['living', 0.14], ['with', 0.12], ['in', 0.08], ['hoping', 0.05], ['wearing', 0.02], ['allegedly', 0.01]],
    [['lived', 0.26], ['loved', 0.20], ['wanted', 0.18], ['feared', 0.12], ['dreamed', 0.10], ['refused', 0.08], ['sneezed', 0.04], ['litigated', 0.02]],
    [['in', 0.28], ['to', 0.24], ['of', 0.18], ['near', 0.12], ['beyond', 0.09], ['without', 0.06], ['atop', 0.02], ['despite', 0.01]],
    [['the', 0.30], ['a', 0.24], ['distant', 0.16], ['quiet', 0.12], ['forgotten', 0.10], ['glittering', 0.05], ['damp', 0.02], ['hypothetical', 0.01]]
  ]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  promptSelect = createSelect();
  promptSelect.position(sliderLeftMargin, drawHeight + 8);
  Object.keys(stems).forEach(k => promptSelect.option(k));
  promptSelect.selected('The best way to learn is');
  promptSelect.changed(resetGeneration);

  tempSlider = createSlider(0, 2, 0.7, 0.1);
  tempSlider.position(sliderLeftMargin, drawHeight + 43);

  nextTokenButton = createButton('Generate Next Token');
  nextTokenButton.position(10, drawHeight + 78);
  nextTokenButton.mousePressed(() => generateTokens(1));

  tenTokensButton = createButton('Generate 10 Tokens');
  tenTokensButton.position(168, drawHeight + 78);
  tenTokensButton.mousePressed(() => generateTokens(10));

  resetButton = createButton('Reset');
  resetButton.position(316, drawHeight + 78);
  resetButton.mousePressed(resetGeneration);

  resizeControls();

  describe('An interactive bar chart of the top eight candidate next tokens. A temperature slider from zero to two reshapes the probability distribution in real time, showing both raw and temperature-adjusted probabilities, and buttons sample tokens to build a sentence one token at a time.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawBarChart();
  drawExplanationPanel();
  drawSentencePanel();
  drawControlLabels();
}

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Temperature Explorer', canvasWidth / 2, 12);
  fill('dimgray');
  textSize(13);
  text('Position ' + (currentPosition() + 1) + ' of ' + candidateSets().length +
       '  -  candidates for the next token', canvasWidth / 2, 40);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function candidateSets() {
  return stems[promptSelect.value()];
}

function currentPosition() {
  return min(generated.length, candidateSets().length - 1);
}

function currentCandidates() {
  return candidateSets()[currentPosition()];
}

function adjustedProbs(raw, t) {
  if (t <= 0.001) {
    let best = 0;
    raw.forEach((c, i) => { if (c[1] > raw[best][1]) best = i; });
    return raw.map((c, i) => (i === best ? 1 : 0));
  }
  const scaled = raw.map(c => Math.exp(Math.log(c[1]) / t));
  const sum = scaled.reduce((a, b) => a + b, 0);
  return scaled.map(s => s / sum);
}

// Cool-to-warm ramp through violet and red rather than a straight RGB blend,
// which would pass through an unreadable grey in the middle of the range.
function rankColor(i, n) {
  colorMode(HSB, 360, 100, 100);
  const c = color(lerp(212, 388, i / (n - 1)) % 360, 62, 82);
  colorMode(RGB, 255);
  return c;
}

function drawBarChart() {
  const raw = currentCandidates();
  const t = tempSlider.value();
  const adj = adjustedProbs(raw, t);
  const chartRight = canvasWidth * 0.60;
  const labelW = 92;
  const readoutW = 74;
  const barX = margin + labelW;
  const barMaxW = max(40, chartRight - barX - readoutW);
  const rowH = (chartBottom - chartTop) / raw.length;
  const maxAdj = Math.max(...adj, 0.0001);

  for (let i = 0; i < raw.length; i++) {
    const y = chartTop + i * rowH;
    const cy = y + rowH / 2;
    const barW = barMaxW * (adj[i] / maxAdj);
    const barColor = rankColor(i, raw.length);

    noStroke();
    fill('black');
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(raw[i][0], barX - 8, cy);

    fill(barColor);
    if (lastPickedIndex === i) {
      stroke('crimson');
      strokeWeight(2.5);
    } else {
      noStroke();
    }
    rect(barX, cy - rowH * 0.30, max(barW, 1), rowH * 0.60, 3);

    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(12);
    text((adj[i] * 100).toFixed(1) + '%', barX + barMaxW + 6, cy - 6);
    fill('dimgray');
    textSize(11);
    text('raw ' + (raw[i][1] * 100).toFixed(0) + '%', barX + barMaxW + 6, cy + 8);
  }

  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(11);
  text('bold = temperature-adjusted   grey = raw', margin, chartBottom + 4);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawExplanationPanel() {
  const t = tempSlider.value();
  const px = canvasWidth * 0.62;
  const pw = canvasWidth - margin - px;
  if (pw < 90) return;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, chartTop - 6, pw, chartBottom - chartTop + 12, 10);

  let headline, body;
  if (t <= 0.05) {
    headline = 'Deterministic';
    body = 'The tallest bar wins every single time. Run it a hundred times and you get the same sentence a hundred times. Useful for extraction, classification, and anything that must be reproducible.';
  } else if (t < 1.0) {
    headline = 'Focused, with room to breathe';
    body = 'High-probability tokens usually win, but the occasional surprise gets through. This is the default range for most assistants because it reads as natural without going off the rails.';
  } else if (t < 1.5) {
    headline = 'Loosening up';
    body = 'The distribution is flattening. Mid-ranked tokens now win often enough to notice. Good for brainstorming and first drafts, risky for anything factual.';
  } else {
    headline = 'Nearly random';
    body = 'The bars are almost level, so a rare token is about as likely as the obvious one. Expect surprising word choices and sentences that wander. Creative, but rarely useful.';
  }

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Temperature ' + t.toFixed(1), px + 12, chartTop + 6);
  fill('chocolate');
  textSize(13);
  text(headline, px + 12, chartTop + 28);
  fill('dimgray');
  textSize(12);
  text(body, px + 12, chartTop + 48, pw - 24, 118);

  fill('black');
  textSize(12);
  text('What you are seeing', px + 12, chartTop + 172);
  fill('dimgray');
  textSize(11);
  text('1. Raw probability for each candidate\n2. Softmax rescaled by temperature\n3. The sampled token, outlined in red\n4. The sentence growing below',
    px + 12, chartTop + 190, pw - 24, 70);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawSentencePanel() {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, sentenceTop, canvasWidth - 2 * margin, sentenceHeight, 10);

  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(12);
  text('GENERATED TEXT', margin + 14, sentenceTop + 8);

  const stem = promptSelect.value();
  fill('black');
  textSize(15);
  const full = stem + (generated.length ? ' ' + generated.join(' ') : '');
  text(full, margin + 14, sentenceTop + 28, canvasWidth - 2 * margin - 28, 44);

  fill('dimgray');
  textSize(12);
  const done = generated.length >= candidateSets().length;
  text(done ? 'Sequence complete. Change the temperature and press Reset to try again.'
            : generated.length + ' token' + (generated.length === 1 ? '' : 's') + ' generated',
    margin + 14, sentenceTop + sentenceHeight - 22);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Prompt stem:', 10, drawHeight + 18);
  text('Temperature: ' + tempSlider.value().toFixed(1), 10, drawHeight + 53);
}

function generateTokens(n) {
  const sets = candidateSets();
  const t = tempSlider.value();
  for (let k = 0; k < n; k++) {
    if (generated.length >= sets.length) break;
    const raw = sets[generated.length];
    const adj = adjustedProbs(raw, t);
    let roll = random();
    let picked = adj.length - 1;
    for (let i = 0; i < adj.length; i++) {
      roll -= adj[i];
      if (roll <= 0) { picked = i; break; }
    }
    lastPickedIndex = picked;
    generated.push(raw[picked][0]);
  }
}

function resetGeneration() {
  generated = [];
  lastPickedIndex = -1;
}

function resizeControls() {
  tempSlider.size(canvasWidth - sliderLeftMargin - margin);
  promptSelect.size(min(300, canvasWidth - sliderLeftMargin - margin));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  resizeControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
