<script>
    $(function() {
        $(".pagination a").click(function() {
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $("#admin-order").html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    window.history.pushState('', '', url);
                    $("#admin-order").html(msg);
                }
            });
            return false;
        });
        $(".admininvoice").click(function() {
            var div = $(this).attr("class").split(' ')[1];
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $('#' + div).html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    window.history.pushState('', '', url);
                    $('#' + div).html(msg);
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
<? $this->load->view('admin/admin-menu_view') ?>
<div id="admin-order">
    <table class="table table-striped table-bordered table-condensed">
        <thead>
            <tr>
                <th>#</th>
                <th width="15%"><?= $this->lang->line('invoice_number') ?></th>
                <th><?= $this->lang->line('user') ?></th>
                <th><?= $this->lang->line('total') ?></th>
                <th><?= $this->lang->line('invoice_date') ?></th>
                <th><?= $this->lang->line('invoice_status') ?></th>
                <th width="15%"><?= $this->lang->line('action') ?></th>
            </tr>
        </thead>
        <tbody>
            <? foreach ($order as $key => $value) { ?>
                <tr>
                    <td><?= $number + $key + 1 ?></td>
                    <td>DistroITdotCOM<?= $value->invoice_id ?></td>
                    <td><a href="<?= true_url($value->user_name) ?>" target="_blank"><?= $value->user_name ?></a></td>
                    <td>Rp <?= number_format($value->invoice_total, 0, ',', '.') ?></td>
                    <td><?= strip_tags(date_convert($value->invoice_date)) ?></td>
                    <td>
                        <div id="status<?= $value->invoice_id ?>">
                            <? if ($value->invoice_status == 1) { ?>
                                <a class="activate status<?= $value->invoice_id ?>" href="<?= site_url('admin/order_invoice_active/'.$value->invoice_id.'/'.$value->invoice_status) ?>">
                                    <?= $this->lang->line('paid') ?>
                                </a>
                            <? } else if ($value->invoice_status == 0) { ?>
                                <a class="activate status<?= $value->invoice_id ?>" href="<?= site_url('admin/order_invoice_active/'.$value->invoice_id.'/'.$value->invoice_status) ?>">
                                    <?= $this->lang->line('unpaid') ?>
                                </a>
                            <? } ?>
                        </div>
                    </td>
                    <td>
                        <a class="admininvoice admin-order" href="<?= site_url('admin/order_invoice/' . $value->invoice_id . '/' . $value->user_id) ?>">
                            <?= $this->lang->line('order') ?>
                        </a>
                    </td>
                </tr>
            <? } ?>
        </tbody>
    </table>
    <?= $this->pagination->create_links() ?>
</div>