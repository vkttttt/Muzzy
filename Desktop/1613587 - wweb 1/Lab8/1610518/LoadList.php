<?php
require_once "../DbConfig.php";
$db = new Db();
$query = "SELECT * FROM cars";
$result = $db->ExecuteQuery($query);
$count = 1;
while ($car = mysqli_fetch_array($result)) {
  ?>
  <tr class="one-car" data-id=<?php echo $car['id'] ?> data-name=<?php echo $car['name'] ?> data-year=<?php echo $car['year'] ?>>
    <th scope="row"><?php echo $count++; ?></th>
    <td><?php echo $car['id']; ?></td>
    <td><?php echo $car['name']; ?></td>
    <td><?php echo $car['year']; ?></td>
    <td>
      <button type="button" class="btn-pre-delete btn btn-danger">Delete <i class="far fa-trash-alt"></i></button>
      <button type="button" class="btn-pre-edit btn btn-outline-warning" data-toggle="modal" data-target="#editModalCenter"  >Edit <i class="far fa-edit"></i></button>
    </td>
  </tr>
<?php
}
?>