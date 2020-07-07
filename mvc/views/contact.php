<!doctype html>
<html lang="en">

<head>
  <title>Phản hồi</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/bootstrap-4.3.1-dist/css/bootstrap.min.css">

  <!-- Font Awesome 5.11.2 -->
  <link rel="stylesheet" href="/muzzy/public/fonts/fontawesome-free-5.11.2-web/fontawesome-free-5.11.2-web/css/all.css">

  <!-- My CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/dist/share.min.css">
  <link rel="stylesheet" href="/muzzy/public/css/dist/contact.min.css">

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

  <div class="wraper my-3">
    <div class="container contact">
      <div class="row">
        <div class="col-md-3">
          <div class="contact-title">
            <div class="icon">
              <i class="far fa-envelope"></i>

            </div>
            <h2>Liên hệ với chúng tôi</h2>
            <h5>Luôn luôn lắng nghe phản hồi từ phía khách hàng để đêm lại chất lượng dịch vụ tốt nhất</h5>
          </div>
        </div>
        <div class="col-md-9">
          <form method="POST" action="/muzzy/Contact" class="contact-form">
            <div class="form-group">
              <label class="control-label col-sm-2" for="fullName">Họ và tên:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="fullName" placeholder="Nhập vào tên bạn" name="fullName" required>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="email">Email:</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Nhập vào email" name="email" required>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="subject">Chủ đề:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="subject" placeholder="Nhập vào tên bạn" name="subject" required>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="content">Nội dung:</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="5" name="content" id="content" placeholder="Nhập vào nội dung" required></textarea>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button name="submit-feedback" id="btn-send-mail" type="submit" class="btn btn-outline-success">Gửi <i class="far fa-paper-plane"></i></button>
              </div>
            </div>
          </form>
        </div>
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