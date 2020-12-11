import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  @Input() notes: Note[];
  @Output() setNoteDataEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setNoteData(noteData: Note) {
    this.setNoteDataEvent.emit(noteData);
  }
}
