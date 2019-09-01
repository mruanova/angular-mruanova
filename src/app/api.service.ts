import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  url: string = null;

  constructor(private _http: HttpClient
  ) {
  };

  get(url: string): Observable<any> {
    const headers = { 'x-api-key': '' };
    const options = { headers: headers }; // withCredentials: true 
    return this._http.get(url, options);
  };

};
