<!doctype html>
<html lang="en">

<head>
  <?php
  if ($data['Controller'] == "HomePage") {
    require_once "./public/modules/slick.php";
  ?>
    <title>Trang chủ</title>
    <?php
  } elseif ($data['Controller'] == "Shop") {
    require_once "./public/modules/ShopDetail.php";
    if ($data['Action'] == "ListShop") {
    ?>
      <title>Danh sách quán</title>
    <?php
    } else {
    ?>
      <title>Chi tiết quán</title>
    <?php
    }
  } elseif ($data['Controller'] == "Search") {
    require_once "./public/modules/ShopDetail.php";
    if ($data['Action'] == "SearchResult") {
    ?>
      <title>Danh sách kết quả</title>
    <?php
    }
  } elseif ($data['Controller'] == "User") {
    require_once "./public/modules/ShopDetail.php";
    if ($data['Action'] == "UpdateInfor") {
    ?>
      <title>Cập nhật thông tin cá nhân</title>
  <?php
    }
  }

  require_once "./public/modules/share.php";
  ?>
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

  <?php
  // Phan thay doi tuy theo trang
  if ($data['Controller'] == "HomePage") {
    require_once "./mvc/views/pages/" . $data['Controller'] . ".php";
  } elseif ($data['Controller'] == "Shop") {
    require_once "./mvc/views/pages/" . $data['Action'] . ".php";
  } elseif ($data['Controller'] == "Search") {
    require_once "./mvc/views/pages/" . $data['Action'] . ".php";
  } elseif ($data['Controller'] == "User") {
    if ($data['Action'] == "UpdateInfor") {
      require_once "./mvc/views/pages/" . $data['Action'] . ".php";
    }
  }
  ?>

  <!-- footer -->
  <footer class="mt-4">
    <div class="container-fluid padding">
      <div class="row text-center">
        <div class="col-md-4">
          <hr class="light">
          <h5>
            <img src="/muzzy/public/image/logo.png" style="width: 48px !important; height: 48px !important;" alt="logo">
          </h5>
          <!-- <hr class="light"> -->
          <p>Muzzy là trang web cung cấp giải pháp thu hút khách hàng cho doanh nghiệp về lĩnh việc thức uống</p>
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

  <!-- Loading page animations -->
  <div class="loader-wrapper">
    <!-- <span class="loader"><span class="loader-inner"></span></span> -->
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  <!-- Call JavaScripts -->
  <?php
  require_once "./public/modules/call_lib.php"
  ?>
  <?php
  //echo "Co vao day";
  echo "<br>";
  if (isset($data['subAction'])) {
    $include_file = "/muzzy/public/js/" . $data['subAction'] . ".js";
    echo "<script src='" . $include_file . "'></script>";
  }
  ?>

</body>

</html>