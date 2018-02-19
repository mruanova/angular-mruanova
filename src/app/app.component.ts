import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
declare const google: any;
let map;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mauricio Ruanova-Hurtado';
  projects = null;
  geocoder = null;
  map = null;
  promise;

  constructor(private _apiService: ApiService) {
    // dependency injection
  }

  // get all the projects from the api
  ngOnInit() {
    this.promise = this._apiService.search();
    this.promise.then((data) => {
      this.projects = data.Items.sort(function (a, b) {
        return parseFloat(a.ProjectId) - parseFloat(b.ProjectId);
      });

      this.geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(41.8838158, -87.6415424);
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

      // animation
      const tops = ['3px', '23px', '43px', '63px', '83px', '103px', '123px'];
      const photos = ['assets/img/mau.jpg', 'assets/img/selfie.jpg', 'assets/img/sunglasses.jpg'];
      const selector1: HTMLElement = document.querySelector('#selector');
      const photo1: HTMLImageElement = document.querySelector('#photo');
      let i = 0,
        j = 0;
      function updateText() {
        selector1.style.top = tops[i];
        photo1.src = photos[j];
        i++;
        if (i === tops.length) {
          i = 0;
          j++;
          if (j === photos.length) {
            j = 0;
          }
        }
      }
      setInterval(updateText, 300);

      // modal
      const modal = document.getElementById('myModal');
      const btn = document.getElementById('about');
      const span: HTMLElement = document.querySelector('.close')[0];

      // show modal ABOUT
      btn.onclick = function () {
        modal.style.display = 'block';
      };

      // hide modal ABOUT on click X
      span.onclick = function () {
        modal.style.display = 'none';
      };

      // hide modal ABOUT on click anywhere outside the modal
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

    }).catch((err) => {
      console.log(err);
    });
  }

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
  }

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
  }
}
