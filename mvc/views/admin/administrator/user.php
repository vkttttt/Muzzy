<div class="ml-md-4 flex-grow-1">
    <div class="admin_user_delete_result"></div>
    <span 
        class="mb-4 btn btn-primary btn-sm" 
        data-toggle="modal" 
        data-target="#adminUserAddModal">Thêm thành viên mới</span>
    <!-- Modal to add user -->
    <div class="modal fade" id="adminUserAddModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Thêm thành viên mới</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div id="adminUserAddForm">

                        <div class="form-group">
                            <label for="adminUserAddForm_fullname">Họ và tên</label>
                            <input 
                                class="form-control" 
                                type="text" 
                                id="adminUserAddForm_fullname"

                                >
                        </div>

                        <div class="form-group">
                            <label for="adminUserAddForm_username">Tên đăng nhập</label>
                            <input 
                                class="form-control" 
                                type="text" 
                                id="adminUserAddForm_username"
                                >
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="adminUserAddForm_password">Mật khẩu</label>
                                    <input 
                                        class="form-control" 
                                        type="password" 
                                        id="adminUserAddForm_password"
                                        >
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="adminUserAddForm_repeatpassword">Nhập lại mật khẩu</label>
                                    <input 
                                        class="form-control" 
                                        type="password" 
                                        id="adminUserAddForm_repeatpassword"

                                        >

                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="form-group">
                            <label for="adminUserAddForm_phonenumber">Số điện thoại</label>
                            <input 
                                type="number" 
                                class="form-control" 
                                id="adminUserAddForm_phonenumber"
                                >
                        </div>
                        <div class="form-group">
                            <label for="adminUserAddForm_address">Địa chỉ</label>
                            <textarea 
                                class="form-control" 
                                id="adminUserAddForm_address" 
                                rows="3"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="adminUserAddForm_role">Phân quyền</label>
                            <select name="role" id="adminUserAddForm_role">
                                <option value="1">Người dùng</option>
                                <option value="2">Chủ quán coffee</option>
                            </select>
                        </div>
                    
                    </div>
                    <div class="w-100" id="adminUserAddStatus" style="display: none"></div>

                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary btn_add">Thêm</button>
                </div>

            </div>
        </div>
    </div>

    <div class="admin_user_list">
        Loading 
    </div>

    <!-- The Modal to edit user-->
    <div class="modal fade" id="adminUserEditModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Chỉnh sửa thành viên</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div id="adminUserEditForm">
                        Loading...
                    </div>
                    <div class="w-100" id="adminUserEditStatus" style="display: none"></div>

                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary btn_update">Lưu</button>
                </div>

            </div>
        </div>
    </div>

</div>
