document.addEventListener('DOMContentLoaded', function () {
    // ready
    mapboxgl.accessToken = 'pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90.96, -0.47],
        zoom: 8
    }); // center: [41.9351088, -87.6419177], zoom: 14
}, false);