<div class="well span4" style="margin-left: 0;margin-right: 25px;padding: 8px 0">
    <ul class="nav nav-list">
        <li class="nav-header"><i class="icon-heart"></i><?= $this->lang->line('username') ?></li>
        <li><?= $user->user_name ?></li>
        <li class="nav-header"><i class="icon-user"></i><?= $this->lang->line('gender') ?></li>
        <? if ($user->user_gender == 'M') { ?>
            <li><?= $this->lang->line('male') ?></li>
        <? } else { ?>
            <li><?= $this->lang->line('female') ?></li>
        <? } ?>
        <li class="nav-header"><i class="icon-envelope"></i>Email</li>
        <li><?= $user->user_email ?></li>
        <li class="nav-header"><i class="icon-bell"></i><?= $this->lang->line('phone') ?></li>
        <li><?= !empty($user->user_phone) ? $user->user_phone : $this->lang->line('unset') ?></li>
        <? if (is_profile() == TRUE) { ?>
            <li class="nav-header"><a href="<?= site_url('user/account') ?>"><i class="icon-cog"></i> <?= $this->lang->line('account_update') ?></a></li>
        <? } ?>
    </ul>
</div>
<div class="well span5" style="margin-left: 0;padding: 8px 0">
    <ul class="nav nav-list">
        <li class="nav-header"><i class="icon-road"></i><?= $this->lang->line('home_address') ?></li>
        <li><?= $user->user_address ?></li>
        <li class="nav-header"><i class="icon-home"></i><?= $this->lang->line('city') ?></li>
        <li><?= $user->user_city ?></li>
        <li class="nav-header"><i class="icon-map-marker"></i><?= $this->lang->line('state') ?></li>
        <li><?= $user->state_name ?></li>
        <li class="nav-header"><i class="icon-inbox"></i><?= $this->lang->line('zip') ?></li>
        <li><?= $user->user_zip ?></li>
        <? if (is_profile() == TRUE) { ?>
            <li class="nav-header"><a href="<?= site_url('user/address') ?>"><i class="icon-cog"></i> <?= $this->lang->line('address_update') ?></a></li>
            <? } ?>
    </ul>
</div>