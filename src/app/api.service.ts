import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { };

  get(url: string): Observable<any> {
    return this._http.get(url);
  };

};
