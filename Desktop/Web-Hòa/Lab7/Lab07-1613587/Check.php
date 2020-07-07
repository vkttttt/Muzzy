<?php

function CheckId($id)
{
  if (empty($id)) {
    return "Id must have not empty!";
  }
  if (!is_numeric($id) || (floatval($id) && intval(floatval($id)) != floatval(($id)))) {
    return "Id must have integer number!";
  }
  $db = new Database();
  $query = "SELECT * FROM cars WHERE id = '$id'";
  $result = $db->ExecuteQuery($query);
  if (mysqli_num_rows($result) != 0) {
    return "Id already exists!";
  }
  return "";
}
function CheckName($name)
{
  if (empty($name)) {
    return "Name must have not empty!";
  }
  if (is_numeric($name)) {
    return "Name must have string!";
  }
  if (strlen($name) < 5 || strlen($name) > 40) {
    return "Lenght of name must have from 5 to 40 character!";
  }
  return "";
}
function CheckYear($year)
{
  if (empty($year)) {
    return "Year must have not empty!";
  }
  if (!is_numeric($year) || (floatval($year) && intval(floatval($year)) != floatval(($year)))) {
    return "Year must have integer number";
  }
  if ($year < 1990 || $year > 2015) {
    return "Year must have from 1990 to 2015";
  }
  return "";
}
?>