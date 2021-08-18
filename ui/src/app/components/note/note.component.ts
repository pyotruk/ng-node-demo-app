import {Component, Input} from '@angular/core';
import {Note} from "../../structures/note";

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less']
})
export class NoteComponent {
  @Input() public note: undefined | Note;
}
