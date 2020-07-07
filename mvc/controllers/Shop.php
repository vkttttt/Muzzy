<?php
class Shop extends Controller
{
    protected $ShopModel;
    protected $CommentModel;
    protected $Type = 1;
    function __construct()
    {
        $this->ShopModel = $this->model("ShopModel");
        $this->CommentModel = $this->model("CommentModel");
    }
    function
    Default()
    {
        $data = [
            "Controller" => "Shop",
            "Action" => "ListShop",
            "listShop" => $this->ShopModel->GetListShop(),
            "listShopDiscount" => $this->ShopModel->GetListShopDiscount(),
            "listShopHot" => $this->ShopModel->GetListShopDiscount(),
            "listShopNew" => $this->ShopModel->GetListShopDiscount(),
            "listShopOlder" => $this->ShopModel->GetListShopDiscount()

        ];
        $this->view("masterprimary", $data);
    }
    function ShopDetail($id)
    {

        $_SESSION['reserveSuccess'] = "";
        $_SESSION['reserveFail'] = "";


        if (isset($_POST['sendComment'])) {
            if (!isset($_SESSION['idUser'])) {
                header("Location: /muzzy/User/Login");
                return;
            }
            else {
                $iduser = $_SESSION['idUser'];
                $rate = 4;
                $content = $_POST['commentContent'];
                $this->CommentModel->AddNewComment($iduser, $this->Type, $id, $rate, $content);
                header("Location: /muzzy/Shop/ShopDetail/$id");
            }
        }

        if(isset($_POST['submitReserve'])) {
            if(!isset($_SESSION['idUser'])) {
                header("Location: /muzzy/User/Login");
                return;
            } else {
                $idUser = $_SESSION['idUser'];
                $startTime = $_POST['reserve'];
                $this->ShopModel->reserve($idUser, $id, $startTime, date( "H:i:s", strtotime("+1 hour", strtotime($startTime))));
            }
        };

        $data = [
            "Controller" => "Shop",
            "Action" => "ShopDetail",
            "subAction" => "comment",
            "detailShop" => $this->ShopModel->GetShopById($id),
            "listComment" => $this->CommentModel->GetListCommentByIdComment($id, $this->Type)
        ];
        $this->view("masterprimary", $data);
    }
    function LoadListCommentOfShop()
    {
        $id = $_POST['idShop'];
        $data = [
            "subAction" => "comment",
            "listComment" => $this->CommentModel->GetListCommentByIdComment($id, $this->Type)
        ];
        $this->view("/pages/ajax/ListComment", $data);
    }
    function AddNewCommentForShop()
    {
        $id = $_POST['idShop'];
        if (!isset($_SESSION['idUser'])) {
            $result = [
                "isLogin" => false,
                "redirect" => "/muzzy/User/Login"
            ];
            echo "notLogin";
        } else {
            $iduser = $_SESSION['idUser'];
            $rate = 4;
            $content = $_POST['commentContent'];
            $this->CommentModel->AddNewComment($iduser, $this->Type, $id, $rate, $content);
        }
    }
}
