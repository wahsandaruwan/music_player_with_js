let fillbar = document.querySelector(".fill");
let audios = ['bensound-acousticbreeze.mp3','bensound-actionable.mp3','bensound-allthat.mp3','bensound-betterdays.mp3','bensound-creativeminds.mp3'];
let covers = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
let currentTime = document.querySelector(".time");

// Create an object of audio
let audio = new Audio();
let currentSong = 0;

// Play song when window loads
window.onload = playSong;

// Function to play song when window loads
function playSong(){
    audio.src = './resources/music/' + audios[currentSong];
    // audio.play();
}

// Function to play and pause
function togglePlayPause(){
    if(audio.paused){
        audio.play();
        let playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = "<i class='fa fa-pause'></i>";
    }
    else{
        audio.pause();
        let playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = "<i class='fa fa-play'></i>";
        
    }
}

// Function to dynamically fill the Seek Bar
audio.addEventListener("timeupdate", function(){
    let position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + "%";

    // Duration
    convertTime(Math.round(audio.currentTime));
});

// Function to convert current time
function convertTime(sec){
    let min = Math.floor(sec / 60);
    let seconds = sec % 60;
    // Fix the single digit
    min = min < 10 ? "0" + min : min;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTime.textContent = min + ":" + seconds

    // Total Time
    totalTime(Math.round(audio.duration));
}

// Function to convert total time
function totalTime(sec){
    let min = Math.floor(sec / 60);
    let seconds = sec % 60;
    // Fix the single digit
    min = min < 10 ? "0" + min : min;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTime.textContent += " - " + min + ":" + seconds

}

// Function to next song
function nextSong(){
    currentSong++;
    if(currentSong > length(audio)){
        currentSong = 2
    }
}