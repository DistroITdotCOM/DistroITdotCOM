<?
$username = $user->user_name;
$pict = !empty($user->user_pict) ? $user->user_pict : '../no-img.jpg';
?>
<script>
    $(function() {
        $("#content").load('<?= site_url('profile/info') ?>', {ajax: 1});
        $("#myTab a").click(function() {
            var $this = $(this);
            $this.parent().siblings().removeClass('active');
            $this.parent().addClass('active');
            var url = $(this).attr('href');
            $.ajax({
                type: "POST",
                data: "ajax=1",
                url: url,
                beforeSend: function() {
                    $("#content").html('<div style="text-align: center"><img src="' + loading_image_large + '"/></div>');
                },
                success: function(msg) {
                    window.history.pushState('', '', url);
                    $("#content").html(msg);
                }
            });
            return false;
        });
    });
</script>
<div class="row">
    <div class="span3">
        <div class="thumbnail">
            <img src="<?= base_url('res/timthumb.php?src=' . base_url('upload/img/pict/' . $pict) . '&a=t&w=270&h=202') ?>" 
                 alt="<?= $username ?>">
        </div>
        <br>
        <ul id="myTab" class="nav nav-pills nav-stacked">
            <li class="active"><a href="<?= site_url('profile/info') ?>"><?= $this->lang->line('info') ?></a></li>
            <li><a href="<?= site_url('profile/product') ?>"><?= $this->lang->line('product') ?></a></li>
            <li><a href="<?= site_url('profile/location') ?>"><?= $this->lang->line('location') ?></a></li>
        </ul>
    </div>
    <div class="span9">
        <div id="content"></div>
    </div>
</div>