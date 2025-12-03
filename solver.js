// solver.js

// Known issues: Greens count is off in certain situations, currently debugging but runs fine. Restarting/resetting fixes issue. 
//Status: OK

// Core Solver
function computeFeedback(secret, guess) {
  secret = secret.toLowerCase();
  guess = guess.toLowerCase();

  if (secret.length !== 5 || guess.length !== 5) {
    throw new Error("Both secret and guess must be 5 letters.");
  }

  const result = Array(5).fill('B');
  const secretCounts = {};

  // First pass: mark greens, count remaining letters
  for (let i = 0; i < 5; i++) {
    const s = secret[i];
    const g = guess[i];
    if (g === s) {
      result[i] = 'G';
    } else {
      secretCounts[s] = (secretCounts[s] || 0) + 1;
    }
  }

  // Second pass: mark yellows
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'G') continue;
    const g = guess[i];
    if (secretCounts[g] > 0) {
      result[i] = 'Y';
      secretCounts[g]--;
    }
  }

  return result.join('');
}

function filterCandidates(candidates, guess, pattern) {
  guess = guess.toLowerCase();
  pattern = pattern.toUpperCase();
  return candidates.filter(w => computeFeedback(w, guess) === pattern);
}

function scoreGuess(guess, candidates) {
  const buckets = {};
  for (const w of candidates) {
    const p = computeFeedback(w, guess);
    buckets[p] = (buckets[p] || 0) + 1;
  }

  const n = candidates.length;
  if (n === 0) return Infinity;

  let sumSq = 0;
  for (const key in buckets) {
    const c = buckets[key];
    sumSq += c * c;
  }
  return sumSq / n; // expected remaining
}

function chooseBestGuess(candidates, allWords = null) {
  if (!candidates.length) return { guess: null, score: null };

  const searchSpace = allWords && allWords.length ? allWords : candidates;

  let bestGuess = null;
  let bestScore = null;

  for (const g of searchSpace) {
    const s = scoreGuess(g, candidates);
    if (bestScore === null || s < bestScore) {
      bestScore = s;
      bestGuess = g;
    }
  }

  return { guess: bestGuess, score: bestScore };
}

function normalizePattern(raw) {
  const p = (raw || "").trim();
  if (p.length !== 5) {
    throw new Error("Pattern must be exactly 5 characters.");
  }
  const out = [];
  for (const ch of p) {
    if ("gG2#".includes(ch)) out.push("G");
    else if ("yY1?".includes(ch)) out.push("Y");
    else if ("bB0.xX-".includes(ch)) out.push("B");
    else throw new Error(`Invalid pattern character: '${ch}'`);
  }
  return out.join("");
}

// -------------------------------
// 2. UI state & bindings
// -------------------------------

let allWords = [];
let candidates = [];
let currentGuess = "";
let currentTurn = 1;

const guessDisplayEl = document.getElementById("guessDisplay");
const turnDisplayEl = document.getElementById("turnDisplay");
const remainingCountEl = document.getElementById("remainingCount");
const patternInputEl = document.getElementById("patternInput");
const applyBtnEl = document.getElementById("applyBtn");
const resetBtnEl = document.getElementById("resetBtn");
const statusTextEl = document.getElementById("statusText");
const candidatesListEl = document.getElementById("candidatesList");
const candidatesHeaderCountEl = document.getElementById("candidatesHeaderCount");

function initSolver() {
  // Load base word list
  if (!Array.isArray(WORD_LIST) || !WORD_LIST.length) {
    statusTextEl.textContent = "WORD_LIST is empty. Go add some 5-letter words in words.js.";
    statusTextEl.classList.add("error");
    applyBtnEl.disabled = true;
    return;
  }

  allWords = Array.from(
    new Set(
      WORD_LIST
        .map(w => String(w).toLowerCase().trim())
        .filter(w => w.length === 5 && /^[a-z]+$/.test(w))
    )
  ).sort();

  resetPuzzle();
}

function resetPuzzle() {
  candidates = allWords.slice();
  currentTurn = 1;
  statusTextEl.textContent = "";
  statusTextEl.classList.remove("error");

  // Reasonable starting guess
  if (allWords.includes("soare")) {
    currentGuess = "soare";
  } else if (allWords.includes("slate")) {
    currentGuess = "slate";
  } else {
    currentGuess = candidates[0];
  }

  updateUI();
  patternInputEl.value = "";
  patternInputEl.focus();
}

function updateUI() {
  guessDisplayEl.textContent = currentGuess ? currentGuess.toUpperCase() : "----";
  turnDisplayEl.textContent = String(currentTurn);
  remainingCountEl.textContent = candidates.length.toString();
  candidatesHeaderCountEl.textContent = `${candidates.length} left`;

  // Show first 80 candidates max
  const preview = candidates.slice(0, 80).join("  ");
  candidatesListEl.textContent = preview || "(none)";
}

function applyPattern() {
  if (!currentGuess) return;

  const raw = patternInputEl.value;
  let pattern;
  try {
    pattern = normalizePattern(raw);
  } catch (err) {
    statusTextEl.textContent = err.message;
    statusTextEl.classList.add("error");
    return;
  }

  statusTextEl.classList.remove("error");
  statusTextEl.textContent = "";

  if (pattern === "GGGGG") {
    statusTextEl.textContent = `Solved in ${currentTurn} turn(s). Flex on the Wordle devs.`;
    candidates = [currentGuess];
    updateUI();
    return;
  }

  // Narrow candidate set
  candidates = filterCandidates(candidates, currentGuess, pattern);
  if (!candidates.length) {
    statusTextEl.textContent = "No candidates left. Your pattern input is probably scuffed.";
    statusTextEl.classList.add("error");
    updateUI();
    return;
  }

  currentTurn += 1;
  if (currentTurn > 6) {
    statusTextEl.textContent = "Six turns used. At this point it's just vibes.";
  }

  // Choose next guess
  const { guess: nextGuess } = chooseBestGuess(candidates, candidates);
  if (!nextGuess) {
    statusTextEl.textContent = "AI brain melted. Could not find a next guess.";
    statusTextEl.classList.add("error");
    updateUI();
    return;
  }

  currentGuess = nextGuess;
  patternInputEl.value = "";
  updateUI();
}

// -------------------------------
// 3. Event hooks

applyBtnEl.addEventListener("click", applyPattern);
resetBtnEl.addEventListener("click", resetPuzzle);

patternInputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    applyPattern();
  }
});

// Initialize on load
initSolver();
