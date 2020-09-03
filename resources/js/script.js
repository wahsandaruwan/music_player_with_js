// Variables for Playe Controls
var seek = document.querySelector(".seek");
var fillbar = document.querySelector(".fill");
var audios = ['bensound-acousticbreeze.mp3','bensound-actionable.mp3','bensound-allthat.mp3','bensound-betterdays.mp3','bensound-creativeminds.mp3'];
var covers = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
// let audioShuffle = ['bensound-acousticbreeze.mp3','bensound-actionable.mp3','bensound-allthat.mp3','bensound-betterdays.mp3','bensound-creativeminds.mp3'];
// let coverShuffle = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
var audioOriginal = [];
var coversOriginal = [];
var shuf = 0;
var rep = 0;
var currentTime = document.querySelector(".time");

// Create an object of audio
var audio = new Audio();
var currentSong = 0;

// Play song when window loads
window.onload = playSong;

// Function to play song when window loads
function playSong(){
    // Set source and play
    audio.src = './resources/music/' + audios[currentSong];
    audio.play();
    document.querySelector(".img img").src = './resources/img/' + covers[currentSong];

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

    // Play next song after current song ends
    if(audio.ended){ 
        // If no repeat
        if(rep == 0){
            // netxSong works every song except last song
            if(audios[audios.length-1] != audios[currentSong]){
                nextSong();
            }
            // Change play button after the last song    
            else{
                let playBtn = document.querySelector(".play-pause");
                playBtn.innerHTML = "<i class='fa fa-play'></i>";
            }
        }
        else{
            nextSong();
        }
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

// Event Listener for Shuffle
let shuffle = document.querySelector(".shuffle");
shuffle.addEventListener("click", function(e){
    // Stop refresh
    e.preventDefault();
    // Call shuffle function
    shuffleLists();
});

// Function to shuffle the playlist and covers
function shuffleLists(){
    // Shuffle
    if(shuf == 0){
        alert(shuf);
        // Copy original playlist and cover to temp lists
        for(let i = 0; i < audios.length; i++){
            audioOriginal[i] = audios[i];
            coversOriginal[i] = covers[i];
        }
        console.log(audioOriginal);
        console.log(coversOriginal);

        // Shuffle
        let newPos, temp1, temp2;
        for(let i = audios.length - 1; i > 0; i--){
            newPos = Math.floor(Math.random() * (i + 1));
            temp1 = audios[i];
            audios[i] = audios[newPos];
            audios[newPos] = temp1;
            temp2 = covers[i];
            covers[i] = covers[newPos];
            covers[newPos] = temp2;
        }
        
        // Calling playSong function to start with shuffled playlist
        playSong();

        // Set color to #4d4e4e
        let shuffleIcons = document.querySelector(".shuffle i");
        shuffleIcons.style.color = "#4d4e4e";

        // Set state = 1 which means shuffle
        shuf = 1;

    }
    // To set Normal
    else{
        alert(shuf);
        for(let i = 0; i < audioOriginal.length; i++){
            audios[i] = audioOriginal[i];
            covers[i] = coversOriginal[i];
        }

        // Calling playSong function to start with normal playlist again
        playSong();

        console.log(audios);
        console.log(covers);

        // Set color to #ffffff
        let shuffleIcons = document.querySelector(".shuffle i");
        shuffleIcons.style.color = "#fff";

        // Set state = 0 which means normal
        shuf = 0;
    }
       
}

// Event Listener for Repeat Playlist
let repeat = document.querySelector(".repeat");
repeat.addEventListener("click", function(e){
    // Stop refresh
    e.preventDefault();
    
    if(rep == 0){
        rep = 1;
        // Set repeat playlist on style
        let repeatIcon = document.querySelector(".repeat i");
        repeatIcon.style.color = "#4d4e4e";
    }
    else{
        rep = 0;
        // Set repeat playlist on style
        let repeatIcon = document.querySelector(".repeat i");
        repeatIcon.style.color = "#ffffff";
    }
});


