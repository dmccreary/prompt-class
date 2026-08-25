// Embedding Space Explorer - semantic similarity MicroSim
// CANVAS_HEIGHT: 580
// Plots ~22 phrases from five topic categories into a simplified 2D
// "embedding space" so that semantically related phrases sit near one another.
// A learner-supplied query is scored against the phrase vocabulary, placed at
// the similarity-weighted centroid of its best matches, and connected by dashed
// lines to its three nearest neighbours with Euclidean distances shown.

let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;
let controlLeftMargin = 130;
let selectLeftMargin = 148;

let queryInput;
let searchButton;
let resetButton;
let exampleSelect;

let hoveredIndex = -1;
let queryPoint = null;      // { x, y, text, category } once a search has run
let nearestIndices = [];    // indices into phrases, closest first
let statusMessage = '';

const dotSize = 14;
const plotLeft = 56;
const plotTop = 84;
const plotBottomInset = 42;
const plotRightInset = 24;

// Phrases are hand-placed so that each category forms a visible cluster.
// x and y are normalised to [0, 1] within the plot area.
const phrases = [
  { text: 'machine learning models',      x: 0.22, y: 0.22, category: 'AI/ML' },
  { text: 'neural networks',              x: 0.15, y: 0.30, category: 'AI/ML' },
  { text: 'deep learning algorithms',     x: 0.35, y: 0.25, category: 'AI/ML' },
  { text: 'AI training data',             x: 0.12, y: 0.42, category: 'AI/ML' },
  { text: 'gradient descent optimizer',   x: 0.28, y: 0.38, category: 'AI/ML' },
  { text: 'transformer architecture',     x: 0.20, y: 0.15, category: 'AI/ML' },
  { text: 'natural language processing',  x: 0.33, y: 0.14, category: 'AI/ML' },

  { text: 'baking chocolate cake',        x: 0.78, y: 0.68, category: 'Cooking' },
  { text: 'sourdough bread recipe',       x: 0.84, y: 0.78, category: 'Cooking' },
  { text: 'pasta carbonara technique',    x: 0.70, y: 0.76, category: 'Cooking' },
  { text: 'grilling summer vegetables',   x: 0.90, y: 0.66, category: 'Cooking' },
  { text: 'French pastry tips',           x: 0.76, y: 0.88, category: 'Cooking' },

  { text: 'Mars rover exploration',       x: 0.74, y: 0.20, category: 'Space' },
  { text: 'James Webb telescope images',  x: 0.84, y: 0.13, category: 'Space' },
  { text: 'black hole physics',           x: 0.68, y: 0.30, category: 'Space' },
  { text: 'International Space Station',  x: 0.87, y: 0.30, category: 'Space' },

  { text: 'jazz piano improvisation',     x: 0.16, y: 0.70, category: 'Music' },
  { text: 'guitar chord progressions',    x: 0.24, y: 0.80, category: 'Music' },
  { text: 'symphony orchestra concert',   x: 0.12, y: 0.84, category: 'Music' },
  { text: 'electronic music production',  x: 0.30, y: 0.70, category: 'Music' },

  { text: 'clinical trial results',       x: 0.50, y: 0.46, category: 'Medicine' },
  { text: 'vaccine development process',  x: 0.57, y: 0.52, category: 'Medicine' },
  { text: 'heart surgery techniques',     x: 0.46, y: 0.56, category: 'Medicine' }
];

const categoryColors = {
  'AI/ML':    [25, 118, 210],
  'Cooking':  [230, 81, 0],
  'Space':    [46, 125, 50],
  'Music':    [142, 36, 170],
  'Medicine': [198, 40, 40]
};

// A small topic lexicon so that a query can land in the right neighbourhood
// even when it shares no literal words with any plotted phrase. This stands in
// for what a real embedding model learns from its training corpus.
const categoryLexicon = {
  'AI/ML': ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'learn',
            'neural', 'network', 'model', 'deep', 'algorithm', 'training',
            'train', 'data', 'gradient', 'transformer', 'language', 'nlp',
            'llm', 'embedding', 'token', 'prompt', 'gpu', 'inference'],
  'Cooking': ['cook', 'cooking', 'bake', 'baking', 'baked', 'recipe', 'food',
              'bread', 'cake', 'cookie', 'pasta', 'grill', 'grilling', 'pastry',
              'kitchen', 'chef', 'oven', 'dessert', 'dinner', 'flour', 'dough',
              'roast', 'sauce', 'eat', 'meal', 'chocolate'],
  'Space': ['space', 'astronomy', 'astronomical', 'mars', 'rover', 'telescope',
            'planet', 'star', 'galaxy', 'galaxies', 'black', 'hole', 'orbit',
            'nasa', 'rocket', 'satellite', 'cosmos', 'universe', 'moon',
            'astronaut', 'launch', 'solar'],
  'Music': ['music', 'musical', 'jazz', 'piano', 'guitar', 'chord', 'symphony',
            'orchestra', 'concert', 'electronic', 'song', 'melody', 'band',
            'drum', 'violin', 'album', 'rhythm', 'sing', 'singing', 'play',
            'instrument', 'tempo'],
  'Medicine': ['medicine', 'medical', 'clinical', 'trial', 'vaccine', 'heart',
               'surgery', 'surgical', 'doctor', 'patient', 'hospital', 'drug',
               'disease', 'treatment', 'health', 'therapy', 'diagnosis',
               'nurse', 'symptom', 'blood', 'immune']
};

