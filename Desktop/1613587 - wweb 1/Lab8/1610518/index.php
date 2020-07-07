<!doctype html>
<html lang="en">

<head>
  <title>1610518 - Đoàn Thị Hạ Duyên</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">

  <style>
    table {
      -webkit-box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.17);
      box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.17);
    }
  </style>
</head>

<body>

  <div class="container my-4">
    <h1 class="text-center display-4"><i class="fas fa-car"></i> List cars <i class="fas fa-car"></i></h1>
    <table class="table " id="table-list">
      <thead class="thead-dark">
        <th>No.</th>
        <th>Id</th>
        <th>Name</th>
        <th>Year</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody id="list-car">

      </tbody>
    </table>

    <!-- Button trigger modal -->
    <button id="btn-pre-add" type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#addModalCenter">
      Add <i class="fas fa-car"></i>
    </button>

    <!-- Modal Add -->
    <div class="modal fade" id="addModalCenter" tabindex="-1" role="dialog" aria-labelledby="addModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title display-5" id="exampleModalLongTitle">Add new <i class="fas fa-car"></i></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form class="mt-2">
                <div class="form-group">
                  <label for="carId">Car id:</label>
                  <input name="carId" type="text" class="form-control" id="carId" aria-describedby="idHelp" placeholder="Enter id">
                  <p id="checkErrorId" class="text-danger"></p>
                </div>
                <div class="form-group">
                  <label for="carName">Car name:</label>
                  <input name="carName" type="text" class="form-control" id="carName" aria-describedby="nameHelp" placeholder="Enter name">
                  <p id="checkErrorName" class="text-danger"></p>
                </div>
                <div class="form-group">
                  <label for="carYear">Car year:</label>
                  <input name="carYear" type="text" class="form-control" id="carYear" aria-describedby="yearHelp" placeholder="Enter year">
                  <p id="checkErrorYear" class="text-danger"></p>
                </div>

              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-add-car">Create <i class="fas fa-car"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit -->
    <div class="modal fade" id="editModalCenter" tabindex="-1" role="dialog" aria-labelledby="editModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title display-5" id="exampleModalLongTitle">Update <i class="fas fa-car"></i></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form class="mt-2">
                <div class="form-group">
                  <label for="carIdEdit">Car id:</label>
                  <input readonly name="carIdEdit" type="text" class="form-control" id="carIdEdit" aria-describedby="idHelp" placeholder="Enter id">
                  <p id="checkErrorIdEdit" class="text-danger"></p>
                </div>
                <div class="form-group">
                  <label for="carNameEdit">Car name:</label>
                  <input name="carNameEdit" type="text" class="form-control" id="carNameEdit" aria-describedby="nameHelp" placeholder="Enter name">
                  <p id="checkErrorNameEdit" class="text-danger"></p>
                </div>
                <div class="form-group">
                  <label for="carYearEdit">Car year:</label>
                  <input name="carYearEdit" type="text" class="form-control" id="carYearEdit" aria-describedby="yearHelp" placeholder="Enter year">
                  <p id="checkErrorYearEdit" class="text-danger"></p>
                </div>

              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-update-car">Save <i class="fas fa-car"></i></button>
          </div>
        </div>
      </div>
    </div>


  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="./js/jquery-3.4.1.min.js"></script>
  <script src="./js/app.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>