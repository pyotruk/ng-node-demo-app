import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Note} from "../structures/note";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient,
  ) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>("http://localhost:1344/notes");
  }
}
