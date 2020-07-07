<?php
class Home extends Controller
{
    protected $ShopModel;
    
    function __construct() {
        $this->ShopModel = $this->model("ShopModel");
    }

    function Default()
    {
        $data = [
            "Controller" => "HomePage",
            "Action" => "Default",
            "listShop" => $this->ShopModel->GetListShop(),
            "listShopDiscount" =>  $this->ShopModel->GetListShopDiscount(),
        ];
        $this->view("masterprimary", $data);
    }

}
?>