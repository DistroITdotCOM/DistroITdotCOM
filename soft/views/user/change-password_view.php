<script>
    $(function() {
        var responseAccount = true;
        $.validator.addMethod("passwordCheck", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= base_url('validation/password_check.html') ?>",
                data: "password=" + value + "&user_id=" +<?= $this->session->userdata('user_id') ?> + "",
                dataType: "html",
                success: function(msg) {
                    responseAccount = (msg === 'TRUE') ? true : false;
                }
            });
            return responseAccount;
        });

        $("#form-change").validate({
            rules: {
                opassword: {
                    required: true,
                    passwordCheck: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                cpassword: {
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                opassword: {
                    required: "<?= $this->lang->line('opassword_required') ?>",
                    passwordCheck: "<?= $this->lang->line('opassword_check') ?>"
                },
                password: {
                    required: "<?= $this->lang->line('npassword_required') ?>",
                    minlength: "<?= $this->lang->line('password_length') ?>"
                },
                cpassword: {
                    required: "<?= $this->lang->line('cpassword_required') ?>",
                    equalTo: "<?= $this->lang->line('cpassword_equal') ?>"
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
    });
</script>
<? $this->load->view('user/main-menu_view') ?>
<form action="<?= base_url('user/change_password.html') ?>" id="form-change" method="post" class="form-horizontal">
    <input type="hidden" value="1" name="update" />
    <fieldset>
        <div class="control-group">
            <label class="control-label" for="opassword"><?= $this->lang->line('opassword') ?></label>
            <div class="controls">
                <input type="password" class="input-block-level" id="opassword" name="opassword" value="">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="password"><?= $this->lang->line('npassword') ?></label>
            <div class="controls">
                <input type="password" class="input-block-level" id="password" name="password" value="">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cpassword"><?= $this->lang->line('cpassword') ?></label>
            <div class="controls">
                <input type="password" class="input-block-level" id="cpassword" name="cpassword" value="">
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary"><?= $this->lang->line('save') ?></button>
        </div>
    </fieldset>
</form>