$(document).ready(function () {
  $(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow"); //.delay(200)
  })
  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $("#gotop").fadeIn();
    }
    else {
      $("#gotop").fadeOut();
    }
  });

  $("#gotop").click(function () {
    $('html ,body').animate({ scrollTop: 0 }, 800);
  });

});