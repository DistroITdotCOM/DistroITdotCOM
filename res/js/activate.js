$(function() {
    $(".activate").click(function() {
        var div = $(this).attr("class").split(' ')[1];
        var url = $(this).attr("href");
        $.ajax({
            type: "POST",
            data: "ajax=1",
            url: url,
            beforeSend: function() {
                $('#' + div).html('<div style="text-align: center"><img src="' + loading_image_small + '"/></div>');
            },
            success: function(msg) {
                $('#' + div).html(msg);
            }
        });
        return false;
    });
});