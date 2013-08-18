<?
$latitude = $map->user_latitude;
$longitude = $map->user_longitude;
?>
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAWJH6AmcOpVee_n_d1YBDMMFKVTIjlejQ&sensor=false&callback=initialize"></script>
<style>
    img{
        max-width: none
    }
</style>
<script>
    var Lat;
    var Long;
    var myCenter;
    function initialize() {
<? if ($latitude == NULL || $longitude == NULL) { ?>
            myCenter = new google.maps.LatLng(-7.153536818242016, 112.65247285366058);
<? } else { ?>
            myCenter = new google.maps.LatLng(<?= $latitude ?>, <?= $longitude ?>);
            var marker = new google.maps.Marker({
                position: myCenter
            });
<? } ?>
        var map = new google.maps.Map(document.getElementById("googleMap"), {
            center: myCenter,
            zoom: 10,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        marker.setMap(map);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
</script>
<div id="googleMap" style="width:100%;height:600px;"></div>
