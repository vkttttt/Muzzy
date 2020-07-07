<div class="body container">
    <div class="result">
        <p>Tìm kiếm với từ khoá '<?php echo $data['Key'] ?>'</p>
    </div>
    <div id="listShop" class="list">
        <?php
        while ($result = mysqli_fetch_array($data['ListResult']['listShop'])) {
            ?>
            <div class="item">
                <a class="photo" href=<?php echo "/muzzy/Shop/ShopDetail/" . $result['id'] ?>>
                    <img src="/muzzy/public/image/cafe.jpg" alt="" />
                    <?php
                        if ($result['discount'] != NULL) {
                            ?>
                        <div class="discount"><?php echo $result['discount'] ?>%</div>
                    <?php
                        }
                        ?>

                </a>

                <div class="name-stars">
                    <p class="name"><?php echo $result['name'] ?></p>
                    <div class="stars">
                        <?php
                            for ($i = 0; $i < $result['rate']; $i++) {
                                ?>
                            <i class="fas fa-star"></i>
                        <?php
                            }
                            for ($i = 0; $i < 5 - $result['rate']; $i++) {
                                ?>
                            <i class="far fa-star"></i>
                        <?php
                            }
                            ?>

                    </div>
                </div>
                <p class="address"><?php echo $result['address'] ?></p>
            </div>
        <?php
        }
        ?>

    </div>

    
    <script language="javascript">
        function Filter(Obj) {
            var blockShop = document.getElementById('listShop');
            var value = Obj.value;
            blockShop.style.display = "flex";
        }
    </script>
</div>