<?php
class Contact extends Controller
{
  protected $FeedBackModel;


  function __construct() {
    $this->FeedBackModel = $this->model("FeedBackModel");
  }

  function Default()
  {
    if (isset($_POST['submit-feedback'])) {
      $fullname = $_POST['fullName'];
      $email = $_POST['email'];
      $subject = $_POST['subject'];
      $content = $_POST['content'];
      // chua check input
      $this->FeedBackModel->InsertFeedBack($fullname, $email, $subject, $content);
    }
    $data = [
        "Controller" => "Contact",
        "Action" => "Default"
    ];
    $this->view("contact", $data);
}
  
}
?>