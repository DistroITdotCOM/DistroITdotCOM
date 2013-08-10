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
        var bar = $('.bar');
        var percent = $('.percent');
        var sukses = $('#sukses');
        var gagal = $('#gagal');
        $('input:file').on('change', function() {
            var userfile = $(this).attr('name');
            $('#kirim').attr('disabled', '');
            $('#product-update').ajaxSubmit({
                type: 'POST',
                data: {userfile: userfile},
                url: '<?= site_url('user/upload_image') ?>',
                dataType: 'json',
                beforeSend: function() {
                    sukses.empty();
                    gagal.empty();
                    var percentVal = '0%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                },
                success: function(xhr) {
                    var percentVal = '100%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                    $('#' + userfile).attr('value', xhr.message);
                    sukses.html(xhr.message);
                },
                complete: function(xhr) {
                    $('#kirim').removeAttr('disabled');
                    if (xhr.responseText.indexOf('message') !== 2)
                        gagal.html(xhr.responseText);
                }
            });
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
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error');
                $(element).parents('.control-group').removeClass('success');
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error');
                $(element).parents('.control-group').addClass('success');
            }
        });
        $('input#commission').autoNumeric({aSep: '.', aDec: ',', vMax: '1000000'});
        $('input#price').autoNumeric({aSep: '.', aDec: ',', vMax: '1000000'});
    });
</script>
<style>
    .progress { position:relative; width:400px; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
    .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
    .percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>
<form action="<?= site_url('user/product_update') ?>" id="product-update" method="post" enctype="multipart/form-data" class="form-horizontal">
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
                    <input type="hidden" name="file<?= $key ?>" id="userfile<?= $key ?>" value="<?= $picture ?>"/>
                    <div class="fileupload<?= $key ?> fileupload-new fileupload" data-provides="fileupload">
                        <div class="fileupload-new thumbnail" style="width: 200px;">
                            <img src="<?= base_url('upload/img/product/' . $picture) ?>">
                        </div>
                        <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
                        <div>
                            <span class="btn btn-file"><span class="fileupload-new"><?= $this->lang->line('pict_select') ?></span>
                                <span class="fileupload-exists"><?= $this->lang->line('pict_change') ?></span><input type="file" name="userfile<?= $key ?>"/>
                            </span>
                            <a href="#" class="btn fileupload-exists" data-dismiss="fileupload"><?= $this->lang->line('pict_remove') ?></a>
                        </div>
                    </div>
                <? } ?>
                <br>
                <div id="sukses" class="label label-success"></div>
                <div id="gagal" class="label label-important"></div>
                <div class="progress">
                    <div class="bar"></div >
                    <div class="percent">0%</div >
                </div>
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