<?php
class CommentModel extends Db
{

    const TYPE_COFFEE = 1;
    const TYPE_REF = 2;

    private $table;

    public function __construct() {
        parent::__construct();
        $this->table = 'comment';
    }

    public function GetListCommentByIdInstructor($idUser) {
        $query = "SELECT " . $this->table . ".id as idcomment, user.fullname as fullname, user.phonenumber as phonenumber, comment.content as content, comment.rate as rate FROM " . $this->table . ",user WHERE   comment.iduser = user.id and comment.type =" . self::TYPE_REF . " and idowner=" . $idUser;
        
        return $this->ExecuteQuery($query);
    }
    
    public function GetListCommentByIdOwner($idUser) {
        $query = "SELECT " . $this->table . ".id as idcomment, user.fullname as fullname, user.phonenumber as phonenumber, comment.content as content, comment.rate as rate FROM " . $this->table . ",user WHERE   comment.iduser = user.id and comment.type =" . self::TYPE_COFFEE . " and idowner=" . $idUser;
        
        return $this->ExecuteQuery($query);
    }


    public function GetListCommentByIdComment($idowner, $type)
    {
        $query = "SELECT * FROM user, comment
        WHERE user.id = comment.iduser AND 	comment.idowner = '$idowner' AND comment.type = '$type'
        ORDER BY time DESC
        ";
        return $this->ExecuteQuery($query);
    }
    
    public function AddNewComment($iduser, $type, $idowner, $rate, $content)
    {
      $query = "INSERT INTO 
      comment (iduser, type, idowner, rate, content, time)
      VALUES( '$iduser', '$type', '$idowner', '$rate', '$content', now())";
      return $this->ExecuteQuery($query);
    }
    
    public function update($idcomment, $data = ['keys' => 'values']) {
        $sets = [];
        foreach ($data as $key => $value) {
            array_push($sets, $key . "=" . $value);
        }

        if (!empty($sets)) {
            $query = "UPDATE " . $this->table . " SET " . join(",", $sets) . " WHERE id = " . $idcomment;
            return $this->ExecuteQuery($query);
        }

        return 0;
    }

    public function DeleteComment($idcomment) {
        $query = "DELETE FROM " . $this->table . " WHERE id = " . $idcomment;
        return $this->ExecuteQuery($query);
    }

}
