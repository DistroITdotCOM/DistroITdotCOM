<script>
    $(function() {
        $("#form-payout").validate({
            rules: {
                asset: {
                    required: true
                }
            },
            messages: {
                asset: {
                    required: "<?= $this->lang->line('pay_required') ?>"
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
        $('input#asset').autoNumeric({aSep: '.', aDec: ',', vMax: '9999999999'});
    });
</script>
<form action="<?= site_url('admin/account_payout') ?>" id="form-payout" method="post" class="form-horizontal">
    <input type="hidden" value="1" name="ajax" />
    <input type="hidden" value="1" name="update" />
    <input type="hidden" value="<?= $user_id ?>" name="user" />
    <fieldset>
        <div class="modal-header">
            <a href="#" class="close" data-dismiss="modal">&times;</a>
            <h3><?= $this->lang->line('member') ?> <?= $user_id ?></h3>
        </div>
        <div class="modal-body">
            <div class="control-group">
                <label class="control-label" for="asset"><?= $this->lang->line('pay_total') ?></label>
                <div class="controls">
                    <input type="text" class="input-xlarge" id="asset" name="asset" value="">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary"><?= $this->lang->line('pay') ?></button>
        </div>
    </fieldset>
</form>