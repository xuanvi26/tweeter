$(document).ready(function() {
    $("#nav-bar .compose, .tweet-button").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.6" });
      }
    );
    $("#nav-bar .compose").click(function() {
      $(".new-tweet").toggle("slow", function() {
        $(".new-tweet textarea").focus();
      });
    })
})