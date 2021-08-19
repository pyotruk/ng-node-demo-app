import {Component, OnInit} from "@angular/core";
import {NotesServiceInterface} from "../../services/notes.service";
import {Observable} from "rxjs";
import {Note} from "../../structures/note";

@Component({
  selector: "notes-list",
  templateUrl: "./notes-list.component.html",
})
export class NotesListComponent implements OnInit {
  public notes$: undefined | Observable<Note[]>;

  constructor(
    public notesService: NotesServiceInterface,
  ) {}

  ngOnInit(): void {
    this.notes$ = this.notesService.notes$;
  }
}
