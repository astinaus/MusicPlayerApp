const image = document.getElementById('cover'),
  title = document.getElementById('music-title'),
  artist = document.getElementById('music-artist'),
  currentTimeEl = document.getElementById('current-time'),
  durationEl = document.getElementById('duration'),
  progress = document.getElementById('progress'),
  playerProgress = document.getElementById('player-progress'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next'),
  playBtn = document.getElementById('play'),
  volMeter = document.getElementById('volume-meter'),
  background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
  {
    path: 'assets/1.mp3',
    displayName: '좋은 밤 좋은 꿈',
    cover: 'assets/1.jpg',
    artist: '너드커넥션(Nerd Connection)',
  },
  {
    path: 'assets/2.mp3',
    displayName: 'Home Sweet Home',
    cover: 'assets/2.jpg',
    artist: '카더가든(Car, the garden)',
  },
  {
    path: 'assets/3.mp3',
    displayName: '고백',
    cover: 'assets/3.jpg',
    artist: '델리스파이스(Delispice)',
  },
  {
    path: 'assets/4.mp3',
    displayName: '사랑 사랑',
    cover: 'assets/4.jpg',
    artist: 'Kid Wine',
  },
  {
    path: 'assets/5.mp3',
    displayName: '사랑해서 미안해서',
    cover: 'assets/5.jpg',
    artist: 'PATEKO, Kid Wine',
  },
  {
    path: 'assets/6.mp3',
    displayName: '백야',
    cover: 'assets/6.jpg',
    artist: '짙은',
  },
  {
    path: 'assets/7.mp3',
    displayName: '등대',
    cover: 'assets/7.jpg',
    artist: '하현상',
  },
  {
    path: 'assets/8.mp3',
    displayName: '니가 보고 싶은 밤',
    cover: 'assets/8.jpg',
    artist: '윤딴딴',
  },
];

let musicIndex = 0;
let volume = 0.5;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button to pause button
  playBtn.classList.replace('fa-play', 'fa-pause');
  // Set button hover title
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button to play button
  playBtn.classList.replace('fa-pause', 'fa-play');
  // Set button hover title
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
  music.volume = volume;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;

  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { currentTime, duration } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
  durationEl.textContent =
    `${formatTime(duration / 60)}:${formatTime(duration % 60)}` === 'NaN:NaN'
      ? '00:00'
      : `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

function volumeControl(e) {
  volume = e.target.value / 1000;
  music.volume = volume;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
volMeter.addEventListener('input', volumeControl);

loadMusic(songs[musicIndex]);
