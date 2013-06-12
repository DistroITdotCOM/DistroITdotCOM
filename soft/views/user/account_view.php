<?
$username = $account->user_name;
$email = $account->user_email;
$pict = !empty($account->user_pict) ? $account->user_pict : '../no-img.jpg';
$gender = $account->user_gender;
$user_phone = $account->user_phone;
?>
<script>
    $(function() {
        var responseAccount = true;
        $.validator.addMethod("usernameCheck", function(value) {
            $.ajax({
                type: "POST",
                url: "<?= base_url('validation/username_check.html') ?>",
                data: "username=" + value + "&user_id=" +<?= $this->session->userdata('user_id') ?> + "",
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
                url: "<?= base_url('validation/username_reserved.html') ?>",
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

        $("#form-account").validate({
            rules: {
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
            }
        });
        $('.editable').inlineEdit();
        $('.fileupload').fileupload({
            uploadtype: "image",
            name: "userfile"
        });
    });
</script>
<? $this->load->view('user/main-menu_view') ?>
<form action="<?= base_url('user/account.html') ?>" id="form-account" method="post" enctype="multipart/form-data" class="form-horizontal">
    <input type="hidden" value="1" name="update" />
    <fieldset>
        <div class="control-group">
            <label class="control-label" for="username"><?= $this->lang->line('username') ?></label>
            <div class="controls">
                <div class="input-append input-prepend">
                    <span class="add-on">http://</span>
                    <input type="text" class="editable" id="username" name="username" value="<?= $username ?>">
                    <span class="add-on">.distroit.com</span>
                </div>
            </div>
        </div>  
        <div class="control-group">
            <label class="control-label" for="email"><?= $this->lang->line('email') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="email" disabled="yes" value="<?= $email ?>">
                <input type="hidden" name="email" value="<?= $email ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="userfile"><?= $this->lang->line('pict') ?></label>
            <div class="controls">
                <div class="fileupload fileupload-new" data-provides="fileupload">
                    <div class="fileupload-new thumbnail" style="width: 200px;">
                        <img src="<?= base_url('upload/img/pict/' . $pict) ?>">
                    </div>
                    <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
                    <div>
                        <span class="btn btn-file"><span class="fileupload-new"><?= $this->lang->line('pict_select') ?></span>
                            <span class="fileupload-exists"><?= $this->lang->line('pict_change') ?></span><input type="file"/>
                        </span>
                        <a href="#" class="btn fileupload-exists" data-dismiss="fileupload"><?= $this->lang->line('pict_remove') ?></a>
                    </div>
                </div>
                <p><?= $this->lang->line('pict_note') ?></p>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="gender"><?= $this->lang->line('gender') ?></label>
            <div class="controls">
                <select id="gender" name="gender" class="input-block-level">
                    <option value="">--<?= $this->lang->line('select_gender') ?>--</option>
                    <option <?= ($gender == "M") ? 'selected="yes"' : '&nbsp;' ?> value="M"><?= $this->lang->line('male') ?></option>
                    <option <?= ($gender == "F") ? 'selected="yes"' : '&nbsp;' ?> value="F"><?= $this->lang->line('female') ?></option>
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="phone"><?= $this->lang->line('phone') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="phone" name="phone" value="<?= $user_phone ?>">
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary"><?= $this->lang->line('save') ?></button>
        </div>
    </fieldset>
</form>