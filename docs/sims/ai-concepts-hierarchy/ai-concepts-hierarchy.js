// AI Concepts Hierarchy - nested infographic MicroSim
// CANVAS_HEIGHT: 605
// Shows the 20 foundational AI concepts of Chapter 1 as nested containers,
// from the broadest (Artificial Intelligence) to the most specific
// (Human-AI Interaction). Hover reveals a definition; click pins a concept
// and highlights everything that depends on it.

let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 12;
let defaultTextSize = 16;

let zoomOutButton;
let clearButton;
let dependentsCheckbox;

let hoverNode = null;
let selectedNode = null;
let focusPath = [];
let dependentIds = new Set();

// Vertical bands inside the drawing region
const titleBandBottom = 46;
const infoPanelTop = 468;
const infoPanelHeight = 84;

const tree = {
  id: 'ai',
  label: 'Artificial Intelligence',
  color: 'aliceblue',
  headerH: 30,
  dir: 'row',
  def: 'The broad field of building systems that perform tasks normally requiring human intelligence.',
  children: [
    {
      id: 'ml',
      label: 'Machine Learning',
      color: 'lightsteelblue',
      headerH: 26,
      dir: 'col',
      flex: 34,
      deps: ['ai'],
      def: 'Systems that improve at a task by finding patterns in data instead of following hand-written rules.',
      children: [
        {
          id: 'nn',
          label: 'Neural Network Basics',
          color: 'cornflowerblue',
          headerH: 24,
          dir: 'col',
          flex: 1.6,
          deps: ['ml'],
          def: 'Layers of weighted connections that pass signals forward and adjust those weights during training.',
          children: [
            {
              id: 'transformer',
              label: 'Transformer Architecture',
              color: 'royalblue',
              textColor: 'white',
              flex: 1,
              deps: ['nn'],
              def: 'The neural network design built on attention, which lets every token consider every other token. It is what made modern language models possible.'
            }
          ]
        },
        {
          id: 'trainingdata',
          label: 'Training Data',
          color: 'powderblue',
          flex: 1,
          deps: ['ml'],
          def: 'The text, code, and images a model learns from. Its size, quality, and bias all shape what the model can do.'
        },
        {
          id: 'transfer',
          label: 'Transfer Learning',
          color: 'powderblue',
          flex: 1,
          deps: ['ml', 'pretraining'],
          def: 'Reusing what a model learned on one broad task as the starting point for a narrower one.'
        }
      ]
    },
    {
      id: 'nlp',
      label: 'Natural Language Processing',
      color: 'papayawhip',
      headerH: 26,
      dir: 'col',
      flex: 66,
      deps: ['ai'],
      def: 'The AI specialty concerned with understanding and generating human language.',
      children: [
        {
          id: 'llm',
          label: 'Large Language Model',
          color: 'navajowhite',
          headerH: 24,
          dir: 'col',
          flex: 62,
          deps: ['nlp', 'transformer'],
          def: 'A transformer trained on enormous amounts of text to predict the next token. Your prompt is what steers it.',
          children: [
            {
              id: 'foundation',
              label: 'Foundation Model',
              color: 'sandybrown',
              headerH: 22,
              dir: 'row',
              flex: 40,
              deps: ['llm', 'trainingdata'],
              def: 'A general-purpose model trained once at great expense, then adapted many times for specific uses.',
              children: [
                {
                  id: 'pretraining',
                  label: 'Pre-Training',
                  color: 'peachpuff',
                  flex: 1,
                  deps: ['foundation', 'trainingdata'],
                  def: 'The first and largest training stage: predicting the next token across trillions of tokens of text.'
                },
                {
                  id: 'finetuning',
                  label: 'Fine-Tuning',
                  color: 'peachpuff',
                  flex: 1,
                  deps: ['pretraining', 'transfer'],
                  def: 'A later, much smaller training stage that teaches the model to follow instructions and be helpful.'
                }
              ]
            },
            {
              id: 'grp1',
              group: true,
              dir: 'row',
              flex: 30,
              children: [
                {
                  id: 'token',
                  label: 'Token / Tokenization',
                  color: 'moccasin',
                  flex: 1,
                  deps: ['llm'],
                  def: 'The chunks a model actually reads. One token is roughly three quarters of an English word.'
                },
                {
                  id: 'contextwindow',
                  label: 'Context Window',
                  color: 'moccasin',
                  flex: 1,
                  deps: ['token'],
                  def: 'The maximum number of tokens a model can hold at once, covering your prompt and its reply together.'
                },
                {
                  id: 'params',
                  label: 'Model Parameters',
                  color: 'moccasin',
                  flex: 1,
                  deps: ['nn', 'llm'],
                  def: 'The learned weights inside the network. Parameter count is a rough proxy for model capacity.'
                }
              ]
            },
            {
              id: 'grp2',
              group: true,
              dir: 'row',
              flex: 30,
              children: [
                {
                  id: 'inference',
                  label: 'Inference',
                  color: 'moccasin',
                  flex: 1,
                  deps: ['llm', 'token'],
                  def: 'Running a trained model to produce output. It happens one token at a time, each token conditioned on all the ones before it.'
                },
                {
                  id: 'genai',
                  label: 'Generative AI',
                  color: 'moccasin',
                  flex: 1,
                  deps: ['llm', 'inference'],
                  def: 'AI that produces new content such as text, images, or code rather than only classifying existing content.'
                }
              ]
            }
          ]
        },
        {
          id: 'api',
          label: 'API',
          color: 'lightgreen',
          headerH: 24,
          dir: 'col',
          flex: 38,
          deps: ['nlp', 'inference'],
          def: 'The programmatic interface that lets software send prompts to a model and receive responses.',
          children: [
            {
              id: 'chatbot',
              label: 'Chatbot Interface',
              color: 'palegreen',
              headerH: 24,
              dir: 'col',
              flex: 1,
              deps: ['api'],
              def: 'The conversational front end most people use, which keeps a running history and sends it back with each turn.',
              children: [
                {
                  id: 'humanai',
                  label: 'Human-AI Interaction',
                  color: 'mediumaquamarine',
                  flex: 1,
                  deps: ['chatbot'],
                  def: 'The study and practice of how people and AI systems communicate. Prompt engineering lives here.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

let nodeIndex = {};
let dependentsMap = {};

function indexTree(node, parent) {
  node.parent = parent || null;
  if (!node.group) nodeIndex[node.id] = node;
  if (node.children) node.children.forEach(c => indexTree(c, node));
}

function buildDependents() {
  Object.keys(nodeIndex).forEach(id => { dependentsMap[id] = new Set(); });
  Object.keys(nodeIndex).forEach(id => {
    (nodeIndex[id].deps || []).forEach(p => {
      if (dependentsMap[p]) dependentsMap[p].add(id);
    });
  });
  // Expand to the transitive closure so a concept shows everything built on top of it
  let changed = true;
  while (changed) {
    changed = false;
    Object.keys(dependentsMap).forEach(id => {
      const current = Array.from(dependentsMap[id]);
      current.forEach(d => {
        dependentsMap[d].forEach(t => {
          if (t !== id && !dependentsMap[id].has(t)) {
            dependentsMap[id].add(t);
            changed = true;
          }
        });
      });
    });
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  indexTree(tree, null);
  buildDependents();
  focusPath = [tree];

  zoomOutButton = createButton('Zoom Out');
  zoomOutButton.position(10, drawHeight + 8);
  zoomOutButton.mousePressed(zoomOut);

  clearButton = createButton('Clear Selection');
  clearButton.position(100, drawHeight + 8);
  clearButton.mousePressed(clearSelection);

  dependentsCheckbox = createCheckbox('Show Dependents', true);
  dependentsCheckbox.position(225, drawHeight + 12);

  describe('Nested diagram of twenty foundational AI concepts arranged from the broadest, Artificial Intelligence, down to the most specific, Human-AI Interaction. Hovering a concept shows its definition and clicking one highlights every concept that depends on it.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const root = focusPath[focusPath.length - 1];
  layoutNode(root, margin, titleBandBottom, canvasWidth - 2 * margin, infoPanelTop - titleBandBottom - 8);

  hoverNode = findNodeAt(root, mouseX, mouseY);
  drawNode(root);

  drawTitle();
  drawInfoPanel();
  drawControlLabels();
}

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  const root = focusPath[focusPath.length - 1];
  const label = root === tree ? 'AI Concepts Hierarchy' : 'Focused on: ' + root.label;
  text(label, canvasWidth / 2, 10);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function layoutNode(node, x, y, w, h) {
  node.x = x;
  node.y = y;
  node.w = w;
  node.h = h;
  if (!node.children || node.children.length === 0) return;
  const pad = 7;
  const header = node.group ? 0 : (node.headerH || 24);
  const gap = 6;
  const ix = x + (node.group ? 0 : pad);
  const iy = y + header;
  const iw = w - (node.group ? 0 : 2 * pad);
  const ih = h - header - (node.group ? 0 : pad);
  const total = node.children.reduce((s, c) => s + (c.flex || 1), 0);

  if (node.dir === 'row') {
    const avail = iw - gap * (node.children.length - 1);
    let cx = ix;
    node.children.forEach(c => {
      const cw = avail * (c.flex || 1) / total;
      layoutNode(c, cx, iy, cw, ih);
      cx += cw + gap;
    });
  } else {
    const avail = ih - gap * (node.children.length - 1);
    let cy = iy;
    node.children.forEach(c => {
      const ch = avail * (c.flex || 1) / total;
      layoutNode(c, ix, cy, iw, ch);
      cy += ch + gap;
    });
  }
}

function drawNode(node) {
  if (!node.group) {
    const isHover = hoverNode === node;
    const isSelected = selectedNode === node;
    const isDependent = dependentsCheckbox.checked() && dependentIds.has(node.id);

    fill(node.color);
    if (isSelected) {
      stroke('crimson');
      strokeWeight(3);
    } else if (isDependent) {
      stroke('orangered');
      strokeWeight(2.5);
    } else if (isHover) {
      stroke('black');
      strokeWeight(2);
    } else {
      stroke('gray');
      strokeWeight(1);
    }
    rect(node.x, node.y, node.w, node.h, 8);

    noStroke();
    fill(node.textColor || 'black');
    const hasKids = node.children && node.children.length > 0;
    textSize(hasKids ? 16 : 15);
    if (hasKids) {
      textAlign(LEFT, TOP);
      text(node.label, node.x + 9, node.y + 6);
    } else {
      textAlign(CENTER, CENTER);
      drawWrapped(node.label, node.x + node.w / 2, node.y + node.h / 2, node.w - 12, 17);
    }
  }
  if (node.children) node.children.forEach(drawNode);
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

function findNodeAt(node, mx, my) {
  let found = null;
  if (mx >= node.x && mx <= node.x + node.w && my >= node.y && my <= node.y + node.h) {
    if (!node.group) found = node;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const deeper = findNodeAt(node.children[i], mx, my);
        if (deeper) found = deeper;
      }
    }
  }
  return found;
}

function drawInfoPanel() {
  const panelY = infoPanelTop;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, panelY, canvasWidth - 2 * margin, infoPanelHeight, 10);

  const active = hoverNode || selectedNode;
  noStroke();
  textAlign(LEFT, TOP);

  if (!active) {
    fill('dimgray');
    textSize(15);
    text('Hover any concept to read its definition. Click a concept to highlight everything that depends on it, or click a container to zoom in.',
      margin + 12, panelY + 12, canvasWidth - 2 * margin - 24, infoPanelHeight - 20);
    return;
  }

  fill('black');
  textSize(17);
  text(active.label, margin + 12, panelY + 9);

  fill('dimgray');
  textSize(15);
  text(active.def, margin + 12, panelY + 32, canvasWidth - 2 * margin - 24, 34);

  if (selectedNode && dependentsCheckbox.checked()) {
    fill('orangered');
    textSize(14);
    textAlign(RIGHT, TOP);
    text(dependentIds.size + ' concept' + (dependentIds.size === 1 ? '' : 's') + ' depend on ' + selectedNode.label,
      canvasWidth - margin - 12, panelY + 9);
    textAlign(LEFT, TOP);
  }
}

function drawControlLabels() {
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(RIGHT, CENTER);
  const depth = focusPath.length;
  text('Level ' + depth + ' of the hierarchy', canvasWidth - 12, drawHeight + 22);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < titleBandBottom || mouseY > infoPanelTop) return;
  const root = focusPath[focusPath.length - 1];
  const hit = findNodeAt(root, mouseX, mouseY);
  if (!hit) return;

  // Clicking a container zooms into that branch; clicking a concept selects it
  if (hit.children && hit.children.length > 0 && hit !== root) {
    focusPath.push(hit);
    selectedNode = null;
    dependentIds = new Set();
  } else {
    selectedNode = hit;
    dependentIds = dependentsMap[hit.id] || new Set();
  }
}

function zoomOut() {
  if (focusPath.length > 1) focusPath.pop();
}

function clearSelection() {
  selectedNode = null;
  dependentIds = new Set();
  focusPath = [tree];
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
