$(document).ready(function() {
    $("#nav-bar .compose").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.6" });
      }
    );
    $("#nav-bar .compose").click(function() {
      $(".new-tweet").toggle("slow", function() {
        if($(".new-tweet").is(":visible")) {
          $('.new-tweet form textarea[name="text"]').focus();
        }
      });
    });
});