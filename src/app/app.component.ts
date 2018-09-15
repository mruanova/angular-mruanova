import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app';
  products = [
    new Product(1, 'Angular', 0.99, '../../assets/img/angular.png'),
    new Product(2, 'HTML', 0.99, '../../assets/img/html5.png'),
    new Product(3, 'CSS', 0.99, '../../assets/img/css3.png'),
    new Product(4, 'JavaScript', 0.99, '../../assets/img/js.png'),
    new Product(5, 'AWS', 0.99, '../../assets/img/aws.png'),
    new Product(6, 'S3', 0.99, '../../assets/img/s3.png'),
    new Product(7, 'API', 0.99, '../../assets/img/api_gateway.png'),
    new Product(8, 'Route 53', 0.99, '../../assets/img/route53.png'),
    new Product(9, 'Lambda', 0.99, '../../assets/img/lambda.png'),
    new Product(10, 'IAM', 0.99, '../../assets/img/iam.png'),
    new Product(11, 'React', 0.99, '../../assets/img/react.png'),
    new Product(12, 'Vue', 0.99, '../../assets/img/vue.png'),
    new Product(13, 'Python', 0.99, '../../assets/img/python.png'),
    new Product(14, 'Ruby', 0.99, '../../assets/img/ruby.png'),
  ];

  constructor(private _productService: ProductService) {
    this._productService.updateProducts(this.products);
    this._productService.productsObservable.subscribe((products) => {
      this.products = products;
    });
  };
};
