<?php
class User extends Controller
{
    protected $UserModel;

    function __construct()
    {
        $this->UserModel = $this->model("UserModel");
    }

    function Login()
    {
        if (isset($_POST['submitLogin'])) {
            $this->UserModel->Login($_POST['userName'], $_POST['passWord']);
        }
        $data = [
            "Controller" => "User",
            "Action" => "Login"
        ];
        $this->view("login", $data);
    }

    function Logout()
    {
        $this->UserModel->Logout();
        header('Location: /muzzy/Home');
    }

    function Register()
    {
        $checkSuccessReg = true;
        $role = 4;
        if (isset($_POST['submitRegister'])) {
            if ($_POST['passWord'] === $_POST['rePassWord']) {
                $this->UserModel->Signup($_POST['userName'], $_POST['passWord'], $_POST['fullName'], $_POST['phoneNumber'], $_POST['address'], $role);
            }
            else {
                $checkSuccessReg = false;
            }
        }
        $data = [
            "Controller" => "User",
            "Action" => "Register",
            "checkSuccessReg" => $checkSuccessReg
        ];
        $this->view("register", $data);
    }

    function UpdateInfor()
    {
        $checkUpdate = true;
        if (!isset($_SESSION['idUser'])) {
            header('Location: /muzzy/User/Login');
            exit();
        }
        if (isset($_POST['submitUpdateInfor'])) {
            $checkUpdate = $this->UserModel->UpdateInfor($_SESSION['idUser'], $_POST['fullName'], $_POST['address'], $_POST['phoneNumber'], $_FILES["imageupload"]);
        }
        $data = [
            "Controller" => "User",
            "Action" => "UpdateInfor",
            "Infor" => $this->UserModel->GetUserById($_SESSION['idUser']),
            "ReserveShop" => $this->UserModel->GetReserveShopById($_SESSION['idUser']),
        ];
        $this->view("masterprimary", $data);
    }
    
    

    function ForgotPassWord()
    {
        $data = [
            "Controller" => "User",
            "Action" => "ForgotPassWord"
        ];
        $this->view("forgotpassword", $data);
    }
}
