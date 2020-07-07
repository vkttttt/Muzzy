(function ($) {
    var table = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/coffeeTableLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_table_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_table_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_table_list_item').attr('data-id');
                        self.delete(id);
                    });
                    $(".admin_table_list_item .btn_edit").click(function () {
                        var id = $(this).parents('.admin_table_list_item').attr('data-id');
                        self.update_loadform(id);
                    });
                } else {
                    $(".admin_table_list").html("Fail to load list table");
                }
            });
        };
        this.loadlist();
    };
    $(window).ready(function () {
        new table();
    });
})($);