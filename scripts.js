let video = document.getElementById('video');
 // var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  var videoSrc = 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8';

 const movies = [
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    'https://test-streams.mux.dev/pts_shift/master.m3u8',
    'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
 ]
let hls;
 //var videoSrc = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        updateInterface(hls.levels);
        console.log('1')
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

function changeClip(e){
    console.log(e.target.innerHTML);

    hls = new Hls();

    hls.loadSource(e.target.innerHTML);
    hls.attachMedia(video);
    
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        updateInterface(hls.levels);
        video.play();
        console.log('2')
    });


    hls.on(Hls.Events.LEVEL_SWITCHING, function (event, data) {
        updateInfo(data);
    });

    // hls.on(Hls.Events.ERROR, function (name, data) {
    //   console.warn('Error event:', data);
  
    //   switch (data.details) {
    //     case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
    //       try {
    //         $('#errorOut').html('Cannot load <a href="' + data.context.url + '">' + url + '</a><br>HTTP response code:' + data.response.code + ' <br>' + data.response.text);
  
    //         if (data.response.code === 0) {
    //           $('#errorOut').append('This might be a CORS issue, consider installing <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">Allow-Control-Allow-Origin</a> Chrome Extension');
    //         }
    //       } catch (err) {
    //         $('#errorOut').html('Cannot load <a href="' + data.context.url + '">' + url + '</a><br>Response body: ' + data.response.text);
    //       }
  
    //       break;
  
    //     case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
    //       logError('Timeout while loading manifest');
    //       break;
  
    //     case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
    //       logError('Error while parsing manifest:' + data.reason);
    //       break;
  
    //     case Hls.ErrorDetails.LEVEL_EMPTY_ERROR:
    //       logError('Loaded level contains no fragments ' + data.level + ' ' + data.url);
    //       handleLevelError(data);
    //       break;
  
    //     case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
    //       logError('Error while loading level playlist ' + data.context.level + ' ' + data.url);
    //       handleLevelError(data);
    //       break;
  
    //     case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
    //       logError('Timeout while loading level playlist ' + data.context.level + ' ' + data.url);
    //       handleLevelError(data);
    //       break;
  
    //     case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
    //       logError('Error while trying to switch to level ' + data.level);
    //       break;
  
    //     case Hls.ErrorDetails.FRAG_LOAD_ERROR:
    //       logError('Error while loading fragment ' + data.frag.url);
    //       break;
  
    //     case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
    //       logError('Timeout while loading fragment ' + data.frag.url);
    //       break;
  
    //     case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
    //       logError('Fragment-loop loading error');
    //       break;
  
    //     case Hls.ErrorDetails.FRAG_DECRYPT_ERROR:
    //       logError('Decrypting error:' + data.reason);
    //       break;
  
    //     case Hls.ErrorDetails.FRAG_PARSING_ERROR:
    //       logError('Parsing error:' + data.reason);
    //       break;
  
    //     case Hls.ErrorDetails.KEY_LOAD_ERROR:
    //       logError('Error while loading key ' + data.frag.decryptdata.uri);
    //       break;
  
    //     case Hls.ErrorDetails.KEY_LOAD_TIMEOUT:
    //       logError('Timeout while loading key ' + data.frag.decryptdata.uri);
    //       break;
  
    //     case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
    //       logError('Buffer append error');
    //       break;
  
    //     case Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR:
    //       logError('Buffer add codec error for ' + data.mimeType + ':' + data.err.message);
    //       break;
  
    //     case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
    //       logError('Buffer appending error');
    //       break;
  
    //     case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
    //       logError('Buffer stalled error');
    //       break;
  
    //     default:
    //       break;
    //     }
    // });
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
        //console.log(levels[i]);
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