<script>
    $(function() {
        $(".pagination a").click(function() {
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $("#admin-product").html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    window.history.pushState('', '', url);
                    $("#admin-product").html(msg);
                }
            });
            return false;
        });
        $(".activate").click(function() {
            var div = $(this).attr("class").split(' ')[1];
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $('#' + div).html('<div style="text-align: center"><img src="' + loading_image_small + '"/></div>');
                },
                success: function(msg) {
                    $('#' + div).html(msg);
                }
            });
            return false;
        });
    });
</script>
<? if ($this->input->post('ajax') != 1) $this->load->view('admin/admin-menu_view') ?>
<div id="admin-product">
    <table class="table table-striped table-bordered table-condensed">
        <thead>
            <tr>
                <th>#</th>
                <th><?= $this->lang->line('product_id') ?></th>
                <th><?= $this->lang->line('product_name') ?></th>
                <th><?= $this->lang->line('product_commission') ?></th>
                <th><?= $this->lang->line('product_price') ?></th>
                <th><?= $this->lang->line('action') ?></th>
            </tr>
        </thead>
        <tbody>
            <? foreach ($product as $key => $value) { ?>
                <tr>
                    <td><?= $number + $key + 1 ?></td>
                    <td><?= $value->product_id ?></td>
                    <td>
                        <a href="<?= site_url('product/detail/' . $value->product_id . '/' . url_title($value->product_name)) ?>" target="_blank">
                            <?= $value->product_name ?>                                    
                        </a>
                    </td>
                    <td>Rp <?= number_format($value->product_commission, 0, ',', '.') ?></td>
                    <td>Rp <?= number_format($value->product_price, 0, ',', '.') ?></td>
                    <td>
                        <div id="product<?= $value->product_id ?>">
                            <? if ($value->product_active == 1) { ?>
                                <a class="activate product<?= $value->product_id ?>" href="<?= site_url('admin/product_active/' . $value->product_id . '/' . $value->product_active) ?>">
                                    <?= $this->lang->line('status_active') ?>
                                </a>
                            <? } else if ($value->product_active == 0) { ?>
                                <a class="activate product<?= $value->product_id ?>" href="<?= site_url('admin/product_active/' . $value->product_id . '/' . $value->product_active) ?>">
                                    <?= $this->lang->line('status_non') ?>
                                </a>
                            <? } ?>
                        </div>
                    </td>
                </tr>
            <? } ?>
        </tbody>
    </table>
    <?= $this->pagination->create_links() ?>    
</div>