<script>
    $(function() {
        $("#form-login").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "<?= $this->lang->line('email_required') ?>",
                    email: "<?= $this->lang->line('email_valid') ?>"
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
            },
            submitHandler: function(form) {
                submitFormLogin(form);
            }
        });
        function submitFormLogin(form) {
            var strData = $(form).serialize();
            $.ajax({
                type: "POST",
                url: "<?= site_url('auth/login') ?>",
                data: strData,
                dataType: "json",
                success: function(msg) {
                    if (msg[0] === '2') {
                        window.location = msg[1];
                    } else if (msg[0] === '1') {
                        window.location = msg[1];
                    } else if (msg[0] === 'unactive') {
                        $('#LoginFailed').html('<b><?= $this->lang->line('email_activation') ?></b>');
                    } else if (msg[0] === 'failed') {
                        $('#LoginFailed').html('<b><?= $this->lang->line('email_failed') ?></b>');
                    }
                }
            });
        }
        ;
    });
</script>
<div id="user-login" class="modal hide fade" style="display: none">
    <form action="<?= site_url('auth/login') ?>" id="form-login" method="post" class="form-horizontal">
        <fieldset> 
            <div class="modal-header">
                <a href="#" class="close" data-dismiss="modal">&times;</a>
                <h3><?= $this->lang->line('form_login') ?></h3>
            </div>
            <div class="modal-body">
                <div class="control-group">
                    <label class="control-label" for="email"><?= $this->lang->line('email') ?></label>
                    <div class="controls">
                        <input type="text" class="input-xlarge" id="email" name="email" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="password"><?= $this->lang->line('password') ?></label>
                    <div class="controls">
                        <input type="password" class="input-xlarge" id="password" name="password" value="">
                    </div>
                </div>
                <div id="LoginFailed" ></div>
            </div>
            <div class="modal-footer">
                <a class="btn btn-primary" data-toggle="modal" href="#user-forgot"><?= $this->lang->line('forgot_password') ?>?</a>
                <button type="submit" class="btn btn-primary"><?= $this->lang->line('login') ?></button>
            </div>
        </fieldset>
    </form>
</div>
<script>
    $(function() {
        var response = true;
        $.validator.addMethod("emailCheck", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= site_url('validation/email_check') ?>",
                data: "email=" + value + "&id=2",
                dataType: "html",
                success: function(msg) {
                    response = (msg === 'TRUE') ? true : false;
                }
            });
            return response;
        });
        $("#form-forgot").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    emailCheck: true
                }
            },
            messages: {
                email: {
                    required: "<?= $this->lang->line('email_required') ?>",
                    email: "<?= $this->lang->line('email_valid') ?>",
                    emailCheck: "<?= $this->lang->line('email_check2') ?>"
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
            },
            submitHandler: function(form) {
                submitFormForgot(form);
            }
        });
        function submitFormForgot(form) {
            var strData = $(form).serialize();
            $.ajax({
                type: "POST",
                url: "<?= site_url('auth/forgot') ?>",
                data: strData,
                dataType: "json",
                success: function(msg) {
                    if (msg[0] === 'success') {
                        window.location = msg[1];
                    }
                }
            });
        }
        ;
    });
</script>
<div id="user-forgot" class="modal hide fade" style="display: none">
    <form action="<?= site_url('auth/forgot') ?>" id="form-forgot" method="post" class="form-horizontal">
        <fieldset>
            <div class="modal-header">
                <a href="#" class="close" data-dismiss="modal">&times;</a>
                <h3><?= $this->lang->line('forgot_password') ?></h3>
            </div>
            <div class="modal-body">
                <div class="control-group">
                    <label class="control-label" for="email"><?= $this->lang->line('email') ?></label>
                    <div class="controls">
                        <input type="text" class="input-xlarge" id="email" name="email" value="">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary"><?= $this->lang->line('forgot_password') ?>?</button>
            </div>
        </fieldset>
    </form>
</div>
<script>
    $(function() {
        var response = true;
        $.validator.addMethod("emailCheck", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= site_url('validation/email_check') ?>",
                data: "email=" + value + "&id=2",
                dataType: "html",
                success: function(msg) {
                    response = (msg === 'TRUE') ? true : false;
                }
            });
            return response;
        });
        $("#form-activate").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    emailCheck: true
                }
            },
            messages: {
                email: {
                    required: "<?= $this->lang->line('email_required') ?>",
                    email: "<?= $this->lang->line('email_valid') ?>",
                    emailCheck: "<?= $this->lang->line('email_check2') ?>"
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
            },
            submitHandler: function(form) {
                submitFormActivate(form);
            }
        });
        function submitFormActivate(form) {
            var strData = $(form).serialize();
            $.ajax({
                type: "POST",
                url: "<?= site_url('auth/send') ?>",
                data: strData,
                dataType: "json",
                success: function(msg) {
                    if (msg[0] === 'success') {
                        window.location = msg[1];
                    }
                }
            });
        }
        ;
    });
</script>
<div id="user-activate" class="modal hide fade" style="display: none">
    <form action="<?= site_url('auth/send') ?>" id="form-activate" method="post" class="form-horizontal">
        <fieldset>
            <div class="modal-header">
                <a href="#" class="close" data-dismiss="modal">&times;</a>
                <h3><?= $this->lang->line('send') ?></h3>
            </div>
            <div class="modal-body">
                <div class="control-group">
                    <label class="control-label" for="email"><?= $this->lang->line('email') ?></label>
                    <div class="controls">
                        <input type="text" class="input-xlarge" id="email" name="email" value="">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary"><?= $this->lang->line('send_email') ?></button>
            </div>
        </fieldset>
    </form>
</div>