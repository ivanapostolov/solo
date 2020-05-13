function loadMap() {
    let lat = 42.698334;
    let lng = 23.319941;

    let mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 4,
        disableDefaultUI: true,
    };

    let map = new google.maps.Map(document.getElementById("formMapPane"), mapProp);

    let marker = new google.maps.Marker({ position: new google.maps.LatLng(lat, lng), map: map });

    const LatLimit = Math.atan(Math.sinh(Math.PI)) * 180 / Math.PI;

    google.maps.event.addListener(map, 'drag', function () {
        let sLat = map.getBounds().getSouthWest().lat();
        let nLat = map.getBounds().getNorthEast().lat();

        //limit till gray area is reached approximatly equal to 85.05112878

        if (sLat < -LatLimit || nLat > LatLimit) {
            map.setCenter(new google.maps.LatLng(lat, lng));
        }
    });

    google.maps.event.addListener(map, 'click', function (event) {
        if (document.getElementById('lat') !== null) {
            lat = event.latLng.lat();
            lng = event.latLng.lng();
            updateMarker();
            $("#lat").val(lat);
            $("#lng").val(lng);
        }
    });

    const regex = RegExp('^(([-][0-9]+[.][0-9]+)|([-][0-9]+)|([0-9]+[.][0-9]+)|([0-9]+))$');

    document.getElementById("lat").addEventListener("input", () => {
        let newLat = document.getElementById("lat").value;

        if (newLat !== '' && regex.test(newLat) && newLat !== undefined) {
            lat = newLat % LatLimit;
            updateMarker();
        }
    });

    document.getElementById("lng").addEventListener("input", () => {
        let newLng = document.getElementById("lng").value;

        if (newLng !== '' && regex.test(newLng) && newLng !== undefined) {
            lng = newLng % 180;
            updateMarker();
        }
    });

    function updateMarker() {
        marker.setMap(null);
        marker = new google.maps.Marker({ position: new google.maps.LatLng(lat, lng), map: map });
    }
}