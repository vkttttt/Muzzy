<div class="body">
  <form action="/muzzy/User/UpdateInfor" method="post" enctype="multipart/form-data">
    <div class="info">
      <div class="avatar-container">
        <div class="avatar">
          <img src=<?php echo $data['Infor']['imageurl'] ?> alt="">
        </div>
      </div>

      <div class="info-user">
        <h2>Thông tin cá nhân</h2>
        <div class="input-info">
          <div class="line-info">
            <p class="title">
              Họ tên
            </p>
            <input name="fullName" value="<?php echo $data['Infor']['fullname'] ?>">
          </div>
          <div class="line-info">
            <p class="title">
              Địa chỉ
            </p>
            <input name="address" value="<?php echo $data['Infor']['address'] ?>">
          </div>
          <div class="line-info">
            <p class="title">
              Tên đăng nhập
            </p>
            <input name="userName" value="<?php echo $data['Infor']['username'] ?>" disabled="true">
          </div>
          <div class="line-info">
            <p class="title">
              Số điện thoại
            </p>
            <input name="phoneNumber" value="<?php echo $data['Infor']['phonenumber'] ?>">
            <a href="#">Đổi mật khẩu</a>
          </div>
          <div class="form-control">
            Chọn ảnh để upload:
            <input type="file" name="imageupload" id="imageupload">
          </div>

        </div>
        <button name="submitUpdateInfor" class="btn btn-outline-success my-2" type="submit">Lưu</button>
      </div>

    </div>
  </form>



  <div class="info">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Giờ bắt đầu</th>
          <th scope="col">Giờ kết thúc</th>
        </tr>
      </thead>
      <tbody>
        <?php
        for ($i = 0; $i < count($data["ReserveShop"]); $i++) {
          echo
            '<tr>
                <th scope="row">' . $i . '</th>
                <td>' . $data["ReserveShop"][$i]["name"] . '</td>
                <td>' . $data["ReserveShop"][$i]["address"] . '</td>
                <td>' . $data["ReserveShop"][$i]["startTime"] . '</td>
                <td>' . $data["ReserveShop"][$i]["endTime"] . '</td>
              ';
        }
        ?>
      </tbody>
    </table>
  </div>

</div>