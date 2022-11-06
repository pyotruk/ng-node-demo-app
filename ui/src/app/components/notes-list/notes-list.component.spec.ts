import {ComponentFixture, TestBed} from "@angular/core/testing";

import {NotesListComponent} from "./notes-list.component";
import {NotesServiceInterface, NullNotesService} from "../../services/notes.service";

describe("NotesListComponent", () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotesListComponent,
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
    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
