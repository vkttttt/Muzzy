<?php
if (empty($data['listTable'])) {
    echo "Quán của bạn chưa có lịch đặt bàn!";
} else {
    ?>
    <div class="table-responsive">
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Người đặt</th>
                    <th scope="col">Quán Coffee được đặt</th>
                    <th scope="col">Thời gian đặt</th>
                    <th scope="col">Trạng thái bàn</th>
                    <th scope="col">Mô tả</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 0;
                while ($row = mysqli_fetch_array($data['listTable'])) {
                    $i++;
                    ?>
                    <tr class="admin_table_list_item" data-id="<?php echo $row['id']; ?>">
                        <th scope="row"><?php echo $i; ?></th>
                        <td><?php echo $row['fullname']; ?></td>
                        <td><?php echo $row['shopname']; ?></td>
                        <td>
                            Thời gian bắt đầu: <?php echo $row['timestart'];?>
                            <br>
                            Thời gian kết thúc: <?php echo $row['timeend'];?>
                        </td>
                        <td><?php echo $data['listStatusOfTable'][$row['status']]; ?></td>
                        <td style="max-width: 300px"><?php echo $row['description']; ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

<?php } ?>