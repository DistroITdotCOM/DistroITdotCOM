<?
$product_id = $product->product_id;
$user_name = $product->user_name;
$product_name = $product->product_name;
$product_desc = $product->product_desc;
$product_price = $product->product_price;
$product_commission = $product->product_commission;
?>
<script>
    $(function() {
        $("#order-add").submit(function() {
            var id = $(this).find('input[name=product_id]').val();
            var qty = $(this).find('input[name=quantity]').val();

            $.post(site + "order/add", {
                product_id: id,
                quantity: qty,
                ajax: '1'
            },
            function(data) {
                if (data === 'true') {
                    window.location = site + "order/display";
                }
            });
            return false;
        });
        $('.jqzoom').jqzoom({
            zoomType: 'standard',
            lens: true,
            preloadImages: false,
            alwaysOn: false
        });
    });
</script>
<style>
    img{
        max-width: none;
    }

    #thumblist{
        text-align: center;
    }

    #thumblist ul{
        margin: 0;
        display: inline-block;
    }

    #thumblist ul li{
        float:left;
        margin-right:2px;
        list-style:none;
    }

    #thumblist ul li a{
        display:block;
        border:1px solid #CCC;
    }

    #thumblist ul li a.zoomThumbActive{
        border:1px solid red;
    }
</style>
<div class="row">
    <div class="span3">
        <div id="thumblist" class="thumbnail">
            <?
            foreach ($pict as $key => $value) {
                if ($key == 0) {
                    ?>
                    <a href="<?= base_url('upload/img/product/' . $value->pict_name) ?>" class="jqzoom" rel='gal1' title="Detail Picture">
                        <img style="max-width: 100%" src="<?= base_url('upload/img/product/' . $value->pict_name) ?>" title="Detail Picture">
                    </a>
                    <?
                }
            }
            ?>
            <ul>
                <? foreach ($pict as $key => $value) { ?>
                    <li>
                        <a <?= ($key == 0) ? 'class="zoomThumbActive"' : '&nbsp;' ?> href='javascript:void(0);' 
                                                                                     rel="{gallery: 'gal1', smallimage: '<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&w=260') ?>',
                                                                                     largeimage: '<?= base_url('upload/img/product/' . $value->pict_name) ?>'}">
                            <img src='<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&w=48&h=48') ?>'>
                        </a>
                    </li>
                <? } ?>
            </ul>
            <div style="clear: both"></div>
        </div>
        <br>
        <div class="well" style="text-align: center;padding: 8px 0;">
            <form action="<?= base_url('order/add') ?>" id="order-add" method="post">
                <h4><?= $this->lang->line('quantity') ?></h4>
                <input type="hidden" name="product_id" value="<?= $product_id ?>" />
                <input type="text" style="width:30px" name="quantity" value="1"/><br/>	
                <button class="btn btn-primary"><?= $this->lang->line('order') ?></button>
            </form>
        </div>
    </div>
    <div class="span6">
        <h1><?= $product_name ?></h1>
        <hr>
        <b><?= $this->lang->line('merchant') ?>: </b><a href="<?= true_url(strtolower($user_name)) ?>" target="_blank"><?= $user_name ?></a><br>
        <b><?= $this->lang->line('product_id') ?>: </b><?= $product_id ?><br>
        <? if (is_user() == TRUE) { ?>
            <b><?= $this->lang->line('commission') ?>: </b>Rp <?= number_format($product_commission, 0, ',', '.') ?><br>
        <? } ?>
        <b><?= $this->lang->line('price') ?>: </b>Rp <?= number_format($product_price, 0, ',', '.') ?><br>
        <b><?= $this->lang->line('description') ?>: </b><br>
        <p><?= $product_desc ?></p>
    </div>
    <div class="span3">
        <div class="breadcrumb" style="text-align: center">
            <h4><?= $this->lang->line('random_product') ?></h4>
        </div>
        <? foreach ($random as $value) { ?>
            <div class="thumbnail">
                <img src="<?= base_url('res/timthumb.php?src=' . base_url('upload/img/product/' . $value->pict_name) . '&w=270') ?>" alt="">
                <div class="caption">
                    <h5><?= $value->product_name ?></h5>
                    <p><a class="btn" href="<?= base_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name) . '.html') ?>"><?= $this->lang->line('view_details') ?></a></p>
                </div>
            </div>
            <br>
        <? } ?>
    </div>
</div>