import { Product } from './product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ProductService {
  productsObservable = new BehaviorSubject(null);

  constructor() { };

  updateProducts(products: Array<Product>) {
    this.productsObservable.next(products);
  };

};
