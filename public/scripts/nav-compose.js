$(document).ready(function() {
    $("#nav-bar .compose, #nav-bar .login-toggle").hover(
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
    $("#nav-bar .login-toggle").click(function() {
      //if the login-form is there if not do the same thing with the register form
      $(".login-form").toggle("slow", function() {
        if($(".login-form").is(":visible")) {
          $('.login-form input[type="email"]').focus();
        }
      });
    });
});