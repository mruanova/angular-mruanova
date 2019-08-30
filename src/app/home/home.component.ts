import { Component, AfterViewInit } from '@angular/core';
import { EnvService } from '../env.service';

declare const mapboxgl: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  images: string[] = [
    'assets/img/giphy.gif',
  ];
  /*
    'assets/img/mau.jpg',
    'assets/img/spi.jpg',
    'assets/img/selfie.jpg',
    'assets/img/sunglasses.jpg',
    'assets/img/csg.jpg',
    'assets/img/sheridan.jpg',
    'assets/img/gym.jpg',
    'assets/img/udem.jpg',
  */
  imageSource: string = this.images[0];
  tops: string[] = ['3px', '23px', '43px', '63px', '83px', '103px', '123px'];
  i: number = 0;
  j: number = 0;
  interval: number;

  constructor(private envService: EnvService) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = window.setInterval(() => {
      this.updateText();
    }, 1000);
  };

  updateText() {
    let selector: HTMLElement = document.getElementById('selector');
    if (selector) {
      selector.style.top = this.tops[this.i];
      this.imageSource = this.images[this.j];
      this.i++;
      if (this.i == this.tops.length) {
        this.i = 0;
        this.j++;
        if (this.j == this.images.length) {
          this.j = 0;
        }
      }
    }
  };

  ngAfterViewInit() {
   mapboxgl.accessToken = this.envService.token1 + '.' + this.envService.token2 + '.' + this.envService.token3;
   var map = new mapboxgl.Map({
     container: 'map',
     style: this.envService.style,
     center: this.envService.center,
     zoom: this.envService.zoom
   });

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
  }
};
