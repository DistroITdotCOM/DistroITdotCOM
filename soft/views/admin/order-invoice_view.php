<? foreach ($user as $value) { ?>
    <table class="table table-striped">
        <thead>
            <tr><td style="text-align: center" colspan="2"><b><?= $this->lang->line('form_buyer') ?></b></td></tr>
        </thead>
        <tr>
            <td><?= $this->lang->line('name') ?></td>
            <td>: <?= $value->user_fullname ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('email') ?></td>
            <td>: <?= $value->user_email ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('hp') ?></td>
            <td>: <?= $value->user_phone ?></td>
        </tr>
        <thead>
            <tr><td style="text-align: center" colspan="2"><b><?= $this->lang->line('form_shipping') ?></b></td></tr>
        </thead>
        <tr>
            <td><?= $this->lang->line('address') ?></td>
            <td>: <?= $value->user_address ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('city') ?></td>
            <td>: <?= $value->user_city ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('state') ?></td>
            <td>: <?= $value->state_name ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('zip') ?></td>
            <td>: <?= $value->user_zip ?></td>
        </tr>
    </table>
<? } ?>
<hr>
<table class="table table-striped table-bordered table-condensed">
    <thead>
        <tr>
            <th>#</th>
            <th><?= $this->lang->line('product') ?></th>
            <th><?= $this->lang->line('quantity') ?></th>
            <th><?= $this->lang->line('price') ?></th>
            <th><?= $this->lang->line('sub-total') ?></th>
        </tr>
    </thead>
    <tbody>
        <?
        $total = null;
        foreach ($invoice as $key => $value) {
            ?>
            <tr>
                <td><?= $key + 1 ?></td>
                <td><?= $value->product_name ?></td>
                <td><?= $value->invoice_has_product_quantity ?></td>
                <td>Rp <?= number_format($value->product_price, 0, ',', '.') ?></td>
                <? $sub_total = $value->invoice_has_product_quantity * $value->product_price ?>
                <td>Rp <?= number_format($sub_total, 0, ',', '.') ?></td>
            </tr>
            <? $total+=$sub_total ?>
        <? } ?>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong><?= $this->lang->line('total') ?></strong></td>
            <td>Rp <?= number_format($total, 0, ',', '.') ?></td>
        </tr>
    </tbody>
</table>