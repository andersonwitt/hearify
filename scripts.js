const songInputProgressBar = document.getElementById("song-progress");
const songProgressBar = document.getElementById("song-progress-viewer");
const songProgressRoot = document.getElementById("song-progress-root");

const volumeInputProgressBar = document.getElementById("volume-progress");
const volumeProgressBar = document.getElementById("volume-progress-viewer");
const volumeProgressRoot = document.getElementById("volume-progress-root");

const playButton = document.getElementById("play-button");
const audio = document.getElementById("hearify-audio");

const progressDuration = document.getElementById("progress-duration");
const totalDuration = document.getElementById("total-duration");

const playButtonIcon = document.getElementById("play-button-icon");
const volumeButtonIcon = document.getElementById("volume-button-icon");
const volumeButton = document.getElementById("volume-button");

const songImage = document.getElementById("song-image");
const artistName = document.getElementById("artist-name");
const songName = document.getElementById("song-name");

const cardSongs = document.querySelectorAll(
    ".card-music > article > .thumbnail"
);

const nextSongButton = document.getElementById("next-song-button");
const previousSongButton = document.getElementById("previous-song-button");

let currentSongIndex = 0;
let currentSongTime = 0;
let isSeeking = false;
let volume = 0.01;
let duration = 0;

const songs = [
    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/hnismlldtk4iuvopnbga",
        name: "Vampiro",
        artist: "Matuê",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/wqtslb9rwtup5qkuenuu",
    },
    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/hv5fujgrimpg8hkezoov",
        name: "blinding Light",
        artist: "The Weeknd",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/cceneielfyo0ayzwhnk7",
    },
    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/fx7rv7qxli9uuivosxik",
        name: "Quero Ser Feliz Também",
        artist: "Natiruts",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/papxiaak92hh9a1xhoqg",
    },
    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/sdxp3xvdqctgq8af2srn",
        name: "Nego Drama",
        artist: "Racionais Mc's",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/shjrbrsfliyac2lpbvyg",
    },
    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/vloilzunihfrrijo8x8i",
        name: "In the End",
        artist: "Linkin Park",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/huuu7ic5ynroe2udelit",
    },

    {
        url: "https://res.cloudinary.com/dvsngzeti/video/upload/f_auto:video,q_auto/v1/hearify/songs/ykd9iklgdtbeviay1tee",
        name: "Banana Pancakes",
        artist: "Jack Jhonson",
        image: "https://res.cloudinary.com/dvsngzeti/image/upload/f_auto,q_auto/v1/hearify/images/qqp4aarfbvqikapg5u0e",
    },
];

function handleAudioPlay() {
    playButtonIcon.classList.remove("bi-play-fill");
    playButtonIcon.classList.add("bi-pause-fill");
}

function handleAudioPause() {
    playButtonIcon.classList.remove("bi-pause-fill");
    playButtonIcon.classList.add("bi-play-fill");
}

function updateVolumeIconByValue(volume) {
    if (volume == 0) {
        volumeButtonIcon.classList.remove("bi-volume-down-fill");
        volumeButtonIcon.classList.remove("bi-volume-up-fill");
        volumeButtonIcon.classList.add("bi-volume-mute-fill");

        return;
    }

    if (volume > 0 && volume < 0.5) {
        volumeButtonIcon.classList.remove("bi-volume-up-fill");
        volumeButtonIcon.classList.remove("bi-volume-mute-fill");
        volumeButtonIcon.classList.add("bi-volume-down-fill");
        return;
    }

    volumeButtonIcon.classList.remove("bi-volume-down-fill");
    volumeButtonIcon.classList.remove("bi-volume-mute-fill");
    volumeButtonIcon.classList.add("bi-volume-up-fill");
}

function handleVolumeChanged(e) {
    volume = e.target.value;
    audio.volume = volume;
    updateVolumeIconByValue(e.target.value);
}

