import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { };

  search() {
    const url = 'https://246gg84zg8.execute-api.us-west-2.amazonaws.com/prod/projects';
    return this._http.get(url); // .map(data => data.json()).toPromise()
  };

};
