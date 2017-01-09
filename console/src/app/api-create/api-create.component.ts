import {Component, OnInit} from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Api } from '../api';
import { ApiService } from '../api.service';

@Component({
  selector: 'dialog-api-create-dialog',
  templateUrl: './dialog-api-create-dialog.html',
  styleUrls: ['./dialog-api-create-dialog.css']
})
export class ApiCreateDialog implements OnInit  {

  namespace: String;
  path: String;
  api: Api = new Api();

  constructor(public dialogRef: MdDialogRef<ApiCreateDialog>, private apiService: ApiService) {

  }

  ngOnInit() {
    this.api.namespace = this.namespace;
    this.api.path = this.path;
  }

  create() {
    console.log(this.api);
    this.apiService.create(this.api).then(api => console.log(api));
  }
}
