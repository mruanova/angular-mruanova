import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

let map: Map;

// https://docs.mapbox.com/api/#directions
// /directions/v5/{profile}/{coordinates}.
const test = 'https://api.mapbox.com/directions/v5/mapbox/driving/-73.989%2C40.733%3B-74%2C40.733.json?access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg';
/*
# POST request to Map Matching API
$ curl -d
"coordinates=-117.17282,32.71204;-117.17288,32.71225;-117.17293,32.71244;-117.17292,32.71256;-117.17298,32.712603;-117.17314,32.71259;-117.17334,32.71254" "https://api.mapbox.com/matching/v5/mapbox/driving?access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg"
x
# POST request to Directions API with optional parameters
$ curl -d
"coordinates=2.344003,48.85805;2.34675,48.85727;2.34868,48.85936;2.34955,48.86084;2.34955,48.86088;2.349625,48.86102;2.34982,48.86125&steps=true&waypoints=0;6&waypoint_names=Home;Work&banner_instructions=true" "https://api.mapbox.com/directions/v5/mapbox/driving?access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg"
*/

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements AfterViewInit {
  projects = [];
  accessToken = null;
  callback$: Observable<any>;

  constructor(private apiService: ApiService, private envService: EnvService) {
    this.accessToken = envService.token1 + '.' + envService.token2 + '.' + envService.token3;
  };

  // get all the projects from the api
  ngAfterViewInit() {
    mapboxgl.accessToken = this.accessToken;
    map = new mapboxgl.Map({
      container: 'map',
      style: this.envService.style,
      center: this.envService.center,
      zoom: this.envService.zoom
    });

    // TODO: "icon-image": "rocket-15"

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', function () {
      map.getCanvas().style.cursor = '';
    });

    // api
    this.getProjects();
  };

  initLineString(coordinates) {
    return {
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": coordinates
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#888",
        "line-width": 8
      }
    };
  };

  getProjects() {
    const coordinates = []; // this.envService.center
    // observable
    this.callback$ = this.apiService.getProjects();
    this.callback$.subscribe((data) => {
      // sort
      this.projects = data.Items.sort((a, b) => {
        return parseFloat(a.ProjectId) - parseFloat(b.ProjectId);
      });
      // add markers to map
      this.projects.forEach((project) => {
        if (project.Address.indexOf('Chicago') > 0) {
          coordinates.push(project.Coordinates);
        }
        this.initMarker(project);
      });
      // animate
      setTimeout(() => {
        this.onClick(this.projects[0])
      }, 1500);
      // directions
      map.on('load', () => {
        map.addLayer(this.initLineString(coordinates));
      });
    });
  };

  initMarker(project) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    const popup = this.initPopup(project);
    const marker = new mapboxgl.Marker()
      .setLngLat(project.Coordinates)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  };

  initPopup(project) {
    // make a marker for each feature and add to the map
    const contentString = '<div id="content">' +
      '<div class="link2">' + project.Name + '</div>' +
      '<div id="bodyContent">' +
      '<div class="website">' + project.Website + '</div>' +
      '<div class="address">' + project.Address + '</div>' +
      '</div>' +
      '</div>';
    var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 25 })
      .setLngLat(project.Coordinates)
      .setHTML(contentString)
      .addTo(map);
    // .setText('Construction on the Washington Monument began in 1848.')
    return popup;
  };

  onClick(project) {
    if (this.envService.debug) {
      console.log('clicked', project);
    }
    var popup = this.initPopup(project);
    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.flyTo({ center: project.Coordinates });
  };
};
