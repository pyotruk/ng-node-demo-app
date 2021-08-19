import {Component, Input} from "@angular/core";
import {Note} from "../../structures/note";

@Component({
  selector: "note",
  templateUrl: "./note.component.html",
})
export class NoteComponent {
  @Input() public note: undefined | Note;
}