function handleFastRewindClicked() {
    if (currentSongIndex > 0) {
        currentSongIndex -= 1;
    } else {
        currentSongIndex = 5;
    }

    audio.src = songs[currentSongIndex].url;
    audio.play();

    songImage.style.backgroundImage = `url(${songs[currentSongIndex].image})`;
    artistName.textContent = songs[currentSongIndex].artist;
    songName.textContent = songs[currentSongIndex].name;
}

function nextSong() {
    if (currentSongIndex < 5) {
        currentSongIndex += 1;
    } else {
        currentSongIndex = 0;
    }

    audio.src = songs[currentSongIndex].url;
    audio.load();
    audio.addEventListener("canplay", () => {
        if (!isSeeking) {
            audio.play();
        }
    });

    songImage.style.backgroundImage = `url(${songs[currentSongIndex].image})`;
    artistName.textContent = songs[currentSongIndex].artist;
    songName.textContent = songs[currentSongIndex].name;
}

function previousSong() {
    if (currentSongIndex < 5) {
        currentSongIndex += 1;
    } else {
        currentSongIndex = 0;
    }

    audio.src = songs[currentSongIndex].url;
    audio.load();
    audio.addEventListener("canplay", () => {
        if (!isSeeking) {
            audio.play();
        }
    });

    songImage.style.backgroundImage = `url(${songs[currentSongIndex].image})`;
    artistName.textContent = songs[currentSongIndex].artist;
    songName.textContent = songs[currentSongIndex].name;
}

nextSongButton.addEventListener("click", nextSong);

previousSongButton.addEventListener("click", handleFastRewindClicked);

