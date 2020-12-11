import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  noteData: Note;
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.notesService.findAll().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  addNote(note: Note) {
    this.notes.unshift(note);
  }

  editNote(noteForUpdate: Note) {
    const noteIndex = this.notes.findIndex(
      (note) => note._id === noteForUpdate._id
    );
    this.notes[noteIndex] = { ...noteForUpdate };
  }

  setNoteData(noteData: Note) {
    this.noteData = noteData;
  }
}
