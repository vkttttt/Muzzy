<!-- 
  Đây là trang đã cấu hình, làm một màn hình mới chỉ cần duplicate trang này lên rồi code 
  * Không được thay đổi trang này *
 -->
<!doctype html>
<html lang="en">

<head>
  <title>Đăng nhập</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/bootstrap-4.3.1-dist/css/bootstrap.min.css">

  <!-- Font Awesome 5.11.2 -->
  <link rel="stylesheet" href="/muzzy/public/fonts/fontawesome-free-5.11.2-web/fontawesome-free-5.11.2-web/css/all.css">

  <!-- My CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/dist/login.min.css">

</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-login my-5">
          <div class="card-body">
            <h4 class="card-title text-center">Đăng nhập</h4>
            <form action="/muzzy/User/Login" method="POST" class="form-login">
              <p style="color:red;">
                <?php if (isset($_SESSION['msgLogin'])) {
                  echo $_SESSION['msgLogin'];
                  $_SESSION['msg'] = "";
                } ?>
              </p>
              <div class="form-label-group">
                <input type="text" name="userName" id="inputEmail" class="form-control" placeholder="Địa chỉ email" required autofocus>
                <label for="inputEmail">Tên tài khoản</label>
              </div>

              <div class="form-label-group">
                <input type="password" name="passWord" id="inputPassword" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputPassword">Mật khẩu</label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="rememberpass">
                <label class="custom-control-label" for="rememberpass">Ghi nhớ mật khẩu</label>
              </div>
              <button name="submitLogin" class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Đăng nhập</button>
              <hr class="my-4">

              <a href="/muzzy/User/Register" style="text-decoration: none;">
                <button class="btn btn-lg btn-signup btn-block text-uppercase" type="button">Đăng ký tài khoản</button>
              </a>

              <a href="/muzzy/User/ForgotPassWord" class="forgot-pass">Quên mật khẩu</a>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src=" /muzzy/public/js/jquery-3.4.1.min.js"> </script>
  <script src="/muzzy/public/js/popper.min.js"></script>
  <script src="/muzzy/public/js/bootstrap-4.3.1-dist/bootstrap.min.js"></script>
  <!-- My JavaScript -->
  <script src="/muzzy/public/js/app.js"></script>
</body>

</html>