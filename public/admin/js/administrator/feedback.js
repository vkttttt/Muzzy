(function ($) {
    var feedback = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/adFeedbackLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_feedback_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_feedback_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_feedback_list_item').attr('data-id');
                        self.delete(id);
                    });
                    $(".admin_feedback_list_item .btn_edit").click(function () {
                        var id = $(this).parents('.admin_feedback_list_item').attr('data-id');
                        self.update_loadform(id);
                    });
                } else {
                    $(".admin_feedback_list").html("Fail to load list feedback");
                }
            });
        };
        this.loadlist();
    };
    $(window).ready(function () {
        new feedback();
    });
})($);