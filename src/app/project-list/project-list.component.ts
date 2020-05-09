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
  callback$: Observable<any>; // async
  driving$: Observable<any>;

  constructor(
    private envService: EnvService,
    private apiService: ApiService
  ) {
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

    // line
    map.on('load', () => {
      console.log('Map Loaded');
      /* matching driving
      let q = 'https://api.mapbox.com/matching/v5/mapbox/driving/';
      q += '-87.632,41.884;';
      q += '-87.631,41.880;';
      q += '-87.641,41.883;';
      q += '-87.658,41.883;';
      q += '-87.645,41.897';
      q += '?geometries=geojson&radiuses=25;25;25;25;25&steps=true&access_token=';
      q += this.accessToken;
      */
      // directions driving
      let q = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
      q += '-99.205,19.430;'; // dickens -99.205358, 19.430442
      q += '-87.645,41.897'; // echo 87.6455885, 41.897641
      q += '?geometries=geojson&steps=true&overview=full&language=en';
      q += '&access_token=';//polyline
      q += this.accessToken;
      this.driving$ = this.apiService.get(q);
      this.driving$.subscribe((data) => {
        if (data.matchings && data.matchings.length > 0) {
          const coords = data.matchings[0].geometry;
          // Draw matching driving directions route on the map
          map.addLayer(this.initFeatureRoute(coords));
        } else if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry;
          // Draw matching driving directions route on the map
          map.addLayer(this.initFeatureRoute(coords));
        } else {
          console.log('driving-data', data);
        }
      });
    });
  };

  initFeatureRoute(coords) {
    const temp = {
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
        "line-opacity": 0.8,
        // "line-width": 4, 'line-dasharray': [2, 2]
      }
    };
    // "geometry": {"type": "LineString","coordinates": coordinates}
    return temp;
  };

  getProjects() {
    const url = this.envService.apiUrl;
    if (this.envService.debug) {
      console.log('API', url)
    }
    const coordinates = [];

    // observable
    this.callback$ = this.apiService.get(url);
    this.callback$.subscribe((response) => {
      if (this.envService.debug) {
        console.log('response.projects', response)
      }

      // sort
      this.projects = response.body.Items.sort((a, b) => {
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
      // .setIcon()
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
    return popup;
  };

  onClick(project) {
    if (this.envService.debug) {
      console.log('Project Clicked', project);
    }
    this.initPopup(project);
    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.flyTo({ center: project.Coordinates });
  };
};
