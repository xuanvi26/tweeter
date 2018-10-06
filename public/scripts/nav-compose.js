$(document).ready(function() {
    $("#nav-bar .compose, .new-tweet .tweet-button").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.6" });
      }
    );
    $("#nav-bar .compose, .new-tweet .tweet-button").click(function() {
      $(".new-tweet").toggle("slow");
    })
})