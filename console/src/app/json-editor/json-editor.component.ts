import {Component, OnInit, ElementRef, Input, EventEmitter, Output} from '@angular/core';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-json-editor',
  template: '<textarea></textarea>'
})
export class JsonEditorComponent implements OnInit {

  inited = false;
  _value: string = '';

  @Input() set value(value: string) {
    this._value = value;
    if (!this.inited && this.editor) {
      this.inited = true;
      this.editor.setValue(value);
    }
  }

  editor: CodeMirror.Editor;

  @Output() onChange = new EventEmitter<string>();


  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.editor = CodeMirror(elt => {
      let textarea = this.elementRef.nativeElement.children[0];
      textarea.parentNode.replaceChild(elt, textarea);
    }, {
      value: this._value,
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true
      }
    });

    this.editor.on("change", instance => {
      this.onChange.emit(instance.getValue());
    });
  }

}
