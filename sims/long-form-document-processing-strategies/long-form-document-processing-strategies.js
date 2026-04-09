// Long-Form Document Processing Strategies - Interactive Decision Tree
// CANVAS_HEIGHT: 625
// Helps students decide which strategy to use for processing long documents
// based on document size and task type.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 625;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let defaultTextSize = 16;

// Decision tree state
let currentNode = 'start';
let history = []; // stack for back navigation
let hoveredButton = null;
let fadeIn = 0;

// Color palette
const colors = {
  bg: '#F0F8FF',       // aliceblue
  nodeBg: '#FFFFFF',
  nodeBorder: '#4A90D9',
  questionText: '#1A1A2E',
  buttonBg: '#4A90D9',
  buttonHover: '#357ABD',
  buttonText: '#FFFFFF',
  resultBg: '#E8F5E9',
  resultBorder: '#2E7D32',
  resultTitle: '#1B5E20',
  resultText: '#333333',
  backBg: '#78909C',
  backHover: '#546E7A',
  headerBg: '#1A1A2E',
  headerText: '#FFFFFF',
  tipBg: '#FFF3E0',
  tipBorder: '#E65100'
};

// Decision tree structure
const nodes = {
  start: {
    type: 'question',
    question: 'What is your primary goal with this long document?',
    options: [
      { label: 'Get a brief overview or summary', next: 'summary_size' },
      { label: 'Extract specific information or data', next: 'extraction' },
      { label: 'Analyze or transform the full content', next: 'full_analysis_size' },
      { label: 'Answer questions about the document', next: 'qa_size' }
    ]
  },

  summary_size: {
    type: 'question',
    question: 'How large is the document relative to the model context window?',
    options: [
      { label: 'Fits in one context window', next: 'result_simple_summary' },
      { label: 'Too large for one context window', next: 'summary_detail' }
    ]
  },

  summary_detail: {
    type: 'question',
    question: 'How detailed does the summary need to be?',
    options: [
      { label: 'High-level overview (a few paragraphs)', next: 'result_hierarchical' },
      { label: 'Detailed section-by-section summary', next: 'result_map_reduce' }
    ]
  },

  full_analysis_size: {
    type: 'question',
    question: 'How large is the document?',
    options: [
      { label: 'Fits in one context window', next: 'result_direct' },
      { label: '2-5x the context window', next: 'result_chunking' },
      { label: 'Much larger (5x+ context window)', next: 'result_map_reduce_analysis' }
    ]
  },

  qa_size: {
    type: 'question',
    question: 'How many questions do you need to answer?',
    options: [
      { label: 'One or a few specific questions', next: 'result_chunking_qa' },
      { label: 'Many questions across the whole document', next: 'result_hierarchical_qa' }
    ]
  },

  extraction: {
    type: 'result',
    title: 'Extraction',
    icon: '🔍',
    description: 'Process the document in chunks, extracting specific data points, entities, or structured information from each chunk.',
    steps: [
      'Define the exact data schema you want to extract',
      'Split the document into overlapping chunks',
      'Run extraction prompts on each chunk',
      'Merge and deduplicate results',
      'Validate extracted data for completeness'
    ],
    tip: 'Use overlapping chunks (10-15%) to avoid missing information that spans chunk boundaries.'
  },

  result_simple_summary: {
    type: 'result',
    title: 'Direct Summarization',
    icon: '📝',
    description: 'Send the entire document to the model in a single prompt with clear summarization instructions.',
    steps: [
      'Paste the full document into a single prompt',
      'Specify desired summary length and format',
      'Ask for key takeaways or main arguments',
      'Request the model to highlight important details'
    ],
    tip: 'Even when the doc fits in context, specifying the output format (bullets, paragraphs, executive brief) dramatically improves results.'
  },

  result_hierarchical: {
    type: 'result',
    title: 'Hierarchical Summarization',
    icon: '🏗️',
    description: 'Summarize sections individually, then summarize the summaries to create a multi-level overview.',
    steps: [
      'Split document into logical sections or chapters',
      'Summarize each section independently',
      'Group section summaries into clusters',
      'Create a meta-summary from section summaries',
      'Optionally create a 1-paragraph executive summary'
    ],
    tip: 'This preserves the document structure and lets you "zoom in" on any section for more detail.'
  },

  result_map_reduce: {
    type: 'result',
    title: 'Map-Reduce Summarization',
    icon: '🗺️',
    description: 'Map: summarize each chunk independently. Reduce: combine all chunk summaries into a final comprehensive summary.',
    steps: [
      'Split document into chunks that fit in context',
      'Map step: Summarize each chunk with the same prompt',
      'Collect all chunk summaries',
      'Reduce step: Combine summaries into final output',
      'Iterate the reduce step if combined summaries are still too long'
    ],
    tip: 'The map step is parallelizable, which means you can process all chunks simultaneously for speed.'
  },

  result_direct: {
    type: 'result',
    title: 'Direct Analysis',
    icon: '🎯',
    description: 'Send the entire document with your analysis prompt in a single context window for comprehensive processing.',
    steps: [
      'Load the full document into a single prompt',
      'Provide clear analysis instructions',
      'Specify the desired output format',
      'Ask follow-up questions in the same conversation'
    ],
    tip: 'Place your instructions BEFORE the document text. Models pay more attention to text near the beginning and end of the context.'
  },

  result_chunking: {
    type: 'result',
    title: 'Chunking with Overlap',
    icon: '🧩',
    description: 'Split the document into overlapping chunks, process each chunk, then combine results while handling the overlapping regions.',
    steps: [
      'Determine optimal chunk size (60-80% of context window)',
      'Create chunks with 10-15% overlap between adjacent chunks',
      'Process each chunk with consistent instructions',
      'Merge results, resolving duplicates from overlapping regions',
      'Review merged output for coherence and completeness'
    ],
    tip: 'Overlap prevents losing context at chunk boundaries. Split at natural boundaries (paragraphs, sections) when possible.'
  },

  result_map_reduce_analysis: {
    type: 'result',
    title: 'Map-Reduce Analysis',
    icon: '⚙️',
    description: 'Apply the same analysis to each chunk (map), then aggregate findings into a comprehensive result (reduce).',
    steps: [
      'Define a consistent analysis prompt for all chunks',
      'Split the document into manageable chunks',
      'Map: Apply the analysis prompt to each chunk',
      'Collect all intermediate results',
      'Reduce: Synthesize findings into a unified analysis',
      'Verify no sections were missed or under-represented'
    ],
    tip: 'For very large documents, you may need multiple reduce passes — summarize groups of results before the final synthesis.'
  },

  result_chunking_qa: {
    type: 'result',
    title: 'Targeted Chunking for Q&A',
    icon: '❓',
    description: 'Find the most relevant chunks for your question, then use those chunks as context for answering.',
    steps: [
      'Split document into chunks',
      'Use keyword or semantic search to find relevant chunks',
      'Load the most relevant 2-4 chunks into context',
      'Ask your question with the relevant context',
      'If the answer seems incomplete, search for additional chunks'
    ],
    tip: 'This is the core idea behind RAG (Retrieval-Augmented Generation). You do not need to process the entire document.'
  },

  result_hierarchical_qa: {
    type: 'result',
    title: 'Hierarchical Index + Q&A',
    icon: '📚',
    description: 'Build a searchable index of the document first, then use it to efficiently answer multiple questions.',
    steps: [
      'Split document into chunks and summarize each',
      'Create an index mapping topics to chunk locations',
      'For each question, consult the index first',
      'Load relevant chunks based on the index',
      'Answer the question from the selected chunks',
      'Repeat for each additional question'
    ],
    tip: 'The upfront cost of building the index pays off quickly when you have many questions to answer.'
  }
};

