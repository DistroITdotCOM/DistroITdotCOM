<div class="row">
    <? foreach ($product as $value) { ?>
        <div class="span3" style="margin-bottom: 10px">
            <div class="thumbnail">
                <img src="<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&a=t&w=270&h=202') ?>" alt="<?= $value->product_name ?>">
                <div class="caption">
                    <h5><?= $value->product_name ?></h5>
                    <p><a class="btn" href="<?= base_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name) . '.html') ?>"><?= $this->lang->line('view_details') ?></a></p>
                </div>
            </div>
        </div>
    <? } ?>
</div>