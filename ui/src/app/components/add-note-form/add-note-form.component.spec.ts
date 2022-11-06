import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AddNoteFormComponent} from "./add-note-form.component";
import {NotesServiceInterface, NullNotesService} from "../../services/notes.service";

describe("AddNoteFormComponent", () => {
  let component: AddNoteFormComponent;
  let fixture: ComponentFixture<AddNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddNoteFormComponent,
      ],
      providers: [
        {
          provide: NotesServiceInterface,
          useClass: NullNotesService,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
