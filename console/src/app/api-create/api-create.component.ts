import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Api } from '../api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-api-create',
  templateUrl: './api-create.component.html',
  styleUrls: ['./api-create.component.css']
})
export class ApiCreateComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.openDialog();
  }

  openDialog() {
    let dialogRef = this.dialog.open(ApiCreateDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

@Component({
  selector: 'dialog-api-create-dialog',
  templateUrl: './dialog-api-create-dialog.html',
  styleUrls: ['./dialog-api-create-dialog.css']
})
export class ApiCreateDialog {

  api: Api;

  constructor(public dialogRef: MdDialogRef<ApiCreateDialog>, private apiService: ApiService) {
    this.api = {
      namespace: '',
      path: '',
      route: [
        {
          description : 'Default Response',
          response : {
            content : {
              status : '200',
              type : 'json',
              body : '{}'
            },
            inherited : false
          }
        }
      ],
      disabled: false
    }
  }

  create() {
    console.log(this.api);
    this.apiService.create(this.api).then(api => console.log(api));
  }
}
