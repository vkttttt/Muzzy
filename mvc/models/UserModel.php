<?php

class UserModel extends Db
{

    const USER_ROLE_ADMIN = 1;
    const USER_ROLE_REF = 2;
    const USER_ROLE_COFFEE = 3;
    const USER_ROLE_USER = 4;

    private $table;

    public function __construct()
    {
        parent::__construct();
        $this->table = 'user';
    }

    function Login($userName, $passWord)
    {
        $query = "SELECT * FROM user
      WHERE username = '$userName' AND 
      password = '$passWord'
      ";
        $result = $this->ExecuteQuery($query);
        if (mysqli_num_rows($result) == 1) {
            $userCur = mysqli_fetch_array($result);
            $_SESSION['idUser'] = $userCur['id'];
            $_SESSION['userName'] = $userCur['username'];
            $_SESSION['fullName'] = $userCur['fullname'];
            $_SESSION['role'] = $userCur['role'];
            $_SESSION['msgLogin'] = "";
            header('Location: /muzzy/Home');
            exit();
        } else {
            $_SESSION['msgLogin'] = "Sai tên tài khoản hoặc mật khẩu";
        }
    }

    function Signup($userName, $passWord, $fullName, $phoneNumber, $address, $role)
    {
        $query = "INSERT INTO 
      user (username, password, fullname, phonenumber, address, role) 
      VALUES('$userName', '$passWord', '$fullName', $phoneNumber, '$address', '$role')";
        $result = $this->ExecuteQuery($query);
        if ($result) {
            header("Location: /muzzy/User/Login");
        } else {
            echo mysqli_error($this->conn);
        }
    }

    function GetUserById($id)
    {
        $query = "SELECT * FROM user WHERE id = '$id'";
        $result = $this->ExecuteQuery($query);
        while ($row = mysqli_fetch_array($result)) {
            return $row;
        }
    }

    function GetReserveShopById($id)
    {

        $query = "SELECT * FROM reserve WHERE userID = '$id' AND type='shop'";

        $result = $this->ExecuteQuery($query);

        $listShop = [];

        while ($row = mysqli_fetch_array($result)) {

            $queryName = "SELECT name , address FROM shop WHERE id = $row[roomID]";

            $NameResulte = mysqli_fetch_array($this->ExecuteQuery($queryName));

            $merge = array_merge($row, $NameResulte);

            array_push($listShop, $merge);
        }

        return $listShop;
    }



    function UpdateInfor($id, $fullName, $address, $phoneNumber, $imgurl)
    {
        $target_dir = "./public/image/";
        $target_file = $target_dir . basename($imgurl["name"]);
        $allowUpload = true;
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $maxfilesize = 800000; //(bytes)
        $allowtypes = array('jpg', 'png', 'jpeg', 'gif');
        if (isset($_POST["submit"])) {
            $check = getimagesize($imgurl["tmp_name"]);
            if ($check !== false) {
                $allowUpload = true;
            } else {
                $allowUpload = false;
            }
        }
        if (file_exists($target_file)) {
            $allowUpload = false;
        }
        if (!in_array($imageFileType, $allowtypes)) {
            $allowUpload = false;
        }
        if ($allowUpload) {
            move_uploaded_file($imgurl["tmp_name"], $target_file);
        }
        $url = "/muzzy/public/image/" . basename($imgurl["name"]);

        $query = "UPDATE user SET 
      fullname ='$fullName',
      phonenumber = $phoneNumber,
      address = '$address',
      imageurl = '$url'
      WHERE id = '$id'";
        $result = $this->ExecuteQuery($query);
        if ($result) {
            $_SESSION['fullName'] = $fullName;
            return true;
        } else {
            return false;
        }
    }

    public function insert($data = ['keys' => 'values'])
    {
        $query = "INSERT INTO user(" . join(",", array_keys($data)) . ") VALUES(" . join(",", array_values($data)) . ")";

        return $this->ExecuteQuery($query);
    }

    public function GetDetailUser($id)
    {
        $query = "SELECT *
        FROM user 
        WHERE user.id = '$id'";
        return $this->ExecuteQuery($query);
    }

    public function update($idUserEdit, $data = ['keys' => 'values'])
    {
        $sets = [];
        foreach ($data as $key => $value) {
            array_push($sets, $key . "=" . $value);
        }

        if (!empty($sets)) {
            $query = "UPDATE user SET " . join(",", $sets) . " WHERE id = " . $idUserEdit;

            return $this->ExecuteQuery($query);
        }

        return 0;
    }

    function Logout()
    {
        unset($_SESSION['idUser']);
        unset($_SESSION['userName']);
        unset($_SESSION['fullName']);
        unset($_SESSION['role']);
        unset($_SESSION['msgLogin']);
    }

    public function isLogged()
    {
        /*
         * Return id of current user if logged, or false if didn't login
         * Depend on loggin module, must change below code 
         */
        if (isset($_SESSION['idUser'])) {
            return $_SESSION['idUser'];
        }
        return false;
    }

    public function getRoleLable()
    {
        return [
            self::USER_ROLE_ADMIN => 'Admin',
            self::USER_ROLE_COFFEE => 'Chủ quán coffee',
            self::USER_ROLE_USER => 'Người dùng',
        ];
    }

    public function getRolebyIdUser($idUser)
    {
        $query = "SELECT user.role as role FROM user where id = " . $idUser;
        //var_dump($idUser);die();
        $u = $this->ExecuteQuery($query);
        $u = mysqli_fetch_array($u);
        if (empty($u)) {
            return false;
        }
        return $u['role'];
    }

    function GetListUser()
    {
        $query = "SELECT * FROM user where status = 1";
        return $this->ExecuteQuery($query);
    }
}
