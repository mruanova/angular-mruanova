import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

let map: Map;

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements AfterViewInit {
  projects = [];
  accessToken = null;
  callback$: Observable<any>; // TODO: async pipe
  driving$: Observable<any>; // TODO: async pipe

  constructor(private apiService: ApiService, private envService: EnvService) {
    this.accessToken = envService.token1 + '.' + envService.token2 + '.' + envService.token3;
    localStorage.setItem('MapboxAccessToken', this.accessToken);
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

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.Directions());

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', function () {
      map.getCanvas().style.cursor = '';
    });

    // api mruanova/projects
    this.getProjects();

  };

  initLineString(coordinates) {
    const temp = {
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
        "line-width": 5
      }
    };
    return temp;
  };

  getProjects() {
    const url = this.envService.apiUrl;
    if (this.envService.debug) {
      console.log('API', url)
    }
    const coordinates = []; // this.envService.center

    // observable
    this.callback$ = this.apiService.get(url);
    this.callback$.subscribe((response) => {
      if (this.envService.debug) {
        console.log('response.projects', response)
      }

      // sort
      this.projects = response.Items.sort((a, b) => {
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

      // line
      map.on('load', () => {
        console.log('load');
        // straight lines
        // map.addLayer(this.initLineString(coordinates));

        // https://docs.mapbox.com/help/tutorials/get-started-map-matching-api/

        // https://api.mapbox.com/matching/v5/mapbox/driving/-87.64344155711386,41.89764740828636;-87.62357175273125,41.90036255342116;-87.6235288373869,41.890044387768455?geometries=geojson&radiuses=25;25;25&steps=true&access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg
        // draw driving directions
        let q = 'https://api.mapbox.com/matching/v5/mapbox/driving/-87.64344155711386,41.89764740828636;-87.62357175273125,41.90036255342116;-87.6235288373869,41.890044387768455?geometries=geojson&radiuses=25;25;25&steps=true&access_token=';
        q += this.accessToken;
        this.driving$ = this.apiService.get(q);
        this.driving$.subscribe((data) => {
          if (this.envService.debug) {
            console.log('driving', data);
          }
          var coords = data.matchings[0].geometry;
          // Draw the route on the map
          this.addRoute(coords);
        });
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
    // TODO: "icon-image": "rocket-15"
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

  addRoute(coords) {
    // If a route is already loaded, remove it
    if (map.getSource('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    } else {
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": coords
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#03AA46",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    };
  };

};
