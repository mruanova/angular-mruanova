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
  title = '';
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
    this.callback$ = this.apiService.getProjects();
    this.callback$.subscribe((data) => {
      this.projects = data.Items.sort((a, b) => {
        return parseFloat(a.ProjectId) - parseFloat(b.ProjectId);
      });
      // add markers to map
      this.projects.forEach((project) => {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        const popup = this.createPopup(project.Name, project.Website, project.Address, project.Coordinates);
        const marker = new mapboxgl.Marker()
          .setLngLat(project.Coordinates)
          .setPopup(popup) // sets a popup on this marker
          .addTo(map);
      });
      // animate
      setTimeout(() => {
        this.mapGeoCode(this.projects[0].Name, 
          this.projects[0].Website, 
          this.projects[0].Position, 
          this.projects[0].Address, 
          this.projects[0].Coordinates)
      }, 1500);
    });
  };

  createPopup(name, website, address, coordinates) {
    // make a marker for each feature and add to the map
    const contentString = '<div id="content">' +
      '<div class="link2">' + name + '</div>' +
      '<div id="bodyContent">' +
      '<div class="website">' + website + '</div>' +
      '<div class="address">' + address + '</div>' +
      '</div>' +
      '</div>';
    var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 25 })
      .setLngLat(coordinates)
      .setHTML(contentString)
      .addTo(map);
    // .setText('Construction on the Washington Monument began in 1848.')
    return popup;
  };

  mapGeoCode(name, website, position, address, coordinates) {
    if (this.envService.debug) {
      console.log('geocode.name', name);
      console.log('geocode.website', website);
      console.log('geocode.position', position);
      console.log('geocode.address', address);
      console.log('geocode.coordinates', coordinates);
    }
    var popup = this.createPopup(name, website, address, coordinates);
    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.flyTo({ center: coordinates });
  };
};
