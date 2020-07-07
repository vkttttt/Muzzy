<!-- 
  Đây là trang đã cấu hình, làm một màn hình mới chỉ cần duplicate trang này lên rồi code 
  * Không được thay đổi trang này *
 -->
<!doctype html>
<html lang="en">

<head>
  <title>Đăng ký tài khoản</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/bootstrap-4.3.1-dist/css/bootstrap.min.css">

  <!-- Font Awesome 5.11.2 -->
  <link rel="stylesheet" href="/muzzy/public/fonts/fontawesome-free-5.11.2-web/fontawesome-free-5.11.2-web/css/all.css">

  <!-- My CSS -->
  <link rel="stylesheet" href="/muzzy/public/css/dist/login.min.css">
  <link rel="stylesheet" href="/muzzy/public/css/dist/signup.min.css">

</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-login my-5">
          <div class="card-body">
            <h4 class="card-title text-center">Đăng ký tài khoản</h4>
            <h5 class="cart-text text-center">Điền đầy đủ các thông tin sau đây để đăng ký tài khoản</h5>
            <form action="/muzzy/User/Register" method="POST" class="form-login">
              <p style="color:red;">
                <?php if (!$data['checkSuccessReg']) {
                  echo "Mật khẩu và mật khẩu nhập lại không khớp!";
                } ?>
              </p>
              <div class="form-label-group">
                <input type="text" name="userName" id="inputUserName" class="form-control" placeholder="Địa chỉ email" required autofocus>
                <label for="inputUserName">Tên đăng nhập</label>
              </div>

              <div class="form-label-group">
                <input type="password" name="passWord" id="inputPassWord" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputPassWord">Mật khẩu</label>
              </div>

              <div class="form-label-group">
                <input type="password" name="rePassWord" id="inputRePassword" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputRePassword">Nhập lại mật khẩu</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="fullName" id="inputFullName" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputFullName">Họ và tên</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="phoneNumber" id="inputPhoneNumber" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputPhoneNumber">Số điện thoại</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="address" id="inputAddress" class="form-control" placeholder="Mật khẩu" required>
                <label for="inputAddress">Địa chỉ</label>
              </div>

              <button name="submitRegister" class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Đăng ký</button>

              <hr class="my-3">
              <a href="index.html" class="">Quay về trang chủ</a>
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