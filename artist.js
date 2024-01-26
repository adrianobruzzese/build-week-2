const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let idArtist;
let urlTracklist;
document.addEventListener("DOMContentLoaded", function () {
  // Recupera i parametri dall'URL
  const urlParams = new URLSearchParams(window.location.search);

  // Ottieni il valore della variabile
  idArtist = urlParams.get("id");
  sessionStorage.setItem("idArtist", idArtist);
  // Fai qualcosa con il valore ottenuto
  console.log("Valore ricevuto:", idArtist);
  fetchF();
  fetchTrack();
});

const fetchF = () => {
  fetch(`${url}${idArtist}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Riscontrato errore");
      }
    })
    .then((data) => {
      const formattedRank = data.nb_fan.toLocaleString();
      console.log("data", data);
      const nameArtist = document.getElementById("name-artist");
      nameArtist.innerText = data.name;
      const ascoltatori = document.getElementById("listener");
      ascoltatori.innerText = "Follower" + " " + formattedRank;
      const imageArtist = document.getElementById("artistImg");
      imageArtist.src = data.picture_medium;
    })
    .catch((err) => {
      console.error(err);
    });
};

const fetchTrack = () => {
  urlTracklist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtist}/top?limit=50`;
  console.log(urlTracklist);
  fetch(urlTracklist, {
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
    .then((track) => {
      console.log(track);

      const trackList = document.getElementById("tracklist");
      const listSong = document.createElement("ol");
      listSong.innerHTML = `
              <li>${track.data[0].title}<p class='s-5'>Album: ${track.data[0].album.title}</p></li>
              <li>${track.data[1].title}<p class='s-5'>Album: ${track.data[1].album.title}</li>
              <li>${track.data[2].title}<p class='s-5'>Album: ${track.data[2].album.title}</li>
              <li>${track.data[3].title}<p class='s-5'>Album: ${track.data[3].album.title}</li>
              <li>${track.data[4].title}<p class='s-5'>Album: ${track.data[4].album.title}</li>
              `;

      trackList.appendChild(listSong);
      const cardContainer = document.getElementById("card-song");
      cardContainer.innerHTML = `
<div class="card border-0 bg-transparent pt-3 align-items-center" style='width:200px'>
  <img src="${track.data[0].album.cover}" class="card-img-top w-50 rounded-circle" alt="...">
  <div class="card-body text-center text-white ">
    <h5 class="card-title">${track.data[0].title}</h5>
    <p class="card-text">${track.data[0].album.title}</p>
  </div>
</div>
`;
    })
    .catch((err) => {
      console.error(err);
    });
};

function changeButtonText() {
  const btn = document.getElementById("btn-change");
  if (btn.innerText === "Segui") {
    // Cambia il testo del bottone a 'Seguito'
    btn.innerText = "Seguito";
  } else {
    // Se il testo non è 'Segui', cambialo nuovamente a 'Segui'
    btn.innerText = "Segui";
  }
}

function changeBtnPlay() {
  const btnPlay = document.getElementById("play-pause");
  if (
    btnPlay.innerHTML ===
    `<i class="bi bi-play-circle-fill text-success fs-1"></i>`
  ) {
    // Cambia il testo del bottone a 'Seguito'
    btnPlay.innerHTML = `<i class="bi bi-pause-circle-fill text-success fs-1"></i>`;
  } else {
    // Se il testo non è 'Segui', cambialo nuovamente a 'Segui'
    btnPlay.innerHTML = `<i class="bi bi-play-circle-fill text-success fs-1"></i>`;
  }
}
