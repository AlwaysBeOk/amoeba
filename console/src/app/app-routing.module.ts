import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PlaygroundListComponent
  },
  {
    path: 'api/:namespace/:path',
    component: ApiEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
