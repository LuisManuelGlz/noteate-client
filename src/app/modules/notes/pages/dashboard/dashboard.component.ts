import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showForm: boolean = true;
  noteForSave: Note;
  noteForDelete: Note;
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  handleDisplayForm(show: boolean) {
    const saveFormContainer = document.querySelector(
      '.save-form-container'
    ) as HTMLElement;

    if (show) {
      saveFormContainer.classList.add('show');
      saveFormContainer.style.display = 'block';
      this.showForm = true;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      saveFormContainer.classList.remove('show');
      setTimeout(() => {
        saveFormContainer.style.display = 'none';
        this.showForm = false;
      }, 400);
    }
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
    this.handleDisplayForm(true);
  }

  setNoteForDelete(noteForDelete: Note) {
    this.noteForDelete = noteForDelete;
  }
}
