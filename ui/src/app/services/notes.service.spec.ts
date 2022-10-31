import {TestBed} from "@angular/core/testing";
import {NotesService, NotesServiceInterface} from "./notes.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Note} from "../structures/note";

describe("NotesService", () => {
  let service: NotesServiceInterface;

  const httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
  httpClientSpy.get.and.returnValue(of([
    {id: 1, text: "foo"} as Note,
  ]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        {
          provide: NotesServiceInterface,
          useClass: NotesService,
        },
      ],
    });
    service = TestBed.inject(NotesServiceInterface);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });
});
