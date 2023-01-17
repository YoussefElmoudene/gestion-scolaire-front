import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seance} from "../modules/seance";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url = environment.url + 'Seance/';
  private _showEdit: boolean;
  private _seances: Array<Seance> = new Array<Seance>();
  private _selectedSeance: Seance = new Seance();

  constructor(private http: HttpClient) {
  }


  get seances(): Array<Seance> {
    return this._seances;
  }

  set seances(value: Array<Seance>) {
    this._seances = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedSeance(): Seance {
    return this._selectedSeance;
  }

  set selectedSeance(value: Seance) {
    this._selectedSeance = value;
  }

  public save(seance: Seance): Observable<Seance> {
    return this.http.post<Seance>(this.url + 'Add', seance);
  }

  public update(seance: Seance): Observable<Seance> {
    return this.http.put<Seance>(this.url + 'Update', seance);
  }

  public getAll(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.url + 'Get');
  }

  public findById(seanceId: number): Observable<Seance> {
    return this.http.get<Seance>(this.url + 'GetById/' + seanceId);
  }
}
