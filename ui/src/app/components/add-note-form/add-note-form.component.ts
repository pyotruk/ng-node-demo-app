import {Component} from '@angular/core';
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'add-note-form',
  templateUrl: './add-note-form.component.html',
  styleUrls: ['./add-note-form.component.less']
})
export class AddNoteFormComponent {

  public text: string = "";

  constructor(
    public notesService: NotesService,
  ) {}

  public async addNewNote() {
    try {
      await this.notesService.postNote(this.text);
    } catch (err) {
      alert(err);
    }
  }
}
