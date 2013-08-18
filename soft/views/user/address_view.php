<?
$user_fullname = $address->user_fullname;
$user_address = $address->user_address;
$user_city = $address->user_city;
$state_state_id = $address->state_state_id;
$user_zip = $address->user_zip;
?>
<script>
    $(function() {
        $("#form-address").validate({
            rules: {
                company: {
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
                company: {
                    required: "<?= $this->lang->line('company_required') ?>"
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
            }
        });
    });
</script>
<? $this->load->view('user/main-menu_view') ?>
<form action="<?= site_url('user/address') ?>" id="form-address" method="post" class="form-horizontal">
    <input type="hidden" value="1" name="update" />
    <fieldset>
        <div class="control-group">
            <label class="control-label" for="company"><?= $this->lang->line('company_name') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="company" name="company" value="<?= $user_fullname ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="address"><?= $this->lang->line('home_address') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="address" name="address" value="<?= $user_address ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="city"><?= $this->lang->line('city') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="city" name="city" value="<?= $user_city ?>">
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
                    <option value="1" <?= ($state_state_id == '1') ? 'selected="yes"' : '' ?>>D.K.I. Jakarta</option>
                    <option value="2" <?= ($state_state_id == '2') ? 'selected="yes"' : '' ?>>Jawa Barat</option>
                    <option value="3" <?= ($state_state_id == '3') ? 'selected="yes"' : '' ?>>Jawa Tengah</option>
                    <option value="4" <?= ($state_state_id == '4') ? 'selected="yes"' : '' ?>>D.I. Yogyakarta</option>
                    <option value="5" <?= ($state_state_id == '5') ? 'selected="yes"' : '' ?>>Jawa Timur</option>
                    <option value="6" <?= ($state_state_id == '6') ? 'selected="yes"' : '' ?>>Nanggroe Aceh Darussalam</option>
                    <option value="7" <?= ($state_state_id == '7') ? 'selected="yes"' : '' ?>>Sumatera Utara</option>
                    <option value="8" <?= ($state_state_id == '8') ? 'selected="yes"' : '' ?>>Sumatera Barat</option>
                    <option value="9" <?= ($state_state_id == '9') ? 'selected="yes"' : '' ?>>Riau</option>
                    <option value="10" <?= ($state_state_id == '10') ? 'selected="yes"' : '' ?>>Jambi</option>
                    <option value="11" <?= ($state_state_id == '11') ? 'selected="yes"' : '' ?>>Sumatera Selatan</option>
                    <option value="12" <?= ($state_state_id == '12') ? 'selected="yes"' : '' ?>>Lampung</option>
                    <option value="13" <?= ($state_state_id == '13') ? 'selected="yes"' : '' ?>>Kalimantan Barat</option>
                    <option value="14" <?= ($state_state_id == '14') ? 'selected="yes"' : '' ?>>Kalimantan Tengah</option>
                    <option value="15" <?= ($state_state_id == '15') ? 'selected="yes"' : '' ?>>Kalimantan Selatan</option>
                    <option value="16" <?= ($state_state_id == '16') ? 'selected="yes"' : '' ?>>Kalimantan Timur</option>
                    <option value="17" <?= ($state_state_id == '17') ? 'selected="yes"' : '' ?>>Sulawesi Utara</option>
                    <option value="18" <?= ($state_state_id == '18') ? 'selected="yes"' : '' ?>>Sulawesi Tengah</option>
                    <option value="19" <?= ($state_state_id == '19') ? 'selected="yes"' : '' ?>>Sulawesi Selatan</option>
                    <option value="20" <?= ($state_state_id == '20') ? 'selected="yes"' : '' ?>>Sulawesi Tenggara</option>
                    <option value="21" <?= ($state_state_id == '21') ? 'selected="yes"' : '' ?>>Maluku</option>
                    <option value="22" <?= ($state_state_id == '22') ? 'selected="yes"' : '' ?>>Bali</option>
                    <option value="23" <?= ($state_state_id == '23') ? 'selected="yes"' : '' ?>>Nusa Tenggara Barat</option>
                    <option value="24" <?= ($state_state_id == '24') ? 'selected="yes"' : '' ?>>Nusa Tenggara Timur</option>
                    <option value="25" <?= ($state_state_id == '25') ? 'selected="yes"' : '' ?>>Papua</option>
                    <option value="26" <?= ($state_state_id == '26') ? 'selected="yes"' : '' ?>>Bengkulu</option>
                    <option value="27" <?= ($state_state_id == '27') ? 'selected="yes"' : '' ?>>Banten</option>
                    <option value="28" <?= ($state_state_id == '28') ? 'selected="yes"' : '' ?>>Bangka Belitung</option>
                    <option value="29" <?= ($state_state_id == '29') ? 'selected="yes"' : '' ?>>Gorontalo</option>
                    <option value="30" <?= ($state_state_id == '30') ? 'selected="yes"' : '' ?>>Maluku Utara</option>
                    <option value="31" <?= ($state_state_id == '31') ? 'selected="yes"' : '' ?>>Kepulauan Riau</option>
                    <option value="32" <?= ($state_state_id == '32') ? 'selected="yes"' : '' ?>>Papua Barat</option>
                    <option value="33" <?= ($state_state_id == '33') ? 'selected="yes"' : '' ?>>Sulawesi Barat</option>
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="zip"><?= $this->lang->line('zip') ?></label>
            <div class="controls">
                <input type="text" class="input-block-level" id="zip" name="zip" value="<?= $user_zip ?>">
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary"><?= $this->lang->line('save') ?></button>
        </div>
    </fieldset>
</form>