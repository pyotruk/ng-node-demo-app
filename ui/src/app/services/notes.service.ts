import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from "../structures/note";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export abstract class NotesServiceInterface {
   abstract get notes$(): Observable<Note[]>;
   abstract postNote(text: string): Promise<void>;
}

@Injectable()
export class NotesService implements NotesServiceInterface {
  private readonly notes$$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.http.get<Note[]>(`${environment.apiUrl}/notes`).subscribe((notes: Note[]) => {
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
      this.http.post<{text: string}>(`${environment.apiUrl}/note`, {text}).subscribe(
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
