<style>
    body {
        padding-top: 60px;
        padding-bottom: 40px;
    }
</style>

<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="<?= true_url('www') ?>">DistroITdotCOM</a>
            <? if ($this->cart->contents()) { ?>
                <ul class="nav">
                    <li class="divider-vertical"></li>
                    <li><a href="<?= base_url('order/display.html') ?>"><?= $this->lang->line('bag') ?> ( <?=
                            ($this->cart->total_items() == 1) ?
                                    $this->cart->total_items() . $this->lang->line('item') : $this->cart->total_items() . $this->lang->line('items')
                            ?> ) </a></li>
                </ul>
            <? } else { ?>
                <ul class="nav">
                    <li class="divider-vertical"></li>
                    <li style="float: left;padding: 10px 15px 10px;color: #777;text-decoration: none;text-shadow: 0 1px 0 #fff;"><?= $this->lang->line('buy') ?></li>
                </ul>
            <? } ?>
            <div class="btn-group pull-right">
                <? if ($this->session->userdata('Clogin') == TRUE) { ?>
                    <a class="btn dropdown-toggle" data-toggle="modal" href="#user-menu">
                        <? if ($this->session->userdata('user_role') == 1) { ?>
                            <i class="icon-user"></i> <?= $this->lang->line('admin') ?>
                        <? } else if ($this->session->userdata('user_role') == 2) { ?>
                            <i class="icon-user"></i> <?= $this->lang->line('user') ?>
                        <? } ?>
                        <span class="caret"></span>
                    </a>
                <? } else { ?>
                    <a class="btn dropdown-toggle" data-toggle="modal" href="#user-login">
                        <i class="icon-user"></i> <?= $this->lang->line('guest') ?>
                        <span class="caret"></span>
                    </a>
                <? } ?>
            </div>
            <script>
                $(function() {
                    $("#searching").focus(function() {
                        $(this).css('backgroundColor', '#FFFFFF');
                    });
                    $("#searching").blur(function() {
                        $(this).css('backgroundColor', '#F5F6F7');
                    });
                });
            </script>
            <form class="navbar-search pull-right" action="<?= base_url('home/search.html') ?>" method="post">
                <input type="text" id="searching" style="width: 180px;border-radius: 4px;margin-right: 5px;background-color: #F5F6F7;" class="search-query" name="keyword" placeholder="<?= $this->lang->line('search') ?>">
            </form>
        </div>
    </div>
</div>
<? if ($this->session->userdata('Clogin') == TRUE) { ?>
    <div id="user-menu" class="modal hide fade" style="display: none; ">
        <div class="modal-header">
            <a href="#" class="close" data-dismiss="modal">&times;</a>
            <h3><?= $this->lang->line('member') ?></h3>
        </div>
        <div class="modal-body">
            <ul class="nav nav-pills nav-stacked" style="text-align: center">
                <? if ($this->session->userdata('user_role') == 1) { ?>
                    <li><a class="btn btn-mini" href="<?= base_url('admin/account.html') ?>"><b><?= $this->lang->line('admin_menu') ?></b></a></li>
                <? } ?>
                <li><a class="btn btn-mini" href="<?= base_url('user/account.html') ?>"><b><?= $this->lang->line('main_menu') ?></b></a></li>
                <li><a class="btn btn-mini" href="<?= base_url('auth/logout.html') ?>"><b><?= $this->lang->line('logout') ?></b></a></li>
            </ul>
        </div>
        <div class="modal-footer"></div>
    </div>
    <?
}?>