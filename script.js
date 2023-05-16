const fastForwardButton = document.getElementById("fast-forward-button");
const fastRewindButton = document.getElementById("fast-rewind-button");
const durationProgress = document.getElementById("duration-progress");
const progressRange = document.getElementById("progress-bar");
const playButtonImage = document.getElementById("play-image");
const replayButton = document.getElementById("replay-button");
const repeatButton = document.getElementById("repeat-button");
const durationDisplay = document.getElementById("duration");
const playButton = document.getElementById("play-button");
const audio = document.getElementById("hearify-audio");

let isRepeat = false;
let velocity = 1;

function repeat() {
  if (!audio.paused) {
    audio.pause();
  }
  audio.currentTime = 0;

  audio.play();
}

function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  const progressPercent = (currentTime / duration) * 100;
  progressRange.value = progressPercent;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);

  durationDisplay.textContent = `${formatTime(durationMinutes)}:${formatTime(
    durationSeconds
  )}`;

  durationProgress.textContent = `${formatTime(currentMinutes)}:${formatTime(
    currentSeconds
  )}`;

  if (progressPercent == 100 && isRepeat) {
    repeat();
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

audio.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButtonImage.src = "./assets/icons/pause-icon.svg";
    return;
  }

  audio.pause();
  playButtonImage.src = "./assets/icons/play-icon.svg";
});

progressRange.addEventListener("mouseup", () => {
  const progress = progressRange.value;
  const duration = audio.duration;
  audio.currentTime = (progress / 100) * duration;
});

replayButton.addEventListener("click", repeat);

repeatButton.addEventListener("click", () => {
  isRepeat = !isRepeat;
});

fastForwardButton.addEventListener("click", () => {
  if (velocity <= 2) {
    velocity += 0.25;

    audio.playbackRate = velocity;
  }
});

fastRewindButton.addEventListener("click", () => {
  if (velocity > 0.25) {
    velocity -= 0.25;

    audio.playbackRate = velocity;
  }
});
