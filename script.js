// Declare variables
let startTime, elapsedTime = 0;
let timerInterval;
let laps = [];

// Display time
function displayTime() {
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = elapsedTime % 1000;

  document.querySelector('.display').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

// Start the stopwatch
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    displayTime();
  }, 10);
}

// Pause the stopwatch
function pause() {
  clearInterval(timerInterval);
}

// Reset the stopwatch
function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  laps = [];
  displayTime();
  document.querySelector('.lap-times').innerHTML = '';
}

// Record lap time
function lap() {
  laps.push(elapsedTime);
  let lapTime = laps[laps.length - 1] - laps[laps.length - 2] || elapsedTime;
  let lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  document.querySelector('.lap-times').appendChild(lapItem);
}

// Format time
function formatTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Event listeners
document.querySelector('.start').addEventListener('click', start);
document.querySelector('.pause').addEventListener('click', pause);
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector('.lap').addEventListener('click', lap);
