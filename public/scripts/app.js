/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

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
    body.append(`<div>${tweetData.content.text}`);
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

  const renderTweets = tweets => {
    tweets.map(tweet => {
      let articleTweet = createTweetElement(tweet);
      $("#tweet-container").append(articleTweet);
    });
  };

  $('.new-tweet form').submit(function (event) {
    event.preventDefault();
    const tweetBody = $('.new-tweet form textarea[name="text"]').val();
    if (!tweetBody) alert("Please enter a tweet");
    else if (tweetBody.length > 140) alert("Maximum number of characters exceeded");
    else $.post('/tweets', {text: tweetBody}, function(data) {
      loadTweets();
    });
  });

  const loadTweets = () => {
    $.get('/tweets', function(data) {
      renderTweets(data);
      $("#tweet-container .tweet").hover(
        function() {
          $(this).css({ opacity: "1" });
        },
        function() {
          $(this).css({ opacity: "0.6" });
        }
      );
    });
  };

  loadTweets();

});
