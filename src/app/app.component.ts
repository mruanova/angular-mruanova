import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'app';
  products = [
    new Product(1, 'ECHO.com', 'Senior Software Engineer', '../../assets/img/1.jpg'),
    new Product(11, 'Coates', 'Senior Software Engineer', '../../assets/img/2.jpg'),
    new Product(2, 'Solstice', 'Senior Software Engineer', '../../assets/img/3.jpg'),
    new Product(3, 'CSG', 'Senior Software Engineer', '../../assets/img/4.jpg'),
    new Product(4, 'Avanade', 'Senior Software Engineer', '../../assets/img/5.jpg'),
    new Product(5, 'Infosys', 'Technical Leader', '../../assets/img/6.jpg'),
    new Product(6, 'Deacero', 'Software Engineer', '../../assets/img/7.jpg'),
    new Product(7, 'UDEM', 'BS CS Engineering', '../../assets/img/8.jpg')
  ];

  constructor(private _productService: ProductService) {
    this._productService.updateProducts(this.products);
    this._productService.productsObservable.subscribe((products) => {
      this.products = products;
    });
  };

  ngOnInit() {
    /*
    const key1 = 'AIzaSyBrRJ6sdmTmH4a';
    const key2 = 'VSGLT8xA8dC3J66CEaA0';
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + key1 + key2;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    */
  }
};
