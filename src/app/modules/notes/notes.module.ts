import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { SaveNoteFormComponent } from './components/save-note-form/save-note-form.component';
import { ConfirmDeleteNoteComponent } from './components/confirm-delete-note/confirm-delete-note.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NotesListComponent,
    SaveNoteFormComponent,
    ConfirmDeleteNoteComponent,
  ],
  imports: [CommonModule, NotesRoutingModule, ReactiveFormsModule],
})
export class NotesModule {}
