$(document).ready(function() {
    $('.new-tweet textarea').keyup(function() {
        let counter = 140 - $(this).val().length;
        $(this).parent().find(".counter").html(`<span class="counter">${counter}</span>`);
    })  
});