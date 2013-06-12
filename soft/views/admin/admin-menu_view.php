<style>
    .btn-mini{
        margin: 3px 2px;
    }
</style>
<div class="sub_menu" style="width: 96,5%;text-align: center">
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'account') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('admin/account.html') ?>"><i class="icon-user"></i> <?= $this->lang->line('account') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'order') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('admin/order.html') ?>"><i class="icon-shopping-cart"></i> <?= $this->lang->line('order') ?></a>
    <a class="btn btn-mini <?= ($this->uri->segment(2) == 'product') ? 'disabled' : '' ?>" style="width: 15%" href="<?= base_url('admin/product.html') ?>"><i class="icon-tasks"></i> <?= $this->lang->line('product') ?></a>
</div>
<br>