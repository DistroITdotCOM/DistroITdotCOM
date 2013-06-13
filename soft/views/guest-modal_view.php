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
<div id="user-login" class="modal hide fade" style="display: none; ">
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
                <div style="float: left">
                    <a data-toggle="modal" href="#user-forgot"><?= $this->lang->line('forgot_password') ?>?</a>&nbsp;|&nbsp;
                    <a data-toggle="modal" href="#user-register"><?= $this->lang->line('register') ?></a>
                </div>
                <button type="submit" class="btn btn-primary"><?= $this->lang->line('login') ?></button>
            </div>
        </fieldset>
    </form>
</div>
<script>
    $(function() {
        var responseEmail = true;
        $.validator.addMethod("emailCheckReg", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= site_url('validation/email_check') ?>",
                data: "email=" + value + "&id=1",
                dataType: "html",
                success: function(msg) {
                    responseEmail = (msg === 'FALSE') ? false : true;
                }
            });
            return responseEmail;
        });
        var responseAccount = true;
        $.validator.addMethod("usernameCheck", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= site_url('validation/username_check') ?>",
                data: "username=" + value + "&user_id=#",
                dataType: "html",
                success: function(msg) {
                    responseAccount = (msg === 'TRUE') ? true : false;
                }
            });
            return responseAccount;
        });
        var responseReserved = true;
        $.validator.addMethod("usernameReserved", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= site_url('validation/username_reserved') ?>",
                data: "username=" + value,
                dataType: "html",
                success: function(msg) {
                    responseReserved = (msg === 'TRUE') ? true : false;
                }
            });
            return responseReserved;
        });
        $.validator.addMethod("usernameValidate", function(value, element) {
            return this.optional(element) || /^[a-z0-9\-]+$/i.test(value);
        });
        $("#form-reg").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    emailCheckReg: true
                },
                username: {
                    required: true,
                    usernameReserved: true,
                    usernameCheck: true,
                    usernameValidate: true
                },
                gender: {
                    required: true
                },
                phone: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                email: {
                    required: "<?= $this->lang->line('email_required') ?>",
                    email: "<?= $this->lang->line('email_valid') ?>",
                    emailCheckReg: "<?= $this->lang->line('email_check') ?>"
                },
                username: {
                    required: "<?= $this->lang->line('username_required') ?>",
                    usernameReserved: "<?= $this->lang->line('username_reserved') ?>",
                    usernameCheck: "<?= $this->lang->line('username_already') ?>",
                    usernameValidate: "<?= $this->lang->line('username_validate') ?>"
                },
                gender: {
                    required: "<?= $this->lang->line('gender_required') ?>"
                },
                phone: {
                    required: "<?= $this->lang->line('phone_required') ?>",
                    digits: "<?= $this->lang->line('phone_digits') ?>"
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
                submitFormReg(form);
            }
        });
        function submitFormReg(form) {
            var strData = $(form).serialize();
            $.ajax({
                type: "POST",
                url: "<?= site_url('auth/register') ?>",
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
<div id="user-register" class="modal hide fade" style="display: none; ">
    <form action="<?= site_url('auth/register') ?>" id="form-reg" method="post" class="form-horizontal">
        <fieldset>
            <div class="modal-header">
                <a href="#" class="close" data-dismiss="modal">&times;</a>
                <h3><?= $this->lang->line('form_register') ?></h3>
            </div>
            <div class="modal-body">
                <div class="control-group">
                    <label class="control-label" for="username"><?= $this->lang->line('username') ?></label>
                    <div class="controls">
                        <input type="text" class="span3" id="username" name="username" value="">
                    </div>
                </div>  
                <div class="control-group">
                    <label class="control-label" for="email"><?= $this->lang->line('email') ?></label>
                    <div class="controls">
                        <input type="text" class="span3" id="email" name="email" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="gender"><?= $this->lang->line('gender') ?></label>
                    <div class="controls">
                        <select id="gender" name="gender" class="span3">
                            <option value="">--<?= $this->lang->line('select_gender') ?>--</option>
                            <option value="M"><?= $this->lang->line('male') ?></option>
                            <option value="F"><?= $this->lang->line('female') ?></option>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="phone_reg"><?= $this->lang->line('hp') ?></label>
                    <div class="controls">
                        <input type="text" class="span3" id="phone_reg" name="phone" value="">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary"><?= $this->lang->line('register') ?></button>
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
<div id="user-forgot" class="modal hide fade" style="display: none; ">
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
<div id="user-activate" class="modal hide fade" style="display: none; ">
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