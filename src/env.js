(function (window) {
    // https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'https://246gg84zg8.execute-api.us-west-2.amazonaws.com/prod/projects';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.debug = true;
    /*
    window.__env.mapbox key1 = 'AIzaSyBrRJ6sdmTmH4a';
    window.__env.mapbox key2 = 'VSGLT8xA8dC3J66CEaA0';
    window.__env.mapbox url = 'https://maps.googleapis.com/maps/api/js?key='+key1+key2;
    */
    // mapbox
    window.__env.center = [-99.205,19.430];
    window.__env.zoom = 12.5;
    window.__env.token1 = 'pk';
    window.__env.token2 = 'eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9';
    window.__env.token3 = '2iSMaogLhpWWMBql2_SBFg';
    window.__env.style = 'mapbox://styles/mapbox/streets-v11';
}(this));