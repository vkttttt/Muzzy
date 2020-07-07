<div class="body container ">
  <ul class="nav nav-pills tab-bar mt-4 mb-2" id="pills-tab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Hot</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Vừa khai trương</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Lâu đời</a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <!-- HOT -->
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      <div class="list">
        <?php
        while ($shop = mysqli_fetch_array($data['listShop'])) {
        ?>
          <div class="item">
            <a class="photo" href="/muzzy/Shop/ShopDetail/<?php echo $shop["id"] ?>">
              <img src="/muzzy/public/image/cafe.jpg" alt="" />
            </a>

            <div class="name-stars">
              <p class="name"><?php echo $shop["name"] ?></p>
              <div class="stars">
                <?php
                for ($i = 0; $i < $shop['rate']; $i++) {
                ?>
                  <i class="fas fa-star"></i>
                <?php
                }
                for ($i = 0; $i < 5 - $shop['rate']; $i++) {
                ?>
                  <i class="far fa-star"></i>
                <?php
                }
                ?>
              </div>
            </div>
            <p class="address"><?php echo $shop["address"] ?></p>
          </div>
        <?php
        }
        ?>
      </div>
    </div>
    <!-- Vừa khai trương -->
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      <div class="list">
        <?php
        while ($shop = mysqli_fetch_array($data['listShop'])) {
        ?>
          <div class="item">
            <a class="photo" href="/muzzy/Shop/ShopDetail/<?php echo $shop["id"] ?>">
              <img src="/muzzy/public/image/cafe.jpg" alt="" />
            </a>

            <div class="name-stars">
              <p class="name"><?php echo $shop["name"] ?></p>
              <div class="stars">
                <?php
                for ($i = 0; $i < $shop['rate']; $i++) {
                ?>
                  <i class="fas fa-star"></i>
                <?php
                }
                for ($i = 0; $i < 5 - $shop['rate']; $i++) {
                ?>
                  <i class="far fa-star"></i>
                <?php
                }
                ?>
              </div>
            </div>
            <p class="address"><?php echo $shop["address"] ?></p>
          </div>
        <?php
        }
        ?>
      </div>
    </div>
    <!-- LÂU ĐỜI -->
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      <div class="list">
        <?php
        while ($shop = mysqli_fetch_array($data['listShop'])) {
        ?>
          <div class="item">
            <a class="photo" href="/muzzy/Shop/ShopDetail/<?php echo $shop["id"] ?>">
              <img src="/muzzy/public/image/cafe.jpg" alt="" />
            </a>

            <div class="name-stars">
              <p class="name"><?php echo $shop["name"] ?></p>
              <div class="stars">
                <?php
                for ($i = 0; $i < $shop['rate']; $i++) {
                ?>
                  <i class="fas fa-star"></i>
                <?php
                }
                for ($i = 0; $i < 5 - $shop['rate']; $i++) {
                ?>
                  <i class="far fa-star"></i>
                <?php
                }
                ?>
              </div>
            </div>
            <p class="address"><?php echo $shop["address"] ?></p>
          </div>
        <?php
        }
        ?>
      </div>
    </div>
  </div>
</div>