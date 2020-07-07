<?php
class ShopModel extends Db
{
    private $table;

    public function __construct() {
        parent::__construct();
        $this->table = 'shop';
    }
        
    public function GetListShop() //chưa có status
    {
        $query = "SELECT * FROM shop";
        return $this->ExecuteQuery($query);

    }
    public function GetListShopDiscount() // dư
    {
        $query = "SELECT * FROM shop, discount WHERE shop.id = discount.idshop";
        return $this->ExecuteQuery($query);

    }
    public function GetShopById($id)
    {
        $query = "SELECT * FROM shop WHERE id = '$id'";
        return $this->ExecuteQuery($query);
    }
    
    public function GetListShopById()
    {
        $query = "SELECT shop.id as idshop, shop.name as shopname, shop.address as shopaddress, shop.description as description, user.fullname as ownername, shop.dateopening as dateopening, shop.timeopen as timeopen, shop.timeclose as timeclose, shop.rate as rate, shop.discount as discount, shop.status as status FROM shop, user WHERE user.id = shop.idowner AND shop.status = 1";
        return $this->ExecuteQuery($query);
    }

    
    public function reserve($userID, $courseID, $startTime, $endTime) {
        
        $query = "INSERT INTO reserve(type, roomID, userID, startTime, endTime) VALUES('shop' ,$courseID, $userID, '$startTime', '$endTime')";

        $result = $this->ExecuteQuery($query);

        if($result){
            $_SESSION['reserveSuccess'] = "Thành công";
        }else{
            $_SESSION['reserveFail'] = "Số lượng đạt tối da";
        }
    }
    
    public function insert($data = ['keys' => 'values']) {
        $query = "INSERT INTO shop(" . join(",", array_keys($data)) . ") VALUES(" . join(",", array_values($data)) . ")";
        return $this->ExecuteQuery($query);
    }
    
    public function GetDetailCoffee($id)
    {
        $query = "SELECT shop.id as idshop, shop.name as shopname, shop.address as shopaddress, shop.description as description, user.fullname as ownername, shop.dateopening as dateopening, shop.timeopen as timeopen, shop.timeclose as timeclose, shop.rate as rate, shop.discount as discount, shop.status as status FROM shop, user WHERE user.id = shop.idowner AND shop.id = " . $id;
        return $this->ExecuteQuery($query);
    }
    
    public function update($idCoffee, $data = ['keys' => 'values']) {
        $sets = [];
        foreach ($data as $key => $value) {
            array_push($sets, $key . "=" . $value);
        }

        if (!empty($sets)) {
            $query = "UPDATE shop SET " . join(",", $sets) . " WHERE id = " . $idCoffee;

            return $this->ExecuteQuery($query);
        }

        return 0;
    }
}


?>