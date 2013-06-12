<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAWJH6AmcOpVee_n_d1YBDMMFKVTIjlejQ&sensor=false&callback=initialize"></script>
<style>
    img{
        max-width: none
    }
</style>
<script>
    var Lat;
    var Long;
    function getLocation() {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                Lat = position.coords.latitude;
                Long = position.coords.longitude;	
                
                var myCenter1=new google.maps.LatLng(-7.153536818242016,112.65247285366058);
                var myCenter2=new google.maps.LatLng(Lat,Long);
                var mapProp = {
                    center:myCenter1,
                    zoom:10,
                    scrollwheel: false,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
                var marker1=new google.maps.Marker({
                    position:myCenter1
                });

                var marker2=new google.maps.Marker({
                    position:myCenter2,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });
                marker1.setMap(map);
                marker2.setMap(map);
            });
        }else
            document.getElementById("googleMapNotify").innerHTML="Geolocation is not supported by this browser.";
    }
    
    function initialize() {
        var myCenter=new google.maps.LatLng(-7.153536818242016,112.65247285366058);
        var mapProp = {
            center:myCenter,
            zoom:10,
            scrollwheel: false,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
        var marker=new google.maps.Marker({
            position:myCenter
        });

        marker.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
</script>

<button onclick="getLocation()" class="btn btn-info">Get MyLocation</button>
<div id="googleMapNotify"></div>
<div id="googleMap" style="margin-top: 10px;width:100%;height:600px;"></div>