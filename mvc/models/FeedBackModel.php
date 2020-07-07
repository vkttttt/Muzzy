<?php
class FeedBackModel extends Db
{
    public function GetListFeedBack()
    {
        $query = "SELECT * FROM feedback";
        return $this->ExecuteQuery($query);

    }
    public function InsertFeedBack($fullname, $email, $subject, $content)
    {
      $query = "INSERT INTO feedback (fullname, email, subject, content)
      VALUES ('$fullname', '$email','$subject','$content')";
      return $this->ExecuteQuery($query);
    }
}


?>