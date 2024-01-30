function setupAudioPlayer(albumData) {
    const audioElement = document.querySelector('audio');
    const controlButton = document.getElementById('control');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');
    const coverElement = document.getElementById('cover');
    const titleElement = document.getElementById('title');


    function getActualTrack() {
        return parseInt(audioElement.getAttribute('data-current-track'), 10);
    };

    function setTrack(index) {
        const track = albumData.album.tracks[index];
    
        if (track) {
            audioElement.src = track.src;
            audioElement.setAttribute('data-current-track', index);
        }
    };

    function updateTrackInfo() {
        const currentTrackIndex = getActualTrack();
        const currentTrack = albumData.album.tracks[currentTrackIndex];

        titleElement.textContent = currentTrack.title;
        restartTrack();
    }

    function restartTrack() {
        controlButton.click;
    }


    if (albumData.album.tracks.length > 0) { //Checar se há tracks
        //Setar SRC do audio p/ primeira track
        audioElement.src = albumData.album.tracks[0].src;

        //Setar um atributo p/ rastrear a track
        audioElement.setAttribute('data-current-track', 0);
    }

    if (albumData.album.cover) { //Checar se há cover
        coverElement.src = albumData.album.cover;
    }

    if (albumData.album.author) { //Checar se há author
        document.getElementById('author').textContent = albumData.album.author;
    }

    if (albumData.album.title) { //Checar se há title
        titleElement.textContent = albumData.album.title;
    }


    controlButton.addEventListener('click', function() {
        //Tocar ou pausar de acordo com o estado
        if (this.dataset.playing === "false") {
            audioElement.play();
            updateTrackInfo();
            this.dataset.playing = "true";
            this.classList.remove('bi-play-circle-fill');
            this.classList.add('bi-pause-circle-fill');
        } else if (this.dataset.playing === "true") {
            audioElement.pause();
            updateTrackInfo();
            this.dataset.playing = "false";
            this.classList.remove('bi-pause-circle-fill');
            this.classList.add('bi-play-circle-fill');
        }
    });


    nextButton.addEventListener('click', function() {
        const nextTrackIndex = getActualTrack() + 1;

        if (nextTrackIndex < albumData.album.tracks.length) {
            //Setar SRC do audioElement p/ próx track
            audioElement.src = albumData.album.tracks[nextTrackIndex].src;
            audioElement.setAttribute('data-current-track', nextTrackIndex);
            setTrack(nextTrackIndex);
            updateTrackInfo();
        } else { //Setar para a última track
            const lastTrackIndex = albumData.album.tracks.length - 1;

            audioElement.src = albumData.album.tracks[lastTrackIndex].src;
            audioElement.setAttribute('data-current-track', lastTrackIndex);
            setTrack(lastTrackIndex);
        }
    });

    previousButton.addEventListener('click', function() {
        const prevTrackIndex = getActualTrack() - 1;

        if (prevTrackIndex >= 0) {
            //Setar SRC do audioElement p/ a track anterior
            audioElement.src = albumData.album.tracks[prevTrackIndex].src;

            audioElement.setAttribute('data-current-track', prevTrackIndex);
            setTrack(prevTrackIndex);
        } else { //Setar para a última track
            const lastTrackIndex = albumData.album.tracks.length - 1;

            audioElement.src = albumData.album.tracks[lastTrackIndex].src;
            audioElement.setAttribute('data-current-track', lastTrackIndex);
            setTrack(lastTrackIndex);
        }

        updateTrackInfo();
    });
};



//GET JSON do album.json
fetch('data/album.json')
    .then(response => response.json())
    .then(albumData => setupAudioPlayer(albumData))
    .catch(error => console.error('An error ocurred while trying to fetch the Album JSON... ', error));