// Button definitions (computed in draw)
let buttons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);
  textWrap(WORD);
  describe('Interactive decision tree for choosing long-form document processing strategies', LABEL);
}

function draw() {
  updateCanvasSize();
  buttons = [];
  hoveredButton = null;

  // Background
  background(colors.bg);

  // Border
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth, drawHeight);

  // Fade in effect
  if (fadeIn < 1) fadeIn = min(fadeIn + 0.08, 1);

  let node = nodes[currentNode];

  // Draw header
  drawHeader();

  // Draw breadcrumb trail
  let contentY = drawBreadcrumbs();

  if (node.type === 'question') {
    drawQuestion(node, contentY);
  } else {
    drawResult(node, contentY);
  }

  // Check hover
  checkHover();
}

function drawHeader() {
  noStroke();
  fill(colors.headerBg);
  rect(1, 1, canvasWidth - 2, 50, 0);

  fill(colors.headerText);
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  noStroke();
  text('Long-Form Document Processing Strategies', canvasWidth / 2, 26);
  textStyle(NORMAL);
}

function drawBreadcrumbs() {
  let y = 62;
  noStroke();

  if (history.length > 0) {
    fill('#666666');
    textAlign(LEFT, TOP);
    textSize(12);

    let crumbText = 'Path: ';
    for (let i = 0; i < history.length; i++) {
      let n = nodes[history[i]];
      if (n.type === 'question') {
        let shortQ = n.question.length > 30 ? n.question.substring(0, 27) + '...' : n.question;
        crumbText += shortQ;
        if (i < history.length - 1) crumbText += ' → ';
      }
    }
    text(crumbText, margin, y, canvasWidth - margin * 2);
    y += 22;
  }

  // Draw step indicator
  fill('#999999');
  textAlign(LEFT, TOP);
  textSize(13);
  let stepText = history.length === 0 ? 'Step 1: Choose your goal' :
                 nodes[currentNode].type === 'result' ? 'Recommendation' :
                 'Step ' + (history.length + 1) + ': Narrow it down';
  text(stepText, margin, y);
  y += 24;

  return y;
}

