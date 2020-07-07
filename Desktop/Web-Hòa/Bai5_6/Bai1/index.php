<!doctype html>
<html lang="en">

<head>
  <title>1611125 - Vũ Kiều Hải Hoà</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <!-- font Releway -->
  <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
  <!-- My CSS -->
  <link rel="stylesheet" href="./css/style.css">


</head>

<body>
  <?php
  $result;
  $firstNum = 0;
  $secondNum = 0;
  $operator = '+';
  if (isset($_POST['submit'])) {
    $firstNum = $_POST['firstNum'];
    $secondNum = $_POST['secondNum'];
    $operator = $_POST['operator'];
    if (!is_numeric($firstNum) || !is_numeric($secondNum)) {
      $result = 'Đầu vào không phải là số!';
    } else {
      switch ($operator) {
        case '+':
          $result = $firstNum + $secondNum;
          break;
        case '-':
          $result = $firstNum - $secondNum;
          break;
        case '*':
          $result = $firstNum * $secondNum;
          break;
        case '/':
          $result = $firstNum / $secondNum;
          break;
        case '^':
          $result = pow($firstNum, $secondNum);
          break;

        default:
          $result = 6996;
          break;
      }
    }
  } else {
    $result = 'Bấm xử lý để có kết quả';
  }
  ?>
    <div class="container">
      <h1 class="text-center title-main">Simple Calculator</h1>
      <form action="index.php" method="post">
        <div class="row">
          <div class="col text-right">
            <label class="label-left" for="firstNum">Nhập số thứ 1:</label>

          </div>
          <div class="col">
            <input class="input-right" type="text" name="firstNum" id="firstNum" value="<?php echo $firstNum ?>">
            <p class="error" id="error-num1"></p>
          </div>
        </div>
        <div class="row">
          <div class="col text-right">
            <label class="label-left" for="operator">Chọn phép tính:</label>
          </div>
          <div class="form-group col">
            <select class="select-right" name="operator" id="operator">
              <?php
              $arrOp = ['+', '-', '*', '/', '^'];
              for ($i=0; $i < 5; $i++) { 
              ?>
              <option value="<?php echo $arrOp[$i] ?>" <?php if($arrOp[$i] === $operator) echo "selected"?> > <?php echo $arrOp[$i] ?> </option>
              <?php
              }
              ?>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col text-right">
            <label class="label-left" for="secondNum">Nhập số thứ 2:</label>
          </div>
          <div class="col">
            <input class="input-right" type="text" name="secondNum" id="secondNum" value="<?php echo $secondNum ?>">
            <p class="error" id="error-num2"></p>
          </div>
        </div>
        <div class="row">
          <div class="col text-right">
            <label class="label-left" for="result">Kết quả:</label>
          </div>
          <div class="col">
            <input class="input-right" type="text" name="result" id="result" value="<?php echo $result ?>" readonly>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <button class="btn-cus" id="btn-submit" type="submit" name="submit">Xử lý</button>
          </div>
        </div>
      </form>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <!-- My JavaScript -->
    <!-- <script src="./js/cal.js"></script> -->
</body>

</html>