const fastForwardButton = document.getElementById("fast-forward-button");
const fastRewindButton = document.getElementById("fast-rewind-button");
const durationProgress = document.getElementById("duration-progress");
const favoriteButton = document.getElementById("favorite-button");
const favoriteImage = document.getElementById("favorite-image");
const progressRange = document.getElementById("progress-bar");
const playButtonImage = document.getElementById("play-image");
const audioSource = document.getElementById("hearify-source");
const repeatImage = document.getElementById("repeat-img");
const replayButton = document.getElementById("replay-button");
const repeatButton = document.getElementById("repeat-button");
const volumeButton = document.getElementById("volume-button");
const durationDisplay = document.getElementById("duration");
const volumeRange = document.getElementById("volume-bar");
const playButton = document.getElementById("play-button");
const volumeImage = document.getElementById("volume-img");
const audio = document.getElementById("hearify-audio");

let isFavorite = false;
let isRepeat = false;
let currentSongIndex = 0;
let duration = 0;

const songs = [
  "./assets/songs/the-weeknd-blinding-lights.mp3",
  "./assets/songs/jack-jhonson-banana-pancakes.mp3",
  "./assets/songs/racionais-negro-drama.mp3",
  "./assets/songs/lady-gaga-shallow.mp3",
  "./assets/songs/illusionize-moogzera.mp3",
];
let volume = 0.5;

audio.addEventListener("durationchange", () => {
  var _player = new Audio(songs[currentSongIndex]);

  _player.addEventListener(
    "durationchange",
    function () {
      if (this.duration != Infinity) {
        duration = this.duration;
        _player.remove();
      }
    },
    false
  );

  _player.load();
  _player.currentTime = 24 * 60 * 60; //fake big time
  _player.volume = 0;
});

function repeat() {
  if (!audio.paused) {
    audio.pause();
  }
  audio.currentTime = 0;

  audio.play();
}

function nextSong() {
  if (currentSongIndex < 4) {
    currentSongIndex += 1;
  } else {
    currentSongIndex = 0;
  }

  audio.pause();
  audioSource.src = songs[currentSongIndex];
  audio.load();
  audio.play();
}

function updateProgress() {
  const currentTime = audio.currentTime;

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

  if (durationDisplay.textContent === durationProgress.textContent) {
    if (isRepeat) {
      repeat();
      return;
    }

    if (currentSongIndex < 4) {
      nextSong();
      return;
    }

    audio.currentTime = 0;
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

audio.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    audio.volume = volume;
    playButtonImage.src = "./assets/icons/pause-icon.svg";
    return;
  }

  audio.pause();
});

progressRange.addEventListener("change", (e) => {
  debugger;
  const progress = Number(e.target.value);
  if (audio?.currentTime) {
    const wasPaused = audio.paused;
    audio.pause();
    audio.currentTime = (progress / 100) * duration;
    if (!wasPaused) {
      audio.play();
    }
  }
});

replayButton.addEventListener("click", repeat);

repeatButton.addEventListener("click", () => {
  isRepeat = !isRepeat;
  if (isRepeat) {
    repeatImage.src = "./assets/icons/repeat-selected-icon.svg";
    return;
  }
  repeatImage.src = "./assets/icons/repeat-icon.svg";
});

fastForwardButton.addEventListener("click", nextSong);

audio.addEventListener("play", () => {
  playButtonImage.src = "./assets/icons/pause-icon.svg";
});
audio.addEventListener("pause", () => {
  playButtonImage.src = "./assets/icons/play-icon.svg";
});

fastRewindButton.addEventListener("click", () => {
  if (currentSongIndex > 0) {
    currentSongIndex -= 1;
  } else {
    currentSongIndex = 4;
  }

  audio.pause();
  audioSource.src = songs[currentSongIndex];
  audio.load();
  audio.play();
});

volumeRange.addEventListener("input", (e) => {
  volume = e.target.value;
  audio.volume = volume;
  if (volume == 0) {
    volumeImage.src = "./assets/icons/volume-off-icon.svg";
    return;
  }
  volumeImage.src = "./assets/icons/volume-icon.svg";
});

volumeButton.addEventListener("click", () => {
  if (audio.volume > 0) {
    volumeRange.value = 0;
    audio.volume = 0;
    volumeImage.src = "./assets/icons/volume-off-icon.svg";
    return;
  }

  volumeRange.value = volume;
  audio.volume = volume;
  volumeImage.src = "./assets/icons/volume-icon.svg";
});

favoriteButton.addEventListener("click", () => {
  isFavorite = !isFavorite;

  if (isFavorite) {
    favoriteImage.src = "./assets/icons/favorite-selected-icon.svg";
    return;
  }

  favoriteImage.src = "./assets/icons/favorite-icon.svg";
});
