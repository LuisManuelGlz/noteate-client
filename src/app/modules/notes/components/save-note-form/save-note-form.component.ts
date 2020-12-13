import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-save-note-form',
  templateUrl: './save-note-form.component.html',
  styleUrls: ['./save-note-form.component.css'],
})
export class SaveNoteFormComponent implements OnInit, OnChanges {
  @Input() noteData: Note;
  @Output() addNoteEvent = new EventEmitter();
  @Output() editNoteEvent = new EventEmitter();
  @Output() getNoteDataEvent = new EventEmitter();

  isLoading = false;
  saveNoteForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', Validators.required),
  });

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.noteData) {
      const { _id, title, content } = this.noteData;
      this.saveNoteForm.controls._id.setValue(_id);
      this.saveNoteForm.controls.title.setValue(title);
      this.saveNoteForm.controls.content.setValue(content);
    }
  }

  onSubmit() {
    this.isLoading = true;
    const { value } = this.saveNoteForm;
    if (value._id) {
      this.notesService.update(value).subscribe(() => {
        this.editNoteEvent.emit(value);
      }, (error) => {
        console.log(error);
      }, () => {
        this.isLoading = false;
      });
    } else {
      const noteForCreate = { title: value.title, content: value.content };
      this.notesService.create(noteForCreate).subscribe(() => {
        this.addNoteEvent.emit(noteForCreate);
      }, (error) => {
        console.log(error);
      }, () => {
        this.isLoading = false;
      });
    }
    this.clear();
  }

  clear() {
    this.saveNoteForm.reset();
  }
}
