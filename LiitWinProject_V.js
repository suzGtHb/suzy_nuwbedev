
function triggerToggleMute() {
    cute_bunny.muted == true ?
    cute_bunny.muted = false :
    cute_bunny.muted = true;
}

var timer = setInterval(function () { startTimerFunction() }, 1001);
function startTimerFunction() {
    var videoTime = cute_bunny.currentTime;
    videoTime = Math.round(videoTime);
    $("#time_current").val(videoTime.toString());
    var timeLeft = Math.round(cute_bunny.duration - cute_bunny.currentTime - 1);
    $("#time_left").val(timeLeft.toString());
}

function skipFunction() {
    if (Math.round(cute_bunny.currentTime) == Math.round(cute_bunny.duration)) {
        slider.value = 0;
        cute_bunny.currentTime = 0;
    }
    else {
        cute_bunny.currentTime += 1;
        var moveAmt = parseInt(slider.value) + 10;
        slider.value = moveAmt.toString();
    }

    var videoTime = cute_bunny.currentTime;
    videoTime = Math.round(videoTime);
    $("#time_current").val(videoTime.toString());
    var timeLeft = Math.round(cute_bunny.duration - cute_bunny.currentTime - 1);
    $("#time_left").val(timeLeft.toString());

}

function triggerProcessVideo(button_clicked) {

    //Get the video id first to control it's behavior
    var bnyVideo = document.getElementById("cute_bunny");
    var timeEnds = cute_bunny.duration;
    switch (button_clicked) {
        case "Play":
            bnyVideo.play();
            break;
        case "Pause":
            bnyVideo.pause();
            break;
        case "Mute":
            triggerToggleMute();
            break;
        case "Skip 1 sec":
            skipFunction();
            break;
        default:
            break;
    }
}

$(document).ready(function () {

    $("button").click(function () {
        var buttonTypeClicked = $(this).html();
        triggerProcessVideo(buttonTypeClicked);
    });
});