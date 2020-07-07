<?php

class Admin extends Controller {

    private $base_url;
    private $CommentModel;
    private $ShopModel;
    private $currentIdUser;

    function __construct() {
        $this->action = "Default";
        $this->userModel = $this->model('UserModel');
        $this->CommentModel = $this->model('CommentModel');
        $this->ShopModel = $this->model('ShopModel');
        $this->FeedBackModel = $this->model('FeedBackModel');

        //$_SESSION['idUser'] = 9;
        $this->currentIdUser = $this->userModel->isLogged();

        if ($this->currentIdUser == false) {
            header("Location: " . getBaseUrl() . "User/login");
        }
        }

        function Default() {
        $data = [
            'subAction' => 'feedback'
        ];
        $this->view("admin/administrator", $data);
    }

    function administrator($s1 = 'feedback') {
        $role = $this->userModel->getRolebyIdUser($this->currentIdUser);
        if (empty($role)) {
            header("Location: " . getBaseUrl() . "Home");
        }
        if ($role != $this->userModel::USER_ROLE_ADMIN) {
            header("Location: " . getBaseUrl() . "Home");
        }
        $data = [
            'subAction' => $s1
        ];

        $this->view("admin/administrator", $data);
    }

    function coffee($s1 = 'table') {
        $role = $this->userModel->getRolebyIdUser($this->currentIdUser);
        if (empty($role)) {
            header("Location: " . getBaseUrl() . "Home");
        }
        if ($role != $this->userModel::USER_ROLE_COFFEE) {
            header("Location: " . getBaseUrl() . "Home");
        }
        $data = [
            'subAction' => $s1
        ];

        $this->view("admin/coffee", $data);
    }


    function adFeedbackLoadlist() {
        $data = [
            'listFeedback' => $this->FeedBackModel->GetListFeedBack()
        ];
        $this->view("admin/administrator/ajax/feedback_loadlist", $data);
    }

    function adUserLoadlist() {
        $data = [
            'listUser' => $this->userModel->GetListUser(),
            'listUserRole' => $this->userModel->getRoleLable(),
        ];
        $this->view("admin/administrator/ajax/user_loadlist", $data);
    }

