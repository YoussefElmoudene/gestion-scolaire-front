import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Teacher} from "../modules/Teacher.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  url = environment.url + 'Teacher/';
  private _showEdit: boolean;
  private _teachers: Array<Teacher> = new Array<Teacher>();
  private _selectedTeacher: Teacher;

  constructor(private http: HttpClient) {
  }


  get teachers(): Array<Teacher> {
    return this._teachers;
  }

  set teachers(value: Array<Teacher>) {
    this._teachers = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedTeacher(): Teacher {
    return this._selectedTeacher;
  }

  set selectedTeacher(value: Teacher) {
    this._selectedTeacher = value;
  }

  public save(Teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.url + 'Add', Teacher);
  }

  public update(Teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.url + 'Update', Teacher);
  }

  public getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + 'Get');
  }

  public findById(TeacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>(this.url + 'GetById/' + TeacherId);
  }
}
