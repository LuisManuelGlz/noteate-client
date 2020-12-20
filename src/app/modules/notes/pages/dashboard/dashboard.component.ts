import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  noteForSave: Note;
  noteForDelete: Note;
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

  deleteNote(noteId: string) {
    this.notes = this.notes.filter((note) => note._id !== noteId);
  }

  setNoteForSave(noteForSave: Note) {
    this.noteForSave = noteForSave;
  }

  setNoteForDelete(noteForDelete: Note) {
    this.noteForDelete = noteForDelete;
  }
}
