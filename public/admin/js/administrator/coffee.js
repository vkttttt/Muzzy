(function ($) {
    var coffee = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/adCoffeeLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_coffee_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_coffee_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_coffee_list_item').attr('data-id');
                        self.delete(id);
                    });
                    $(".admin_coffee_list_item .btn_edit").click(function () {
                        var id = $(this).parents('.admin_coffee_list_item').attr('data-id');
                        self.update_loadform(id);
                    });
                } else {
                    $(".admin_coffee_list").html("Fail to load list coffee");
                }
            });
        };

        this.delete = function (id) {
            $.post('Admin/adCoffeeDelete', {
                id: id
            }, function (data, status) {
                if (data != undefined && data != null) {
                    self.loadlist();
                }
            });
        };

        this.add = function () {
            $("#adminCoffeeAddStatus").html("Adding...").hide();
            var shopname = $("#adminCoffeeAddForm_shopname").val();
            var idowner = $("#adminCoffeeAddForm_idowner").val();
            var address = $("#adminCoffeeAddForm_address").val();
            var dateopening = $("#adminCoffeeAddForm_dateopening").val();
            var timeopen = $("#adminCoffeeAddForm_timeopen").val();
            var timeclose = $("#adminCoffeeAddForm_timeclose").val();
            var discount = $("#adminCoffeeAddForm_discount").val();
            var description = $("#adminCoffeeAddForm_description").val();
            if (shopname.trim() == "") {
                alert("Vui lòng điền vào trường 'Tên quán'");
            } else {
                $.post('Admin/adCoffeeAdd', {
                    shopname: shopname,
                    idowner: idowner,
                    dateopening: dateopening,
                    timeopen: timeopen,
                    timeclose: timeclose,
                    discount: discount,
                    address: address,
                    description: description,
                }, function (data, status) {
                    if (data != undefined && data != null) {
                        $("#adminCoffeeAddStatus").html(data).show();
                        self.loadlist();
                    }
                });
            }
        };

        this.update_loadform = function (id) {
            $("#adminCoffeeEditStatus").html("").hide();
            $.post('Admin/adCoffeeEditForm', {
                id: id
            }, function (data, status) {
                if (data !== undefined && data !== null) {
                    $("#adminCoffeeEditForm").html(data);

                }
            });
        };

        this.update = function () {
            var id = $("#adminCoffeeEditForm_id").val();
            if (id != undefined) {
                if (id.trim() != "") {
                    var shopname = $("#adminCoffeeEditForm_shopname").val();
                    var idowner = $("#adminCoffeeEditForm_idowner").val();
                    var address = $("#adminCoffeeEditForm_address").val();
                    var dateopening = $("#adminCoffeeEditForm_dateopening").val();
                    var timeopen = $("#adminCoffeeEditForm_timeopen").val();
                    var timeclose = $("#adminCoffeeEditForm_timeclose").val();
                    var discount = $("#adminCoffeeEditForm_discount").val();
                    var description = $("#adminCoffeeEditForm_description").val();

                    $.post('Admin/adCoffeeUpdate', {
                        id: id,
                        shopname: shopname,
                        idowner: idowner,
                        dateopening: dateopening,
                        timeopen: timeopen,
                        timeclose: timeclose,
                        discount: discount,
                        address: address,
                        description: description
                    }, function (data, status) {
                        if (data != undefined && data != null) {
                            $("#adminCoffeeEditStatus").html(data).show();
                            self.loadlist();
                        }
                    });
                }
            }
        };

        /*
         * Add event
         */
        $("#adminCoffeeEditModal .btn_update").click(function () {
            self.update();
        });
        $("#adminCoffeeAddModal .btn_add").click(function () {
            self.add();
        });

        this.loadlist();
    };
    $(window).ready(function () {
        new coffee();
    });
})($);