const exampleQueries = [
  'how do transformers work',
  'chocolate chip cookie recipe',
  'photos of distant galaxies',
  'jazz guitar solo',
  'new drug approval study'
];

// Words too common to carry topic meaning.
const stopWords = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'on', 'for',
  'and', 'or', 'is', 'are', 'was', 'were', 'do', 'does', 'how', 'what', 'why',
  'with', 'my', 'i', 'it', 'that', 'this', 'about', 'new', 'best']);

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  queryInput = createInput('');
  queryInput.attribute('placeholder', 'e.g. how do transformers work');
  queryInput.position(controlLeftMargin, drawHeight + 10);
  queryInput.elt.addEventListener('keydown', e => {
    if (e.key === 'Enter') runSearch();
  });

  searchButton = createButton('Search');
  searchButton.position(10, drawHeight + 46);
  searchButton.mousePressed(runSearch);

  resetButton = createButton('Reset');
  resetButton.position(82, drawHeight + 46);
  resetButton.mousePressed(resetSearch);

  exampleSelect = createSelect();
  exampleSelect.position(selectLeftMargin, drawHeight + 46);
  exampleSelect.option('Try an example...');
  exampleQueries.forEach(q => exampleSelect.option(q));
  exampleSelect.selected('Try an example...');
  exampleSelect.changed(() => {
    const choice = exampleSelect.value();
    if (choice === 'Try an example...') return;
    queryInput.value(choice);
    runSearch();
  });

  resizeControls();

  describe('A two-dimensional scatter plot of twenty-three short phrases drawn ' +
    'from five topic categories - AI and machine learning, cooking, space, ' +
    'music and medicine - each category shown in its own colour and forming a ' +
    'visible cluster. Hovering a dot reveals the phrase and its category. ' +
    'Typing a query phrase places a diamond marker at the similarity-weighted ' +
    'centre of its best matches and draws dashed lines to the three nearest ' +
    'phrases, labelled with their Euclidean distances.', LABEL);
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
  drawLegend();
  drawGrid();
  drawAxisLabels();
  drawConnections();
  drawPoints();
  drawQueryPoint();
  drawTooltip();
  drawControlLabels();
}

// ---- coordinate helpers -----------------------------------------------

function plotRight() {
  return canvasWidth - plotRightInset;
}

function plotBottom() {
  return drawHeight - plotBottomInset;
}

function toScreenX(nx) {
  return plotLeft + nx * (plotRight() - plotLeft);
}

function toScreenY(ny) {
  return plotTop + ny * (plotBottom() - plotTop);
}

// ---- drawing ----------------------------------------------------------

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Embedding Space Explorer', canvasWidth / 2, 12);

  fill('dimgray');
  textSize(13);
  const subtitle = statusMessage ||
    'Similar meanings sit close together - hover a dot, or search a phrase of your own';
  text(subtitle, canvasWidth / 2, 40);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawLegend() {
  const categories = Object.keys(categoryColors);
  let legendTextSize = 12;
  textSize(legendTextSize);

  // Shrink the legend until the whole row fits the current canvas width.
  let itemWidths = categories.map(c => textWidth(c) + 26);
  let total = itemWidths.reduce((a, b) => a + b, 0);
  while (total > canvasWidth - 20 && legendTextSize > 8) {
    legendTextSize -= 1;
    textSize(legendTextSize);
    itemWidths = categories.map(c => textWidth(c) + 26);
    total = itemWidths.reduce((a, b) => a + b, 0);
  }

  let x = (canvasWidth - total) / 2;
  const y = 64;
  textAlign(LEFT, CENTER);
  for (let i = 0; i < categories.length; i++) {
    const c = categoryColors[categories[i]];
    noStroke();
    fill(c[0], c[1], c[2]);
    ellipse(x + 7, y, 10);
    fill(70);
    text(categories[i], x + 17, y);
    x += itemWidths[i];
  }
  textSize(defaultTextSize);
}

