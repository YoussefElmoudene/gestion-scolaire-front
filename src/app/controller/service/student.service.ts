import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Student} from "../modules/Student.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = environment.url + 'Student/';
  private _showEdit: boolean;
  private _students: Array<Student> = new Array<Student>();
  private _selectedStudent: Student;

  constructor(private http: HttpClient) {
  }


  get students(): Array<Student> {
    return this._students;
  }

  set students(value: Array<Student>) {
    this._students = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedStudent(): Student {
    return this._selectedStudent;
  }

  set selectedStudent(value: Student) {
    this._selectedStudent = value;
  }

  public save(Student: Student): Observable<Student> {
    return this.http.post<Student>(this.url + 'Add', Student);
  }

  public update(Student: Student): Observable<Student> {
    return this.http.put<Student>(this.url + 'Update', Student);
  }

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + 'Get');
  }

  public findById(StudentId: number): Observable<Student> {
    return this.http.get<Student>(this.url + 'GetById/' + StudentId);
  }
}
