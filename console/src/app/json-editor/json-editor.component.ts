import {Component, OnInit, ElementRef, Input, EventEmitter, Output} from '@angular/core';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';

@Component({
  selector: 'app-json-editor',
  template: '<textarea></textarea>'
})
export class JsonEditorComponent implements OnInit {

  inited = false;
  _value: string = '';
  _type: string = 'json';

  @Input() set value(value: string) {
    this._value = value;
    if (!this.inited && this.editor) {
      this.inited = true;
      this.editor.setValue(value);
    }
  }

  @Input() set type(type: string) {
    if (type === 'html') {
      this._type = 'htmlmixed';
    }
    if (type === 'jsonp') {
      this._type = 'json';
    }
    if (this.editor) {
      let mode = this.generateMode(this._type);
      console.log(mode);
      this.editor.setOption('mode', mode);
    }
  }

  editor: CodeMirror.Editor;

  @Output() onChange = new EventEmitter<string>();


  constructor(private elementRef: ElementRef) {}

  generateMode(type) {
    let mode: any = {
      name: type,
    };
    if (type === 'json') {
      mode.name = 'javascript';
      mode.json = true;
    }
    return mode;
  }

  ngOnInit() {
    let mode = this.generateMode(this._type);

    this.editor = CodeMirror(elt => {
      let textarea = this.elementRef.nativeElement.children[0];
      textarea.parentNode.replaceChild(elt, textarea);
    }, {
      value: this._value,
      lineNumbers: true,
      mode: mode
    });

    this.editor.on("change", instance => {
      this.onChange.emit(instance.getValue());
    });
  }

}
