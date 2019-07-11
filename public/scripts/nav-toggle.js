$(document).ready(function() {
    $("#nav-bar .compose, #nav-bar .login-register-toggle").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.9" });
      }
    );
    $("#nav-bar .compose").click(function() {
      $(".new-tweet").toggle("slow", function() {
        if($(".new-tweet").is(":visible")) {
          $('.new-tweet form textarea[name="text"]').focus();
        }
      });
    });
    $("#nav-bar .login-register-toggle").click(function() {
      if($(".register-form").is(":visible")) {
        $(".register-form").toggle("slow");
      } else {
        $(".login-form").toggle("slow", function() {
          if($(".login-form").is(":visible")) {
            $('.login-form input[type="email"]').focus();
          }
        });
      }
    });
});