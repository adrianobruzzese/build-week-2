//Funzionamento bottone play/pause
document.getElementById('play').addEventListener('click', function () {
    let playIcon = this;
    if (playIcon.classList.contains('bi-play-circle-fill')) {
      playIcon.classList.remove('bi-play-circle-fill');
      playIcon.classList.add('bi-pause-circle-fill');
    } else {
      playIcon.classList.remove('bi-pause-circle-fill');
      playIcon.classList.add('bi-play-circle-fill');
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
  
  //player - funzione che regola i minuti rimanenti
  document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
  
    progressBar.addEventListener('mousedown', function (e) {
      const progressBarRect = this.getBoundingClientRect();
      const maxDuration = parseTime(totalTime.textContent);
      const mouseDownX = e.clientX;
  
      document.onmousemove = function (e) {
        let newWidth = e.clientX - progressBarRect.left;
        let percentage = newWidth / progressBarRect.width;
        percentage = Math.max(0, Math.min(1, percentage)); 
        progress.style.width = percentage * 100 + '%';
  
        const newTime = percentage * maxDuration;
        currentTime.textContent = formatTime(newTime);
      };
  
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    });
  
    function parseTime(timeStr) {
      const parts = timeStr.split(':').map(Number);
      return parts[0] * 60 + parts[1];
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      let remainingSeconds = Math.floor(seconds % 60);
      return (
        minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
      );
    }
  });
  
  //Controlli volume bar
  document.addEventListener('DOMContentLoaded', function() {
    const volumeBar = document.getElementById('volume-bar');
    const volumeProgress = document.getElementById('volumeProgress');

    volumeBar.addEventListener('mousedown', function(e) {
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
        percentage = Math.max(0, Math.min(1, percentage)); // Clamp between 0 and 1
        volumeProgress.style.width = (percentage * 100) + '%';
    }
});
