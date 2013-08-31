<? foreach ($input['invoice'] as $value) { ?>
    <table>
        <tr>
            <td><?= $this->lang->line('invoice_number') ?></td>
            <td>: DistroITdotCOM<?= $value->invoice_id ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('invoice_date') ?></td>
            <td>: <?= strip_tags(date_convert($value->invoice_date)) ?></td>
        </tr>
        <tr>
            <td><?= $this->lang->line('invoice_status') ?></td>
            <td>: <?= $this->lang->line('unpaid') ?></td>
        </tr>
    </table>
<? } ?>
<br>
<table border="1" style="width: 100%">
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
        foreach ($input['product'] as $key => $value) {
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
<p><b><?= $this->lang->line('shipping') ?></b></p>
<table>
    <tr>
        <td><?= $this->lang->line('name') ?></td>
        <td>: <?= $shipping['fullname'] ?></td>
    </tr>
    <tr>
        <td>Email</td>
        <td>: <?= $shipping['email'] ?></td>
    </tr>
    <tr>
        <td><?= $this->lang->line('hp') ?></td>
        <td>: <?= $shipping['phone'] ?></td>
    </tr>
    <tr>
        <td><?= $this->lang->line('home_address') ?></td>
        <td>: <?= $shipping['address'] ?></td>
    </tr>
    <tr>
        <td><?= $this->lang->line('city') ?></td>
        <td>: <?= $shipping['city'] ?></td>
    </tr>
    <tr>
        <td><?= $this->lang->line('state') ?></td>
        <td>: <?= $input['state']->state_name ?></td>
    </tr>
    <tr>
        <td><?= $this->lang->line('zip') ?></td>
        <td>: <?= $shipping['zip'] ?></td>
    </tr>
</table>
<p><b><?= $this->lang->line('payment_method') ?></b></p>
<p>&DoubleRightArrow; <?= $this->lang->line('payment_detail') ?>:</p>
<p><?= $this->lang->line('payment_mandiri') ?></p>
<p><?= $this->lang->line('payment_bca') ?></p>
<p>PayPal : bill@distroit.com</p>
<p><b>&therefore; <?= $this->lang->line('memo') ?> &therefore;</b></p>
<p><b><?= $this->lang->line('confirm_payment') ?></b></p>
<p>&DoubleRightArrow; <?= $this->lang->line('confirm_content') ?>:</p>
<p><?= $this->lang->line('confirm_sms') ?></p>
<p><?= $this->lang->line('confirm_example') ?></p>
<div style="text-align:right">
    <p><?= $this->lang->line('thank') ?></p>
    <br>
    <p>DistroITdotCOM</p>
</div>