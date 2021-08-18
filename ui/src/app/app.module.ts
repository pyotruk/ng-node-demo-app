import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import {HttpClientModule} from "@angular/common/http";
import { NotesListComponent } from './components/notes-list/notes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
