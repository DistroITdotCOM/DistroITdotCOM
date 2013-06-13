<footer>
    <div class="row">
        <ul style="margin-top: 10px;margin-left: 30px;float:left">
            <? if ($this->session->userdata('lang') == 'english') { ?>
                <li>Ubah bahasa : <a href="<?= site_url('home/change_lang') ?>">Indonesia</a></li>
            <? } else { ?>
                <li>Change language : <a href="<?= site_url('home/change_lang') ?>">English</a></li>
            <? } ?>
        </ul>
        <!--        <ul style="width: 305px;margin-top: 10px;float:right">
                    <li style="margin: 0 2.5px;width: 60px;float:left">
                        <script src="https://apis.google.com/js/plusone.js"></script>
                    <g:plusone size="medium" href="http://distroit.com"></g:plusone>
                    </li>
                    <li style="margin: 0 2.5px;width: 70px;float:left">
                        <iframe src="http://www.facebook.com/plugins/like.php?app_id=110842935626103&amp;href=http://www.facebook.com/pages/DistroITdotCOM/185939418130341&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" 
                                scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>
                    </li>
                    <li style="margin: 0 2.5px;width: 80px;float:left">
                        <a href="http://twitter.com/DistroITdotCOM" class="twitter-follow-button" data-button="grey" data-text-color="#FFFFFF" data-link-color="#00AEFF" data-show-count="false"></a>
                        <script src="//platform.twitter.com/widgets.js"></script>
                    </li>
                </ul>-->
    </div>
</footer>
<? if (!empty($notification)) { ?>
    <script>
        $(function() {
    <? if ($notification == 'Login Successfully.' || $notification == 'Login Sukses.') { ?>
                $('#user-menu').modal('show');
    <? } ?>
            message = ['bottom-right', 'blackgloss', '<?= $notification ?>'];
            $('.' + message[0]).notify({
                message: {
                    text: message[2]
                },
                type: message[1],
                fadeOut: {
                    enabled: true,
                    delay: 10000
                }
            }).show();
        });
    </script>
<? } ?>
<div class='notifications bottom-right'></div>