import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { ApiCreateDialog } from './api-create/api-create.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';

import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundListComponent,
    ApiCreateDialog,
    ApiEditorComponent,
    JsonEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [
    ApiCreateDialog
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
