<?
$username = $user->user_name;
$email = $user->user_email;
$gender = $user->user_gender;
$user_phone = !empty($user->user_phone) ? $user->user_phone : $this->lang->line('unset');
?>
<div class="well" style="padding: 8px 0;">
    <ul class="nav nav-list">
        <li class="nav-header"><i class="icon-heart"></i><?= $this->lang->line('username') ?></li>
        <li><?= $username ?></li>
        <li class="nav-header"><i class="icon-user"></i><?= $this->lang->line('gender') ?></li>
        <? if ($gender == 'M') { ?>
            <li><?= $this->lang->line('male') ?></li>
        <? } else if ($gender == 'F') { ?>
            <li><?= $this->lang->line('female') ?></li>
        <? } ?>
        <li class="nav-header"><i class="icon-envelope"></i>Email</li>
        <li><?= $email ?></li>
        <li class="nav-header"><i class="icon-bell"></i><?= $this->lang->line('phone') ?></li>
        <li><?= $user_phone ?></li>
        <? if (is_profile() == TRUE) { ?>
            <li class="nav-header"><a href="<?= base_url('user/account.html') ?>"><i class="icon-cog"></i> <?= $this->lang->line('account_update') ?></a></li>
            <? } ?>
    </ul>
</div>