import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Note} from "../modules/Note.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url = environment.url + 'Note/';
  private _showEdit: boolean;
  private _notes: Array<Note> = new Array<Note>();
  private _selectedNote: Note = new Note();

  constructor(private http: HttpClient) {
  }


  get notes(): Array<Note> {
    return this._notes;
  }

  set notes(value: Array<Note>) {
    this._notes = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedNote(): Note {
    return this._selectedNote;
  }

  set selectedNote(value: Note) {
    this._selectedNote = value;
  }

  public save(Note: Note): Observable<Note> {
    return this.http.post<Note>(this.url + 'Add', Note);
  }

  public update(Note: Note): Observable<Note> {
    return this.http.put<Note>(this.url + 'Update', Note);
  }

  public getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url + 'Get');
  }

  public findById(NoteId: number): Observable<Note> {
    return this.http.get<Note>(this.url + 'GetById/' + NoteId);
  }
}
