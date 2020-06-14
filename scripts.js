var video = document.getElementById('video');
 // var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
 // var videoSrc = 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8';

 const movies = [
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'
 ]

 var videoSrc = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
         updateInterface(hls.levels);
        video.play();
    });


    hls.on(Hls.Events.LEVEL_SWITCHING, function (event, data) {
        updateInfo(data);
    });
}
// else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//     video.src = videoSrc;
//     video.addEventListener('loadedmetadata', function() {
//         video.play();
//     });
// }

function changeClip(){
    console.log('clicked');
}

function updatePlaylist(){
    const playlist = document.getElementById("playlist");

    for(let i=0; i<movies.length; ++i){
        let li = document.createElement('li');
        li.innerHTML = movies[i];
        li.addEventListener('click', changeClip);
        playlist.appendChild(li);
    }
}
updatePlaylist();



function updateInterface(levels){
    const buttonWrapper = document.getElementById('button-wrapper');

    // remove buttons
    while ( buttonWrapper.firstChild) {
        buttonWrapper.firstChild.remove();
    }

    // create buttons
    for(let i=0; i<levels.length; ++i){
        let b = document.createElement("button");
        console.log(levels[i]);
        b.innerHTML = levels[i].height + 'p';

        b.classList.add("q-button");
        b.addEventListener('click', (e) => {
            hls.currentLevel = i;
        });
        buttonWrapper.appendChild(b);
    }
}

function updateInfo(data) {
    var obj = {
        resolution: data.attrs.RESOLUTION,
        bandwidth: data.attrs.BANDWIDTH,
        codecs: data.attrs.CODECS,
        bitrate: data.bitrate
    }
    $('#stats').html(JSON.stringify(obj, null, '\t'));
}