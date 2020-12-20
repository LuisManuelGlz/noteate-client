import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  @Input() showForm: boolean;
  @Input() notes: Note[];
  @Output() setNoteForSaveEvent = new EventEmitter();
  @Output() setNoteForDeleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setNoteForSave(noteForSave: Note) {
    this.setNoteForSaveEvent.emit(noteForSave);
  }

  setNoteForDelete(noteForDelete: Note) {
    this.setNoteForDeleteEvent.emit(noteForDelete)
  }
}
