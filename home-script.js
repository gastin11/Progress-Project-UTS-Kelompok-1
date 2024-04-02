const audio = new Audio();
audio.src = "music/backsound.mp3";
audio.loop = true;

let popup = document.getElementById("popup-caraMain"),
    popup2 = document.getElementById("popup-tentangGame");

function openPopupCara(){
        popup.classList.add("open-popup-caraMain");
}
    
function closePopupCara(){
        popup.classList.remove("open-popup-caraMain");
}
    

function openPopupTentang(){
    popup2.classList.add("open-popup-tentangGame");
}

function closePopupTentang(){
    popup2.classList.remove("open-popup-tentangGame");
}

let iconMusik = document.getElementById("musik-icon");

function toggleMusic() {
    if (audio.paused) {
        audio.play(); // Mulai audio jika sedang di-pause
        iconMusik.src = "icon/noaudio.png"; // Ganti ikon menjadi ikon mute
    } else {
        audio.pause(); // Pause audio jika sedang diputar
        iconMusik.src = "icon/audio.png"; // Ganti ikon menjadi ikon musik
    }
}