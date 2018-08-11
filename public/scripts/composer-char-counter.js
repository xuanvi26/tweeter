$(document).ready(function() {
  $(".new-tweet textarea").keyup(function() {
    let counter = 140 - $(this).val().length;
    let htmlCounter = $(this)
      .parent()
      .find(".counter");
    htmlCounter.text(counter);
    if (counter > 0) htmlCounter.css({ color: "rgb(165, 165, 165)" });
    else htmlCounter.css({ color: "red" });
  });
});
