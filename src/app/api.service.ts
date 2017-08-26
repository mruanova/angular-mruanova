import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';  // we need to import this now

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  search(url: string) {
    return this._http.get(url).map(data => data.json()).toPromise();
  };
}
