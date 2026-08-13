/**
 * Trivia Quest — app.js
 * Pure vanilla JS. Questions loaded from questions.json.
 */

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  questions:      [],   // full shuffled list
  current:        0,    // current question index
  selectedAnswer: null, // index of user's selected answer
  answered:       false,
  score: {
    right: 0,
    wrong: 0,
    byCategory: {}
  }
};

// ── DOM Refs ───────────────────────────────────────────────────────────────
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz:    document.getElementById('screen-quiz'),
  results: document.getElementById('screen-results')
};

const el = {
  btnStart:         document.getElementById('btn-start'),
  btnSubmit:        document.getElementById('btn-submit'),
  btnNext:          document.getElementById('btn-next'),
  btnRetry:         document.getElementById('btn-retry'),
  qCounter:         document.getElementById('q-counter'),
  qCategory:        document.getElementById('q-category'),
  progressBar:      document.getElementById('progress-bar'),
  questionText:     document.getElementById('question-text'),
  answersGrid:      document.getElementById('answers-grid'),
  feedbackBlock:    document.getElementById('feedback-block'),
  feedbackIcon:     document.getElementById('feedback-icon'),
  feedbackHeadline: document.getElementById('feedback-headline'),
  feedbackDetail:   document.getElementById('feedback-detail'),
  scoreRight:       document.getElementById('score-right'),
  scoreWrong:       document.getElementById('score-wrong'),
  resultsPct:       document.getElementById('results-pct'),
  resultsHeadline:  document.getElementById('results-headline'),
  resultsEmoji:     document.getElementById('results-emoji'),
  ringFill:         document.getElementById('ring-fill'),
  resCorrect:       document.getElementById('res-correct'),
  resWrong:         document.getElementById('res-wrong'),
  resTotal:         document.getElementById('res-total'),
  categoryScores:   document.getElementById('category-scores')
};

// ── Letters for answer options ─────────────────────────────────────────────
const LETTERS = ['A', 'B', 'C', 'D'];

// ── Category → CSS slug mapping ────────────────────────────────────────────
function categorySlug(cat) {
  if (cat.includes('Philosophy')) return 'philosophy';
  if (cat.includes('Technology'))  return 'technology';
  if (cat.includes('Sports'))      return 'sports';
  if (cat.includes('Pop'))         return 'popculture';
  return '';
}

// ── Fisher-Yates shuffle ───────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Show/hide screens ──────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Init quiz ──────────────────────────────────────────────────────────────
async function initQuiz() {
  // Load questions JSON (works whether served via HTTP or file://)
  let questions;
  try {
    const res = await fetch('./questions.json');
    questions = await res.json();
  } catch (e) {
    console.error('Failed to load questions.json', e);
    return;
  }

  // Shuffle all questions
  state.questions = shuffle(questions);
  state.current        = 0;
  state.selectedAnswer = null;
  state.answered       = false;
  state.score          = { right: 0, wrong: 0, byCategory: {} };

  // Init category score tracking
  state.questions.forEach(q => {
    if (!state.score.byCategory[q.category]) {
      state.score.byCategory[q.category] = { right: 0, total: 0 };
    }
  });

  updateLiveScore();
  showScreen('quiz');
  renderQuestion();
}

