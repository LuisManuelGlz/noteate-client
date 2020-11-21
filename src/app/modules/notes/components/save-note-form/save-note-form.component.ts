import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-note-form',
  templateUrl: './save-note-form.component.html',
  styleUrls: ['./save-note-form.component.css']
})
export class SaveNoteFormComponent implements OnInit {
  saveNoteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.saveNoteForm.value);
  }
}
