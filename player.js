//Funzionamento bottone play/pause

document.addEventListener('DOMContentLoaded', function () {
  const player = document.querySelector('.music-player');
  const currentTime = document.getElementById('currentTime');
  const playButton = document.getElementById('play');
  let timer;
  let isPlaying = false;
  let seconds = 0;

  const songs = document.querySelectorAll('.song');
  songs.forEach((song) => {
    song.addEventListener('click', function () {
      player.classList.add('show'); // Mostra il player
      resetTimer();
      startTimer(); // Inizia il timer automaticamente
      setPauseIcon(); // Imposta l'icona di pausa
    });
  });

  playButton.addEventListener('click', function () {
    if (isPlaying) {
      pauseTimer();
      setPlayIcon(); // Cambia l'icona in play
    } else {
      startTimer();
      setPauseIcon(); // Cambia l'icona in pausa
    }
  });

  function startTimer() {
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(function () {
        seconds++;
        currentTime.textContent = formatTime(seconds);
        if (seconds >= 30) {
          pauseTimer();
          setPlayIcon();
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isPlaying = false;
  }

  function resetTimer() {
    pauseTimer();
    seconds = 0;
    currentTime.textContent = '00:00';
  }

  function setPlayIcon() {
    playButton.classList.remove('bi-pause-circle-fill');
    playButton.classList.add('bi-play-circle-fill');
  }

  function setPauseIcon() {
    playButton.classList.remove('bi-play-circle-fill');
    playButton.classList.add('bi-pause-circle-fill');
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (remainingSeconds < 10 ? '0' : '') +
      remainingSeconds
    );
  }
  const progressBar = document.getElementById('progressBar');
  const progress = document.getElementById('progress');

  function startTimer() {
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(function () {
        seconds++;
        updateProgressBar(seconds);
        currentTime.textContent = formatTime(seconds);
        if (seconds >= 30) {
          pauseTimer();
          setPlayIcon();
        }
      }, 1000);
    }
  }

  function updateProgressBar(seconds) {
    const percentage = (seconds / 30) * 100;
    progress.style.width = percentage + '%';
  }

  progressBar.addEventListener('mousedown', function (e) {
    const progressBarRect = this.getBoundingClientRect();
    document.onmousemove = function (e) {
      const newWidth = e.clientX - progressBarRect.left;
      const percentage = newWidth / progressBarRect.width;
      updateProgressAndTime(percentage);
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
  });

  function updateProgressAndTime(percentage) {
    percentage = Math.max(0, Math.min(1, percentage));
    seconds = Math.floor(percentage * 30);
    currentTime.textContent = formatTime(seconds);
    progress.style.width = percentage * 100 + '%';
  }
});

//Icone verdi dopo il click

let icons = document.querySelectorAll('.greenable');
function toggleColor() {
  this.classList.toggle('green-class');
}
icons.forEach(function (icon) {
  icon.addEventListener('click', toggleColor);
});

// //player - funzione che regola i minuti rimanenti

// document.addEventListener('DOMContentLoaded', function () {
//   const progressBar = document.getElementById('progressBar');
//   const progress = document.getElementById('progress');
//   const currentTime = document.getElementById('currentTime');
//   const totalTime = document.getElementById('totalTime');

//   progressBar.addEventListener('mousedown', function (e) {
//     const progressBarRect = this.getBoundingClientRect();
//     const maxDuration = parseTime(totalTime.textContent);
//     const mouseDownX = e.clientX;

//     document.onmousemove = function (e) {
//       let newWidth = e.clientX - progressBarRect.left;
//       let percentage = newWidth / progressBarRect.width;
//       percentage = Math.max(0, Math.min(1, percentage));
//       progress.style.width = percentage * 100 + '%';

//       const newTime = percentage * maxDuration;
//       currentTime.textContent = formatTime(newTime);
//     };

//     document.onmouseup = function () {
//       document.onmousemove = document.onmouseup = null;
//     };
//   });

//   function parseTime(timeStr) {
//     const parts = timeStr.split(':').map(Number);
//     return parts[0] * 60 + parts[1];
//   }

//   function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     let remainingSeconds = Math.floor(seconds % 60);
//     return (
//       minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
//     );
//   }
// });

//Controlli volume bar
document.addEventListener('DOMContentLoaded', function () {
  const volumeBar = document.getElementById('volume-bar');
  const volumeProgress = document.getElementById('volumeProgress');

  volumeBar.addEventListener('mousedown', function (e) {
    // Start the dragging process
    updateVolumeProgress(e);

    function onMouseMove(e) {
      updateVolumeProgress(e);
    }

    function onMouseUp() {
      //Rimuove gli eventi in ascolto quando lo scroll termina
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    // Aggiunge gli eventi mousemove e mouseup
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function updateVolumeProgress(e) {
    const volumeBarRect = volumeBar.getBoundingClientRect();
    let newWidth = e.clientX - volumeBarRect.left;
    let percentage = newWidth / volumeBarRect.width;
    percentage = Math.max(0, Math.min(1, percentage));
    volumeProgress.style.width = percentage * 100 + '%';
  }
});

//funzione per mostrare il player se clicchi su una canzone
// document.addEventListener('DOMContentLoaded', function() {
//   const player = document.querySelector('.music-player');

//   // Aggiungi il codice per gestire il clic su una canzone
//   // Ad esempio: se le canzoni abbiano la classe 'song'
//   const songs = document.querySelectorAll('.song');
//   songs.forEach(song => {
//       song.addEventListener('click', function() {
//           player.classList.add('show'); // Mostra il player
//       });
//   });
// });
