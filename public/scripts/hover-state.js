$(document).ready(function() {
    $("#tweet-container .tweet").hover(function() {
        $(this).css({"opacity": "1"});
    }, function() {
        $(this).css({"opacity": "0.5"});
    });
});