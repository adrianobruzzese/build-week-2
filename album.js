const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let trackInfo;
let idAlbum;
document.addEventListener("DOMContentLoaded", function () {
  // Recupera i parametri dall'URL
  const urlParams = new URLSearchParams(window.location.search);

  // Ottieni il valore della variabile
  idAlbum = urlParams.get("id");

  // Fai qualcosa con il valore ottenuto
  console.log("Valore ricevuto:", idAlbum);
  initializeAlbum();
});

const fetchAlbumData = () => {
  return fetch(`${url}${idAlbum}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati dell'album");
      }
      return response.json();
      console.log(response);
    })
    .catch((error) => {
      console.error(error.message);
      return null;
    });
};

const initializeAlbum = () => {
  console.log(`${url}${idAlbum}`);
  fetchAlbumData().then((albumData) => {
    console.log(albumData);
    if (albumData) {
      trackInfo = albumData.tracks.data;
      generateAlbum(albumData);
      generateTrack(trackInfo);
    }
  });
};

//Generazione Album
const generateAlbum = (data) => {
  const releaseYear = new Date(data.release_date).getFullYear();
  const hero = document.getElementById("hero");
  const container = document.createElement("div");

  const ore = Math.floor(data.duration / 3600);
  const minuti = Math.floor((data.duration % 3600) / 60);
  const secondiRimanenti = Math.floor(data.duration % 60);

  const secondiFormattati =
    secondiRimanenti < 10 ? `0${secondiRimanenti}` : `${secondiRimanenti}`;

  container.classList.add("container", "d-flex", "justify-content-between");
  container.innerHTML = `
    <div class="col-3">
      <img src="${data.cover}" alt="coverAlbum" width="250px" height="250px" />
    </div>
    <div class="col-9 d-flex flex-column justify-content-end align-items-start">
      <div class="row"><p>${data.type.toUpperCase()}</p></div>
      <div class="row"><h1>${data.title}</h1></div>
      <div class="row">
        <div class="col-12 d-flex justify-content-start align-items-center">
          <img class="me-1 rounded rounded-circle" src="${
            data.artist.picture
          }" alt="coverArtist" style="height:30px; width:30px;"/>
          <p class="m-0" id="nameArtist">
          
          
          ${data.artist.name} &middot;
          
          </p>
          <p class="m-0" id="year">${releaseYear} &middot;</p>
          <p class="m-0">${data.nb_tracks} brani,
            <span>${ore}h ${minuti}m ${secondiFormattati} s</span>
          </p>
        </div>
      </div>
    </div>`;
  hero.appendChild(container);
};
//Generazione Track

const generateTrack = (trackInfo) => {
  const tracks = document.getElementById("tracks");
  trackInfo.forEach((info, index) => {
    const formattedRank = info.rank.toLocaleString();
    const container = document.createElement("div");
    container.classList.add(
      "container",
      "d-flex",
      "justify-content-between",
      "mt-1",
      "trackList"
    );
    const minuti = Math.floor(info.duration / 60);
    const secondiRimanenti = Math.floor(info.duration % 60);
    const secondiFormattati =
      secondiRimanenti < 10 ? `0${secondiRimanenti}` : `${secondiRimanenti}`;
    container.setAttribute("data-id", info.id);
    container.innerHTML = `
      <div class="col-1 p-2">
        <p class="text-end me-2">${index + 1}</p>
      </div>
      <div class="col-6 p-2">${info.title}<br/><span class="opacity-50">
      ${info.artist.name}
    </a></span></div>
      <div class="col-3 p-2 opacity-50">${formattedRank}</div>
      <div class="col-2 p-2 opacity-50">${minuti}:${secondiFormattati}</div>
    `;
    container.addEventListener("click", handleClick);
    tracks.appendChild(container);
  });
};
//Generazione Player

const generatePlayer = (data) => {
  console.log("dati per preview completo", data.preview);
  sessionStorage.setItem("albumCorrente", data.preview);
  console.log("daje", sessionStorage.getItem("albumCorrente"));
  const player = document.getElementById("song");
  const track = document.createElement("div");
  track.classList.add("song-infos");
  track.innerHTML = `
    <div class="image-container">
      <img src="${data.album.cover}" alt="" />
    </div>
    <div class="song-description">
      <p class="title">${data.title}</p>
      <p class="artist">${data.artist.name}</p>
    </div>
    <div class="icons">
      <i class="bi bi-heart greenable"></i>
      <i class="bi bi-fullscreen-exit"></i>
    </div>`;
  player.innerHTML = "";
  player.appendChild(track);
  isPlaying = false;
  playMusic();
};
//Gestione click su traccia
const handleClick = (event) => {
  const trackId = event.currentTarget.getAttribute("data-id");
  console.log("Hai cliccato sulla traccia con ID:", trackId);
  if (trackInfo) {
    const selectedTrack = trackInfo.find(
      (track) => track.id === parseInt(trackId)
    );
    generatePlayer(selectedTrack, trackId);
  }
};

//Funzionamento bottone play/pause
document.getElementById("play").addEventListener("click", function () {
  let playIcon = this;
  if (playIcon.classList.contains("bi-play-circle-fill")) {
    playIcon.classList.remove("bi-play-circle-fill");
    playIcon.classList.add("bi-pause-circle-fill");
  } else {
    playIcon.classList.remove("bi-pause-circle-fill");
    playIcon.classList.add("bi-play-circle-fill");
  }
});

//Icone verdi dopo il click
let icons = document.querySelectorAll(".greenable");
function toggleColor() {
  this.classList.toggle("green-class");
}
icons.forEach(function (icon) {
  icon.addEventListener("click", toggleColor);
});

//player - funzione che regola i minuti rimanenti
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const totalTime = document.getElementById("totalTime");

  progressBar.addEventListener("mousedown", function (e) {
    const progressBarRect = this.getBoundingClientRect();
    const maxDuration = parseTime(totalTime.textContent);
    const mouseDownX = e.clientX;

    document.onmousemove = function (e) {
      let newWidth = e.clientX - progressBarRect.left;
      let percentage = newWidth / progressBarRect.width;
      percentage = Math.max(0, Math.min(1, percentage));
      progress.style.width = percentage * 100 + "%";

      const newTime = percentage * maxDuration;
      currentTime.textContent = formatTime(newTime);
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
  });

  function parseTime(timeStr) {
    const parts = timeStr.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return (
      minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
    );
  }
});

//Controlli volume bar
const audio = new Audio();
document.addEventListener("DOMContentLoaded", function () {
  const volumeBar = document.getElementById("volume-bar");
  const volumeProgress = document.getElementById("volumeProgress");

  audio.volume = 0.1;
  setVolumeProgress(audio.volume);
  volumeBar.addEventListener("mousedown", function (e) {
    // Start the dragging process
    updateVolumeProgress(e);

    function onMouseMove(e) {
      updateVolumeProgress(e);
    }

    function onMouseUp() {
      //Rimuove gli eventi in ascolto quando lo scroll termina
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Aggiunge gli eventi mousemove e mouseup
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function updateVolumeProgress(e) {
    const volumeBarRect = volumeBar.getBoundingClientRect();
    let newWidth = e.clientX - volumeBarRect.left;
    let percentage = newWidth / volumeBarRect.width;
    percentage = Math.max(0, Math.min(1, percentage)); // Clamp between 0 and 1
    audio.volume = percentage;
    setVolumeProgress(percentage);
  }
  function setVolumeProgress(percentage) {
    volumeProgress.style.width = percentage * 100 + "%";
  }
});
console.log("daje", sessionStorage.getItem("albumCorrente"));
let isPlaying = false;

const playMusic = () => {
  if (!isPlaying) {
    const albumCorrente = sessionStorage.getItem("albumCorrente");

    if (albumCorrente) {
      audio.pause();
      audio.src = albumCorrente;
      audio.play();

      isPlaying = true;

      audio.addEventListener("loadedmetadata", function () {
        document.getElementById("totalTime").textContent = formatTime(
          audio.duration
        );
      });

      audio.addEventListener("timeupdate", function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        document.getElementById("currentTime").textContent =
          formatTime(currentTime);
        updateProgressBar(currentTime, duration);
      });
    } else {
      console.error("Errore: albumCorrente non presente in sessionStorage");
    }
  } else {
    audio.pause();
    isPlaying = false;
  }
};

// Chiamata alla funzione playMusic quando necessario
// playMusic();

const updateProgressBar = (currentTime, duration) => {
  const percentage = (currentTime / duration) * 100;
  document.getElementById("progress").style.width = `${percentage}%`;
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(1, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
