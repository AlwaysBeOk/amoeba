import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Api, ApiItem } from '../api';
import { ApiCreateDialog } from '../api-create/api-create.component';

import { Response } from "@angular/http";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.css']
})
export class ApiEditorComponent implements OnInit {

  api: Api;
  apiItem: ApiItem;
  namespace: string;
  path: string

  constructor(private dialog: MdDialog, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.namespace = this.route.snapshot.params['namespace'];
    this.path = this.route.snapshot.params['path'];

    this.apiService.getApi(this.namespace, this.path).subscribe((api: Api) => {
      this.api = api;
      this.apiItem = this.api.route[0];
    }, (r: Response) => {
      if (r.status === 404) {
        this.openDialog(this.namespace, this.path);
      }
    })
  }

  updateJsonContent(json: string) {
    this.apiItem.response.content.body = json;
  }

  openDialog(namespace: string, path: string) {
    let dialogRef = this.dialog.open(ApiCreateDialog);
    dialogRef.componentInstance.namespace = namespace;
    dialogRef.componentInstance.path = path;
    dialogRef.afterClosed().subscribe(api => {
      console.log(api);
      this.api = api;
      this.apiItem = this.api.route[0];
    });
  }

  update() {
    console.log(this.api);
    this.apiService.update(this.api).subscribe((api: Api) => {
      console.log(api);
    });
  }
}
