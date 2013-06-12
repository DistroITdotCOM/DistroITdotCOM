<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Nettuts Email Newsletter</title>
        <style type="text/css">
            .body {
                margin: 0;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: 13px;
                line-height: 18px;
                color: #333333;
                background-color: #ffffff;
            }

            table {
                max-width: 100%;
                background-color: transparent;
                border-collapse: collapse;
                border-spacing: 0;
            }

            .table {
                width: 100%;
                margin-bottom: 18px;
            }

            .table th,
            .table td {
                padding: 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: top;
                border-top: 1px solid #dddddd;
            }

            .table th {
                font-weight: bold;
            }

            .table thead th {
                vertical-align: bottom;
            }

            .table caption + thead tr:first-child th,
            .table caption + thead tr:first-child td,
            .table colgroup + thead tr:first-child th,
            .table colgroup + thead tr:first-child td,
            .table thead:first-child tr:first-child th,
            .table thead:first-child tr:first-child td {
                border-top: 0;
            }

            .table tbody + tbody {
                border-top: 2px solid #dddddd;
            }

            .table-condensed th,
            .table-condensed td {
                padding: 4px 5px;
            }

            .table-bordered {
                border: 1px solid #dddddd;
                border-collapse: separate;
                *border-collapse: collapsed;
                border-left: 0;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
            }

            .table-bordered th,
            .table-bordered td {
                border-left: 1px solid #dddddd;
            }

            .table-bordered caption + thead tr:first-child th,
            .table-bordered caption + tbody tr:first-child th,
            .table-bordered caption + tbody tr:first-child td,
            .table-bordered colgroup + thead tr:first-child th,
            .table-bordered colgroup + tbody tr:first-child th,
            .table-bordered colgroup + tbody tr:first-child td,
            .table-bordered thead:first-child tr:first-child th,
            .table-bordered tbody:first-child tr:first-child th,
            .table-bordered tbody:first-child tr:first-child td {
                border-top: 0;
            }

            .table-bordered thead:first-child tr:first-child th:first-child,
            .table-bordered tbody:first-child tr:first-child td:first-child {
                -webkit-border-top-left-radius: 4px;
                border-top-left-radius: 4px;
                -moz-border-radius-topleft: 4px;
            }

            .table-bordered thead:first-child tr:first-child th:last-child,
            .table-bordered tbody:first-child tr:first-child td:last-child {
                -webkit-border-top-right-radius: 4px;
                border-top-right-radius: 4px;
                -moz-border-radius-topright: 4px;
            }

            .table-bordered thead:last-child tr:last-child th:first-child,
            .table-bordered tbody:last-child tr:last-child td:first-child {
                -webkit-border-radius: 0 0 0 4px;
                -moz-border-radius: 0 0 0 4px;
                border-radius: 0 0 0 4px;
                -webkit-border-bottom-left-radius: 4px;
                border-bottom-left-radius: 4px;
                -moz-border-radius-bottomleft: 4px;
            }

            .table-bordered thead:last-child tr:last-child th:last-child,
            .table-bordered tbody:last-child tr:last-child td:last-child {
                -webkit-border-bottom-right-radius: 4px;
                border-bottom-right-radius: 4px;
                -moz-border-radius-bottomright: 4px;
            }

            .table-striped tbody tr:nth-child(odd) td,
            .table-striped tbody tr:nth-child(odd) th {
                background-color: #f9f9f9;
            }

            .table tbody tr:hover td,
            .table tbody tr:hover th {
                background-color: #f5f5f5;
            }

            .well {
                min-height: 20px;
                padding: 19px;
                margin-bottom: 20px;
                background-color: #f5f5f5;
                border: 1px solid #eee;
                border: 1px solid rgba(0, 0, 0, 0.05);
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
                -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
            }
        </style>
    </head>
    <body>
        <div class="body">
            <? foreach ($invoice_print['invoice'] as $value) { ?>
                <table border="0">
                    <tr>
                        <td><?= $this->lang->line('invoice_number') ?></td>
                        <td>: DistroITdotCOM<?= $value['invoice_id'] ?></td>
                    </tr>
                    <tr>
                        <td><?= $this->lang->line('invoice_date') ?></td>
                        <td>: <?= strip_tags(date_convert($value['invoice_date'])) ?></td>
                    </tr>
                    <tr>
                        <td><?= $this->lang->line('invoice_status') ?></td>
                        <td>: <?= $this->lang->line('unpaid') ?></td>
                    </tr>
                </table>
            <? } ?>
            <br>
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
                    foreach ($invoice_print['product'] as $key => $value) {
                        ?>
                        <tr>
                            <td><?= $key + 1 ?></td>
                            <td><?= $value['invoice_has_product_desc'] . $value['product_name'] ?></td>
                            <td><?= $value['invoice_has_product_quantity'] ?></td>
                            <td>Rp <?= number_format($value['product_price'], 0, ',', '.') ?></td>
                            <? $sub_total = $value['invoice_has_product_quantity'] * $value['product_price'] ?>
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

            <div class="well">
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
            </div>
        </div>
    </body>
</html>