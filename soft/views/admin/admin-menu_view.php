<? $this->lang->load('admin/admin-menu', $this->session->userdata('lang')) ?>
<style>
    .btn-mini{
        margin: 3px 2px;
    }
</style>
<div class="sub_menu" style="width: 96,5%;text-align: center">
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'account') ? 'disabled' : '' ?>" style="width: 15%" href="<?= site_url('admin/account') ?>"><i class="icon-user"></i> <?= $this->lang->line('account') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'order') ? 'disabled' : '' ?>" style="width: 15%" href="<?= site_url('admin/order') ?>"><i class="icon-shopping-cart"></i> <?= $this->lang->line('order') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'product') ? 'disabled' : '' ?>" style="width: 15%" href="<?= site_url('admin/product') ?>"><i class="icon-tasks"></i> <?= $this->lang->line('product') ?></a>
</div>
<br>