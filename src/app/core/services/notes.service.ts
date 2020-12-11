import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteForCreate } from 'src/app/shared/models/note-for-create';
import { NoteForUpdate } from 'src/app/shared/models/note-for-update';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${environment.baseUrl}/notes`);
  }

  create(noteForCreate: NoteForCreate) {
    return this.http.post(`${environment.baseUrl}/notes`, noteForCreate);
  }

  update(noteForUpdate: NoteForUpdate) {
    return this.http.put(
      `${environment.baseUrl}/notes/${noteForUpdate._id}`,
      noteForUpdate
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.baseUrl}/notes/${id}`);
  }
}
