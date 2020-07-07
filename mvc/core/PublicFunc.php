<?php
function ProcessUrlInamge($url)
{
  return explode(";", filter_var(trim($url, ";")));
}

function ProcessUrlMap($url)
{
  return str_replace(" ", "+", $url);
}

function getBaseUrl() {
    $port = ":" . $_SERVER['SERVER_PORT'];
    if ($port == ":8080" || $port == ':4433') {
        $port = "";
    }
    return "http"
            . "://"
            . $_SERVER["SERVER_NAME"]
            . $port
            . "/"
            . 'muzzy/';
}

?>