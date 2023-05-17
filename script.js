const fastForwardButton = document.getElementById("fast-forward-button");
const fastRewindButton = document.getElementById("fast-rewind-button");
const durationProgress = document.getElementById("duration-progress");
const favoriteButton = document.getElementById("favorite-button");
const favoriteImage = document.getElementById("favorite-image");
const progressRange = document.getElementById("progress-bar");
const playButtonImage = document.getElementById("play-image");
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
let velocity = 1;
let volume = 0.5;

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

    if (progressPercent == 100) {
        if (isRepeat) {
            repeat();
            return;
        }

        audio.currentTime = 0;
        playButtonImage.src = "./assets/icons/play-icon.svg";
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
    playButtonImage.src = "./assets/icons/play-icon.svg";
});

progressRange.addEventListener("change", () => {
    const progress = progressRange.value;
    const duration = audio.duration;
    audio.currentTime = (progress / 100) * duration;
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
