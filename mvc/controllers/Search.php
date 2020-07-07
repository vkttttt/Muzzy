<?php 
    class Search extends Controller{
        protected $SearchModel;

        function __construct() {
            $this->SearchModel = $this->model("SearchModel");
        }
        function Default(){
            $key = $_POST['key'];
            $data = [
                "Controller" => "Search",
                "Action" => "SearchResult",
                "Key" => $key,
                "ListResult" => $this->SearchModel->GetResult($key)
            ];
            $this->view("masterprimary", $data);
        }
    }
?>