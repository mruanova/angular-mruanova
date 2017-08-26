import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
declare var google: any;
let map;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mauricio Ruanova-Hurtado';
  projects = null;
  geocoder = null;
  map = null;
  promise;

  constructor(private _apiService: ApiService) {
  }

  ngOnInit() {
    this.initialize();
    const url = 'https://246gg84zg8.execute-api.us-west-2.amazonaws.com/prod/projects';
    this.promise = this._apiService.search(url);
    if (this.promise) {
      this.promise.then((data) => {
        this.projects = data.Items;
        console.log(this.projects);
        for (var project = 0; project < this.projects.length; project++) {
          this.addMarker(project, this.projects[project].Address);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("xxx");
    }
  };

  initialize() {
    this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(41.8838158, -87.6415424);
    var mapOptions = {
      zoom: 14,
      center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions); //map
  };

  addMarker(index, address) {
    this.geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == 'OK') {
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          title: address,
        });
        marker.setMap(map);
        marker.addListener('click', function () {
          var items = document.querySelector('ul').getElementsByTagName("li");
          for (var i = 0; i < items.length; ++i) {
            var li = items[i];
            if (index == i) {
              li.classList.add("yellow");
            } else {
              li.classList.remove("yellow");
            }
          }
        });
      }
    });
  };
}
