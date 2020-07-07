<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="/muzzy/public/js/jquery-3.4.1.min.js"></script>
<script src="/muzzy/public/js/popper.min.js"></script>
<script src="/muzzy/public/js/bootstrap-4.3.1-dist/bootstrap.min.js"></script>
<!-- Slick JavaScript -->
<script src="/muzzy/public/js/slick-1.8.1/slick-1.8.1/slick/slick.min.js"></script>
<script>
  $('.slider-area').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 2000,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
</script>
<!-- My JavaScript -->
<script src="/muzzy/public/js/app.js"></script>
<script src="/muzzy/public/js/public.js"></script>