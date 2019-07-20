import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { };

  getProjects(url: string, env: string, key: string): Observable<any> {
    const headers = { 'x-api-key': key };
    const options = { headers: headers }; // withCredentials: true 
    return this._http.get(url + '/' + env + '/projects', options);
  };

};
