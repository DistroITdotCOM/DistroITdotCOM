<script>
    $(function() {
        $("#guest-checkout").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    digits: true
                },
                name: {
                    required: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },
                state: {
                    required: true
                },
                zip: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "<?= $this->lang->line('email_required') ?>",
                    email: "<?= $this->lang->line('email_valid') ?>",
                    emailCheckReg: "<?= $this->lang->line('email_check') ?>"
                },
                phone: {
                    required: "<?= $this->lang->line('phone_required') ?>",
                    digits: "<?= $this->lang->line('phone_digits') ?>"
                },
                name: {
                    required: "<?= $this->lang->line('name_required') ?>"
                },
                address: {
                    required: "<?= $this->lang->line('address_required') ?>"
                },
                city: {
                    required: "<?= $this->lang->line('city_required') ?>"
                },
                country: {
                    required: "<?= $this->lang->line('country_required') ?>"
                },
                state: {
                    required: "<?= $this->lang->line('state_required') ?>"
                },
                zip: {
                    required: "<?= $this->lang->line('zip_required') ?>"
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
                submitFormGuest(form);
            }
        });
        function submitFormGuest(form) {
            var strData = $(form).serialize();

            $.ajax({
                type: 'POST',
                url: '<?= base_url('order/invoice_print') ?>',
                data: strData,
                dataType: "json",
                beforeSend: function() {
                    $('#ajax-header').html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
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

<div class="row">
    <div class="span12">
        <form action="<?= base_url('order/invoice_print') ?>" id="guest-checkout" method="post" class="form-horizontal">
            <input type="hidden" name="ajax" value="1">
            <fieldset><legend><?= $this->lang->line('form_buyer') ?></legend>
                <div class="control-group">
                    <label class="control-label" for="name"><?= $this->lang->line('name') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="name" name="name" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="email_guest"><?= $this->lang->line('email') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="email_guest" name="email" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="phone"><?= $this->lang->line('hp') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="phone" name="phone" value="">
                    </div>
                </div>
            </fieldset>
            <fieldset><legend><?= $this->lang->line('form_shipping') ?></legend>
                <div class="control-group">
                    <label class="control-label" for="address"><?= $this->lang->line('address') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="address" name="address" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="city"><?= $this->lang->line('city') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="city" name="city" value="">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="country"><?= $this->lang->line('country') ?></label>
                    <div class="controls">
                        <select id="country" name="country" class="input-block-level" disabled="yes">
                            <option value="">--<?= $this->lang->line('select_country') ?>--</option>
                            <option selected="yes" value="1">Indonesia</option>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="state"><?= $this->lang->line('state') ?></label>
                    <div class="controls">
                        <select id="state" name="state" class="input-block-level">
                            <option value="">--<?= $this->lang->line('select_state') ?>--</option>
                            <option value="1">D.K.I. Jakarta</option>
                            <option value="2">Jawa Barat</option>
                            <option value="3">Jawa Tengah</option>
                            <option value="4">D.I. Yogyakarta</option>
                            <option value="5">Jawa Timur</option>
                            <option value="6">Nanggroe Aceh Darussalam</option>
                            <option value="7">Sumatera Utara</option>
                            <option value="8">Sumatera Barat</option>
                            <option value="9">Riau</option>
                            <option value="10">Jambi</option>
                            <option value="11">Sumatera Selatan</option>
                            <option value="12">Lampung</option>
                            <option value="13">Kalimantan Barat</option>
                            <option value="14">Kalimantan Tengah</option>
                            <option value="15">Kalimantan Selatan</option>
                            <option value="16">Kalimantan Timur</option>
                            <option value="17">Sulawesi Utara</option>
                            <option value="18">Sulawesi Tengah</option>
                            <option value="19">Sulawesi Selatan</option>
                            <option value="20">Sulawesi Tenggara</option>
                            <option value="21">Maluku</option>
                            <option value="22">Bali</option>
                            <option value="23">Nusa Tenggara Barat</option>
                            <option value="24">Nusa Tenggara Timur</option>
                            <option value="25">Papua</option>
                            <option value="26">Bengkulu</option>
                            <option value="27">Banten</option>
                            <option value="28">Bangka Belitung</option>
                            <option value="29">Gorontalo</option>
                            <option value="30">Maluku Utara</option>
                            <option value="31">Kepulauan Riau</option>
                            <option value="32">Papua Barat</option>
                            <option value="33">Sulawesi Barat</option>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="zip"><?= $this->lang->line('zip') ?></label>
                    <div class="controls">
                        <input type="text" class="input-block-level" id="zip" name="zip" value="">
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary"><?= $this->lang->line('invoice') ?></button>
                </div>
            </fieldset>
        </form>
    </div>
</div>