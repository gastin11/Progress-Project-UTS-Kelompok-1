let popup = document.getElementById("popup-2")
var gerak = true;
var meteorSpeed = 0.5;

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


function setBackgroundMoving() {
    if (gerak == true) {
        setTimeout(function () {
            // setting background gerak
            var bg = document.getElementById('main-2');
            bg.style.backgroundPositionY = (parseInt(bg.style.backgroundPositionY.replace('px', '')) + 1) + 'px';

            // skor
            var scoreElement = document.getElementById('score-2');
            var score = parseInt(scoreElement.innerHTML);
            scoreElement.innerHTML = score + 1;

            // Periksa apakah skor baru mencapai kelipatan 1000
            if (score % 1500 === 0) {
                meteorSpeed += 1; // Tingkatkan kecepatan pergerakan meteor
            }

            // panggil rekursif setbackgroundmoving
            setBackgroundMoving();
        }, 3);
    }
}

// inisialisasi background gerak
setBackgroundMoving();

// seting meteor
function setMeteorMoving() {
    var meteor = document.getElementById('meteor-2'),
        plane = document.getElementById('plane-2');

    setTimeout(function () {

        meteor.style.marginTop = (parseInt(meteor.style.marginTop.replace('px', '')) + meteorSpeed) + 'px'; // Menggunakan meteorSpeed untuk mengatur kecepatan pergerakan meteor

        if (parseInt(meteor.style.marginTop.replace('px', '')) > 500) {
            meteor.style.marginLeft = (Math.floor(Math.random() * 250) + 50) + 'px';
            meteor.style.marginTop = '-100px';
        }

        if (meteor.offsetTop + 56 >= plane.offsetTop && meteor.offsetLeft + 50 >= plane.offsetLeft && meteor.offsetTop + 56 <= plane.offsetTop + 100 && meteor.offsetLeft <= plane.offsetLeft + 50) {

            openPopup();
            gerak = false;
            plane.setAttribute('class', 'freeze');
            meteor.setAttribute('class', 'freeze');
        } else {
            //meteor gerak
            setMeteorMoving();
        }

    }, 10);
}

// inisialisasi meteor
setMeteorMoving();

window.addEventListener('keydown',function(e){
    var plane = document.getElementById('plane-2'),
        kiri = parseInt(plane.style.marginLeft.replace('px',''));
        atas = parseInt(plane.style.marginTop.replace('px',''));
    /*
    37 kiri
    38 atas
    39 kanan
    40 bawah
    */ 
    if(gerak == true){
        if(e.keyCode == 37){
            if(kiri > 0){
                plane.style.marginLeft = (kiri - 10) + 'px';
            }
        }else if(e.keyCode == 38){
            if(atas > 0){
                plane.style.marginTop = (atas - 10) + 'px';
            }
        }else if(e.keyCode == 39){
            if(kiri < 340){
                plane.style.marginLeft = (kiri + 10) + 'px';
            }
        }else if(e.keyCode == 40){
            if(atas < 400){
                plane.style.marginTop = (atas + 10) + 'px';
            }
        }
    }
});