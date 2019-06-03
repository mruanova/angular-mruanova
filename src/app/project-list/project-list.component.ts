import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
declare const google: any;
let map;

const url = 'https://246gg84zg8.execute-api.us-west-2.amazonaws.com/prod/projects';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  title = 'Mauricio Ruanova';
  projects = [];
  geocoder = null;
  map = null;
  callback$: Observable<any>;

  constructor(private _apiService: ApiService) { };

  // get all the projects from the api
  ngOnInit() {
    this.callback$ = this._apiService.get(url);
    this.callback$.subscribe((data) => {
      this.projects = data.Items.sort(function (a, b) {
        return parseFloat(a.ProjectId) - parseFloat(b.ProjectId);
      });

      this.geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(41.9351088, -87.6419177);//home
      const mapOptions = {
        zoom: 14,
        center: latlng
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      for (let project = 0; project < this.projects.length; project++) {
        this.addMarker(
          this.projects[project].ProjectId,
          this.projects[project].Name,
          this.projects[project].Website,
          this.projects[project].Address);
      }
    });
  };

  // add a marker in google maps for each project
  addMarker(index, title, website, address) {
    console.log(index);
    console.log(title);
    console.log(website);
    console.log(address);
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
  };

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

};
