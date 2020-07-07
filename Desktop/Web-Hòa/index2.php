<!doctype html>
<html lang="en">

<head>
    <title>Lab 05 - Bai 2</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <?php
    function Notification($input)
    {
        if ($input < 0 || !is_numeric($input)) {
            echo "Input invalid";
            return;
        }
        $result = $input % 5;
        switch ($result) {
            case 0:
                echo "Hello<br>";
                break;

            case 1:
                echo "How are you?<br>";
                break;

            case 2:
                echo "I’m doing well, thank you<br>";
                break;

            case 3:
                echo "See you later<br>";
                break;
            default:
                echo "Good-bye<br>";
                break;
        }
    }
    ?>
        <div class="container">
            <form action="index2.php" method="post">
                <div class="form-group">
                    <label for="input">Nhập vào một số:</label>
                    <input type="text" class="form-control" name="input" id="input" aria-describedby="helpId" value="<?php if (isset($_POST["input"])) {
                                                                                                                            echo $_POST["input"];
                                                                                                                        } else {
                                                                                                                            echo "0";
                                                                                                                        } ?>" </div> <div class="form-group">
                    <button type="submit" class="btn btn-primary mt-3" name="submit" id="submit">Submit</button>
                </div>
                <p class="output">
                    <?php
                    if (isset($_POST["submit"])) {
                        $input = $_POST["input"];
                        Notification($input);
                    }
                    ?>
                </p>
            </form>
        </div>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>