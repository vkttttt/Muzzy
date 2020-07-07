(
  function ($) {
    const Car = function () {
      var self = this;

      this.LoadListCar = function () {
        $.ajax({
          url: './ajax/LoadList.php',
          type: 'POST',
          success: function (result) {
            $("#list-car").html(result);

            $(".one-car .btn-pre-delete").click(function () {
              var checkOK = confirm("Your want to delete this car");
              var id = $(this).parents('.one-car').attr('data-id');
              if (checkOK) {
                self.DeleteCar(id);
              }
            })

            $(".one-car .btn-pre-edit").click(function () {
              var id = $(this).parents('.one-car').attr('data-id');
              var name = $(this).parents('.one-car').attr('data-name');
              var year = $(this).parents('.one-car').attr('data-year');
              $('#checkErrorNameEdit').html("");
              $('#checkErrorYearEdit').html("");
              self.PushDB(id, name, year);
            })
          },
          error: function () {
            $("#list-car").html("Loading fail");
          }
        });

      };

      this.PushDB = function(id, name, year) {
        $('#carIdEdit').val(id);
        $('#carNameEdit').val(name);
        $('#carYearEdit').val(year);

        $('#carIdEdit').attr("placeholder", id);
        $('#carNameEdit').attr("placeholder", name);
        $('#carYearEdit').attr("placeholder", year);
      };

      this.AddNewCar = function () {
        var id = $('#carId').val();
        var name = $('#carName').val();
        var year = $('#carYear').val();
        $.ajax({
          url: './ajax/AddNewCar.php',
          method: 'POST',
          dataType: "json",
          data: {
            carId: id,
            carName: name,
            carYear: year
          },
          success: function (result) {
            if (result.status == "error") {
              if (result.checkErrorId != "") {
                $('#checkErrorId').html(result.checkErrorId);
              }
              if (result.checkErrorName != "") {
                $('#checkErrorName').html(result.checkErrorName);
              }
              if (result.checkErrorYear != "") {
                $('#checkErrorYear').html(result.checkErrorYear);
              }

            }
            else {

              self.LoadListCar();
              $('#checkErrorId').html("");
              $('#checkErrorName').html("");
              $('#checkErrorYear').html("");

              $('#carId').val("");
              $('#carName').val("");
              $('#carYear').val("");

              $('#addModalCenter').modal('toggle');
            }
          },
          error: function () {
            alert("Creating Fail");
          }
        });

      };

      this.EditCar = function () {
        var id = $('#carIdEdit').val();
        var name = $('#carNameEdit').val();
        var year = $('#carYearEdit').val();
        $.ajax({
          url: './ajax/EditCar.php',
          type: "POST",
          dataType: "json",
          data: {
            carId: id,
            carName: name,
            carYear: year
          },
          success: function (result) {
            if (result.status == "error") {
              if (result.checkErrorName != "") {
                $('#checkErrorNameEdit').html(result.checkErrorName);
              }
              if (result.checkErrorYear != "") {
                $('#checkErrorYearEdit').html(result.checkErrorYear);
              }

            }
            else {
              self.LoadListCar();
              $('#checkErrorNameEdit').html("");
              $('#checkErrorYearEdit').html("");

              $('#carNameEdit').val("");
              $('#carYearEdit').val("");

              $('#editModalCenter').modal('toggle');
            }
          },
          error: function () {
            alert("Updating Fail");
          }
        });
      };

      this.DeleteCar = function (id) {
        $.ajax({
          url: "./ajax/DeleteCar.php",
          type: "POST",
          dataType: "json",
          data: {
            carId: id
          },
          success: function (result) {
            self.LoadListCar();
          },
          error: function () {
            alert("Delete fail!");
          }
        });
      }
      $('#btn-pre-add').click(function () {
        $('#checkErrorId').html("");
        $('#checkErrorName').html("");
        $('#checkErrorYear').html("");

        $('#carId').val("");
        $('#carName').val("");
        $('#carYear').val("");
      });

      $("#addModalCenter .btn-add-car").click(function () {

        self.AddNewCar();
        $('#checkErrorId').html("");
        $('#checkErrorName').html("");
        $('#checkErrorYear').html("");

      });

      $("#editModalCenter .btn-update-car").click(function () {
        self.EditCar();
      });

      this.LoadListCar();
    };
    $(window).ready(function () {
      new Car();
    });
  }
)($);