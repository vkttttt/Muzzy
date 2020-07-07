(
  function ($) {
    const Comment = function () {
      var self = this;
      this.LoadListComment = function () {
        var idShop = $('#idShop').val();
        if (idShop != undefined) {
          $.post(
            '/muzzy/Shop/LoadListCommentOfShop',
            {
              idShop: idShop
            },
            function (data, status) {

              if (data != undefined && data != null) {
                $(".people-comment").html(data);
              }
            }
          )
        }
      };
      this.AddNewComment = function () {
        var idShop = $('#idShop').val();
        var content = $('.your-comment .content_comment').val();
        console.log(content);
        if (idShop != undefined && content != null && content != "") {
          $.post(
            '/muzzy/Shop/AddNewCommentForShop',
            {
              idShop: idShop,
              commentContent: content,
              rate: 4
            },
            function (data, status) {
              if (data != null && data != undefined) {
                if (data == "notLogin") {
                  var redirect = '/muzzy/User/Login';
                  window.location = redirect;
                }
                else {
                  $('.your-comment .content_comment').val("");
                  self.LoadListComment();
                }

              }
            }
          )
        }
      };
      $(".your-comment .btn_add_comment").click(function () {
        self.AddNewComment();
      });
      this.LoadListComment();
    };
    $(window).ready(function () {
      new Comment();
    });
  }
)($);