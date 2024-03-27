let popup = document.getElementById("popup-2")
let popupPause = document.getElementById("popupPause");
let meteorTimeout; // Variabel untuk menampung timeout meteor
let backgroundTimeout; // Variabel untuk menampung timeout background
var gerak = true;
var meteorSpeed = 0.5;
let soundGameOver = new Audio("music/backsoundgameover.wav")


function openPopup(){
    var result = document.getElementById("result-2");
    var score = document.getElementById('score-2').innerHTML;
    result.textContent = score;
    popup.classList.add("open-popup-2");}

function closePopup(){
    popup.classList.remove("open-popup-2");
    location.reload();
}

document.getElementById("menuButton-2").addEventListener("click", function() {
    window.location.href = "index.html";
});

// Fungsi untuk membuka popup pause dan menghentikan pergerakan
function openPopupPause() {
    popupPause.classList.add("open-popupPause");
    gerak = false; // Memberhentikan pergerakan pesawat dan meteor saat game di-pause
    clearTimeout(meteorTimeout); // Menghapus timeout pergerakan meteor
    clearTimeout(backgroundTimeout); // Menghapus timeout pergerakan background
}

// Fungsi untuk menutup popup pause dan melanjutkan pergerakan
function closePopupPause() {
    popupPause.classList.remove("open-popupPause");
    gerak = true; // Mengaktifkan kembali pergerakan pesawat dan meteor saat game dilanjutkan
    setMeteorMoving(); // Memulai kembali pergerakan meteor
    setBackgroundMoving(); // Memulai kembali pergerakan background
}

// Fungsi untuk melanjutkan permainan setelah di-pause
function resumeGame() {
    closePopupPause(); // Tutup popup pause
}

// Fungsi untuk memulai kembali permainan dari awal setelah di-pause
function restartGame() {
    closePopupPause(); // Tutup popup pause
    location.reload(); // Reload halaman untuk memulai kembali game
}

document.getElementById("menuButtonPause").addEventListener("click", function() {
    window.location.href = "index.html";
});

// Fungsi untuk membuat pergerakan background
function setBackgroundMoving() {
    if (gerak == true) {
        backgroundTimeout = setTimeout(function () {
            var bg = document.getElementById('main-2');
            bg.style.backgroundPositionY = (parseInt(bg.style.backgroundPositionY.replace('px', '')) + 1) + 'px';
            var scoreElement = document.getElementById('score-2');
            var score = parseInt(scoreElement.innerHTML);
            scoreElement.innerHTML = score + 1;
            if (score % 1500 === 0) {
                meteorSpeed += 1;
            }
            setBackgroundMoving();
        }, 3);
    }
}

// Inisialisasi background gerak
setBackgroundMoving();

// Fungsi untuk membuat pergerakan meteor
function setMeteorMoving() {
    var meteor = document.getElementById('meteor-2');
    var plane = document.getElementById('plane-2');

    meteorTimeout = setTimeout(function () {
        meteor.style.marginTop = (parseInt(meteor.style.marginTop.replace('px', '')) + meteorSpeed) + 'px';
        if (parseInt(meteor.style.marginTop.replace('px', '')) > 500) {
            meteor.style.marginLeft = (Math.floor(Math.random() * 250) + 50) + 'px';
            meteor.style.marginTop = '-100px';
        }

        if (gerak && !popupPause.classList.contains("open-popupPause")) {
            if (meteor.offsetTop + 56 >= plane.offsetTop && meteor.offsetLeft + 50 >= plane.offsetLeft && meteor.offsetTop + 56 <= plane.offsetTop + 100 && meteor.offsetLeft <= plane.offsetLeft + 50) {
                soundGameOver.play()
                openPopup();
                gerak = false;
                plane.setAttribute('class', 'freeze');
                meteor.setAttribute('class', 'freeze');
            } else {
                setMeteorMoving();
            }
        }

    }, 10);
}

// Inisialisasi meteor
setMeteorMoving();

// Event listener untuk tombol keyboard
window.addEventListener('keydown', function(e) {
    var plane = document.getElementById('plane-2');
    var kiri = parseInt(plane.style.marginLeft.replace('px', ''));
    var atas = parseInt(plane.style.marginTop.replace('px', ''));

    if (gerak == true) {
        if (e.keyCode == 37) {
            if (kiri > 0) {
                plane.style.marginLeft = (kiri - 10) + 'px';
            }
        } else if (e.keyCode == 38) {
            if (atas > 0) {
                plane.style.marginTop = (atas - 10) + 'px';
            }
        } else if (e.keyCode == 39) {
            if (kiri < 340) {
                plane.style.marginLeft = (kiri + 10) + 'px';
            }
        } else if (e.keyCode == 40) {
            if (atas < 400) {
                plane.style.marginTop = (atas + 10) + 'px';
            }
        }
    }
});

// Fungsi untuk memutar atau menghentikan musik
const audio = new Audio();
audio.src = "music/backsound1.mp3";
audio.loop = true;

let iconMusik = document.getElementById("musik-icon");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        iconMusik.src = "icon/noaudio.png";
    } else {
        audio.pause();
        iconMusik.src = "icon/audio.png";
    }
}