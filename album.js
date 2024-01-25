let trackInfo;
const fetchFunction = () => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati dell'album");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
      return null;
    });
};
//Generazione Album
const generateAlbum = (data) => {
  const releaseYear = new Date(data.release_date).getFullYear();
  const hero = document.getElementById("hero");
  const container = document.createElement("div");
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
          <p class="m-0" id="nameArtist">${data.artist.name} &middot;</p>
          <p class="m-0" id="year">${releaseYear} &middot;</p>
          <p class="m-0">${data.nb_tracks} brani,
            <span>${formattedDuration}</span>
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
    container.setAttribute("data-id", info.id);
    container.innerHTML = `
      <div class="col-1 p-2">
        <p class="text-end me-2">${index + 1}</p>
      </div>
      <div class="col-6 p-2">${info.title}<br/><span class="opacity-50">${
      info.artist.name
    }</span></div>
      <div class="col-3 p-2 opacity-50">${formattedRank}</div>
      <div class="col-2 p-2 opacity-50">${formattedDuration}</div>
    `;
    container.addEventListener("click", handleClick);
    tracks.appendChild(container);
  });
};
//Generazione Player
const generatePlayer = (data) => {
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
//Inizializzazione Album
const initializeAlbum = () => {
  fetchFunction().then((albumData) => {
    if (albumData) {
      trackInfo = albumData.tracks.data;
      generateAlbum(albumData);
      generateTrack(trackInfo);
    }
  });
};
//Inizializzazione Player
initializeAlbum();
