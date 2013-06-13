<? $this->load->view('user/main-menu_view') ?>
<a class="btn" href="<?= site_url('user/product_insert') ?>"><?= $this->lang->line('product_post') ?></a>
<? if (!empty($product)) { ?>
    <hr>
    <div class="row">
        <? foreach ($product as $value) { ?>
            <div class="span3" style="margin-bottom: 10px">
                <div class="thumbnail">
                    <div class="caption">
                        <p><b><?= $this->lang->line('product_id') ?> : </b><?= $value->product_id ?></p>
                        <p><b><?= $this->lang->line('product_name') ?> : </b><br>
                            <a href="<?= site_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name)) ?>" target="_blank">
                                <?= $value->product_name ?>                                    
                            </a>
                        </p>
                        <p><b><?= $this->lang->line('product_commission') ?> : </b>Rp <?= number_format($value->product_commission, 0, ',', '.') ?></p>
                        <p><b><?= $this->lang->line('product_price') ?> : </b>Rp <?= number_format($value->product_price, 0, ',', '.') ?></p>
                        <p><b><?= $this->lang->line('action') ?> : </b>
                            <a class="btn btn-mini" href="<?= site_url('user/product_update/' . $value->product_id . '/' . url_title($value->product_name)) ?>">
                                <?= $this->lang->line('edit') ?>
                            </a>
                            <a class="btn btn-mini" href="<?= site_url('user/product_delete/' . $value->product_id . '/' . url_title($value->product_name)) ?>" 
                               onclick="return confirm('<?= $this->lang->line('product_delete') ?>')">
                                   <?= $this->lang->line('delete') ?>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        <? } ?>
    </div>
    <?= $this->pagination->create_links() ?>    
<? } ?>