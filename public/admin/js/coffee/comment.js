(function ($) {
    var comment = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/coffeeCommentLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_comment_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_comment_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_comment_list_item').attr('data-id');
                        self.delete(id);
                    });
                } else {
                    $(".admin_comment_list").html("Fail to load list comment");
                }
            });
        };

        this.delete = function (id) {
            $.post('Admin/coffeeCommentDelete', {
                id: id
            }, function (data, status) {
                if (data != undefined && data != null) {
                    self.loadlist();
                }
            });
        };

        this.loadlist();
    };
    $(window).ready(function () {
        new comment();
    });
})($);