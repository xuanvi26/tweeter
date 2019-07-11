$(document).ready(function() {
    $(".login-form, .register-form, .new-tweet").css({display: "none"});
    $(".login-form .message button[type='button']").click(function() {
      $(".login-form").css({display: "none"});
      $(".register-form").css({display: ""});
    });
    $(".register-form .message button[type='button']").click(function() {
      $(".register-form").css({display: "none"});
      $(".login-form").css({display: ""});
    });
});