function drawQuestion(node, startY) {
  let y = startY;
  let boxWidth = canvasWidth - margin * 2;
  let boxX = margin;

  // Question box
  let qBoxHeight = 65;
  stroke(colors.nodeBorder);
  strokeWeight(2);
  fill(colors.nodeBg);
  rect(boxX, y, boxWidth, qBoxHeight, 10);

  noStroke();
  fill(colors.questionText);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text(node.question, boxX + 15, y + 5, boxWidth - 30, qBoxHeight - 10);
  textStyle(NORMAL);

  y += qBoxHeight + 20;

  // Option buttons
  let btnHeight = 50;
  let btnSpacing = 12;

  for (let i = 0; i < node.options.length; i++) {
    let opt = node.options[i];
    let btnY = y + i * (btnHeight + btnSpacing);
    let btnObj = { x: boxX, y: btnY, w: boxWidth, h: btnHeight, action: 'navigate', target: opt.next, idx: i };
    buttons.push(btnObj);

    let isHovered = hoveredButton === i;

    // Button background
    noStroke();
    fill(isHovered ? colors.buttonHover : colors.buttonBg);
    rect(boxX, btnY, boxWidth, btnHeight, 8);

    // Button text
    fill(colors.buttonText);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(opt.label, boxX + 15, btnY + 2, boxWidth - 30, btnHeight - 4);
  }

  y += node.options.length * (btnHeight + btnSpacing) + 10;

  // Back button if not at start
  if (history.length > 0) {
    drawBackButton(y);
  }
}

