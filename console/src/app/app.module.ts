import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { ApiCreateComponent, ApiCreateDialog } from './api-create/api-create.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundListComponent,
    ApiCreateDialog,
    ApiCreateComponent,
    ApiEditorComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
