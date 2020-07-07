<?php
class Comment extends Controller
{

    protected $CommentModel;

    function __construct() {
        $this->CommentModel = $this->model("CommentModel");
    }
    
    function Default()
    {
        $data = [
            "Controller" => "Shop",
            "Action" => "ListShop"
        ];
        $this->view("masterprimary", $data);
    }

}
?>