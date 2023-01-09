import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Note} from "../structures/note";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export abstract class NotesServiceInterface {
   abstract get notes$(): Observable<Note[]>;
   abstract postNote(text: string): Promise<void>;
   abstract updateNote(id: number, text: string): Promise<void>;
   abstract deleteNote(id: number): Promise<void>;
}

@Injectable()
export class NotesService implements NotesServiceInterface {
  private readonly notes$$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.http.get<Note[]>(`${environment.apiUrl}/notes`).subscribe((notes: Note[]) => {
      this.notes$$.next(notes);
    });
  }

  public get notes$(): Observable<Note[]> {
    return this.notes$$.asObservable();
  }

  public postNote(text: string): Promise<void> {
    const notesSnapshot: Note[] = this.notes$$.getValue();

    return new Promise((resolve,reject) => {
      this.http.post<Note>(`${environment.apiUrl}/note`, {text}).subscribe(
        (note: Note) => {
          this.notes$$.next([...notesSnapshot, note]);
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });
  }

  public updateNote(id: number, text: string): Promise<void> {
    const notesSnapshot: Note[] = this.notes$$.getValue();

    return new Promise((resolve,reject) => {
      this.http.patch<Note>(`${environment.apiUrl}/note`, {id, text}).subscribe(
        () => resolve(),
        (err) => {
          this.notes$$.next([...notesSnapshot]);
          reject(err);
        },
      );
    });
  }

  public deleteNote(id: number): Promise<void> {
    const notesSnapshot: Note[] = this.notes$$.getValue();

    return new Promise((resolve, reject) => {
      this.http.delete<{id: number}>(`${environment.apiUrl}/note`, {body: {id}}).subscribe(
        () => {
          this.notes$$.next([...(notesSnapshot.filter((note: Note) => note.id !== id))]);
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}

@Injectable()
export class NullNotesService implements NotesServiceInterface {
  public get notes$(): Observable<Note[]> {
    return of([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public postNote(text: string): Promise<void> {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateNote(id: number, text: string): Promise<void> {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public deleteNote(id: number): Promise<void> {
    return Promise.resolve();
  }
}
