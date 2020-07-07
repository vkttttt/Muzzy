<?php
class SearchModel extends Db
{
    public function GetResult($key)
    {
        $queryShop = "SELECT * FROM shop
        WHERE
        shop.name LIKE '%$key%' OR
        shop.address LIKE '%$key%'";
        

        $result = [
            "listShop" => $this->ExecuteQuery($queryShop),
        ];
        return $result;
        
    }    
}
?>