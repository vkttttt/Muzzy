<?php
while ($row = mysqli_fetch_array($data['detailShop'])) {
?>
  <div class="body container">
    <div class="info mt-4">
      <div class="slider">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/muzzy/public/image/cafe.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="/muzzy/public/image/cafe.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="/muzzy/public/image/cafe.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="info-text">

        <h1> <?php echo $row['name'] ?></h1>
        <p class="address">
          <?php echo $row['address'] ?>
        </p>
        <div class="stars">
          <?php
          for ($i = 0; $i < $row['rate']; $i++) {
          ?>
            <i class="fas fa-star"></i>
          <?php
          }
          for ($i = 0; $i < 5 - $row['rate']; $i++) {
          ?>
            <i class="far fa-star"></i>
          <?php
          }
          ?>

        </div>
        <p class="time">Giờ mở cửa: <?php echo $row['timeopen'] ?> tới <?php echo $row['timeclose'] ?></p>
        <p class="price">Giá tham khảo: 25.000 - 99.000 đ</p>
        <form class="form-row align-items-center" method="POST">
          <div class="col-auto my-1">
            <select name="reserve" class="custom-select mr-sm-2">
              <?php
              $start = date($row['timeopen']);
              $end = date($row['timeclose']);
              while ($start < $end) {

                echo '<option class="dropdown-item" href="#" value="' . $start . '"' . '>' . $start . '-' . date("H:i:s", strtotime("+1 hour", strtotime($start))) . '</option>';

                $start = date("H:i:s", strtotime("+1 hour", strtotime($start)));
              }

              ?>
              <!-- <option class="dropdown-item" href="#" value="" >Ca 1 8h-11h</option> -->
            </select>
          </div>
          <div class="col-auto my-1">
            <button type="submit" class="btn btn-primary" name="submitReserve"> Đặt chỗ </button>
          </div>
          <p style="color: green"><?php echo $_SESSION['reserveSuccess']; ?> </p>
          <p style="color: red"><?php echo $_SESSION['reserveFail'] ?> </p>
        </form>
      </div>
    </div>
    <div class="comment">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Mô tả</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Hình ảnh</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Bình luận và đánh giá</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <div class="description">
            <p>
              Với trang trí nhẹ nhàng cùng khung cảnh lãng mạng. Đây là lựa chọn rất thích hợp cho các bạn trẻ đã và đang yêu đến để trải nghiệm.

              <?php echo $row['description'] ?>
            </p>
          </div>
        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div class="row">
            <div class="column">
              <img src="/muzzy/public/image/detail_1.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_2.jpeg" style="width:100%">
              <img src="/muzzy/public/image/detail_3.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_4.png" style="width:100%">

            </div>
            <div class="column">
              <img src="/muzzy/public/image/detail_6.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_7.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_8.jpg" style="width:100%">


            </div>
            <div class="column">
              <img src="/muzzy/public/image/detail_9.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_2.jpeg" style="width:100%">
              <img src="/muzzy/public/image/detail_4.png" style="width:100%">
              <img src="/muzzy/public/image/detail_5.png" style="width:100%">

            </div>
            <div class="column">
              <img src="/muzzy/public/image/detail_10.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_2.jpeg" style="width:100%">
              <img src="/muzzy/public/image/detail_3.jpg" style="width:100%">
              <img src="/muzzy/public/image/detail_4.png" style="width:100%">

            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <h1 class="pad-bot-10">Viết bình luận của bạn</h1>

          <div class="your-comment">
            <form>
              <input type="hidden" id="idShop" name="idShop" value="<?php echo $row['id'] ?>">
              <textarea class="content_comment" name="commentContent" style="color: #242424;" placeholder="Viết bình luận..."></textarea>
              <div class="send">
                <div class="stars pad-bot-10">
                  <i class="material-icons">
                    star
                  </i>
                  <i class="material-icons">
                    star
                  </i>
                  <i class="material-icons">
                    star
                  </i>
                  <i class="material-icons">
                    star
                  </i>
                  <i class="material-icons">
                    star
                  </i>
                </div>
                <button name="sendComment" class="btn btn-outline-success my-2 btn_add_comment" type="button">
                  Gửi
                </button>
              </div>
            </form>

          </div>
          <div class="people-comment">


          </div>
          <div class="pagination">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </div>
  </div>
<?php
}
?>