function drawResult(node, startY) {
  let y = startY;
  let boxWidth = canvasWidth - margin * 2;
  let boxX = margin;

  // Result header
  stroke(colors.resultBorder);
  strokeWeight(2);
  fill(colors.resultBg);
  let headerHeight = 55;
  rect(boxX, y, boxWidth, headerHeight, 10, 10, 0, 0);

  noStroke();
  fill(colors.resultTitle);
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  text(node.icon + '  ' + node.title, boxX + 10, y, boxWidth - 20, headerHeight);
  textStyle(NORMAL);
  y += headerHeight;

  // Description
  stroke(colors.resultBorder);
  strokeWeight(1);
  fill(colors.nodeBg);
  let descHeight = 70;
  rect(boxX, y, boxWidth, descHeight, 0);

  noStroke();
  fill(colors.resultText);
  textAlign(LEFT, TOP);
  textSize(15);
  text(node.description, boxX + 15, y + 10, boxWidth - 30);
  y += descHeight;

  // Steps
  let stepsHeight = 28 * node.steps.length + 20;
  stroke(colors.resultBorder);
  strokeWeight(1);
  fill(colors.nodeBg);
  rect(boxX, y, boxWidth, stepsHeight, 0);

  noStroke();
  fill(colors.resultTitle);
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Steps:', boxX + 15, y + 8);
  textStyle(NORMAL);

  fill(colors.resultText);
  textSize(14);
  for (let i = 0; i < node.steps.length; i++) {
    let stepY = y + 28 + i * 24;
    text((i + 1) + '. ' + node.steps[i], boxX + 20, stepY, boxWidth - 40);
  }
  y += stepsHeight;

  // Tip box
  let tipHeight = 60;
  stroke(colors.tipBorder);
  strokeWeight(2);
  fill(colors.tipBg);
  rect(boxX, y, boxWidth, tipHeight, 0, 0, 10, 10);

  noStroke();
  fill(colors.tipBorder);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('💡 Pro Tip:', boxX + 15, y + 8);
  textStyle(NORMAL);
  fill('#333333');
  textSize(13);
  text(node.tip, boxX + 90, y + 8, boxWidth - 110);
  y += tipHeight + 15;

  // Back and Start Over buttons
  let btnWidth = (boxWidth - 15) / 2;
  let btnHeight = 40;

  // Back button
  if (history.length > 0) {
    let backBtn = { x: boxX, y: y, w: btnWidth, h: btnHeight, action: 'back', idx: 100 };
    buttons.push(backBtn);
    fill(colors.backBg);
    noStroke();
    rect(boxX, y, btnWidth, btnHeight, 8);
    fill(colors.buttonText);
    textAlign(CENTER, CENTER);
    textSize(15);
    text('← Back', boxX, y, btnWidth, btnHeight);
  }

  // Start Over button
  let soX = history.length > 0 ? boxX + btnWidth + 15 : boxX;
  let soW = history.length > 0 ? btnWidth : boxWidth;
  let soBtn = { x: soX, y: y, w: soW, h: btnHeight, action: 'restart', idx: 101 };
  buttons.push(soBtn);
  fill(colors.buttonBg);
  noStroke();
  rect(soX, y, soW, btnHeight, 8);
  fill(colors.buttonText);
  textAlign(CENTER, CENTER);
  textSize(15);
  text('🔄 Start Over', soX, y, soW, btnHeight);
}

function drawBackButton(y) {
  let btnWidth = 120;
  let btnHeight = 36;
  let btnX = margin;

  let backBtn = { x: btnX, y: y, w: btnWidth, h: btnHeight, action: 'back', idx: 99 };
  buttons.push(backBtn);

  noStroke();
  fill(colors.backBg);
  rect(btnX, y, btnWidth, btnHeight, 8);

  fill(colors.buttonText);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('← Back', btnX, y, btnWidth, btnHeight);
}

function checkHover() {
  hoveredButton = null;
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      hoveredButton = btn.idx;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function mousePressed() {
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {

      if (btn.action === 'navigate') {
        history.push(currentNode);
        currentNode = btn.target;
        fadeIn = 0;
      } else if (btn.action === 'back') {
        if (history.length > 0) {
          currentNode = history.pop();
          fadeIn = 0;
        }
      } else if (btn.action === 'restart') {
        currentNode = 'start';
        history = [];
        fadeIn = 0;
      }
      return;
    }
  }
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
