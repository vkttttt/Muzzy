<input 
    type="hidden" 
    value="<?php echo $data['deleteUser']['id']; ?>"
    id="adminUserEditForm_id"
    >

<div class="form-group">
    <label for="adminUserEditForm_fullname">Họ và tên</label>
    <input 
        class="form-control" 
        type="text"
        id="adminUserEditForm_content" 
        value="<?php echo $data['deleteUser']['fullname']; ?>"
        disabled
    >
</div>

<div class="row">
    <div class="col-6">
        <div class="form-group">
            <label for="adminUserEditForm_username">Tên đăng nhập</label>
            <input 
                class="form-control" 
                type="text"
                id="adminUserEditForm_timestart_date"
                value="<?php echo $data['deleteUser']['username']; ?>"
                disabled>
            

        </div>
    </div>
    <div class="col-6">
        <div class="form-group">
            <label for="adminUserEditForm_password">Mật khẩu</label>
            <input 
                class="form-control"  
                id="adminUserEditForm_password"
                value="<?php echo $data['deleteUser']['password']; ?>"
                disabled
                >

        </div>
    </div>
</div>
<hr>

<div class="form-group">
    <label for="adminUserEditForm_phonenumber">Số điện thoại</label>
    <input 
        type="number" 
        class="form-control" 
        id="adminUserEditForm_phonenumber"
        value="<?php echo $data['deleteUser']['phonenumber']; ?>"
        >
</div>
<div class="form-group">
    <label for="adminUserEditForm_address">Địa chỉ</label>
    <textarea 
        class="form-control" 
        id="adminUserEditForm_address" 
        rows="3"><?php echo $data['deleteUser']['address']; ?></textarea>
</div>

<div class="form-group">
    <label for="adminUserEditForm_role">Phân quyền</label>
    <input 
        type="text" 
        class="form-control" 
        id="adminUserEditForm_role"
        value="<?php echo $data['deleteUser']['role']; ?>"
        disabled
        >
</div>