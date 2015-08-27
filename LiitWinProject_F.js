
//Trigger an event when user starts to enter comments
function updateCommentsCharCount() {
    var max_chars = 1000;
    var textVal = $("#commentsInput");
    var remainVal = max_chars - textVal[0].textLength;
    $("#chars_remaining").val(remainVal.toString());
}

$(document).ready(function () {

    $("#commentsInput").on({
        keydown: function () {
        },
        keyup: function () {
            updateCommentsCharCount();
        }
    });
});