function drawGrid() {
  stroke(225);
  strokeWeight(0.5);
  for (let i = 0; i <= 10; i++) {
    const n = i / 10;
    line(toScreenX(n), plotTop, toScreenX(n), plotBottom());
    line(plotLeft, toScreenY(n), plotRight(), toScreenY(n));
  }
  stroke(180);
  strokeWeight(1);
  noFill();
  rect(plotLeft, plotTop, plotRight() - plotLeft, plotBottom() - plotTop);
}

function drawAxisLabels() {
  noStroke();
  fill(100);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Embedding Dimension 1', (plotLeft + plotRight()) / 2, plotBottom() + 12);

  push();
  translate(18, (plotTop + plotBottom()) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Embedding Dimension 2', 0, 0);
  pop();

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawConnections() {
  if (!queryPoint || nearestIndices.length === 0) return;
  const qx = toScreenX(queryPoint.x);
  const qy = toScreenY(queryPoint.y);

  for (const idx of nearestIndices) {
    const p = phrases[idx];
    const px = toScreenX(p.x);
    const py = toScreenY(p.y);

    stroke(255, 152, 0, 170);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(qx, qy, px, py);
    drawingContext.setLineDash([]);

    const d = dist(queryPoint.x, queryPoint.y, p.x, p.y);
    noStroke();
    fill(120);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('d=' + nf(d, 1, 2), (qx + px) / 2, (qy + py) / 2 - 8);
  }
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawPoints() {
  for (let i = 0; i < phrases.length; i++) {
    const p = phrases[i];
    const sx = toScreenX(p.x);
    const sy = toScreenY(p.y);
    const c = categoryColors[p.category];
    const isNearest = nearestIndices.includes(i);
    const isHovered = i === hoveredIndex;

    if (isNearest) {
      noStroke();
      fill(255, 152, 0, 70);
      ellipse(sx, sy, dotSize + 16);
    }

    if (isHovered) {
      stroke(50);
      strokeWeight(2);
      fill(c[0], c[1], c[2]);
      ellipse(sx, sy, dotSize + 4);
    } else {
      noStroke();
      fill(c[0], c[1], c[2], isNearest || !queryPoint ? 255 : 150);
      ellipse(sx, sy, dotSize);
    }

    if (isNearest) {
      drawPointLabel(p.text, sx, sy);
    }
  }
}

function drawPointLabel(label, sx, sy) {
  noStroke();
  fill(50);
  textSize(11);
  const w = textWidth(label);
  if (sx + dotSize + w + 10 > plotRight()) {
    textAlign(RIGHT, CENTER);
    text(label, sx - dotSize / 2 - 6, sy);
  } else {
    textAlign(LEFT, CENTER);
    text(label, sx + dotSize / 2 + 6, sy);
  }
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawQueryPoint() {
  if (!queryPoint) return;
  const qx = toScreenX(queryPoint.x);
  const qy = toScreenY(queryPoint.y);

  const pulse = sin(frameCount * 0.08) * 4 + 12;
  noFill();
  stroke(255, 87, 34);
  strokeWeight(2);
  ellipse(qx, qy, dotSize + pulse);

  fill(255, 87, 34);
  noStroke();
  push();
  translate(qx, qy);
  rotate(QUARTER_PI);
  rectMode(CENTER);
  rect(0, 0, 11, 11);
  pop();
  rectMode(CORNER);

  const label = '"' + queryPoint.text + '"';
  fill(216, 67, 21);
  textSize(12);
  textStyle(BOLD);
  const w = textWidth(label);
  if (qx + w + 20 > plotRight()) {
    textAlign(RIGHT, CENTER);
    text(label, qx - 16, qy);
  } else {
    textAlign(LEFT, CENTER);
    text(label, qx + 16, qy);
  }
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawTooltip() {
  if (hoveredIndex < 0) return;
  const p = phrases[hoveredIndex];
  const sx = toScreenX(p.x);
  const sy = toScreenY(p.y);
  const c = categoryColors[p.category];

  const label = '"' + p.text + '"';
  let lines = [label, p.category];
  if (queryPoint) {
    lines.push('distance to query: ' +
      nf(dist(queryPoint.x, queryPoint.y, p.x, p.y), 1, 2));
  }

  textSize(12);
  const w = Math.max(...lines.map(l => textWidth(l))) + 18;
  const h = 14 + lines.length * 17;
  let tx = sx + 14;
  let ty = sy - h - 6;
  if (tx + w > canvasWidth - 8) tx = sx - w - 14;
  if (ty < 6) ty = sy + 16;

  fill(255, 255, 255, 245);
  stroke(190);
  strokeWeight(1);
  rect(tx, ty, w, h, 4);

  noStroke();
  textAlign(LEFT, TOP);
  fill(40);
  textStyle(BOLD);
  text(lines[0], tx + 9, ty + 7);
  textStyle(NORMAL);
  fill(c[0], c[1], c[2]);
  text(lines[1], tx + 9, ty + 24);
  if (lines[2]) {
    fill(110);
    text(lines[2], tx + 9, ty + 41);
  }

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Query phrase:', 10, drawHeight + 22);
}

// ---- interaction ------------------------------------------------------

function mouseMoved() {
  hoveredIndex = -1;
  for (let i = 0; i < phrases.length; i++) {
    const sx = toScreenX(phrases[i].x);
    const sy = toScreenY(phrases[i].y);
    if (dist(mouseX, mouseY, sx, sy) < dotSize) {
      hoveredIndex = i;
      break;
    }
  }
  cursor(hoveredIndex >= 0 ? HAND : ARROW);
}

// ---- similarity search ------------------------------------------------

function tokenize(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !stopWords.has(w));
}

// Score one phrase against the query: literal word overlap counts double,
// shared topic vocabulary counts single.
function scorePhrase(phrase, queryWords) {
  let score = 0;
  const phraseWords = tokenize(phrase.text);
  for (const qw of queryWords) {
    for (const pw of phraseWords) {
      if (pw === qw) {
        score += 2;
      } else if (pw.length > 3 && qw.length > 3 &&
                 (pw.startsWith(qw) || qw.startsWith(pw))) {
        score += 1;
      }
    }
    if (categoryLexicon[phrase.category].includes(qw)) {
      score += 1;
    }
  }
  return score;
}

function runSearch() {
  const raw = queryInput.value().trim();
  if (!raw) {
    statusMessage = 'Type a phrase, then press Search.';
    return;
  }

  const queryWords = tokenize(raw);
  const scored = phrases.map((p, i) => ({ i, score: scorePhrase(p, queryWords) }));
  const matches = scored.filter(s => s.score > 0);

  if (matches.length === 0) {
    // Nothing in the vocabulary resembles the query, so it lands in the empty
    // middle of the space - which is itself the lesson.
    queryPoint = { x: 0.5, y: 0.12, text: raw, category: null };
    nearestIndices = nearestTo(queryPoint, 3);
    statusMessage = 'No familiar topic words - the query lands in empty space. ' +
      'Note that it still has 3 "nearest" neighbours.';
    return;
  }

  // Place the query at the similarity-weighted centroid of its strongest
  // matches only. Averaging over *every* match drags an ambiguous query into
  // the empty middle of the space, where its neighbours are a meaningless
  // blend of two topics; restricting to the top few keeps it inside the
  // cluster it actually belongs to.
  matches.sort((a, b) => b.score - a.score);
  const top = matches.slice(0, 5);

  let sumW = 0;
  let cx = 0;
  let cy = 0;
  for (const m of top) {
    const w = m.score * m.score;   // sharpen toward the strongest matches
    cx += phrases[m.i].x * w;
    cy += phrases[m.i].y * w;
    sumW += w;
  }
  queryPoint = {
    x: constrain(cx / sumW, 0.03, 0.97),
    y: constrain(cy / sumW, 0.03, 0.97),
    text: raw,
    category: null
  };

  nearestIndices = nearestTo(queryPoint, 3);

  const topCategory = phrases[nearestIndices[0]].category;
  statusMessage = 'Query placed nearest the ' + topCategory +
    ' cluster - dashed lines mark its 3 nearest neighbours.';
}

function nearestTo(point, k) {
  return phrases
    .map((p, i) => ({ i, d: dist(point.x, point.y, p.x, p.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map(o => o.i);
}

function resetSearch() {
  queryPoint = null;
  nearestIndices = [];
  statusMessage = '';
  queryInput.value('');
  exampleSelect.selected('Try an example...');
}

// ---- responsive layout ------------------------------------------------

function resizeControls() {
  const inputWidth = constrain(canvasWidth - controlLeftMargin - margin, 120, 320);
  queryInput.size(inputWidth);
  exampleSelect.size(constrain(canvasWidth - selectLeftMargin - margin, 110, 240));
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
