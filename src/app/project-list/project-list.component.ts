import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
// https://docs.mapbox.com/help/tutorials/get-started-map-matching-api/
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

    // https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
    /*
    var directions = new MapboxDirections({
      accessToken: this.accessToken,
      unit: 'metric',
      profile: 'cycling'
    });
    map.addControl(directions);
    */

    /*
    var directions = new mapboxgl.Directions({
      unit: 'metric',
      profile: 'driving',
      container: 'directions',
      interactive: false,
      controls: false,
      proximity: [-117.3186111, 33.10388889]
    });
    directions.setOrigin([-117.1425, 32.63638889]);
    directions.addWaypoint(0, [-117.1425, 32.63638889]);
    directions.addWaypoint(1, [-117.195, 32.75416667]);
    directions.addWaypoint(2, [-116.5616667, 32.93583333]);
    directions.setDestination([-116.5616667, 32.93583333]);
    map.addControl(directions);
    */

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

    // driving directions
    /*
    map.on('load', () => {
      if (this.envService.debug) {
        console.log('driving', driving)
      }
      const coordinates = [];
      coordinates.push(this.envService.center);
      coordinates.push([-87.651952, 41.948976]);
      coordinates.push([-87.646014, 41.897464]);
      coordinates.push([-87.6455885, 41.897641]);
      // observable
      this.callback$ = this.apiService.get(driving);
      this.callback$.subscribe((data) => {
        if (this.envService.debug) {
          console.log('response', data)
          // map.addLayer(data);
          map.addLayer(this.initLineString(coordinates));
        }
      });
    });
    */

    // directions
    /*
    var directions = new MapboxDirections({
      accessToken: this.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    });
    */
    // var directions = new mapboxgl.Directions({ unit: 'metric', profile: 'cycling' });
    /*
    map.addControl(new MapboxDirections({
      accessToken: this.accessToken
    }), 'top-left');
    */
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
    this.callback$.subscribe((data) => {
      if (this.envService.debug) {
        console.log('response', data)
      }

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

      // line
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


  // https://api.mapbox.com/matching/v5/mapbox/driving/-122.41726781632528,37.805181910286095;-122.40676819342406,37.79796473677784;-122.41839060836948,37.79628622326355;-122.4148401578509,37.80163335496064?geometries=geojson&radiuses=25;25;25;25&steps=true&access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg

  // Make a Map Matching request
  /*
  getMatch(coordinates, radius, profile) {
    // Separate the radiuses with semicolons
    var radiuses = radius.join(';')
    // Create the query
    var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
    console.log(query)
    $.ajax({
      method: 'GET',
      url: query
    }).done((data) => {
      var coords = data.matchings[0].geometry;
      // Draw the route on the map
      this.addRoute(coords);
      this.getInstructions(data.matchings[0]);
    });
  };
  */

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

  getInstructions(data) {
    // Target the sidebar to add the instructions
    var directions = document.getElementById('directions');
    var legs = data.legs;
    var tripDirections = [];
    // Output the instructions for each step of each leg in the response object
    for (var i = 0; i < legs.length; i++) {
      var steps = legs[i].steps;
      for (var j = 0; j < steps.length; j++) {
        tripDirections.push('<br><li>' + steps[j].maneuver.instruction) + '</li>';
      }
    }
    directions.innerHTML = '<br><h2>Trip duration: ' + Math.floor(data.duration / 60) + ' min.</h2>' + tripDirections;
  };

  // map.on('draw.delete', removeRoute);

  // If the user clicks the delete draw button, remove the layer if it exists
  removeRoute() {
    if (map.getSource('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    } else {
      return;
    }
  };

  // https://github.com/mapbox/mapbox-gl-directions
  // https://docs.mapbox.com/api-playground/#/directions/?_k=86u7o8
  // /directions/v5/{profile}/{coordinates}.
  /*
  const directions = 'https://api.mapbox.com/directions/v5/mapbox/driving/-87.651%2C41.948%3B-87.645%2C41.897.json?overview=full&access_token=pk.eyJ1IjoibXJ1YW5vdmEiLCJhIjoiY2p6dWs2YmcxMDVmYTNocGZ2Z2hiMDlqYiJ9.2iSMaogLhpWWMBql2_SBFg';
  const json = {
    "routes": [
      {
        "geometry": "i}__Gvi~uO@vDtBCEg[aGwWfu@a]vZub@rM}Cz[Ax_Bq]~B`GkEnOPbGrAvCzIB^|~@xyAkBD~K",
        "legs": [
          {
            "summary": "",
            "weight": 1529.2,
            "duration": 1076,
            "steps": [],
            "distance": 8588.4
          }
        ],
        "weight_name": "routability",
        "weight": 1529.2,
        "duration": 1076,
        "distance": 8588.4
      }
    ],
    "waypoints": [
      {
        "distance": 12.442359661918866,
        "name": "",
        "location": [
          -87.650997,
          41.947888
        ]
      },
      {
        "distance": 61.21021573140122,
        "name": "West Chicago Avenue",
        "location": [
          -87.644986,
          41.896449
        ]
      }
    ],
    "code": "Ok",
    "uuid": "ck01p5cru0yas4cnrxyr284e3"
  };
  */
};
