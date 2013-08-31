<form action="<?= site_url('order/update') ?>" method="post"> 
    <table class="table table-striped table-bordered table-condensed">
        <thead>
            <tr>
                <th><?= $this->lang->line('quantity') ?></th>
                <th><?= $this->lang->line('product') ?></th>
                <th><?= $this->lang->line('price') ?></th>
                <th><?= $this->lang->line('sub-total') ?></th>
            </tr>
        </thead>
        <tbody>
            <? foreach ($this->cart->contents() as $value) { ?>
            <input type="hidden" name="rowid[]" value="<?= $value['rowid'] ?>" />
            <tr>
                <td>
                    <input type="text" style="width:30px" name="qty[]" value="<?= $value['qty'] ?>"/>
                </td>
                <td><a href="<?= site_url('product/detail/' . $value['id'] . '/' . url_title($value['name'])) ?>" target="_blank"><?= $value['name'] ?></a></td>
                <td>Rp <?= number_format($value['price'], 0, ',', '.') ?></td>
                <td>Rp <?= number_format($value['subtotal'], 0, ',', '.') ?></td>
            </tr>
        <? } ?>
        <tr>
            <td></td>
            <td></td>
            <td><strong><?= $this->lang->line('total') ?></strong></td>
            <td>Rp <?= number_format($this->cart->total(), 0, ',', '.') ?></td>
        </tr>
        </tbody>
    </table>
    <p>
        <button type="submit" class="btn btn-primary"><?= $this->lang->line('update') ?></button>&nbsp;
        <a class="btn btn-primary" href="<?= site_url('order/checkout') ?>"><?= $this->lang->line('checkout') ?></a>
    </p>
    <p>
        <small><?= $this->lang->line('note') ?></small>
    </p>
</form>

