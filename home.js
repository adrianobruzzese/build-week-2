const url = "https://striveschool-api.herokuapp.com/api/deezer/album/508204251";
const cardMain = () => {
  fetch(url, {
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
      console.log("data", data);
      const cardImg = document.getElementById("card-img");
      cardImg.src = data.cover_big;
      const cardTitle = document.getElementById("title-album");
      cardTitle.innerText = data.title;
      const cardArtist = document.getElementById("artist");
      cardArtist.innerText = data.artist.name;
      const cardArtistSm = document.getElementById("artist-sm");
      cardArtistSm.innerText = data.artist.name;
    })
    .catch((err) => {
      console.log("errore", err);
    });
};
cardMain();
