import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Absence} from "../modules/Absence.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  url = environment.url + 'Absence/';
  private _showEdit: boolean;
  private _absences: Array<Absence> = new Array<Absence>();
  private _selectedAbsence: Absence = new Absence();

  constructor(private http: HttpClient) {
  }


  get absences(): Array<Absence> {
    return this._absences;
  }

  set absences(value: Array<Absence>) {
    this._absences = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedAbsence(): Absence {
    return this._selectedAbsence;
  }

  set selectedAbsence(value: Absence) {
    this._selectedAbsence = value;
  }

  public save(Absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(this.url + 'Add', Absence);
  }

  public update(Absence: Absence): Observable<Absence> {
    return this.http.put<Absence>(this.url + 'Update', Absence);
  }

  public getAll(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.url + 'Get');
  }

  public findById(AbsenceId: number): Observable<Absence> {
    return this.http.get<Absence>(this.url + 'GetById/' + AbsenceId);
  }
}
