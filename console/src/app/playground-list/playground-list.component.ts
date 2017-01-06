import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground-list',
  templateUrl: './playground-list.component.html',
  styleUrls: ['./playground-list.component.css']
})
export class PlaygroundListComponent implements OnInit {

  playgroundList: Array<any>;

  constructor() { }

  ngOnInit() {
    this.playgroundList = [
      {
        name: 'test',
        updated: new Date()
      }
    ]
  }

}
