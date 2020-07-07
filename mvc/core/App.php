<?php
class App
{
    protected $controller = "Home";
    protected $action = "Default";
    protected $params = [];

    function __construct()
    {
        $arr = $this->ProcessUrl();
        if (file_exists("./mvc/controllers/" . $arr[0] . ".php")) {
            $this->controller = $arr[0];
            unset($arr[0]);
        }
        else {
            header('Location: /muzzy/public/404.html');
        }
        require_once "./mvc/controllers/" . $this->controller . ".php";
        $this->controller = new $this->controller;
        if (isset($arr[1])) {
            if (method_exists($this->controller, $arr[1])) {
                $this->action = $arr[1];
            }
            else {
                header('Location: /muzzy/public/404.html');
            }
            unset($arr[1]);
        }
        if (!method_exists($this->controller, $this->action)) {
            header('Location: /muzzy/public/404.html');
        }
        $this->params = $arr ? array_values($arr) : [];
        call_user_func_array([$this->controller, $this->action], $this->params);
    }
    function ProcessUrl()
    {
        if (isset($_GET['url'])) {
            return explode("/", filter_var(trim($_GET['url'], "/")));
        }
    }
}
