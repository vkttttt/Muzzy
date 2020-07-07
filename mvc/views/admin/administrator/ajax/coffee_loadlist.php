<?php
if (empty($data['listCoffee'])) {
    echo "Chưa có người dùng";
} else {
    ?>
    <div class="table-responsive">
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ID coffee</th>
                    <th scope="col">Tên quán</th>
                    <th scope="col">Chủ quán</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Khai trương</th>
                    <th scope="col">Thời gian làm việc</th>
                    <th scope="col">Giảm giá</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 0;
                while ($row = mysqli_fetch_array($data['listCoffee'])) {
                    $i++;
                    ?>
                    <tr class="admin_coffee_list_item" data-id="<?php echo $row['idshop']; ?>">
                        <th scope="row"><?php echo $i; ?></th>
                        <td><?php echo $row['idshop']; ?></td>
                        <td><?php echo $row['shopname']; ?></td>
                        <td><?php echo $row['ownername']; ?></td>
                        <td><?php echo $row['shopaddress']; ?></td>
                        <td><?php echo $row['description']; ?></td>
                        <td><?php echo $row['dateopening']; ?></td>
                        <td>Giờ mở cửa: <?php echo $row['timeopen']; ?>
                            <br>
                            Giờ đóng cửa: <?php echo $row['timeclose']; ?>
                        </td>
                        <td><?php echo $row['discount']; ?></td>
                        <td><?php echo $row['rate']; ?></td>
                        <td class="text-center">
                            <i class="fa fa-pencil-alt mr-2 text-success btn_edit" data-toggle="modal" data-target="#adminCoffeeEditModal"></i>
                            <i class="fa fa-trash text-danger btn_delete"></i>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

<?php } ?>