const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("play-list");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("play-list-songs");

const currentProgress = document.getElementById("current-progress");

//sarki sirasi
let index;

//dongu durumu
let loop = true;

//karistirma
shuffle = false

//sarki-listesi
const songList = [
  {
    name: "selfControl",
    link: "assets/selfControl.mp3",
    artist: "Laura Branigan",
    image: "assets/selfcontrolpic.jpg",
  },
  {
    name: "blackBacardi",
    link: "assets/blackBacardi.mp3",
    artist: "Gazirovka",
    image: "assets/blackbacardipic.jpg",
  },
  {
    name: "Cocaine",
    link: "assets/Cocaine(remix).mp3",
    artist: "Clandestine",
    image: "assets/cocainePic.jpg",
  },

  {
    name: "Nikotin",
    link: "assets/Nikotin.mp3",
    artist: "Ganvest",
    image: "assets/nikotinpic.jpeg",
  },
  {
    name: "Whiskey-Cola",
    link: "assets/Whiskey-Cola.mp3",
    artist: "Dzharo-Khanza",
    image: "assets/whikescolapic.jpg",
  },
  {
    name: "noCokeNoHeroin",
    link: "assets/noHashasishNoHeroin.mp3",
    artist: "Dr.Alban",
    image: "assets/dralban.jpg",
  },
  {
    name: "allesWasWırMachenIstKunst",
    link: "assets/ALLES WAS ICH MACHE IST KUNST.mp3",
    artist: "UNS",
    image: "assets/unstPic.jpg",
  },
  {
    name: "indimDerelerine",
    link: "assets/kerkayas - michael jackson indim derelerine.mp3",
    artist: "Kerkayas-Michael",
    image: "assets/kerkayas-2.jpg",
  },
];

//zaman düzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;

  return `${minute}:${second}`;
};

//sarki atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;
  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};

//oynat
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide"); // goster
  playButton.classList.add("hide"); //gizle
};

// ses ilerlemesi
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  //progress i ilerletecegiz 30%
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sonraki sarki
const nextSong = () => {
  if (loop) {
    if (index === songList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songList.length);
    setSong(randIndex);
  }
};

//sarki bittiginde
audio.onended = () =>{
    nextSong()
}

//tekrarlama

repeatButton.addEventListener("click",()=>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        audio.shuffle = false
        console.log('dongu kapatildi')
    }
    else{
        repeatButton.classList.add('active')
        audio.shuffle = true
    }
    console.log('dongu acildi')
})

//karistici ac 
// function shuffleSongs() {
//     for (let i = songList.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         songs[i] = songs[j];
        
//     }
// }


shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.shuffleSongs = true
    } else {
        shuffleButton.classList.add('active')
        audio.shuffleSongs = false
    }
})





//sarki listesi ac

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});
//sarki listesi kapat
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//sarki listesini olustur
const initializePlayList = () => {
  for (let i in songList) {
    playListSongs.innerHTML += `<li class="playListSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songList[i].image}"/>
        </div>
        <div class="playlist-song-details">
        <span id=playlist-song-name">
        ${songList[i].name}
        </span></br>
        <span id="playlist-song-artist-name">
        ${songList[i].artist}
        </span>
        </div>
        </li>
        `
  }
};

//ekrsn yüklenildiginde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList();
};

const previousSong = () => {
  if (index > 0) {
    //sarkiyi durdur
    index = index - 1;
  } else {
    index = songList.length - 1;
  }
  setSong(index);
};

//play buttona tıklanıldığında birşey yap
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//prev button
prevButton.addEventListener("click", previousSong);

//durdur butonuna tiklanildiginda
pauseButton.addEventListener("click", pauseAudio);

console.log(playListSongs)
