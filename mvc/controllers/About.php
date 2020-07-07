<?php
class About extends Controller
{
    
    function Default()
    {
        $data = [
            "Controller" => "About",
            "Action" => "Default"
        ];
        $this->view("aboutus", $data);
    }
    
}
?>