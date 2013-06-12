<style>
    .btn-mini{
        margin: 3px 2px;
    }
</style>
<div class="sub_menu" style="width: 96,5%;text-align: center">
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'account') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/account.html') ?>"><i class="icon-user"></i> <?= $this->lang->line('account') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'change_password') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/change_password.html') ?>"><i class="icon-lock"></i> <?= $this->lang->line('change_password') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'career') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/career.html') ?>"><i class="icon-gift"></i> <?= $this->lang->line('career') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'product') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/product.html') ?>"><i class="icon-tasks"></i> <?= $this->lang->line('product') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'address') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/address.html') ?>"><i class="icon-home"></i> <?= $this->lang->line('address') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'map') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('user/map.html') ?>"><i class="icon-globe"></i> <?= $this->lang->line('map') ?></a>
</div>
<br>