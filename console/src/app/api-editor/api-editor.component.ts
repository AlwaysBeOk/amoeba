import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ApiService } from '../api.service';
import { Api, ApiItem } from '../api';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.css']
})
export class ApiEditorComponent implements OnInit {

  api: Api;
  apiItem: ApiItem = new ApiItem();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    CodeMirror.fromTextArea(<HTMLTextAreaElement>document.getElementById('json'), {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true
      }
    });

    const namespace = this.route.snapshot.params['namespace'];
    const path = this.route.snapshot.params['path'];
    console.log(namespace, path);

    this.apiService.getApi(namespace, path).subscribe((api: Api) => {
      console.log(api);
      this.api = api;
      this.apiItem = this.api.route[0];
      console.log(this.apiItem);
    })
  }

}
