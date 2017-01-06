import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { ApiCreateComponent } from './api-create/api-create.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PlaygroundListComponent
  },
  {
    path: 'api/create',
    component: ApiCreateComponent
  },
  {
    path: 'api/:id',
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
