import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

// declare const google: any;
// let map;
declare const mapboxgl: any;

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  title = '';
  projects = [];
  geocoder = null;
  map = null;
  callback$: Observable<any>;

  constructor(private apiService: ApiService, private envService: EnvService) { };

  // get all the projects from the api
  ngOnInit() {
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
      this.projects.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        console.log('marker', marker);
        // make a marker for each feature and add to the map
        /*
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(mapboxgl);
        */
      });
      // ************
      var geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }]
      };
      /*
      // add markers to map
      geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        console.log('marker', marker);
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(mapboxgl);
      });
      */
    });
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
};