    function adUserAdd() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data_add = [
                'fullname' => "'" . $_POST['fullname'] . "'",
                'username' => "'" . $_POST['username'] . "'",
                'password' => "'" . $_POST['password'] . "'",
                'phonenumber' => "'" . $_POST['phonenumber'] . "'",
                'address' => "'" . $_POST['address'] . "'",
                'role' => "'" . $_POST['role'] . "'",
                'status' => 1
            ];
            $addStatus = $this->userModel->insert($data_add);
            $data = [
                'added' => $_POST['fullname']
            ];
            $this->view("admin/administrator/ajax/user_add", $data);
        }
    }

    function adUserUpdate() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id']) && $idUser !== false) {
            $idUserEdit = $_POST['id'];
            $detailUser = $this->userModel->GetDetailUser($idUserEdit);
            if (!empty($detailUser)) {
                $detailUser = mysqli_fetch_array($detailUser);

                $data_update = [
                    'phonenumber' => "'" . $_POST['phonenumber'] . "'",
                    'address' => "'" . $_POST['address'] . "'",
                ];
                $updateStatus = $this->userModel->update($idUserEdit, $data_update);
                $data = [
                ];
                $this->view("admin/administrator/ajax/user_update", $data);
            }
        }
    }

    function adUserEditForm() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id']) && $idUser !== false) {
            $idUserEdit = $_POST['id'];
            $detailUser = $this->userModel->GetDetailUser($idUserEdit);
            if (!empty($detailUser)) {
                $detailUser = mysqli_fetch_array($detailUser);
                $data = [
                    'deleteUser' => $detailUser,
                ];
                $this->view("admin/administrator/ajax/user_editForm", $data);
            }
        }
    }

    function adUserDelete() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $data = [
                'deleteUser' => $this->userModel->Update($id, [
                    'status' => 0
                ])
            ];
            $this->view("admin/administrator/ajax/user_delete", $data);
        }
    }

    function adCoffeeLoadlist() {

        $data = [
            'listCoffee' => $this->ShopModel->GetListShopById()
        ];
        $this->view("admin/administrator/ajax/coffee_loadlist", $data);
    }

    function adCoffeeAdd() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data_add = [
                'name' => "'" . $_POST['shopname'] . "'",
                'idowner' => "'" . $_POST['idowner'] . "'",
                'dateopening' => "'" . $_POST['dateopening'] . "'",
                'timeopen' => "'" . $_POST['timeopen'] . "'",
                'timeclose' => "'" . $_POST['timeclose'] . "'",
                'address' => "'" . $_POST['address'] . "'",
                'description' => "'" . $_POST['description'] . "'",
                'discount' => "'" . $_POST['discount'] . "'",
                'rate' => 0,
                'status' => 1
            ];
            $addStatus = $this->ShopModel->insert($data_add);
            $data = [
                'added' => $_POST['shopname']
            ];
            $this->view("admin/administrator/ajax/coffee_add", $data);
        }
    }

    function adCoffeeUpdate() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id']) && $idUser !== false) {
            $idCoffee = $_POST['id'];
            $detailCoffee = $this->ShopModel->GetDetailCoffee($idCoffee);
            if (!empty($detailCoffee)) {
                $detailCoffee = mysqli_fetch_array($detailCoffee);

                $data_update = [
                    'name' => "'" . $_POST['shopname'] . "'",
                    'timeopen' => "'" . $_POST['timeopen'] . "'",
                    'timeclose' => "'" . $_POST['timeclose'] . "'",
                    'address' => "'" . $_POST['address'] . "'",
                    'description' => "'" . $_POST['description'] . "'",
                    'discount' => "'" . $_POST['discount'] . "'"
                ];
                $updateStatus = $this->ShopModel->update($idCoffee, $data_update);
                $data = [
                ];
                $this->view("admin/administrator/ajax/coffee_update", $data);
            }
        }
    }

    function adCoffeeEditForm() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id']) && $idUser !== false) {
            $idCoffee = $_POST['id'];
            $detailCoffee = $this->ShopModel->GetDetailCoffee($idCoffee);
            if (!empty($detailCoffee)) {
                $detailCoffee = mysqli_fetch_array($detailCoffee);
                $data = [
                    'deleteCoffee' => $detailCoffee
                ];
                $this->view("admin/administrator/ajax/coffee_editForm", $data);
            }
        }
    }

    function adCoffeeDelete() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id']) && $idUser !== false) {
            $idCoffee = $_POST['id'];
            $data = [
                'deleteCourse' => $this->ShopModel->Update($idCoffee, [
                    'status' => 0
                ])
            ];
            $this->view("admin/administrator/ajax/coffee_delete", $data);
        }
    }

    function refCourseLoadlist() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data = [
                'listCourse' => $this->courseModel->GetListCourseByInstructor($idUser)
            ];
            $this->view("admin/ref/ajax/course_loadlist", $data);
        }
    }



    
    function refCommentLoadlist() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data = [
                'listComment' => $this->CommentModel->GetListCommentByIdInstructor($idUser)
            ];
            $this->view("admin/ref/ajax/comment_loadlist", $data);
        }
    }

    function refCommentDelete() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id'])) {
            $idComment = $_POST['id'];
            $data = [
                'deleteComment' => $this->CommentModel->DeleteComment($idComment)
            ];
            $this->view("admin/ref/ajax/comment_delete", $data);
        }
    }

    function coffeeTableLoadlist() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data = [
                'listTable' => $this->bookShopModel->GetListTable($idUser),
                'listStatusOfTable' => $this->bookShopModel->getStatus(),
            ];
            $this->view("admin/coffee/ajax/table_loadlist", $data);
        }
    }
    
    function coffeeCommentLoadlist() {
        $idUser = $this->userModel->isLogged();
        if ($idUser !== false) {
            $data = [
                'listComment' => $this->CommentModel->GetListCommentByIdOwner($idUser)
            ];
            $this->view("admin/coffee/ajax/comment_loadlist", $data);
        }
    }

    function coffeeCommentDelete() {
        $idUser = $this->userModel->isLogged();
        if (isset($_POST['id'])) {
            $idComment = $_POST['id'];
            $data = [
                'deleteComment' => $this->CommentModel->DeleteComment($idComment)
            ];
            $this->view("admin/ref/ajax/comment_delete", $data);
        }
    }

}

?>