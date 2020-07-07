<?php
require_once "../DbConfig.php";
require_once "../publicfunc.php";
$db = new Db();

$checkErrorName = "";
$checkErrorYear = "";

$carId = $_POST['carId'];
$carName = $_POST['carName'];
$carYear = $_POST['carYear'];

// Check valid name
$checkErrorName = CheckName($carName);

// Check valid year
$checkErrorYear = CheckYear($carYear);

if ($checkErrorName == "" && $checkErrorYear == "") {
  $query = "UPDATE cars SET name = '$carName', year = '$carYear' WHERE id = '$carId'";
  $result = $db->ExecuteQuery($query);
  echo json_encode([
    "status" => "success"

  ]);
}
else {
  echo json_encode([
    "status" => "error",
    "checkErrorName" => $checkErrorName,
    "checkErrorYear" => $checkErrorYear
  ]);
}

?>