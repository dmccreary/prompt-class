// Prompt Quality Evaluator MicroSim
// CANVAS_HEIGHT = 750
// Students rate prompt/response pairs on 4 quality dimensions and compare to expert ratings
// MicroSim template version 2026.03

// ===== PROMPT/RESPONSE DATA =====
const examples = [
  {
    prompt: "Tell me about stuff.",
    response: "Well, there are many things in the world. Some things are big and some are small. People do lots of different activities every day. Technology has changed a lot over the years. There are also many animals and plants. The weather can vary from place to place. In conclusion, stuff is everywhere and it's interesting to think about.",
    expert: { relevance: 2, accuracy: 5, completeness: 2, conciseness: 3 },
    note: "Vague prompt produces a wandering, unfocused response."
  },
  {
    prompt: "What is the boiling point of water at sea level in Celsius?",
    response: "The boiling point of water at sea level is 85 degrees Celsius. This was first discovered by Galileo in 1492 during his famous experiments with thermometers. The boiling point increases as you go higher in altitude because there is more atmospheric pressure pushing down on the water.",
    expert: { relevance: 8, accuracy: 2, completeness: 6, conciseness: 5 },
    note: "Specific prompt but response has major factual errors (100°C is correct, altitude claim is backwards)."
  },
  {
    prompt: "Explain how photosynthesis works, including the inputs, outputs, and where it occurs in the plant.",
    response: "Photosynthesis occurs in the chloroplasts of plant cells. Plants use sunlight to convert carbon dioxide into glucose.",
    expert: { relevance: 7, accuracy: 8, completeness: 3, conciseness: 7 },
    note: "Good prompt but the response is too brief — missing water as input, oxygen as output, and details about the process."
  },
  {
    prompt: "What is the capital of France?",
    response: "The capital of France is Paris, which is a truly magnificent and extraordinary city located in the north-central part of the country along the beautiful Seine River. Paris has been the capital since the 10th century and is home to approximately 2.1 million people in the city proper, though the greater metropolitan area houses over 12 million residents. The city is world-renowned for its stunning architecture, including the iconic Eiffel Tower which was built in 1889, the magnificent Louvre Museum which houses the Mona Lisa, and the beautiful Notre-Dame Cathedral. Paris is also known as the 'City of Light' and serves as a global center for art, fashion, gastronomy, and culture.",
    expert: { relevance: 8, accuracy: 9, completeness: 9, conciseness: 2 },
    note: "Simple question gets a correct but massively over-detailed response."
  },
  {
    prompt: "Compare three sorting algorithms (bubble sort, merge sort, quicksort) in terms of time complexity, space complexity, and best use cases. Present as a brief summary.",
    response: "Bubble Sort has O(n²) average/worst time complexity and O(1) space — simple but slow, best for tiny or nearly-sorted lists. Merge Sort runs in O(n log n) time with O(n) extra space — consistent performance, ideal when stability matters. Quicksort averages O(n log n) time with O(log n) space but can degrade to O(n²) — fastest in practice for general-purpose sorting with good pivot selection.",
    expert: { relevance: 9, accuracy: 9, completeness: 9, conciseness: 9 },
    note: "Excellent prompt with a well-structured, accurate, and appropriately concise response."
  }
];

// ===== LAYOUT CONSTANTS =====
let containerWidth;
let canvasWidth = 400;
let promptAreaHeight = 220;   // top area for prompt + response text
let sliderAreaHeight = 160;   // four sliders
let feedbackAreaHeight = 220; // comparison panel
let buttonBarHeight = 50;     // navigation buttons
let titleHeight = 50;         // title area
let spacingHeight = 50;       // extra spacing between sections
let drawHeight = promptAreaHeight + sliderAreaHeight + feedbackAreaHeight + buttonBarHeight + titleHeight + spacingHeight;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight; // 750
let containerHeight = canvasHeight;
let margin = 20;
let sliderLeftMargin = 130;
let defaultTextSize = 16;

// ===== STATE =====
let currentExample = 0;
let showExpert = false;

