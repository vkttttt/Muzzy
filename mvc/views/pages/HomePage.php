  <!-- Sidebar & banner -->
  <div class="container my-4">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar-top">
          <a href="/muzzy/Home" class="item">
            <div class="icon">
              <i class="fas fa-home"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Trang chủ
            </div>
          </a>
          <a href="#" class="item">
            <div class="icon">
              <i class="fas fa-percent"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Khuyến mãi
            </div>
          </a>
          <a href="#" class="item">
            <div class="icon">
              <i class="fas fa-store"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Quán cafe mới
            </div>
          </a>
          <a href="#" class="item">
            <div class="icon" style="color: red">
              <i class="fab fa-hotjar"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Địa điểm HOT
            </div>
          </a>
          <a href="/muzzy/Contact" class="item">
            <div class="icon">
              <i class="far fa-paper-plane"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Phản hồi
            </div>
          </a>
          <a href="/muzzy/About" class="item">
            <div class="icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <div class="label">
              <i class="fas fa-star"></i>
              Về chúng tôi
            </div>
          </a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="wraper-top-car">
          <div id="top-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#top-carousel" data-slide-to="0" class="active"></li>
              <li data-target="#top-carousel" data-slide-to="1"></li>
              <li data-target="#top-carousel" data-slide-to="2"></li>
              <li data-target="#top-carousel" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                <img src="/muzzy/public/image/banner1.jpeg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img src="/muzzy/public/image/banner2.jpeg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img src="/muzzy/public/image/banner3.jpeg" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img src="/muzzy/public/image/banner4.jpeg" alt="Four slide">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- List-Discount_Shop-box -->
  <div class="container padding">
    <div class="box-title">
      <p><i class="fas fa-star"></i>Ưu đãi nỗi bật</p>
      <a href="/muzzy/Shop">Xem tất cả</a>
    </div>
    <hr class="my-1 hr-cus">
    <div class="wraper-slider">
      <section class="slider-area slider">
        <?php
        while ($row = mysqli_fetch_array($data['listShopDiscount'])) {
          ?>
          <div class="disable-current">
            <div class="wraper-item">
              <div class="deal-item">
                <a href="/muzzy/Shop/ShopDetail/<?php echo $row["idshop"] ?>" class="avatar">
                  <img src=<?php $listurl = ProcessUrlInamge($row['url_image']);
                              echo $listurl[0];  ?> alt="">
                </a>

                <div class="percent">
                  <span class="discount-val"><?php echo $row["discount"] ?></span>%
                </div>

                <div class="brand">
                  <p class="text-center"><?php echo $row['name'] ?></p>
                </div>
                <hr>
                <a href=<?php echo "https://www.google.com/maps/search/" . ProcessUrlMap($row['address']); ?> class="address">
                  <p class="text-address"> <i class="fas fa-map-marker-alt"></i> <?php echo $row['address'] ?> </p>
                </a>
              </div>
            </div>
          </div>
        <?php
        }
        ?>
      </section>
    </div>
  </div>

  <!-- List-Shop-box -->
  <div class="container padding">
    <div class="box-title">
      <p><i class="fas fa-star"></i>Danh sách quán</p>
      <a href="/muzzy/Shop">Xem tất cả</a>
    </div>
    <hr class="my-1 hr-cus">
    <div class="wraper-slider">
      <section class="slider-area slider">
        <?php
        while ($row = mysqli_fetch_array($data['listShop'])) {
          ?>
          <div class="disable-current">
            <div class="wraper-item">
              <div class="deal-item">
                <a href="/muzzy/Shop/ShopDetail/<?php echo $row["id"] ?>" class="avatar">
                  <img src=<?php $listurl = ProcessUrlInamge($row['url_image']);
                              echo $listurl[0];  ?> alt="">
                </a>

                <div class="brand">
                  <p class="text-center"><?php echo $row['name'] ?></p>
                </div>
                <hr>
                <a href=<?php echo "https://www.google.com/maps/search/" . ProcessUrlMap($row['address']); ?> class="address">
                  <p class="text-address"> <i class="fas fa-map-marker-alt"></i> <?php echo $row['address'] ?> </p>
                </a>
              </div>
            </div>
          </div>
        <?php
        }
        ?>
      </section>
    </div>
  </div>
