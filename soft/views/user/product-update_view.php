<?
$product_id = $product->product_id;
$product_name = $product->product_name;
$product_desc = $product->product_desc;
$product_commission = $product->product_commission;
$product_price = $product->product_price;
?>
<script>
    tinyMCE.init({
        mode: "textareas",
        theme: "simple"
    });
    $(function() {
        $(".ajaxproduct").click(function() {
            var div = $(this).attr("class").split(' ')[1];
            var ElementUrl = $(this).attr("asli");
            var IdProduct = $(this).attr("idproduct");

            $.ajax({
                type: "POST",
                data: "ajax=1&product_id=" + IdProduct,
                url: ElementUrl,
                beforeSend: function() {
                    $('#' + div).html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    $('#' + div).html(msg);
                }
            });
            return false;
        });
        $("#product-update").validate({
            rules: {
                name: {
                    required: true
                },
                commission: {
                    required: true
                },
                price: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "<?= $this->lang->line('product_name_required') ?>"
                },
                commission: {
                    required: "<?= $this->lang->line('product_commission_required') ?>"
                },
                price: {
                    required: "<?= $this->lang->line('product_price_required') ?>"
                }
            },
            errorClass: "help-inline",
            errorElement: "span",
            highlight: function(element, errorClass, validClass) {
                $(element).parents('.control-group').addClass('error');
                $(element).parents('.control-group').removeClass('success');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.control-group').removeClass('error');
                $(element).parents('.control-group').addClass('success');
            }
        });
        $('.fileupload0').fileupload({
            uploadtype: "image",
            name: "userfile0"
        });
        $('.fileupload1').fileupload({
            uploadtype: "image",
            name: "userfile1"
        });
        $('.fileupload2').fileupload({
            uploadtype: "image",
            name: "userfile2"
        });
        $('input#commission').autoNumeric({aSep: '.', aDec: ',', vMax: '9999999999'});
        $('input#price').autoNumeric({aSep: '.', aDec: ',', vMax: '9999999999'});
    });
</script>
<form action="<?= base_url('user/product_update') ?>" id="product-update" method="post" enctype="multipart/form-data" class="form-horizontal">
    <input type="hidden" value="1" name="update" />
    <input type="hidden" value="<?= $product_id ?>" name="product_id" />
    <fieldset>
        <div class="control-group">
            <label class="control-label" for="name"><?= $this->lang->line('product_name') ?></label>
            <div class="controls">
                <input type="text" class="span4" id="name" name="name" value="<?= $product_name ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="pdetail"><?= $this->lang->line('product_detail') ?></label>
            <div class="controls">
                <textarea style="width: 100%" id="pdetail" name="pdetail" rows="20"><?= $product_desc ?></textarea>
            </div>
        </div>
        <style>
            .fileupload{
                display: inline-block;
            }
        </style>
        <div class="control-group">
            <label class="control-label" for="userfile"><?= $this->lang->line('product_pict') ?></label>
            <div class="controls">
                <?
                for ($key = 0; $key < 3; $key++) {
                    $picture = !empty($pict[$key]->pict_name) ? $pict[$key]->pict_name : '../no-img.jpg';
                    ?>
                    <div class="fileupload<?= $key ?> fileupload-new fileupload" data-provides="fileupload">
                        <div class="fileupload-new thumbnail" style="width: 200px;">
                            <img src="<?= base_url('upload/img/product') . "/" . $picture ?>">
                        </div>
                        <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
                        <div>
                            <span class="btn btn-file"><span class="fileupload-new"><?= $this->lang->line('pict_select') ?></span>
                                <span class="fileupload-exists"><?= $this->lang->line('pict_change') ?></span><input type="file"/>
                            </span>
                            <a href="#" class="btn fileupload-exists" data-dismiss="fileupload"><?= $this->lang->line('pict_remove') ?></a>
                        </div>
                    </div>
                <? } ?>
                <p><?= $this->lang->line('pict_note') ?></p>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="commission"><?= $this->lang->line('product_commission') ?></label>
            <div class="controls">
                <input type="text" class="span4" id="commission" name="commission" value="<?= $product_commission ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="price"><?= $this->lang->line('product_price') ?></label>
            <div class="controls">
                <input type="text" class="span4" id="price" name="price" value="<?= $product_price ?>">
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary"><?= $this->lang->line('update') ?></button>&nbsp;
            <a class="btn" href="<?= site_url('user/product') ?>">
                <?= $this->lang->line('cancel') ?>
            </a>
        </div>
    </fieldset>
</form>