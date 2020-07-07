(function ($) {
    var course = function () {
        var self = this;
        this.loadlist = function () {
            $.post('Admin/refCourseLoadlist', {}, function (data, status) {
                if (data != undefined && data != null) {
                    $(".admin_course_list").html(data);
                    /*
                     * Bắt sự kiện xoá, sửa
                     */
                    $(".admin_course_list_item .btn_delete").click(function () {
                        var id = $(this).parents('.admin_course_list_item').attr('data-id');
                        self.delete(id);
                    });
                    $(".admin_course_list_item .btn_edit").click(function () {
                        var id = $(this).parents('.admin_course_list_item').attr('data-id');
                        self.update_loadform(id);
                    });
                } else {
                    $(".admin_course_list").html("Fail to load list course");
                }
            });
        };

        this.delete = function (id) {
            $.post('Admin/refCourseDelete', {
                id: id
            }, function (data, status) {
                if (data != undefined && data != null) {
                    self.loadlist();
                }
            });
        };

        this.add = function () {
            $("#adminCourseAddStatus").html("Adding...").hide();
            var content = $("#adminCourseAddForm_content").val();
            if (content.trim() == "") {
                alert("Vui lòng điền vào trường 'khoá học'");
            } else {
                var start_date = $("#adminCourseAddForm_timestart_date").val();
                var start_time = $("#adminCourseAddForm_timestart_time").val();
                var end_date = $("#adminCourseAddForm_timeend_date").val();
                var end_time = $("#adminCourseAddForm_timeend_time").val();

                var fee = $("#adminCourseAddForm_fee").val();
                var address = $("#adminCourseAddForm_address").val();
                var description = $("#adminCourseAddForm_description").val();

                $.post('Admin/refCourseAdd', {
                    content: content,
                    start: start_date + " " + start_time,
                    end: end_date + " " + end_time,
                    fee: fee,
                    address: address,
                    description: description
                }, function (data, status) {
                    if (data != undefined && data != null) {
                        $("#adminCourseAddStatus").html(data).show();
                        self.loadlist();
                    }
                });
            }
        };

        this.update_loadform = function (id) {
            $("#adminCourseEditStatus").html("").hide();
            $.post('Admin/refCourseEditForm', {
                id: id
            }, function (data, status) {
                if (data !== undefined && data !== null) {
                    $("#adminCourseEditForm").html(data);

                }
            });
        };

        this.update = function () {
            var id = $("#adminCourseEditForm_id").val();
            if (id != undefined) {
                if (id.trim() != "") {
                    var content = $("#adminCourseEditForm_content").val();

                    var start_date = $("#adminCourseEditForm_timestart_date").val();
                    var start_time = $("#adminCourseEditForm_timestart_time").val();
                    var end_date = $("#adminCourseEditForm_timeend_date").val();
                    var end_time = $("#adminCourseEditForm_timeend_time").val();

                    var fee = $("#adminCourseEditForm_fee").val();
                    var address = $("#adminCourseEditForm_address").val();
                    var description = $("#adminCourseEditForm_description").val();

                    $.post('Admin/refCourseUpdate', {
                        id: id,
                        content: content,
                        start: start_date + " " + start_time,
                        end: end_date + " " + end_time,
                        fee: fee,
                        address: address,
                        description: description
                    }, function (data, status) {
                        if (data != undefined && data != null) {
                            $("#adminCourseEditStatus").html(data).show();
                            self.loadlist();
                        }
                    });
                }
            }
        };

        /*
         * Add event
         */
        $("#adminCourseEditModal .btn_update").click(function () {
            self.update();
        });
        $("#adminCourseAddModal .btn_add").click(function () {
            self.add();
        });

        this.loadlist();
    };
    $(window).ready(function () {
        new course();
    });
})($);