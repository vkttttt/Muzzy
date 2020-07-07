<?php
require_once "DbConfig.php";
require_once "publicfunc.php";
$db = new Database();
$idCar = $_GET['carId'];
$query = "DELETE FROM cars WHERE id = '$idCar'";
$result = $db->ExecuteQuery($query);
header("Location: index.php");
?>