<? $this->load->view('user/main-menu_view') ?>
<div class="row">
    <div class="span6">
        <div class="control-group form-horizontal">
            <label class="control-label"><?= $this->lang->line('gain') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level">Rp <?= number_format($gain->gain, 0, ',', '.') ?></span>
            </div>
            <br>
            <label class="control-label"><?= $this->lang->line('all') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level"><?= $user ?></span>
            </div>
            <br>
            <label class="control-label"><?= $this->lang->line('stock') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level">Rp <?= number_format($stock = $gain->gain / $user, 0, ',', '.') ?></span>
            </div>
        </div>
    </div>
    <div class="span6">
        <div class="control-group form-horizontal">
            <label class="control-label"><?= $this->lang->line('member') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level"><?= $amount_affiliate ?></span>
            </div>
            <br>
            <label class="control-label"><?= $this->lang->line('revenue') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level">Rp <?= number_format($revenue = $stock * $amount_affiliate, 0, ',', '.') ?></span>
            </div>
            <br>
            <label class="control-label"><?= $this->lang->line('payout') ?>: </label>
            <div class="controls">
                <span class="uneditable-input input-block-level">Rp <?= number_format($revenue - $payout->user_payout, 0, ',', '.') ?></span>
            </div>
        </div>
    </div>
</div>
<hr/>
<? if (!empty($affiliate)) { ?>
    <table class="table table-striped table-bordered table-condensed">
        <thead>
            <tr>
                <th>#</th>
                <th><?= $this->lang->line('username') ?></th>
                <th><?= $this->lang->line('membership_status') ?></th>
            </tr>
        </thead>
        <tbody>
            <? foreach ($affiliate as $key => $value) { ?>
                <tr>
                    <td><?= $number + $key + 1 ?></td>
                    <td><?= $value->user_name ?></td>
                    <td><?= ($value->user_active == '1') ? $this->lang->line('status_active') : $this->lang->line('status_pending'); ?></td>
                </tr>
            <? } ?>
        </tbody>
    </table>
    <?= $this->pagination->create_links() ?>
<? } ?>