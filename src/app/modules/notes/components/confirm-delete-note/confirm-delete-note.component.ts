import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-confirm-delete-note',
  templateUrl: './confirm-delete-note.component.html',
  styleUrls: ['./confirm-delete-note.component.css'],
})
export class ConfirmDeleteNoteComponent implements OnInit {
  @Input() noteForDelete: Note;
  @Output() deleteNoteEvent = new EventEmitter();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {}

  deleteNote() {
    const { _id } = this.noteForDelete;
    this.notesService.delete(_id).subscribe(() => {
      this.deleteNoteEvent.emit(_id);
    });
  }
}
