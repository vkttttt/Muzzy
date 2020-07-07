<?php
  require_once "../DbConfig.php";
  require_once "../publicfunc.php";
  $db = new Db();
  $checkErrorId = "";
  $checkErrorName = "";
  $checkErrorYear = "";

  $carId = $_POST['carId'];
  $carName = $_POST['carName'];
  $carYear = $_POST['carYear'];

  // Check valid id
  $checkErrorId = CheckId($carId);

  // Check valid name
  $checkErrorName = CheckName($carName);

  // Check valid year
  $checkErrorYear = CheckYear($carYear);

  if ($checkErrorId == "" && $checkErrorName == "" && $checkErrorYear == "") {
    $query = "INSERT INTO cars VALUES($carId, '$carName', $carYear)";
    $result = $db->ExecuteQuery($query);
    echo json_encode([
      "status" => "success"

    ]);
  }
  else {
    echo json_encode([
      "status" => "error",
      "checkErrorId" => $checkErrorId,
      "checkErrorName" => $checkErrorName,
      "checkErrorYear" => $checkErrorYear
    ]);
  }

?>