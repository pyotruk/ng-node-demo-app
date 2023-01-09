import {Component, Input} from "@angular/core";
import {Note} from "../../structures/note";
import {NotesServiceInterface} from "../../services/notes.service";

@Component({
  selector: "note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.less"],
})
export class NoteComponent {
  @Input() public note: undefined | Note;

  public isEditing = false;

  constructor(
    public notesService: NotesServiceInterface,
  ) {}

  public async updateNote(): Promise<void> {
    if (!this.note) {
      return;
    }

    try {
      await this.notesService.updateNote(this.note.id, this.note.text);
      this.isEditing = false;
    } catch (err) {
      alert(`Failed to update note with id = ${this.note.id}.`);
      throw err;
    }
  }

  public async deleteNote(): Promise<void> {
    if (!this.note) {
      return;
    }

    try {
      await this.notesService.deleteNote(this.note.id);
    } catch (err) {
      alert(`Failed to delete note with id = ${this.note.id}.`);
      throw err;
    }
  }
}
