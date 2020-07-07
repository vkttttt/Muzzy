<div class="ml-md-4 flex-grow-1">
    <div class="admin_coffee_delete_result"></div>
    <span 
        class="mb-4 btn btn-primary btn-sm" 
        data-toggle="modal" 
        data-target="#adminCoffeeAddModal">Thêm quán Coffee mới</span>
    <!-- Modal to add coffee -->
    <div class="modal fade" id="adminCoffeeAddModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Thêm quán Coffee mới</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div id="adminCoffeeAddForm">

                        <div class="form-group">
                            <label for="adminCoffeeAddForm_shopname">Tên quán</label>
                            <input 
                                class="form-control" 
                                type="text" 
                                id="adminCoffeeAddForm_shopname"

                                >
                        </div>

                        <div class="form-group">
                            <label for="adminCoffeeAddForm_idowner">Id chủ quán</label>
                            <input 
                                class="form-control" 
                                type="number" 
                                id="adminCoffeeAddForm_idowner"
                                >
                        </div>

                        <div class="form-group">
                            <label for="adminCoffeeAddForm_address">Địa chỉ</label>
                            <textarea 
                                class="form-control" 
                                id="adminCoffeeAddForm_address" 
                                rows="3"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="adminCoffeeAddForm_description">Mô tả</label>
                            <textarea 
                                class="form-control" 
                                id="adminCoffeeAddForm_description" 
                                rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="adminCoffeeAddForm_dateopening">Ngày khai trương</label>
                            <input 
                                class="form-control" 
                                type="date" 
                                id="adminCoffeeAddForm_dateopening"
                                >

                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="adminCoffeeAddForm_timeopen">Giờ mở cửa</label>
                                    <input 
                                        class="form-control" 
                                        type="time" 
                                        id="adminCoffeeAddForm_timeopen"
                                        >

                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="adminCoffeeAddForm_timeclose">Giờ đóng cửa</label>
                                    <input 
                                        class="form-control" 
                                        type="time" 
                                        id="adminCoffeeAddForm_timeclose"
                                        >
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="adminCoffeeAddForm_discount">Giảm giá</label>
                            <input 
                                class="form-control" 
                                type="number" 
                                id="adminCoffeeAddForm_discount"
                                >
                        </div>

                    </div>
                    <div class="w-100" id="adminCoffeeAddStatus" style="display: none"></div>

                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary btn_add">Thêm</button>
                </div>

            </div>
        </div>
    </div>

    <div class="admin_coffee_list">
        Loading 
    </div>

    <!-- The Modal to edit coffee-->
    <div class="modal fade" id="adminCoffeeEditModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Chỉnh sửa thành viên</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div id="adminCoffeeEditForm">
                        Loading...
                    </div>
                    <div class="w-100" id="adminCoffeeEditStatus" style="display: none"></div>

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
