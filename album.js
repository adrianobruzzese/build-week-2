const url = "https://striveschool-api.herokuapp.com/api/product/";

const fetchFunction = function () {
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Riscontrato errore");
      }
    })
    .then((data) => {
      console.log(data);
      generateCards(data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
fetchFunction();
