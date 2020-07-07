(function ($) {
    var student = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/refStudentLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_student_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_student_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_student_list_item').attr('data-id');
                        self.delete(id);
                    });
                } else {
                    $(".admin_student_list").html("Fail to load list course");
                }
            });
        };

        this.delete = function (id) {
            $.post('Admin/refStudentOfCourseDelete', {
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
        new student();
    });
})($);