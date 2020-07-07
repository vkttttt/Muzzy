(function ($) {
    var user = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/adUserLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_user_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_user_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_user_list_item').attr('data-id');
                        self.delete(id);
                    });
                    $(".admin_user_list_item .btn_edit").click(function () {
                        var id = $(this).parents('.admin_user_list_item').attr('data-id');
                        self.update_loadform(id);
                    });
                } else {
                    $(".admin_user_list").html("Fail to load list user");
                }
            });
        };

        this.delete = function (id) {
            $.post('Admin/adUserDelete', {
                id: id
            }, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_user_delete_result").html(data);
                    self.loadlist();
                }
            });
        };


        this.add = function () {
            $("#adminUserAddStatus").html("Adding...").hide();
            var fullname = $("#adminUserAddForm_fullname").val();
            var username = $("#adminUserAddForm_username").val();
            var pass = $("#adminUserAddForm_password").val();
            var repass = $("#adminUserAddForm_repeatpassword").val();
            if (fullname.trim() == "") {
                alert("Vui lòng điền vào trường 'Họ và tên'");
            } else if (username.trim() == "") {
                alert("Vui lòng điền vào trường 'Tên đăng nhập'");
            } else if (pass.trim() != repass.trim()) {
                alert("Mật khẩu không trùng khớp'");
            } else {
                var phone = $("#adminUserAddForm_phonenumber").val();
                var address = $("#adminUserAddForm_address").val();
                var role = $("#adminUserAddForm_role").val();


                $.post('Admin/adUserAdd', {
                    fullname: fullname,
                    username: username,
                    password: pass,
                    phonenumber: phone,
                    address: address,
                    role: role,
                }, function (data, status) {
                    if (data != undefined && data != null) {
                        $("#adminUserAddStatus").html(data).show();
                        self.loadlist();
                    }
                });
            }
        };

        this.update_loadform = function (id) {
            $("#adminUserEditStatus").html("").hide();
            $.post('Admin/adUserEditForm', {
                id: id
            }, function (data, status) {
                if (data !== undefined && data !== null) {
                    $("#adminUserEditForm").html(data);

                }
            });
        };

        this.update = function () {
            var id = $("#adminUserEditForm_id").val();
            if (id != undefined) {
                if (id.trim() != "") {
                    var fullname = $("#adminUserEditForm_fullname").val();
                    var username = $("#adminUserEditForm_username").val();
                    var pass = $("#adminUserEditForm_password").val();
                    var phone = $("#adminUserEditForm_phonenumber").val();
                    var address = $("#adminUserEditForm_address").val();
                    var role = $("#adminUserEditForm_role").val();

                    $.post('Admin/adUserUpdate', {
                        id: id,
                        fullname: fullname,
                        username: username,
                        password: pass,
                        phonenumber: phone,
                        address: address,
                        role: role,
                    }, function (data, status) {
                        if (data != undefined && data != null) {
                            $("#adminUserEditStatus").html(data).show();
                            self.loadlist();
                        }
                    });
                }
            }
        };

        /*
         * Add event
         */
        $("#adminUserEditModal .btn_update").click(function () {
            self.update();
        });
        $("#adminUserAddModal .btn_add").click(function () {
            self.add();
        });

        this.loadlist();
    };
    $(window).ready(function () {
        new user();
    });
})($);