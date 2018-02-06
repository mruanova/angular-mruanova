// google maps global variables
let geocoder;
let map;
let markers = [];

// initialize google maps
function initialize() {
    geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(41.8838158, -87.6415424);
    let mapOptions = {
        zoom: 14,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

// add a marker in google maps for each project
function addMarker(index, title, website, address) {
    console.log(index);
    console.log(title);
    console.log(website);
    console.log(address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: title
            });
            markers.push(marker);
            let contentString = '<div id="content">' +
                '<div class="company">' + title + '</div>' +
                '<div id="bodyContent">' +
                '<div class="website">' + website + '</div>' +
                '<div class="address">' + address + '</div>' +
                '</div>' +
                '</div>';
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            if (index === 1) {
                infowindow.open(map, marker);
            }
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }
    });
};

// google maps on click geo code
function mapGeoCode(name, website, position, address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            // set center of the map
            map.setCenter(results[0].geometry.location);
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers.length = 0;
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: name
            });
            let contentString = '<div id="content">' +
                '<div class="link2">' + name + '</div>' +
                '<div id="bodyContent">' +
                '<div class="website">' + website + '</div>' +
                '<div class="address">' + address + '</div>' +
                '</div>' +
                '</div>';
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
        }
    });
};