<?php
if (empty($data['listUser'])) {
    echo "Chưa có người dùng";
} else {
    ?>
    <div class="table-responsive">
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ID người dùng</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Tên đăng nhập</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Phân quyền</th>
                    <th scope="col">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 0;
                while ($row = mysqli_fetch_array($data['listUser'])) {
                    $i++;
                    ?>
                    <tr class="admin_user_list_item" data-id="<?php echo $row['id']; ?>">
                        <th scope="row"><?php echo $i; ?></th>
                        <td><?php echo $row['id']; ?></td>
                        <td><?php echo $row['fullname']; ?></td>
                        <td><?php echo $row['username']; ?></td>
                        <td><?php echo $row['phonenumber']; ?></td>
                        <td><?php echo $row['address']; ?></td>
                        <td><?php echo $data['listUserRole'][$row['role']]; ?></td>
                        <td class="text-center">
                            <i class="fa fa-pencil-alt mr-2 text-success btn_edit" data-toggle="modal" data-target="#adminUserEditModal"></i>
                            <i class="fa fa-trash text-danger btn_delete"></i>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

<?php } ?>