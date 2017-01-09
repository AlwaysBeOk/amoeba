import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Api, ApiItem } from '../api';
import { ApiCreateDialog } from '../api-create/api-create.component';

import * as CodeMirror from 'codemirror';
import { Response } from "@angular/http";
import {MdDialog} from "@angular/material";
// import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.css']
})
export class ApiEditorComponent implements OnInit {

  api: Api;
  apiItem: ApiItem = new ApiItem();

  constructor(private dialog: MdDialog, private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

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

    console.log(this.apiItem);

    this.apiService.getApi(namespace, path).subscribe((api: Api) => {
      this.api = api;
      this.apiItem = this.api.route[0];
    }, (r: Response) => {
      if (r.status === 404) {
        this.openDialog(namespace, path);
      }
    })
  }

  openDialog(namespace: String, path: String) {
    let dialogRef = this.dialog.open(ApiCreateDialog);
    dialogRef.componentInstance.namespace = namespace;
    dialogRef.componentInstance.path = path;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
