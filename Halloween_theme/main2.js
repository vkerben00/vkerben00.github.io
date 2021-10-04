$(function() {
    var img = $("#blueEyesb"),
        width = img.get(0).width,
        screenWidth = $(window).width(),
        duration = 5000;

    function animateblueEyesb() {
        img.css("left", -width).animate({
            "left": screenWidth
        }, duration, animateblueEyesb);
    }

    animateblueEyesb();
});
