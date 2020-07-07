<!doctype html>
<html lang="en">

<head>
  <title>1610518</title>
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
  $db = new DataBase();
  $query = "SELECT * FROM cars";
  $result = $db->ExecuteQuery($query);
  ?>

  <div class="container">
    <h1 class="text-center display-4"><i class="fas fa-car"></i> List cars <i class="fas fa-car"></i></h1>
    <table class="table C">
      <thead class="thead-dark" <tr>
        <th>No.</th>
        <th>Id</th>
        <th>Name</th>
        <th>Year</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php
        $count = 1;
        while ($car = mysqli_fetch_array($result)) {
          ?>
          <tr>
            <th scope="row"><?php echo $count++; ?></th>
            <td><?php echo $car['id']; ?></td>
            <td><?php echo $car['name']; ?></td>
            <td><?php echo $car['year']; ?></td>
            <td>
              <a onClick="javascript: return confirm('You want to delete ?');" href="<?php echo "delete.php?carId=" . $car['id']; ?>" style="text-decoration: none;">
                <button type="button" class="btn btn-danger">Delete <i class="far fa-trash-alt"></i></button>
              </a>
              <a href="<?php echo "edit.php?carId=" . $car['id']; ?>" style="text-decoration: none;">
                <button type="button" class="btn btn-outline-warning">Edit <i class="far fa-edit"></i></button>
              </a>
            </td>
          </tr>
        <?php
        }
        ?>
      </tbody>
    </table>
    <a href="add.php" style="text-decoration: none;">
      <button type="button" class="btn btn-outline-success">Add <i class="fas fa-car"></i></button>
    </a>

  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>