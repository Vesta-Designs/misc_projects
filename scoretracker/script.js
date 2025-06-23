const teamOne = {
  threePtBtn: document.getElementById("tmonethreeptbtn"),
  onePtBtn: document.getElementById("tmoneoneptbtn"),
  counter: document.getElementById("teamonecount"),
  score: 0,
  boardScore: document.getElementById("teamonescore"),
  totalScore: 0
};

const teamTwo = {
  threePtBtn: document.getElementById("tmtwothreeptbtn"),
  onePtBtn: document.getElementById("tmtwooneptbtn"),
  counter: document.getElementById("teamtwocount"),
  score: 0,
  boardScore: document.getElementById("teamtwoscore"),
  totalScore: 0
};

const teamOneResetBtn = document.getElementById("team-one-reset-btn")
const teamTwoResetBtn = document.getElementById("team-two-reset-btn")
const endRoundBtn = document.getElementById("endround");
const winScreen = document.createElement("div");


// Update counter display
function updateCounter(team) {
  team.counter.textContent = team.score;
  team.boardScore.textContent = team.totalScore;
}

// Score functions
function addPoints(team, points) {
  team.score += points;

  updateCounter(team);
}

// Calculate round scores (cornhole rules)
function calculateRoundScores() {
  const teamOneRound = teamOne.score;
  const teamTwoRound = teamTwo.score;
  
  if (teamOneRound > teamTwoRound) {
    teamOne.totalScore += (teamOneRound - teamTwoRound);
  } else if (teamTwoRound > teamOneRound) {
    teamTwo.totalScore += (teamTwoRound - teamOneRound);
  }
  // If equal, no points awarded
  checkScore(teamOne);
  checkScore(teamTwo);
  
  // Reset round scores
  teamOne.score = 0;
  teamTwo.score = 0;
  
  updateCounter(teamOne);
  updateCounter(teamTwo);
}

// Reset all scores
function resetScores(team) {
  team.score = 0;
  updateCounter(team);
}

// allows for the 'busting' mechanic in cornhole
function checkScore(team) {
    if (team.totalScore > 21) {
        team.totalScore = 15;
        updateCounter(team);
    }
}

// Event listeners
function setupTeamListeners(team) {
  team.threePtBtn?.addEventListener("click", () => addPoints(team, 3));
  team.onePtBtn?.addEventListener("click", () => addPoints(team, 1));
}

// Initialize
setupTeamListeners(teamOne);
setupTeamListeners(teamTwo);
teamOneResetBtn.addEventListener("click", () => resetScores(teamOne));
teamTwoResetBtn.addEventListener("click", () => resetScores(teamTwo));
endRoundBtn?.addEventListener("click", calculateRoundScores);

// Initial update
updateCounter(teamOne);
updateCounter(teamTwo);