const url = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const generatePlayer = (data) => {
  const player = document.getElementById("song");
  const track = document.createElement("div");
  track.classList.add("song-infos");
  track.innerHTML = `
  <div class="image-container">
    <img src="${data.cover}" alt="" />
  </div>
  <div class="song-description">
    <p class="title">${data.title}</p>
    <p class="artist">
      ${data.artist}
    </p>
  </div>
  <div class="icons">
    <i class="bi bi-heart greenable"></i>
    <i class="bi bi-fullscreen-exit"></i>
  </div>
  `;
  player.appendChild(track);
};
const generateAlbum = (data) => {
  const hero = document.getElementById("hero");
  const container = document.createElement("div");
  container.classList.add("container", "d-flex", "justify-content-between");
  container.innerHTML = `
    <div class="col-3">
      <img src="${data.cover}" alt="coverAlbum" width="150px" height="150px" />
    </div>
    <div class="col-9">
      <div class="row"><p>${data.type}</p></div>
      <div class="row"><h1>${data.title}</h1></div>
      <div class="row">
      <div class="col-12 d-flex justify-content-start align-items-center ">
      <img class="me-1 rounded rounded-circle" src="${data.picture}" alt="coverArtist" style="height:30px; width:30px;"/>
            <p class="m-0" id="nameArtist">${data.artist} &middot;</p>
            <p class="m-0" id="year">${data.release_date} &middot;</p>
            <p class="m-0">${data.nb_tracks} brani,
              <span>${data.duration}</span>
            </p>
            </div>
            </div>
      </div>
    </div>`;
  hero.appendChild(container);
};
const generateTrack = (trackInfo) => {
  const tracks = document.getElementById("tracks");
  trackInfo.forEach((info) => {
    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-between");
    container.innerHTML = `
  <div class="col-1">
    <p class="text-end me-2">${info.nb_tracks}</p>
  </div>
  <div class="col-6">${info.title}<br/><span class="text-white-50">${info.artist}</span></div>
  <div class="col-3">${info.rank}</div>
  <div class="col-2">${info.duration}</div>
  </div>`;
    tracks.appendChild(container);
  });
};
const fetchFunction = function () {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Riscontrato errore");
      }
    })
    .then((data) => {
      /* Oggetto albums con generazione grafica */
      const albums = {
        title: data.title,
        artist: data.artist.name,
        cover: data.cover,
        duration: `${Math.floor(data.duration / 60)}:${(data.duration % 60)
          .toString()
          .padStart(2, "0")}`,
        picture: data.artist.picture,
        release_date: new Date(data.release_date).getFullYear(),
        nb_tracks: data.nb_tracks,
        tracks: data.tracks,
        type: data.type.toUpperCase(),
      };
      generateAlbum(albums);
      console.log(albums);

      /* Oggetto tracks con generazione grafica */
      const allTracks = [];
      for (let i = 0; i < data.tracks.data.length; i++) {
        const track = data.tracks.data[i];
        const trackInfo = {
          title: track.title,
          duration: `${Math.floor(track.duration / 60)}:${(track.duration % 60)
            .toString()
            .padStart(2, "0")}`,
          rank: track.rank.toLocaleString(),
          nb_tracks: allTracks.length + 1,
          artist: track.artist.name,
        };
        allTracks.push(trackInfo);
      }
      generateTrack(allTracks);
      console.log(allTracks);

      /* Oggetto player con generazione grafica */
      const players = {
        title: data.title,
        artist: data.artist.name,
        cover: data.cover,
      };
      generatePlayer(players);
      console.log(players);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

fetchFunction();
