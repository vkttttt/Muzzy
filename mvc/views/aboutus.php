<!doctype html>
<html lang="en">

<head>
  <title>Giới thiệu</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/bootstrap-4.3.1-dist/css/bootstrap.min.css">

  <!-- Font Awesome 5.11.2 -->
  <link rel="stylesheet" href="/muzzy/public/fonts/fontawesome-free-5.11.2-web/fontawesome-free-5.11.2-web/css/all.css">

  <!-- My CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/dist/share.min.css">
  <link rel="stylesheet" href="/muzzy/public/css/dist/intro.min.css">

</head>

<body>
  <button class="btn btn-outline-warning btn-lg gotop" id="gotop">
    <i class="fas fa-arrow-up"></i>
  </button>
  <!-- header nav -->
  <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top nav-top">
    <div class="container">
      <a class="navbar-brand" href="/muzzy/Home">
        <img src="/muzzy/public/image/logo.png" style="width: 48px !important; height: 48px !important;" alt="logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form action="/muzzy/Search/" method="POST" class="d-inline w-100 mx-2 my-auto">
          <div class="input-group">
            <input type="text" class="form-control border border-right-0" placeholder="Search..." name="key">
            <span class="input-group-append">
              <button class="btn btn-outline-secondary border border-left-0" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <?php
        if (isset($_SESSION['fullName'])) {
        ?>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <?php echo "Hi, " . $_SESSION['fullName'] ?>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="/muzzy/User/UpdateInfor">Thông tin cá nhân</a>
              <a class="dropdown-item" href="#">Tin mới</a>
              <a class="dropdown-item" href="/muzzy/User/Logout">Đăng xuất</a>
            </div>
          </div>
        <?php
        } else {
        ?>
          <a href="/muzzy/User/Register">
            <button class="btn btn-outline-danger my-2 mr-sm-2" type="button">Đăng ký</button>
          </a>
          <a href="/muzzy/User/Login">
            <button class="btn btn-outline-success my-2" type="button">Đăng nhập</button>
          </a>
        <?php
        }
        ?>

        <!-- <button class="btn btn-outline-success my-2 mr-sm-2" type="button">Đăng ký</button>
        <button class="btn btn-outline-success my-2" type="button">Đăng nhập</button> -->
      </div>
    </div>
  </nav>
  <!-- start carousel -->
  <div id="intro-car" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#intro-car" data-slide-to="0" class="active"></li>
      <li data-target="#intro-car" data-slide-to="1"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <img src="/muzzy/public/image/banner_1.jpg" alt="First slide">
        <div class="carousel-caption">
          <h1 class="display-2">Muzzy</h1>
          <p>Tìm kiếm quán cafe theo sở thích của bạn</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/muzzy/public/image/banner_2.jpeg" alt="Second slide">
        <div class="carousel-caption">
          <h1>Muzzy</h1>
          <p>Nhanh và tiện ích</p>
        </div>
      </div>

    </div>
    <a class="carousel-control-prev" href="#intro-car" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#intro-car" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  <!-- Jumbotron -->
  <div class="container-fluid">
    <div class="row jumbotron">
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
        <p class="content-intro">
          <!-- marketing message -->
          Website cho phép người dùng tìm kiếm các địa điểm café ở TP.HCM, có chi tiết thông tin về quán, địa chỉ, hình
          ảnh, bình luận...
        </p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
        <a href="/muzzy/Home">
          <button class="btn btn-outline-secondary btn-lg">Let's go</button>
        </a>
      </div>
    </div>
  </div>



  <hr class="my-4">

  <div class="container-fluid padding">
    <div class="row padding">
      <div class="col-lg-6 mb-3">
        <h2>Tại sao Website này hữu ích?</h2>
        <p>Website tổng hợp thông tin các quán café ở TP.HCM</p>
        <p>Kết nối chủ quán và khách hàng lại gần hơn. Bày tỏ cảm xúc người dùng và đánh giá khách quan</p>
        <p>Công cụ tuyệt vời cho việc quảng cáo quán nước của mình</p>
        <a href="/muzzy/Home">
          <button class="btn btn-primary btn-lg">Let's go</button>
        </a>
      </div>
      <div class="col-lg-6">
        <img class="img-fluid" src="/muzzy/public/image/cafe-best.jpg" alt="">
      </div>
    </div>
  </div>

  <hr class="my-4">

  <!-- Team member -->
  <div class="container-fluid padding">
    <div class="row text-center welcome">
      <div class="col-12">
        <h1 class="display-4">
          Thành viên
        </h1>

      </div>
      <hr>
    </div>

  </div>
  <div class="container-fluid padding">
    <div class="row padding">
      <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="/muzzy/public/image/johndoe.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Vũ Khắc Tình</h5>
            <p class="card-text">Thực hiện nội dung, viết trang chi tiết quán và danh sách quán</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="/muzzy/public/image/johndoe.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Nguyễn Hữu Đức Thành</h5>
            <p class="card-text">Viết trang chủ và thiết kế tổng thể</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="/muzzy/public/image/johndoe.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Phạm Nhật</h5>
            <p class="card-text">Viết trang admin</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Contact -->
  <div class="container-fluid padding">
    <div class="row text-center padding">
      <div class="col-12">
        <h1 class="display-4">
          Liên hệ
        </h1>
      </div>
      <div class="col-12 social padding">
        <a href="https://www.facebook.com/QuocHoaTqh"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-google-plus"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>

  <!-- footer -->
  <footer class="mt-4">
    <div class="container-fluid padding">
      <div class="row text-center">
        <div class="col-md-4">
          <hr class="light">
          <h5>Muzzy</h5>
          <hr class="light">
          <p>Muzzy là ứng dụng cung cấp giải pháp thu hút khách hàng cho doanh nghiệp về lĩnh việc thức uống</p>
        </div>
        <div class="col-md-4">
          <hr class="light">
          <h5>Khung giờ làm việc</h5>
          <hr class="light">
          <p>Thứ hai - thứ bảy: 8am - 5pm</p>
        </div>
        <div class="col-md-4">
          <hr class="light">
          <h5>Liên hệ</h5>
          <hr class="light">
          <p>268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh</p>
          <p>Nhà A1</p>
          <p>(028) 38 651 670 hoặc (028) 38 647 256 (Ext: 5282, 5283)</p>
        </div>
        <div class="col-12">
          <hr class="light-100">
          <h5>&copy; Copyright by TNT team</h5>
        </div>
      </div>
    </div>
  </footer>

  <div class="loader-wrapper">
    <!-- <span class="loader"><span class="loader-inner"></span></span> -->
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="/muzzy/public/js/jquery-3.4.1.min.js"></script>
  <script src="/muzzy/public/js/popper.min.js"></script>
  <script src="/muzzy/public/js/bootstrap-4.3.1-dist/bootstrap.min.js"></script>
  <!-- My JavaScript -->
  <script src="/muzzy/public/js/app.js"></script>
  <script src="/muzzy/public/js/public.js"></script>
</body>

</html>