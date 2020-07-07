<?php
if (empty($data['listComment'])) {
    echo "Bạn chưa nhận được bình luận nào!";
} else {
    ?>
    <div class="table-responsive">
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">SDT khách hàng</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 0;
                while ($row = mysqli_fetch_array($data['listComment'])) {
                    $i++;
                    ?>
                    <tr class="admin_comment_list_item" data-id="<?php echo $row['idcomment']; ?>">
                        <th scope="row"><?php echo $i; ?></th>

                        <td><?php echo $row['fullname']; ?></td>
                        <td><?php echo $row['phonenumber']; ?></td>
                        <td><?php echo $row['content']; ?></td>
                        <td><?php echo $row['rate']; ?></td>
                        <td class="text-center">
                            <i class="fa fa-trash text-danger btn_delete"></i>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

<?php } ?>