audio.addEventListener("durationchange", () => {
    const _player = new Audio(songs[currentSongIndex].url);

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

function handleEndSong() {
    if (currentSongIndex < 5) {
        nextSong();
        return;
    }

    audio.currentTime = 0;
}

function handleClickQueue(index) {
    audio.volume = volume;

    if (currentSongIndex !== index) {
        currentSongIndex = index;

        audio.src = songs[currentSongIndex].url;
        audio.load();
        audio.addEventListener("canplay", () => {
            if (!isSeeking) {
                audio.play();
            }
        });
    } else {
        audio.play();
    }
}

const handleSongQueue = (index, callback) => {
    if (currentSongIndex === index) {
        if (callback) {
            callback(index);
        }
    } else {
    }
};

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateProgress(e) {
    if (audio.paused) {
        return;
    }
    const currentTime = e.target.currentTime;

    const progressPercent = (currentTime / duration) * 100;
    songInputProgressBar.value = progressPercent;

    updateSliderProgress(songInputProgressBar, songProgressBar)();

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    totalDuration.textContent = `${formatTime(durationMinutes)}:${formatTime(
        durationSeconds
    )}`;

    progressDuration.textContent = `${formatTime(currentMinutes)}:${formatTime(
        currentSeconds
    )}`;
}

function setAudioCurrentTime(currentTime) {
    if (
        !isNaN(audio.duration) &&
        isFinite(audio.duration) &&
        currentTime >= 0 &&
        currentTime <= audio.duration
    ) {
        audio.currentTime = currentTime;
    }
}

function handleVolumeClicked() {
    if (audio.volume > 0) {
        volumeRange.value = 0;
        audio.volume = 0;
        volumeImage.src = "./assets/icons/volume-off-icon.svg";
        return;
    }

    volumeRange.value = volume;
    audio.volume = volume;
    volumeImage.src = "./assets/icons/volume-icon.svg";
}

function handleVolumeClicked() {
    let currentVolume = 0;

    if (audio.volume > 0) {
        currentVolume = 0;
    } else {
        currentVolume = Number(volume);
    }

    volumeInputProgressBar.value = currentVolume;
    audio.volume = currentVolume;

    updateVolumeIconByValue(currentVolume);
    updateSliderProgress(volumeInputProgressBar, volumeProgressBar)();
}

const playSong = () => {
    if (audio.paused) {
        audio.volume = volume;
        audio.play();
    } else {
        audio.pause();
    }
};

function progressMouseEvent(eventType, progressBar, inputProgressBar) {
    return () => {
        switch (eventType) {
            case "mouseover":
                progressBar.classList.add("d-none");
                inputProgressBar.classList.remove("d-none");
                break;
            case "mouseleave":
                progressBar.classList.remove("d-none");
                inputProgressBar.classList.add("d-none");
                break;
        }
    };
}

function updateSliderProgress(inputProgressBar, progressBar) {
    return () => {
        const inputObj = {
            value: Number(inputProgressBar.value),
            max: Number(inputProgressBar.max),
            min: Number(inputProgressBar.min),
        };

        const value =
            ((inputObj.value - inputObj.min) / (inputObj.max - inputObj.min)) *
            100;

        inputProgressBar.style.background = `linear-gradient(to right, var(--h-primary) 0%, var(--h-primary) ${value}%, var(--bg-color) ${value}%, var(--bg-color) 100%)`;
        progressBar.style.background = `linear-gradient(to right, var(--h-light-contrast) 0%, var(--h-light-contrast) ${value}%, var(--bg-color) ${value}%, var(--bg-color) 100%)`;
    };
}

function handleHover() {
    cardSongs.forEach((card, index) => {
        const cardButton = card.querySelector(`#play-song-${index + 1}`);

        cardButton.addEventListener("click", () => {
            updateCurrentSong(index);
            handleClickQueue(index);
        });

        card.addEventListener("mouseenter", () => {
            cardButton.classList.remove("d-none");
        });
        card.addEventListener("mouseleave", () => {
            cardButton.classList.add("d-none");
        });
    });
}

function updateCurrentSong(index = currentSongIndex) {
    songImage.style.backgroundImage = `url(${songs[index].image})`;
    artistName.textContent = songs[index].artist;
    songName.textContent = songs[index].name;
}

function onLoad() {
    audio.src = songs[currentSongIndex].url;
    updateSliderProgress(volumeInputProgressBar, volumeProgressBar)();
    updateSliderProgress(songInputProgressBar, songProgressBar)();

    handleHover();
    updateCurrentSong();

    if (audio) {
        audio.load();
    }
}

function handleProgressRangeChanged(e) {
    const progress = Number(e.target.value);

    if (audio?.currentTime >= 0 && duration >= 0 && progress >= 0) {
        const currentTime = (progress / 100) * duration;

        setAudioCurrentTime(currentTime);
    }
}

songProgressRoot.addEventListener(
    "mouseover",
    progressMouseEvent("mouseover", songProgressBar, songInputProgressBar)
);

songProgressRoot.addEventListener(
    "mouseleave",
    progressMouseEvent("mouseleave", songProgressBar, songInputProgressBar)
);

volumeProgressRoot.addEventListener(
    "mouseover",
    progressMouseEvent("mouseover", volumeProgressBar, volumeInputProgressBar)
);

volumeProgressRoot.addEventListener(
    "mouseleave",
    progressMouseEvent("mouseleave", volumeProgressBar, volumeInputProgressBar)
);

songInputProgressBar.addEventListener(
    "input",
    updateSliderProgress(songInputProgressBar, songProgressBar)
);

volumeInputProgressBar.addEventListener("input", (e) => {
    handleVolumeChanged(e);
    updateSliderProgress(volumeInputProgressBar, volumeProgressBar)();
});

window.addEventListener("load", onLoad);

audio.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", playSong);

audio.addEventListener("ended", handleEndSong);

songInputProgressBar.addEventListener("change", handleProgressRangeChanged);

audio.addEventListener("play", handleAudioPlay);

audio.addEventListener("pause", handleAudioPause);

volumeButton.addEventListener("click", handleVolumeClicked);