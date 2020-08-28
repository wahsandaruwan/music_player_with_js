// Variables for Playe Controls
let seek = document.querySelector(".seek");
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
    audio.play();

    // Set repeat playlist on style
    let repeatIcon = document.querySelector(".repeat i");
    repeatIcon.style.color = "#4d4e4e";

    // Update song title when play
    let title = document.querySelector(".title h1");
    let t = (audios[currentSong].replace(/\b\w/g, l => l.toUpperCase())).replace(".Mp3","");
    title.innerHTML = t;
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

// Event Listeners for seek bar related behaviours
// dynamically fill the Seek Bar
audio.addEventListener("timeupdate", function(){
    let position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + "%";

    // Current Time
    convertTime(Math.round(audio.currentTime));

    // Playe next song after current song ends
    if(audio.ended){
        nextSong();
    }
});

// Skip arround when clicking on seek bar
seek.addEventListener("mousedown", function(event){
    let seekBarWidth = window.getComputedStyle(seek).width;
    let timeToSeek = event.offsetX / parseInt(seekBarWidth) * audio.duration;
    audio.currentTime = timeToSeek;   
},false);

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
    if(currentSong > audios.length-1){
        currentSong = 0
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = "<i class='fa fa-pause'></i>";
    // Change cover image
    document.querySelector(".img img").src = './resources/img/' + covers[currentSong];
}

// Function to previous song
function prevSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = audios.length-1;
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = "<i class='fa fa-pause'></i>";
    // Change cover image
    document.querySelector(".img img").src = './resources/img/' + covers[currentSong];
}

// Function to volume up volup
function volUp(){
    audio.volume += 0.25;
    if(audio.volume >= 0.25){
        let volumeUp = document.querySelector(".speaker-mute");
        volumeUp.innerHTML = "<i class='fa fa-volume-up'></i>"
    }
}

// Function to volume up volDown
function volDown(){
    audio.volume -= 0.25;
    if(audio.volume <= 0){
        let volumeUp = document.querySelector(".speaker-mute");
        volumeUp.innerHTML = "<i class='fa fa-volume-mute'></i>"
    }
}

// Function Speaker Mute and Unmute
function speakerMute(){
    let volumeUp = document.querySelector(".speaker-mute");
    if(audio.volume <= 1 && audio.volume > 0){
        audio.volume = 0;
        volumeUp.innerHTML = "<i class='fa fa-volume-mute'></i>"
    }
    else{
        audio.volume = 1;
        volumeUp.innerHTML = "<i class='fa fa-volume-up'></i>"
    }
}
