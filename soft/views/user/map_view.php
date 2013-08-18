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
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                Lat = position.coords.latitude;
                Long = position.coords.longitude;

                document.getElementById("latbox").value = Lat;
                document.getElementById("lngbox").value = Long;
                myCenter = new google.maps.LatLng(Lat, Long);
                var map = new google.maps.Map(document.getElementById("googleMap"), {
                    center: myCenter,
                    zoom: 10,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                });
                var marker = new google.maps.Marker({
                    position: myCenter,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    draggable: true
                });
                marker.setMap(map);
                google.maps.event.addListener(marker, 'dragend', function(event) {
                    document.getElementById("latbox").value = event.latLng.lat();
                    document.getElementById("lngbox").value = event.latLng.lng();
                    $.post('<?= base_url('user/map_update') ?>', {latitude: event.latLng.lat(), longitude: event.latLng.lng()}, function() {
                    }, "json");
                });
            });
        } else
            document.getElementById("googleMapNotify").innerHTML = "Geolocation is not supported by this browser.";
    }

    function initialize() {
<? if ($latitude == NULL || $longitude == NULL) { ?>
            myCenter = new google.maps.LatLng(-7.153536818242016, 112.65247285366058);
<? } else { ?>
            document.getElementById("latbox").value = <?= $latitude ?>;
            document.getElementById("lngbox").value = <?= $longitude ?>;
            myCenter = new google.maps.LatLng(<?= $latitude ?>, <?= $longitude ?>);
<? } ?>
        var map = new google.maps.Map(document.getElementById("googleMap"), {
            center: myCenter,
            zoom: 10,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        var marker = new google.maps.Marker({
            position: myCenter,
            draggable: true
        });
        marker.setMap(map);
        google.maps.event.addListener(marker, 'dragend', function(event) {
            document.getElementById("latbox").value = event.latLng.lat();
            document.getElementById("lngbox").value = event.latLng.lng();
            $.post('<?= base_url('user/map_update') ?>', {latitude: event.latLng.lat(), longitude: event.latLng.lng()}, function() {
            }, "json");
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
</script>
<? $this->load->view('user/main-menu_view') ?>
<div class="form-horizontal">
    <input size="20" type="text" id="latbox" name="lat" placeholder="Latitude">&nbsp;
    <input size="20" type="text" id="lngbox" name="lng" placeholder="Longitude">&nbsp;
    <button onclick="getLocation()" class="btn btn-info">Get MyLocation</button>
</div>
<br>
<div id="googleMapNotify"></div>
<div id="googleMap" style="width:100%;height:600px;"></div>
