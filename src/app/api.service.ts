import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable()
export class ApiService {
  url:string=null;

  constructor(private _http: HttpClient, private envService: EnvService
  ) {
    this.url = envService.apiUrl;
    if(envService.debug) {
      console.log('env.js', envService.mapbox)
    }
  };

  getProjects(): Observable<any> {
    const headers = { 'x-api-key': '' };
    const options = { headers: headers }; // withCredentials: true 
    return this._http.get(this.url + '/' + '/projects', options);
  };

};
