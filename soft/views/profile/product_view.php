<script>
    $(function() {
        $(".pagination a").click(function() {
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $("#order-product").html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    $("#order-product").html(msg);
                }
            });
            return false;
        });
    });
</script>
<? if (!empty($product)) { ?>
    <div id="order-product">
        <div class="well">
            <h1><?= ($info['user']->user_verified == '1') ? $this->lang->line('verified_profile') : $this->lang->line('unverified_profile') ?></h1>
        </div>
        <? foreach ($product as $key => $value) { ?>
            <div class="span3" <?= ($key == 0) ? 'style="margin-left: 0px;"' : '' ?>>
                <div class="thumbnail">
                    <img src="<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&a=t&w=270&h=202') ?>" alt="<?= $value->product_name ?>">
                    <div class="caption">
                        <h5><?= $value->product_name ?></h5>
                        <p><a class="btn" href="<?= site_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name)) ?>"><?= $this->lang->line('view_details') ?></a></p>
                    </div>
                </div>
            </div>
        <? } ?>
        <div style="clear: both"></div>
        <?= $this->pagination->create_links() ?>
    </div>
<? } else { ?>
    <h1><?= $this->lang->line('product_profile') ?></h1>
    <?
}?>