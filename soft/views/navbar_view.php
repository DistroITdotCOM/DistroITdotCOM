<style>
    body {
        padding-top: 60px;
        padding-bottom: 40px;
    }
</style>

<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="<?= true_url('www') ?>">DistroITdotCOM</a>
            <?php if ($this->cart->contents()) { ?>
                <ul class="nav">
                    <li class="divider-vertical"></li>
                    <li><a href="<?= site_url('order/display') ?>"><?= $this->lang->line('bag') ?> ( <?=
                            ($this->cart->total_items() == 1) ?
                                    $this->cart->total_items() . $this->lang->line('item') : $this->cart->total_items() . $this->lang->line('items')
                            ?> ) </a></li>
                </ul>
            <?php } else { ?>
                <ul class="nav">
                    <li class="divider-vertical"></li>
                    <li style="float: left;padding: 10px 15px 10px;color: #777;text-decoration: none;text-shadow: 0 1px 0 #fff;"><?= $this->lang->line('buy') ?></li>
                </ul>
            <?php } ?>
            <div class="btn-group pull-right">
                <?php if ($this->session->userdata('Clogin') == TRUE) { ?>
                    <a class="btn dropdown-toggle" data-toggle="modal" href="#user-menu">
                        <?php if ($this->session->userdata('user_role') == 1) { ?>
                            <i class="icon-user"></i> <?= $this->lang->line('admin') ?>
                        <?php } else if ($this->session->userdata('user_role') == 2) { ?>
                            <i class="icon-user"></i> <?= $this->lang->line('user') ?>
                        <?php } ?>
                        <span class="caret"></span>
                    </a>
                <?php } else { ?>
                    <a class="btn dropdown-toggle" data-toggle="modal" href="#user-login">
                        <i class="icon-user"></i> <?= $this->lang->line('guest') ?>
                        <span class="caret"></span>
                    </a>
                <?php } ?>
            </div>
            <script>
                $(function() {
                    $("#searching").focus(function() {
                        $(this).css('backgroundColor', '#FFFFFF');
                    });
                    $("#searching").blur(function() {
                        $(this).css('backgroundColor', '#F5F6F7');
                    });
                });
            </script>
            <form class="navbar-search pull-right" action="<?= site_url('home/search') ?>" method="post">
                <input type="text" id="searching" style="width: 180px;border-radius: 4px;margin-right: 5px;background-color: #F5F6F7;" class="search-query" name="keyword" placeholder="<?= $this->lang->line('search') ?>">
            </form>
        </div>
    </div>
</div>
<?php
if ($this->session->userdata('Clogin') == TRUE) {
    ?>
    <div id="user-menu" class="modal hide fade" style="display: none; ">
        <div class="modal-header">
            <a href="#" class="close" data-dismiss="modal">&times;</a>
            <h3><?= $this->lang->line('member') ?></h3>
        </div>
        <div class="modal-body">
            <ul class="nav nav-pills nav-stacked" style="text-align: center">
                <?php if ($this->session->userdata('user_role') == 1) { ?>
                    <li><a class="btn btn-mini" data-toggle="modal" href="#user-register"><b><?= $this->lang->line('register') ?></b></a></li>
                    <li><a class="btn btn-mini" href="<?= site_url('admin/account') ?>"><b><?= $this->lang->line('admin_menu') ?></b></a></li>
                <?php } ?>
                <li><a class="btn btn-mini" href="<?= site_url('user/account') ?>"><b><?= $this->lang->line('main_menu') ?></b></a></li>
                <li><a class="btn btn-mini" href="<?= site_url('auth/logout') ?>"><b><?= $this->lang->line('logout') ?></b></a></li>
            </ul>
        </div>
        <div class="modal-footer"></div>
    </div>
    <?php if ($this->session->userdata('user_role') == 1) {
        ?>
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
        <div id="user-register" class="modal hide fade" style="display: none">
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
    <?php }
} ?>