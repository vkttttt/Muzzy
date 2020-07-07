<!doctype html>
<html lang="en">

    <head>
        <title>REF's Admin</title>
        <base href="<?php echo getBaseUrl(); ?>">
        <?php
        require_once "./public/modules/share.php";
        ?>
    </head>

    <body>

        <header class='bg-white py-2 mb-5'>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-2 col-4">
                        <a class="navbar-brand" href="/muzzy/Home">
                            <img src="/muzzy/public/image/logo.png" style="width: 48px !important; height: 48px !important;" alt="logo">
                        </a>
                    </div>
                    <div class="col-md-6 col-8">
                        <form action="/muzzy/Search/" method="POST" class="d-inline w-100 mx-2 my-auto">
                            <div class="input-group">
                                <input type="text" class="form-control border border-right-0" placeholder="Search..." name="key">
                                <span class="input-group-append">
                                    <button class="btn btn-outline-secondary border border-left-0" type="submit">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 col-8 text-right">
                        <div class="user_area">
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <?php echo "Hi, " . $_SESSION['fullName'] ?>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/muzzy/User/UpdateInfor">Thông tin cá nhân</a>
                                    <a class="dropdown-item" href="/muzzy/User/Logout">Đăng xuất</a>
                                </div>
                                <i class="fa fa-2x fa-envelope"></i>
                                <i class="fa fa-2x fa-bell"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="d-md-flex">
                    <div class="sidebar bg-light">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a href="javascript:void(0)" class="nav-link px-2 sideMenuToggler">
                                    <i class="fas fa-bars">
                                    </i>
                                    <span class="text">Danh mục</span>
                                </a>
                            </li>

                            <li class="nav-item <?php
                            if ($data['subAction'] == 'comment') {
                                echo 'bg-dark';
                            }
                            ?>">
                                <a href="Admin/ref/comment" class="nav-link px-2">
                                    <i class="far fa-comments"></i>
                                    <span class="text">Quản lý comment</span></a>
                            </li>
                        </ul>
                    </div>

                    <?php
                    $include_file = __DIR__ . "/ref/" . $data['subAction'] . ".php";
                    if (file_exists($include_file)) {
                        include_once $include_file;
                    }
                    ?>
                </div>
            </div>
        </main>
        <footer>

        </footer>
        <!-- Call JavaScripts -->
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="public/js/jquery-3.4.1.min.js"></script>
        
        <script src="public/js/bootstrap-4.3.1-dist/bootstrap.min.js"></script>
        
        <!-- Core plugin JavaScript-->
        <script src="public/admin/vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="public/admin/vendor/jquery/jquery.slimscroll.js" type="text/javascript"></script>
        <!-- Page level plugins -->
        
        <!-- My JavaScript -->
        <script src="public/js/app.js"></script>
        
        <?php
        $include_file = "public/admin/js/ref/" . $data['subAction'] . ".js";
        if (file_exists($include_file)) {
            echo "<script src='" . $include_file . "'></script>";
        }
        ?>
    </body>

</html>