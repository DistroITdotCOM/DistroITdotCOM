<?= $header ?>
<body>
    <style>
        body {
            padding-top: 60px;
            padding-bottom: 40px;
        }
    </style>

    <header>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <ul class="nav">
                        <li class="active"><a href="">Beranda</a></li>                        
                        <li><a href="">Profil</a></li>
                        <li><a href="">Proyek</a></li>
                        <li><a href="">Produk</a></li>
                        <li><a href="">WebLOG</a></li>
                    </ul>
                    <ul class="nav pull-right">
                        <li class="dropdown">
                            <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                                <i class="icon-wrench"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href=""><i class="icon-user"></i> Akun</a></li>
                                <li class="divider"></li>
                                <li><a href=""><i class="icon-question-sign"></i> Bantuan</a></li>
                                <li><a href=""><i class="icon-off"></i> Keluar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

    <div class="sub_menu">
        <div class="container">
            <a class="btn btn-mini disabled"><i class="icon-book"></i> Data Produk</a>
            <a class="btn btn-mini" href=""><i class="icon-briefcase"></i> Tipe Produk</a>
            <a class="btn btn-mini" href=""><i class="icon-tags"></i> Tag Produk</a>
            <a class="btn btn-mini" href=""><i class="icon-leaf"></i> Merek Produk</a>
            <a class="btn btn-mini" href=""><i class="icon-tint"></i> Pajak Produk</a>
        </div>
    </div>
    <div class="container">
        <div id="content"></div>
    </div>
    <footer>
        <div class="container">
            <small>DistroITdotCOM © 2012</small>
        </div>
    </footer>
</body>
</html>