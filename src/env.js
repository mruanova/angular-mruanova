(function (window) {
    // https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'https://246gg84zg8.execute-api.us-west-2.amazonaws.com/prod';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.debug = true;
    /*
    const key1 = 'AIzaSyBrRJ6sdmTmH4a';
    const key2 = 'VSGLT8xA8dC3J66CEaA0';
    const url = 'https://maps.googleapis.com/maps/api/js?key='+key1+key2;
    */
    // mapbox
    window.__env.mapbox = 'pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg';
}(this));