// ── Render current question ────────────────────────────────────────────────
function renderQuestion() {
  const q   = state.questions[state.current];
  const idx = state.current;
  const total = state.questions.length;

  // Header
  el.qCounter.textContent = `${idx + 1} / ${total}`;
  el.qCategory.textContent = q.category;
  el.qCategory.className = `q-category-badge cat-${categorySlug(q.category)}`;

  // Progress bar
  el.progressBar.style.width = `${(idx / total) * 100}%`;

  // Question text
  el.questionText.textContent = q.question;

  // Answers
  el.answersGrid.innerHTML = '';
  q.answers.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.index = i;
    btn.innerHTML = `
      <span class="answer-letter">${LETTERS[i]}</span>
      <span class="answer-text">${answer}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(i));
    el.answersGrid.appendChild(btn);
  });

  // Reset feedback & buttons
  hideFeedback();
  el.btnSubmit.disabled = true;
  el.btnSubmit.classList.remove('hidden');
  el.btnNext.classList.add('hidden');

  state.selectedAnswer = null;
  state.answered = false;
}

// ── Select an answer ───────────────────────────────────────────────────────
function selectAnswer(index) {
  if (state.answered) return;

  state.selectedAnswer = index;

  // Update button styles
  const btns = el.answersGrid.querySelectorAll('.answer-btn');
  btns.forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });

  el.btnSubmit.disabled = false;
}

// ── Submit answer ──────────────────────────────────────────────────────────
function submitAnswer() {
  if (state.selectedAnswer === null || state.answered) return;

  state.answered = true;
  const q = state.questions[state.current];
  const isCorrect = state.selectedAnswer === q.correct;

  // Update score
  if (isCorrect) {
    state.score.right++;
    state.score.byCategory[q.category].right++;
  } else {
    state.score.wrong++;
  }
  state.score.byCategory[q.category].total++;
  updateLiveScore();

  // Disable all answer buttons
  const btns = el.answersGrid.querySelectorAll('.answer-btn');
  btns.forEach(btn => btn.disabled = true);

  // Mark correct/wrong
  btns[q.correct].classList.add('correct-answer');
  if (!isCorrect) {
    btns[state.selectedAnswer].classList.add('wrong-answer');
  }

  // Show feedback
  showFeedback(isCorrect, q);

  // Toggle buttons
  el.btnSubmit.classList.add('hidden');
  el.btnNext.classList.remove('hidden');

  const isLast = state.current === state.questions.length - 1;
  el.btnNext.textContent = isLast ? 'See Results' : 'Next Question →';
}

// ── Show feedback banner ───────────────────────────────────────────────────
function showFeedback(isCorrect, q) {
  el.feedbackBlock.classList.remove('hidden', 'fb-correct', 'fb-wrong');
  el.feedbackBlock.classList.add(isCorrect ? 'fb-correct' : 'fb-wrong');
  el.feedbackIcon.textContent = isCorrect ? '✓' : '✗';
  el.feedbackHeadline.textContent = isCorrect
    ? 'Correct! Well done.'
    : 'Not quite right.';
  el.feedbackDetail.textContent = isCorrect
    ? `"${q.answers[q.correct]}" is the right answer.`
    : `The correct answer was: "${q.answers[q.correct]}"`;
}

function hideFeedback() {
  el.feedbackBlock.classList.add('hidden');
}

// ── Next question ──────────────────────────────────────────────────────────
function nextQuestion() {
  if (state.current < state.questions.length - 1) {
    state.current++;
    renderQuestion();
  } else {
    showResults();
  }
}

// ── Live score ─────────────────────────────────────────────────────────────
function updateLiveScore() {
  el.scoreRight.textContent = state.score.right;
  el.scoreWrong.textContent = state.score.wrong;
}

// ── Results screen ─────────────────────────────────────────────────────────
function showResults() {
  const { right, wrong, byCategory } = state.score;
  const total = right + wrong;
  const pct   = Math.round((right / total) * 100);

  // Emoji + headline
  let emoji, headline;
  if (pct === 100) { emoji = '🏆'; headline = 'Perfect Score!'; }
  else if (pct >= 80) { emoji = '🌟'; headline = 'Outstanding!'; }
  else if (pct >= 60) { emoji = '👍'; headline = 'Good Job!'; }
  else if (pct >= 40) { emoji = '📚'; headline = 'Keep Learning!'; }
  else                { emoji = '💡'; headline = 'Room to Grow!'; }

  el.resultsEmoji.textContent    = emoji;
  el.resultsHeadline.textContent = headline;
  el.resultsPct.textContent      = `${pct}%`;
  el.resCorrect.textContent      = right;
  el.resWrong.textContent        = wrong;
  el.resTotal.textContent        = total;

  // Animate ring
  const circumference = 327; // 2π × r52
  const offset = circumference - (pct / 100) * circumference;
  // Need to inject gradient defs into the SVG
  const svg = el.ringFill.closest('svg');
  if (!svg.querySelector('defs')) {
    svg.insertAdjacentHTML('afterbegin', `
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#6c63ff" />
          <stop offset="100%" stop-color="#a78bfa" />
        </linearGradient>
      </defs>
    `);
  }
  el.ringFill.style.stroke = 'url(#ringGradient)';
  // Trigger animation after a tiny delay so screen transition completes
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.ringFill.style.strokeDashoffset = offset;
    });
  });

  // Category breakdown
  const catColors = {
    'History of Philosophy': '#a78bfa',
    'History of Technology': '#38bdf8',
    'History of Sports':     '#4ade80',
    'Pop Culture':           '#f472b6'
  };

  el.categoryScores.innerHTML = '';
  Object.entries(byCategory).forEach(([cat, { right: r, total: t }]) => {
    const catPct = t > 0 ? Math.round((r / t) * 100) : 0;
    const color  = catColors[cat] || '#6c63ff';
    const row    = document.createElement('div');
    row.className = 'cat-score-row';
    row.innerHTML = `
      <span class="cat-score-label">${cat}</span>
      <div class="cat-score-bar-track">
        <div class="cat-score-bar-fill" style="width:0%; background:${color}" data-target="${catPct}"></div>
      </div>
      <span class="cat-score-pct" style="color:${color}">${catPct}%</span>
    `;
    el.categoryScores.appendChild(row);
  });

  showScreen('results');

  // Animate bar fills after transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.categoryScores.querySelectorAll('.cat-score-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    });
  });
}

// ── Event Listeners ────────────────────────────────────────────────────────
el.btnStart.addEventListener('click', initQuiz);
el.btnSubmit.addEventListener('click', submitAnswer);
el.btnNext.addEventListener('click', nextQuestion);
el.btnRetry.addEventListener('click', () => {
  showScreen('welcome');
});
