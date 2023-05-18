const fastForwardButton = document.getElementById("fast-forward-button");
const fastRewindButton = document.getElementById("fast-rewind-button");
const durationProgress = document.getElementById("duration-progress");
const arrowBackButton = document.getElementById("arrow-back-button");
const arrowNextButton = document.getElementById("arrow-next-button");
const scrollContainer = document.querySelector(".artists-content");
const favoriteButton = document.getElementById("favorite-button");
const favoriteImage = document.getElementById("favorite-image");
const progressRange = document.getElementById("progress-bar");
const playButtonImage = document.getElementById("play-image");
const audioSource = document.getElementById("hearify-source");
const replayButton = document.getElementById("replay-button");
const repeatButton = document.getElementById("repeat-button");
const volumeButton = document.getElementById("volume-button");
const durationDisplay = document.getElementById("duration");
const volumeRange = document.getElementById("volume-bar");
const playButton = document.getElementById("play-button");
const volumeImage = document.getElementById("volume-img");
const repeatImage = document.getElementById("repeat-img");
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

function playSong() {
  if (audio.paused) {
    audio.play();
    audio.volume = volume;
  } else {
    audio.pause();
  }
}

const handleCurrentSong = (index, callback) => {
  const button = document.getElementById(`play-song-${index + 1}`);
  const songNumber = document.getElementById(`song-number-${index + 1}`);
  const songArticle = document.getElementById(`song${index + 1}`);

  if (currentSongIndex === index) {
    button.classList.remove("hide");
    button.classList.add("d-flex");
    songNumber.classList.add("hide");
    songArticle.classList.add("active");
    callback?.(index);
  } else {
    button.classList.add("hide");
    button.classList.remove("d-flex");
    songNumber.classList.remove("hide");
    songArticle.classList.remove("active");
  }
};

window.onload = () => {
  songs.forEach((_, index) => {
    const button = document.getElementById(`play-song-${index + 1}`);
    const songNumber = document.getElementById(`song-number-${index + 1}`);
    const songArticle = document.getElementById(`song${index + 1}`);

    if (currentSongIndex === index) {
      button.classList.remove("hide");
      button.classList.add("d-flex");
      songNumber.classList.add("hide");
      songArticle.classList.add("active");
    } else {
      button.classList.add("hide");
      button.classList.remove("d-flex");
      songNumber.classList.remove("hide");
      songArticle.classList.remove("active");
    }
    button.addEventListener("click", playSong);
    songArticle.addEventListener("click", () => {
      if (currentSongIndex !== index) {
        currentSongIndex = index;
        audio.pause();
        audioSource.src = songs[currentSongIndex];
        audio.load();
        audio.play();
      }
    });
  });
};

//playLinks();

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
  _player.currentTime = 24 * 60 * 60;
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

playButton.addEventListener("click", playSong);

progressRange.addEventListener("change", (e) => {
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
  songs.forEach((_, index) => {
    const button = document.getElementById(`play-song-${index + 1}`);
    const songNumber = document.getElementById(`song-number-${index + 1}`);
    const songArticle = document.getElementById(`song${index + 1}`);

    if (currentSongIndex === index) {
      button.classList.remove("hide");
      button.classList.add("d-flex");
      songNumber.classList.add("hide");
      songArticle.classList.add("active");

      const img = document.getElementById(`play-song-image-${index + 1}`);
      img.src = "./assets/icons/pause-icon.svg";
    } else {
      button.classList.add("hide");
      button.classList.remove("d-flex");
      songNumber.classList.remove("hide");
      songArticle.classList.remove("active");
    }
  });
});
audio.addEventListener("pause", () => {
  songs.forEach((_, index) => {
    if (currentSongIndex === index) {
      const img = document.getElementById(`play-song-image-${index + 1}`);
      img.src = "./assets/icons/play-icon.svg";
    }
  });
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

arrowBackButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    top: 0,
    left: -400,
    behavior: "smooth",
  });
});
arrowNextButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    top: 0,
    left: 400,
    behavior: "smooth",
  });
});
