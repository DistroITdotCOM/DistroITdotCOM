<script>
    $(function() {
        $(".pagination a").click(function() {
            var url = $(this).attr("href");
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $("#admin-account").html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    window.history.pushState('', '', url);
                    $("#admin-account").html(msg);
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
<div id="admin-account">
    <table class="table table-striped table-bordered table-condensed">
        <thead>
            <tr>
                <th>#</th>
                <th><?= $this->lang->line('username') ?></th>
                <th><?= $this->lang->line('payout') ?></th>
                <th><?= $this->lang->line('action') ?></th>
            </tr>
        </thead>
        <tbody>
            <? foreach ($account as $key => $value) { ?>
                <tr>
                    <td><?= $number + $key + 1 ?></td>
                    <td><a href="<?= true_url($value->user_name) ?>" target="_blank"><?= $value->user_name ?></a></td>
                    <td><a class="admin-payout" data-toggle="modal" href="#user-payout" user="<?= $value->user_id ?>"><?= $this->lang->line('payout') ?></a>&nbsp; 
                        - Rp <?= number_format($value->user_payout, 0, ',', '.') ?>
                    </td>
                    <td>
                        <div id="active<?= $value->user_id ?>">
                            <? if ($value->user_active == 1) { ?>
                                <a class="activate active<?= $value->user_id ?>" href="<?= site_url('admin/account_active/' . $value->user_id . '/' . $value->user_active) ?>">
                                    <?= $this->lang->line('status_active') ?>
                                </a>
                            <? } else if ($value->user_active == 0) { ?>
                                <a class="activate active<?= $value->user_id ?>" href="<?= site_url('admin/account_active/' . $value->user_id . '/' . $value->user_active) ?>">
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
<script>
    $(function() {
        $(".admin-payout").click(function() {
            var User_id = $(this).attr("user");
            $.ajax({
                type: "POST",
                data: "user=" + User_id + "&ajax=1",
                url: site + "admin/account_payout",
                beforeSend: function() {
                    $('#pay').html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    $('#pay').html(msg);
                }
            });
        });
    });
</script>
<div id="user-payout" class="modal hide fade" style="display: none; ">
    <div id="pay"></div>
</div>