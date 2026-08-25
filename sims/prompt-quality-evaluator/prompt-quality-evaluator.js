// Prompt Quality Evaluator - calibration MicroSim
// CANVAS_HEIGHT: 615
// Students rate five prompt/response pairs on relevance, accuracy,
// completeness, and conciseness, then compare their ratings against expert
// ratings. Calibration, not memorisation, is what builds evaluation skill.

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 185;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 190;

let relevanceSlider;
let accuracySlider;
let completenessSlider;
let concisenessSlider;
let nextButton;
let checkButton;

let currentExample = 0;
let revealed = false;

const cardTop = 48;
const cardHeight = 210;
const scoreTop = 266;
const scoreHeight = 154;

const dimensions = ['Relevance', 'Accuracy', 'Completeness', 'Conciseness'];

const examples = [
  {
    prompt: 'Write about our product launch.',
    response: 'Product launches are an exciting milestone for any organization. Throughout history, companies have introduced new offerings to the market with varying degrees of success. Marketing plays a role, as does timing. Many factors contribute to whether a launch resonates with an audience, and teams should consider all of them carefully.',
    expert: [3, 6, 4, 3],
    lesson: 'The prompt named a topic but no audience, length, or purpose, so the response wandered. Weakest dimension: relevance.'
  },
  {
    prompt: 'In two sentences, explain when the Eiffel Tower was completed and who designed it.',
    response: 'The Eiffel Tower was completed in 1912 and was designed by the architect Le Corbusier for the Paris World\'s Fair. It stood as the tallest structure in the world for over a century.',
    expert: [9, 1, 8, 9],
    lesson: 'The prompt was specific and the response was well-formed, but both facts are wrong (1889, Gustave Eiffel). Fluent does not mean accurate.'
  },
  {
    prompt: 'List the four stages of the water cycle and give a one-line description of each.',
    response: 'Evaporation: water turns from liquid to vapour and rises into the atmosphere. Condensation: vapour cools and forms clouds.',
    expert: [9, 9, 3, 8],
    lesson: 'Accurate and on-topic, but it stopped after two of the four requested stages. Weakest dimension: completeness.'
  },
  {
    prompt: 'Give me a one-sentence summary of what a context window is.',
    response: 'A context window, which is a concept that comes up constantly in discussions of large language models and their capabilities, refers to the total amount of text - measured in tokens rather than words, since tokens are the units models actually process - that a model is able to consider at any one time, encompassing both the input you provide and the output it generates in response, and it is worth noting that this limit has grown considerably across successive model generations.',
    expert: [9, 9, 9, 2],
    lesson: 'Everything in it is correct and relevant, but "one sentence" was ignored in spirit. Weakest dimension: conciseness.'
  },
  {
    prompt: 'Write a 40-word follow-up email to a client who missed a deadline. Keep the tone constructive, propose a new date, and do not assign blame.',
    response: 'Hi Sam - checking in on the design review materials. I know last week was busy on your end. Would Thursday work as a new target? Happy to trim the scope if that helps us land it comfortably.',
    expert: [10, 9, 9, 9],
    lesson: 'The prompt specified audience, length, tone, and constraints. The response hit every one of them. This is what a good pairing looks like.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  relevanceSlider = createSlider(1, 10, 5, 1);
  relevanceSlider.position(sliderLeftMargin, drawHeight + 8);

  accuracySlider = createSlider(1, 10, 5, 1);
  accuracySlider.position(sliderLeftMargin, drawHeight + 43);

  completenessSlider = createSlider(1, 10, 5, 1);
  completenessSlider.position(sliderLeftMargin, drawHeight + 78);

  concisenessSlider = createSlider(1, 10, 5, 1);
  concisenessSlider.position(sliderLeftMargin, drawHeight + 113);

  nextButton = createButton('Next Prompt');
  nextButton.position(10, drawHeight + 148);
  nextButton.mousePressed(nextExample);

  checkButton = createButton('Check My Ratings');
  checkButton.position(118, drawHeight + 148);
  checkButton.mousePressed(() => { revealed = true; });

  resizeSliders();

  describe('An evaluation exercise showing a prompt and response pair. Four sliders let the learner rate relevance, accuracy, completeness, and conciseness from one to ten, then reveal expert ratings for comparison along with a percentage match score.', LABEL);
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
  drawExampleCard();
  drawScorePanel();
  drawSliderLabels();
}

function drawTitle() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Prompt Quality Evaluator', canvasWidth / 2, 12);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawExampleCard() {
  const ex = examples[currentExample];
  const w = canvasWidth - 2 * margin;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, cardTop, w, cardHeight, 10);

  noStroke();
  fill('dimgray');
  textAlign(RIGHT, TOP);
  textSize(13);
  text('Example ' + (currentExample + 1) + ' of ' + examples.length, canvasWidth - margin - 12, cardTop + 8);

  textAlign(LEFT, TOP);
  fill('steelblue');
  textSize(13);
  text('PROMPT', margin + 14, cardTop + 8);
  fill('black');
  textSize(14);
  text(ex.prompt, margin + 14, cardTop + 28, w - 28, 44);

  fill('chocolate');
  textSize(13);
  text('RESPONSE', margin + 14, cardTop + 78);
  fill('black');
  textSize(13);
  text(ex.response, margin + 14, cardTop + 96, w - 28, cardHeight - 104);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawScorePanel() {
  const w = canvasWidth - 2 * margin;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, scoreTop, w, scoreHeight, 10);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text(revealed ? 'Your Ratings vs. Expert Ratings' : 'Rate all four dimensions, then click Check My Ratings',
    margin + 14, scoreTop + 9);

  if (!revealed) {
    fill('dimgray');
    textSize(14);
    text('There is no single right answer, but expert raters agree more often than you might expect. Commit to a number before you check.',
      margin + 14, scoreTop + 36, w - 28, 60);
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    return;
  }

  const ex = examples[currentExample];
  const yours = currentRatings();
  const nameW = 118;
  const readoutW = 128;
  const trackX = margin + 14 + nameW;
  const trackW = max(60, w - 28 - nameW - readoutW);
  let totalMatch = 0;

  for (let i = 0; i < 4; i++) {
    const y = scoreTop + 40 + i * 24;
    const diff = abs(yours[i] - ex.expert[i]);
    totalMatch += max(0, 10 - diff) / 10;
    const band = diff <= 2 ? 'mediumseagreen' : (diff <= 4 ? 'goldenrod' : 'crimson');

    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(13);
    text(dimensions[i], margin + 14, y);

    stroke('gainsboro');
    strokeWeight(6);
    line(trackX, y, trackX + trackW, y);

    const yx = trackX + trackW * (yours[i] - 1) / 9;
    const ex1 = trackX + trackW * (ex.expert[i] - 1) / 9;
    stroke(band);
    strokeWeight(6);
    line(min(yx, ex1), y, max(yx, ex1), y);

    noStroke();
    fill('steelblue');
    circle(yx, y, 13);
    fill('black');
    triangle(ex1 - 6, y + 8, ex1 + 6, y + 8, ex1, y - 1);

    fill('dimgray');
    textSize(12);
    textAlign(RIGHT, CENTER);
    text('you ' + yours[i] + '  /  expert ' + ex.expert[i], margin + w - 14, y);
  }

  const pct = round(totalMatch / 4 * 100);
  noStroke();
  fill(pct >= 80 ? 'mediumseagreen' : (pct >= 60 ? 'goldenrod' : 'crimson'));
  textAlign(LEFT, TOP);
  textSize(14);
  text('Match: ' + pct + '%', margin + 14, scoreTop + scoreHeight - 28);

  fill('dimgray');
  textSize(12);
  text(ex.lesson, margin + 104, scoreTop + scoreHeight - 30, w - 118, 26);

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawSliderLabels() {
  const yours = currentRatings();
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  for (let i = 0; i < 4; i++) {
    text(dimensions[i] + ': ' + yours[i], 10, drawHeight + 18 + i * 35);
  }
}

function currentRatings() {
  return [
    relevanceSlider.value(),
    accuracySlider.value(),
    completenessSlider.value(),
    concisenessSlider.value()
  ];
}

function nextExample() {
  currentExample = (currentExample + 1) % examples.length;
  revealed = false;
  relevanceSlider.value(5);
  accuracySlider.value(5);
  completenessSlider.value(5);
  concisenessSlider.value(5);
}

function resizeSliders() {
  const w = canvasWidth - sliderLeftMargin - margin;
  relevanceSlider.size(w);
  accuracySlider.size(w);
  completenessSlider.size(w);
  concisenessSlider.size(w);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  resizeSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
