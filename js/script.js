var btn = document.querySelector("button")
var songs = document.querySelectorAll("audio")
var sta = document.querySelector("#sta")
var right = document.querySelector("#right")
var fullDuration = document.querySelector("#fullDuration")
var element = document.querySelector("#myprogressBar");

var current_playing_song = 1;
playing = false;
var all_songs = [];
var template = ``;
var playDuration = [];
var interval = [];
var identity = 0;

btn.addEventListener("click",function(){
    if(playing){
        songs[current_playing_song].play();
        playing = false;
        sta.textContent = "Pause"
        check()
        update(Number(playDuration[current_playing_song]))
        document.querySelector("#songname").innerHTML = `${all_songs[current_song]}`
        fullDuration.textContent = `${playDuration[current_playing_song]} m` 

    }
    else{
        songs[current_playing_song].pause()
        playing = true;
        sta.textContent = "Play"
        // update(playDuration[current_playing_song])

    }
})

function display_songs(){
    songs.forEach(function(val,index){
        var src = val.getAttribute("src")
        template += `<div id="playlist">
        <div id="track">
            <h3>${src.substr(9,(src.length)-13)}</h3>
            <h5>artist</h5>
        </div>
        <i id="${index}" class="ri-play-fill"></i>
    </div>`
    
    all_songs.push(src.substr(9,(src.length)-13))
    
    })
    right.innerHTML = template
}

display_songs()

function start(IndexOfSong){
    songs[IndexOfSong].play()
}

function stop(IndexOfSong){
    songs[IndexOfSong].pause();
    songs[IndexOfSong].currentTime = 0;
}

function playsongs(){
right.addEventListener("click",function(param){
    var current_song =  Number(param.target.id)
    stop(current_playing_song)
    start(current_song)
    current_playing_song = current_song
    document.querySelector("#songname").innerHTML = `${all_songs[current_song]}`
    sta.textContent = "Pause"
    fullDuration.textContent = `${playDuration[current_playing_song]} m` 
    update()
})
}

function getDuration(){
    songs.forEach(function(val){
        val.addEventListener('loadedmetadata', function(){
            var duration = Number(parseFloat((val.duration)/60).toFixed(2));
            var inte = Number(val.duration*10)
            playDuration.push(duration)    
            interval.push(inte)    
    })
})
}

function update(){
    clearInterval(identity)
    var width = 1;
    identity = setInterval(scene,interval[current_playing_song])
    function scene(){
        if(width >= 100){
            clearInterval(identity);
        }
        else{
            width++;
            element.style.width = width + '%'
        }
    }
}

getDuration()
playsongs()
