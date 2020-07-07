<?php
if (empty($data['listFeedback'])) {
    echo "Chưa có người dùng";
} else {
    ?>
    <div class="table-responsive">
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Chủ đề</th>
                    <th scope="col">Nội dung</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 0;
                while ($row = mysqli_fetch_array($data['listFeedback'])) {
                    $i++;
                    ?>
                    <tr class="admin_feedback_list_item" data-id="<?php echo $row['id']; ?>">
                        <th scope="row"><?php echo $i; ?></th>
                        <td><?php echo $row['fullname']; ?></td>
                        <td><?php echo $row['email']; ?></td>
                        <td><?php echo $row['subject']; ?></td>
                        <td><?php echo $row['content']; ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

<?php } ?>