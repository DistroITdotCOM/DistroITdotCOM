<p>
    <?= $this->lang->line('thanks') ?>
    <br>
    <br>
    <?= $this->lang->line('use_login') ?> 
    <br>
    <?= $this->lang->line('login_detail') ?>
    <br>
    <br>
    Email : <a href="mailto:<?= $email ?>"><?= $email ?></a>
    <br>
    Password : <?= $password ?>
    <br>
    <br>
    <?= $this->lang->line('account_activate') ?>
    <br>
    <br>
    <a href="<?= $activation ?>" target="_blank">
        <?= $activation ?></a>
    <br>
    <br>
    <?= $this->lang->line('see_you') ?>,
    <br>DistroITdotCOM
</p>