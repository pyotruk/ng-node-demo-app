import { Component, OnInit } from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {Observable} from "rxjs";
import {Note} from "../../structures/note";

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.less']
})
export class NotesListComponent implements OnInit {
  public notes$: undefined | Observable<Note[]>;

  constructor(
    public notesService: NotesService,
  ) {}

  ngOnInit(): void {
    this.notes$ = this.notesService.getNotes();
  }
}
