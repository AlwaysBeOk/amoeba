import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

// import { Observable } from 'rxjs';

import { Api } from './api';
import {Observable} from "rxjs";

@Injectable()
export class ApiService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http) { }

  getApi(namespace: string, path: string): Observable<Api> {
    const url = `/apis/${namespace}/${encodeURIComponent(path)}`;
    return this.http.get(url).map((r: Response) => r.json());
  }

  create(api: Api): Observable<Api> {
    return this.http.post('/apis', JSON.stringify(api), {headers: this.headers})
      .map((r: Response) => r.json());
  }

  update(api: Api): Observable<Api> {
    const url = `/apis/${api.namespace}/${encodeURIComponent(api.path)}`;
    return this.http.put(url, JSON.stringify(api), {headers: this.headers})
      .map((r: Response) => r.json());
  }

}
