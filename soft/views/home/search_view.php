<div class="breadcrumb">
    <h1><?= $this->lang->line('search_result') ?>: <?= $keyword ?></h1>
</div>
<div class="row">
    <?
    if (!empty($product)) {
        foreach ($product as $value) {
            ?>
            <div class="span3" style="margin-bottom: 10px">
                <div class="thumbnail">
                    <img src="<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&a=t&w=270&h=202'); ?>" alt="<?= $value->product_name ?>">
                    <div class="caption">
                        <h5><?= $value->product_name ?></h5>
                        <p><a class="btn" href="<?= site_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name)) ?>" target="_blank"><?= $this->lang->line('view_details') ?></a></p>
                    </div>
                </div>
            </div>
            <?
        }
    } else {
        ?>
        <div class="span12"><h1><?= $this->lang->line('search_product') ?></h1></div>
            <? } ?>
</div>
