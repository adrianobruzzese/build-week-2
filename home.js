// const getMyAlbum = function () {
//   const myUrl =
//     "https://striveschool-api.herokuapp.com/api/deezer/album/134367092";

//   const titeLike1 = document.getElementById("titeLike1");
//   const titeLike2 = document.getElementById("titeLike2");
//   const titeLike3 = document.getElementById("titeLike3");
//   const titeLike4 = document.getElementById("titeLike4");

//   fetch(myUrl)
//     .then((res) => {
//       if (res.ok) {
//         console.log("Success");
//         return res.json();
//       } else {
//         console.log("Not Succesful");
//       }
//     })

//     .then((data) => {
//       console.log("Data from API:", data);
//     })

//     .catch();
// };
// getMyAlbum();

// const getMySong = function () {
//   const myUrl =
//     "https://striveschool-api.herokuapp.com/api/deezer/artist/9172904/albums";

//   const eventoCol1 = document.getElementById("evento-col1");
//   const eventoCol2 = document.getElementById("evento-col2");
//   const eventoCol3 = document.getElementById("evento-col3");
//   const eventoCol4 = document.getElementById("evento-col4");

//   fetch(myUrl)
//     .then((res) => {
//       if (res.ok) {
//         console.log("Succes");
//         return res.json();
//       } else {
//         console.log("Not Successful");
//       }
//     })

//     .then((data) => {
//       console.log("Data from API:", data);
//       console.log(data.data[1].title);

//       if (
//         eventoCol1 &&
//         eventoCol2 &&
//         eventoCol3 &&
//         eventoCol4 &&
//         data.data &&
//         data.data.length >= 4
//       ) {
//         console.log("Elementi disponibili");

//         document.getElementById("top1").innerText = data.data[0].title;
//         document.getElementById("top2").innerText = data.data[1].title;
//         document.getElementById("top3").innerText = data.data[2].title;
//         document.getElementById("top4").innerText = data.data[3].title;

//         console.log("Title assegnato");
//       } else {
//         console.log("errore");
//       }
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// };
// getMySong();
