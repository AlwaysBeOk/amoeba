import { Component, OnInit, Optional } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

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

  constructor(public dialogRef: MdDialogRef<ApiCreateDialog>) {

  }
}
