<?php
require_once "../DbConfig.php";
$db = new Db();
$idCar = $_POST['carId'];
$query = "DELETE FROM cars WHERE id = '$idCar'";
$result = $db->ExecuteQuery($query);
echo json_encode([
  "status" => "success"

]);
?>