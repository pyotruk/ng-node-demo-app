import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from "../structures/note";
import {HttpClient} from "@angular/common/http";

const API_URL = "http://localhost:1344"; // TODO via injection token

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly notes$$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.http.get<Note[]>(`${API_URL}/notes`).subscribe((notes: Note[]) => {
      this.notes$$.next(notes);
    })
  }

  public get notes$(): Observable<Note[]> {
    return this.notes$$.asObservable();
  }

  public postNote(text: string): Promise<void> {
    const notesSnapshot: Note[] = this.notes$$.getValue();

    // adding a new note optimistically
    this.notes$$.next([...notesSnapshot, {id: notesSnapshot.length + 1, text}]);

    return new Promise((resolve,reject) => {
      this.http.post<{text: string}>(`${API_URL}/note`, {text}).subscribe(
        () => resolve(),
        (err) => {
          // rolling back the new note that was added optimistically
          this.notes$$.next(notesSnapshot);

          reject(err);
        },
      );
    });
  }
}
