import { Component, OnInit } from '@angular/core';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.css']
})
export class ApiEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    CodeMirror.fromTextArea(<HTMLTextAreaElement>document.getElementById('json'), {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true
      }
    });
  }

}
