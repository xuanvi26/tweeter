$(document).ready(function() {

  const addHover = () => {
    $("#tweet-container .tweet, #nav-bar button.logout").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.8" });
      }
    );
  ;}
  
  const isLoggedIn = (username) => {
    $('#nav-bar .header').after(`<span class="handler">@${username}</span>`);
    $('#nav-bar .compose').css({visibility: "visible"});
    $('#nav-bar button.login-register-toggle').replaceWith('<form method="POST" action="/logout"><button class="logout"><div>Logout</div></button></form>');
    addHover();
  };
  
  const createHeader = tweetData => {
    let header = $("<header>");
    let userProfile = $("<div>").addClass("user-profile");
    userProfile.append($(`<img src=${tweetData.user.avatars.small}>`));
    userProfile.append($(`<div class='username'>${tweetData.user.name}</div>`));
    header.append(userProfile);
    header.append(`<div class='handle'>${tweetData.user.handle}`);
    return header;
  };

  const createBody = tweetData => {
    let body = $("<div>").addClass("tweet-body");
    body.append($("<div>").text(tweetData.content.text));
    return body;
  };

  const createFooter = tweetData => {
    let footer = $("<footer>");
    footer.append(`<div>${new Date(tweetData.created_at).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric' })}`);
    return footer;
  };

  const createTweetElement = rawTweet => {
    let articleTweet = $("<article>").addClass("tweet");
    let header = createHeader(rawTweet);
    let body = createBody(rawTweet);
    let footer = createFooter(rawTweet);
    articleTweet.append(header);
    articleTweet.append(body);
    articleTweet.append(footer);
    return articleTweet;
  };

  const renderTweets = (tweets) => {
    tweets.map(tweet => {
      let articleTweet = createTweetElement(tweet);
      $("#tweet-container").prepend(articleTweet);
    });
  };

  const appendTweet = () => {
    $.get('/tweets', function({tweets}) {
      renderTweets([tweets[tweets.length - 1]]);
      addHover();
    });
  }

  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const tweetBody = $('.new-tweet form textarea[name="text"]').val();
    $.post('/tweets', {text: tweetBody}, function(data) {
      appendTweet();
      let counter = $(".new-tweet form .display-in-line .counter");
      counter.text(140);
      $(".new-tweet textarea").val('');
    });
  });

  const loadTweets = () => {
    $.get('/tweets', function({tweets, username}) {
      renderTweets(tweets);
      addHover();
      if(username) isLoggedIn(username);
    });
  };

  loadTweets();

  $('.login-form form').submit(function() {
    event.preventDefault();
    const email = $('.login-form form input[type="email"').val();
    const password = $('.login-form form input[type="password"').val();
    $.post('/login', {email, password}, function(data) {
      $(".login-form").toggle("slow");
      isLoggedIn(data.username);
    });
  });

  $('.register-form form').submit(function() {
    event.preventDefault();
    const fullName = $('.register-form form input[name="fullName"').val();
    const username = $('.register-form form input[name="username"').val();
    const email = $('.register-form form input[type="email"').val();
    const password = $('.register-form form input[type="password"').val();
    $.post('/register', {fullName, username, email, password}, function(data) {
      $(".register-form").toggle("slow");
      isLoggedIn(data.username);
    });
  });

});
