import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


import { Api } from './api';
import {Observable} from "rxjs";

@Injectable()
export class ApiService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http) { }

  fetch(namespace: String, path: String): Promise<any> {
    const url = `//localhost:3000/apis/${namespace}/${path}`;
    return this.http.get(url)
      .toPromise();
  }

  getApi(namespace: String, path: String): Observable<Api> {
    const url = `//localhost:3000/apis/${namespace}/${path}`;
    return this.http.get(url).map((r: Response) => r.json());
  }

  create(api: Api): Promise<Api> {
    return this.http.post('//localhost:3000/apis', JSON.stringify(api), {headers: this.headers})
      .toPromise()
  }

}
