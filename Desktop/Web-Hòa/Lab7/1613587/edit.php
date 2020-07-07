<!doctype html>
<html lang="en">

<head>
  <title>1613587</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
</head>

<body>
  <?php
  require_once "DbConfig.php";
  require_once "publicfunc.php";
  $db = new Db();
  $idCar = $_GET['carId'];
  $query = "SELECT * FROM cars WHERE id = '$idCar'";
  $result = $db->ExecuteQuery($query);
  $carCur = mysqli_fetch_array($result);

  $checkErrorName = "";
  $checkErrorYear = "";
  if (isset($_POST['submitUpdate'])) {
    $carName = $_POST['carName'];
    $carYear = $_POST['carYear'];

    // Check valid name
    $checkErrorName = CheckName($carName);

    // Check valid year
    $checkErrorYear = CheckYear($carYear);

    if ($checkErrorName == "" && $checkErrorYear == "") {
      $query = "UPDATE cars SET name = '$carName', year = '$carYear' WHERE id = '$idCar'";
      $result = $db->ExecuteQuery($query);
      header("Location: index.php");
    }
  }

  ?>

  <div class="container">
    <h2 class="text-center display-4">Edit <i class="fas fa-car"></i></h2>
    <form class="mt-2" method="POST" action="edit.php?carId=<?php echo $idCar;?>">
      <div class="form-group">
        <label for="carName">Car name:</label>
        <input name="carName" type="text" class="form-control" id="carName" aria-describedby="nameHelp" placeholder="<?php echo $carCur['name']; ?>" value="<?php echo $carCur['name']; ?>">
        <?php
        if ($checkErrorName != "") {
          ?>
          <p class="text-danger"><?php echo $checkErrorName ?></p>
        <?php
        }
        ?>
      </div>
      <div class="form-group">
        <label for="carYear">Car year:</label>
        <input name="carYear" type="text" class="form-control" id="carYear" aria-describedby="yearHelp" placeholder="<?php echo $carCur['year']; ?>" value="<?php echo $carCur['year']; ?>">
        <?php
        if ($checkErrorYear != "") {
          ?>
          <p class="text-danger"><?php echo $checkErrorYear ?></p>
        <?php
        }
        ?>
      </div>

      <button name="submitUpdate" class="btn btn-primary">Update <i class="fas fa-car"></i></button>
    </form>
  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>