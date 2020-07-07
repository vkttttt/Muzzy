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
  <div class="wrapper">
    <h1 class="main-title text-center">Sign up From</h1>
    <div class="container">
      <form action="index.php" method="post" class="form-main">
        <h3 class="form-title">Complete form to sign up account!</h3>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="firstName">* First name:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <input class="input-text form-control" type="text" name="firstName" id="firstName" placeholder="Enter your first name">
            <div id="invalid-firstname" class="invalid">
            </div>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="lastName">* Last name:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <input class="input-text form-control" type="text" name="lastName" id="lastName" placeholder="Enter your last name">
            <div id="invalid-lastname" class="invalid">
            </div>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="email">* Email:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <input class="input-text form-control" type="text" name="email" id="email" placeholder="Enter your email">
            <div id="invalid-email" class="invalid">
            </div>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="password">* Password:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <input class="input-text form-control" type="password" name="password" id="password" placeholder="Enter your password">
            <div id="invalid-password" class="invalid">
            </div>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="password">* Birthday:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="form-group row">
              <div class="left-small-col col-sm-12 col-md-3 col-lg-3">
                <label class="" for="year">Year:</label>
              </div>
              <div class="right-small-col col-sm-12 col-md-9 col-lg-9">
                <select class="form-control" id="year" name="yyyy" onchange="change_year(this)">
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="left-small-col col-sm-12 col-md-3 col-lg-3">
                <label class="" for="month">Month:</label>
              </div>
              <div class="right-small-col col-sm-12 col-md-9 col-lg-9">
                <select class="form-control" id="month" name="mm" onchange="change_month(this)">
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="left-small-col col-sm-12 col-md-3 col-lg-3">
                <label class="" for="day">Day:</label>
              </div>
              <div class="right-small-col col-sm-12 col-md-9 col-lg-9">
                <select class="form-control" id="day" name="dd">
                </select>
              </div>
            </div>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="male">* Sex:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="sex" id="male" value="1" checked>
                Male
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="sex" id="female" value="0">
                Female
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="sex" id="non-def" value="-1">
                Non-Defination
              </label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="country">* Country:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <select class="form-control" name="country" id="country">
              <option value="Vietnam" selected>Vietnam</option>
              <option value="Australia">Australia</option>
              <option value="United States">United States</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>
        <div class="form-group row">
          <div class="left-col col-12 col-sm-12 col-md-6 col-lg-6">
            <label class="" for="about">* About:</label>
          </div>
          <div class="right-col col-12 col-sm-12 col-md-6 col-lg-6">
            <textarea class="form-control" name="about" id="about" rows="6" placeholder="Write something about you :)"></textarea>
            <div id="invalid-about" class="invalid">
            </div>
          </div>

        </div>
        <div class="text-center group-btn">
          <button type="submit" class="btn btn-primary" name="submit">Submit</button>
          <button type="reset" class="btn btn-danger">Reset</button>
        </div>
        <div class="text-center">
          <?php
          function ContainsNumbers($String)
          {
            return preg_match('/\\d/', $String) > 0;
          }
          if (isset($_POST['submit'])) {
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $about = $_POST['about'];
            $error = '';
            if (ContainsNumbers($firstName) || strlen($firstName) < 2 || strlen($firstName) > 30) {
              $error .= 'Invalid first Name format<br>';
            }
            if (ContainsNumbers($lastName) || strlen($lastName) < 2 || strlen($lastName) > 30) {
              $error .= 'Invalid last Name format<br>';
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
              $error .= "Invalid email format<br>";
            }
            if (strlen($lastName) < 2 || strlen($lastName) > 30) {
              $error .= 'Lenght of password must from 2 to 30 characters<br>';
            }
            if (strlen($lastName) > 10000) {
              $error .= 'Lenght of about must less than 1000 characters<br>';
            }
            if ($error != '') {
              echo '<p style="color: #dc3545;" class="py-2">'.$error.'</p>';
            }
            else {
              echo '<p style="color: #28a745;" class="py-2">'.'Complete!'.'</p>';
            }
          }
          ?>
        </div>
      </form>
    </div>
  </div>

  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <!-- My JavaScript -->
  <script src="./js/valid.js"></script>
</body>

</html>