// ===== UI ELEMENTS =====
let relevanceSlider, accuracySlider, completenessSlider, concisenessSlider;
let checkButton, nextButton, prevButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);
  textWrap(WORD);

  let sliderStartY = titleHeight + promptAreaHeight + 15;
  let sliderSpacing = 35;

  // Create sliders for each dimension
  relevanceSlider = createSlider(1, 10, 5, 1);
  relevanceSlider.position(sliderLeftMargin, sliderStartY);
  relevanceSlider.size(canvasWidth - sliderLeftMargin - margin);

  accuracySlider = createSlider(1, 10, 5, 1);
  accuracySlider.position(sliderLeftMargin, sliderStartY + sliderSpacing);
  accuracySlider.size(canvasWidth - sliderLeftMargin - margin);

  completenessSlider = createSlider(1, 10, 5, 1);
  completenessSlider.position(sliderLeftMargin, sliderStartY + sliderSpacing * 2);
  completenessSlider.size(canvasWidth - sliderLeftMargin - margin);

  concisenessSlider = createSlider(1, 10, 5, 1);
  concisenessSlider.position(sliderLeftMargin, sliderStartY + sliderSpacing * 3);
  concisenessSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Buttons at the bottom of the slider area
  let buttonY = sliderStartY + sliderSpacing * 4 + 10;
  checkButton = createButton('Check My Ratings');
  checkButton.position(margin, buttonY);
  checkButton.mousePressed(() => { showExpert = true; });
  checkButton.style('font-size', '16px');
  checkButton.style('padding', '6px 16px');
  checkButton.style('cursor', 'pointer');

  prevButton = createButton('← Previous');
  prevButton.position(canvasWidth - 280, buttonY);
  prevButton.mousePressed(goToPrev);
  prevButton.style('font-size', '16px');
  prevButton.style('padding', '6px 16px');
  prevButton.style('cursor', 'pointer');

  nextButton = createButton('Next Prompt →');
  nextButton.position(canvasWidth - 150, buttonY);
  nextButton.mousePressed(goToNext);
  nextButton.style('font-size', '16px');
  nextButton.style('padding', '6px 16px');
  nextButton.style('cursor', 'pointer');

  describe('Interactive prompt quality evaluator with four rating sliders and expert comparison', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let ex = examples[currentExample];

  // ===== TITLE =====
  noStroke();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, titleHeight);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(BOLD);
  text('Prompt Quality Evaluator', canvasWidth / 2, titleHeight / 2);
  textStyle(NORMAL);

  // ===== PROMPT & RESPONSE AREA =====
  fill(248, 249, 250);
  stroke('silver');
  strokeWeight(1);
  rect(0, titleHeight, canvasWidth, promptAreaHeight);
  noStroke();

  let textX = margin;
  let textW = canvasWidth - margin * 2;
  let currentY = titleHeight + 12;

  // Example counter
  fill(100);
  textAlign(RIGHT, TOP);
  textSize(14);
  text('Example ' + (currentExample + 1) + ' of ' + examples.length, canvasWidth - margin, currentY);

  // Prompt label and text
  fill(0, 100, 200);
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Prompt:', textX, currentY);
  textStyle(NORMAL);
  fill(0);
  textSize(14);
  text(ex.prompt, textX + 60, currentY, textW - 120);

  currentY += 55;

  // Response label and text
  fill(0, 130, 0);
  textSize(15);
  textStyle(BOLD);
  text('Response:', textX, currentY);
  textStyle(NORMAL);
  fill(50);
  textSize(13);
  text(ex.response, textX, currentY + 20, textW);

  // ===== SLIDER AREA =====
  let sliderTopY = titleHeight + promptAreaHeight;
  fill(255);
  stroke('silver');
  strokeWeight(1);
  rect(0, sliderTopY, canvasWidth, sliderAreaHeight);
  noStroke();

  let sliderStartY = sliderTopY + 18;
  let sliderSpacing = 35;
  let dims = ['Relevance', 'Accuracy', 'Completeness', 'Conciseness'];
  let sliders = [relevanceSlider, accuracySlider, completenessSlider, concisenessSlider];
  let dimColors = [
    color(41, 128, 185),  // blue
    color(39, 174, 96),   // green
    color(142, 68, 173),  // purple
    color(230, 126, 34)   // orange
  ];

  for (let i = 0; i < 4; i++) {
    let y = sliderStartY + sliderSpacing * i;
    fill(dimColors[i]);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(15);
    textStyle(BOLD);
    text(dims[i] + ':', margin, y + 3);
    textStyle(NORMAL);

    // Show current slider value
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(15);
    let val = sliders[i].value();
    text(val, canvasWidth - margin + 5, y + 3);
  }

  // ===== FEEDBACK AREA =====
  let feedbackTopY = sliderTopY + sliderAreaHeight + buttonBarHeight;

  if (showExpert) {
    fill(245, 245, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, feedbackTopY, canvasWidth, feedbackAreaHeight);
    noStroke();

    let studentScores = {
      relevance: relevanceSlider.value(),
      accuracy: accuracySlider.value(),
      completeness: completenessSlider.value(),
      conciseness: concisenessSlider.value()
    };
    let expertScores = ex.expert;
    let dimKeys = ['relevance', 'accuracy', 'completeness', 'conciseness'];

    // Header
    fill(0);
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Score Comparison', canvasWidth / 2, feedbackTopY + 8);
    textStyle(NORMAL);

    // Column headers
    let colLabel = canvasWidth * 0.15;
    let colYou = canvasWidth * 0.45;
    let colExpert = canvasWidth * 0.62;
    let colDiff = canvasWidth * 0.80;
    let headerY = feedbackTopY + 38;

    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    fill(80);
    text('Dimension', colLabel, headerY);
    textAlign(CENTER, TOP);
    text('You', colYou, headerY);
    text('Expert', colExpert, headerY);
    text('Match', colDiff, headerY);
    textStyle(NORMAL);

    let totalDiff = 0;
    let rowY = headerY + 28;

    for (let i = 0; i < 4; i++) {
      let key = dimKeys[i];
      let studentVal = studentScores[key];
      let expertVal = expertScores[key];
      let diff = Math.abs(studentVal - expertVal);
      totalDiff += diff;

      // Color-coded row background
      let rowColor;
      if (diff <= 2) {
        rowColor = color(200, 240, 200); // green
      } else if (diff <= 4) {
        rowColor = color(255, 245, 200); // yellow
      } else {
        rowColor = color(255, 210, 210); // red
      }

      fill(rowColor);
      noStroke();
      rect(margin, rowY - 4, canvasWidth - margin * 2, 26, 4);

      fill(dimColors[i]);
      textAlign(LEFT, TOP);
      textSize(14);
      textStyle(BOLD);
      text(dims[i], colLabel, rowY);
      textStyle(NORMAL);

      fill(0);
      textAlign(CENTER, TOP);
      text(studentVal, colYou, rowY);
      text(expertVal, colExpert, rowY);

      // Match indicator
      let matchText, matchColor;
      if (diff <= 2) { matchText = '✓ Close'; matchColor = color(39, 174, 96); }
      else if (diff <= 4) { matchText = '~ Near'; matchColor = color(200, 150, 0); }
      else { matchText = '✗ Far'; matchColor = color(192, 57, 43); }

      fill(matchColor);
      textStyle(BOLD);
      text(matchText, colDiff, rowY);
      textStyle(NORMAL);

      rowY += 30;
    }

    // Overall percentage match (max diff per dimension = 9, so max total = 36)
    let maxDiff = 36;
    let matchPercent = Math.round(((maxDiff - totalDiff) / maxDiff) * 100);

    fill(0);
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Overall Match: ' + matchPercent + '%', canvasWidth / 2, rowY + 8);
    textStyle(NORMAL);

    // Expert note
    fill(100);
    textSize(12);
    textStyle(ITALIC);
    text(ex.note, canvasWidth / 2, rowY + 32);
    textStyle(NORMAL);

  } else {
    // Show instruction when not yet checked
    fill(240, 240, 250);
    stroke('silver');
    strokeWeight(1);
    rect(0, feedbackTopY, canvasWidth, feedbackAreaHeight);
    noStroke();

    fill(120);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Rate the prompt and response above, then click\n"Check My Ratings" to compare with expert scores.',
         canvasWidth / 2, feedbackTopY + feedbackAreaHeight / 2);
  }
}

// ===== NAVIGATION =====
function goToNext() {
  currentExample = (currentExample + 1) % examples.length;
  resetForNewExample();
}

function goToPrev() {
  currentExample = (currentExample - 1 + examples.length) % examples.length;
  resetForNewExample();
}

function resetForNewExample() {
  showExpert = false;
  relevanceSlider.value(5);
  accuracySlider.value(5);
  completenessSlider.value(5);
  concisenessSlider.value(5);
}

// ===== RESPONSIVE RESIZE =====
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  let sliderStartY = titleHeight + promptAreaHeight + 15;
  let sliderSpacing = 35;
  let sliders = [relevanceSlider, accuracySlider, completenessSlider, concisenessSlider];
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].position(sliderLeftMargin, sliderStartY + sliderSpacing * i);
    sliders[i].size(canvasWidth - sliderLeftMargin - margin);
  }

  let buttonY = sliderStartY + sliderSpacing * 4 + 10;
  checkButton.position(margin, buttonY);
  prevButton.position(canvasWidth - 280, buttonY);
  nextButton.position(canvasWidth - 150, buttonY);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
