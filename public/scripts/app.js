$(document).ready(function() {

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
    footer.append(`<div class='footer-text'>${tweetData.created_at}`);
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
      $("#tweet-container").append(articleTweet);
    });
  };

  const appendTweet = () => {
    $.get('/tweets', function(data) {
      renderTweets([data[data.length - 1]]);
      addHover();
    });
  }

  const addHover = () => {
    $("#tweet-container .tweet").hover(
      function() {
        $(this).css({ opacity: "1" });
      },
      function() {
        $(this).css({ opacity: "0.6" });
      }
    );
  }

  $('.new-tweet form').submit(function (event) {
    event.preventDefault();
    const tweetBody = $('.new-tweet form textarea[name="text"]').val();
    $.post('/tweets', {text: tweetBody}, function(data) {
      appendTweet();
      $(".new-tweet textarea").val('');
    });
  });

  const loadTweets = () => {
    $.get('/tweets', function(data) {
      renderTweets(data);
      addHover();
    });
  };

  loadTweets();

});
