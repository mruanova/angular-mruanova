import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

declare const mapboxgl: any;
// declare const google: any; 
// let map;

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.6455885, 41.897641]
    },
    properties: {
      title: 'Mapbox',
      description: 'ECHO'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.6581098, 41.8835165]
    },
    properties: {
      title: 'Mapbox',
      description: 'COATES'
    }
  }]
}; // 

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements AfterViewInit {
  title = '';
  projects = [];
  /*
  geocoder = null;
  map = null;
  */
  callback$: Observable<any>;

  constructor(private apiService: ApiService, private envService: EnvService) { };

  // get all the projects from the api
  ngAfterViewInit() {
    mapboxgl.accessToken = this.envService.token1 + '.' + this.envService.token2 + '.' + this.envService.token3;
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.envService.style,
      center: this.envService.center,
      zoom: this.envService.zoom
    });
    // api
    this.callback$ = this.apiService.getProjects();
    this.callback$.subscribe((data) => {
      this.projects = data.Items.sort(function (a, b) {
        return parseFloat(a.ProjectId) - parseFloat(b.ProjectId);
      });
      if (this.envService.debug) {
        console.log('projects', this.projects);
      }
      // this.geocoder = new google.maps.Geocoder();
      // const latlng = new google.maps.LatLng(41.9351088, -87.6419177); // default
      // const mapOptions = {zoom: 14, center: latlng};
      // map = new google.maps.Map(document.getElementById('map'), mapOptions);
      /*
      for (let project = 0; project < this.projects.length; project++) {
        this.addMarker(
          this.projects[project].ProjectId,
          this.projects[project].Name,
          this.projects[project].Website,
          this.projects[project].Address);
      }
      */
      // add markers to map
      // this.projects.forEach(function (marker) {
      geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        console.log('marker', marker);
        // make a marker for each feature and add to the map
        const pin = new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .addTo(map); // mapboxgl
        console.log('pin', pin);
      });
    });
    /*
    var marker = new mapboxgl.Marker()
      .setLngLat(this.envService.center)
      .addTo(map);
    */
    /*
      mapGeoCode(name, website, position, address) {
        this.geocoder.geocode({ 'address': address }, function (results, status) {
          if (status === 'OK') {
            // set center of the map
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: name
            });
            const contentString = '<div id="content">' +
              '<div class="link2">' + name + '</div>' +
              '<div id="bodyContent">' +
              '<div class="website">' + website + '</div>' +
              '<div class="address">' + address + '</div>' +
              '</div>' +
              '</div>';
            const infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker.addListener('click', function () {
              infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
          }
        });
      };
    */

    /*
    L.mapbox.accessToken = '..';
    var map = L.mapbox.map('map')
    .setView(center, zoom)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    */
    // Add zoom and rotation controls to the map.
    // map.addControl(new mapboxgl.NavigationControl());
    /*
    map.on('load', function () {
      // Add a symbol layer.
      map.addLayer({
        "id": "symbols",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.395263671875,
                    -0.9145729757782163

                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.32958984375,
                    -0.6344474832838974
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.34033203125,
                    0.01647949196029245
                  ]
                }
              }
            ]
          }
        },
        "layout": {
          "icon-image": "rocket-15"
        }
      });

      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      map.on('click', 'symbols', function (e) {
        map.flyTo({ center: e.features[0].geometry.coordinates });
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on('mouseenter', 'symbols', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = '';
      });
    });
    */
  };

  // add a marker in google maps for each project
  addMarker(index, title, website, address) {
    if (this.envService.debug) {
      console.log(index);
      console.log(title);
      console.log(website);
      console.log(address);
    }

    /*
    this.geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        const marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          title: title
        });
        // markers.push(marker);
        const contentString = '<div id="content">' +
          '<div class="company">' + title + '</div>' +
          '<div id="bodyContent">' +
          '<div class="website">' + website + '</div>' +
          '<div class="address">' + address + '</div>' +
          '</div>' +
          '</div>';
        const infowindow = new google.maps.InfoWindow({
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
    */
  };
};
