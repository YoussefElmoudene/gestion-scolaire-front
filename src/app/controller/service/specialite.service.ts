import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Specialite} from "../modules/Specialite.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  url = environment.url + 'Specialite/';
  private _showEdit: boolean;
  private _specialites: Array<Specialite> = new Array<Specialite>();
  private _selectedSpecialite: Specialite = new Specialite();

  constructor(private http: HttpClient) {
  }


  get specialites(): Array<Specialite> {
    return this._specialites;
  }

  set specialites(value: Array<Specialite>) {
    this._specialites = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedSpecialite(): Specialite {
    return this._selectedSpecialite;
  }

  set selectedSpecialite(value: Specialite) {
    this._selectedSpecialite = value;
  }

  public save(Specialite: Specialite): Observable<Specialite> {
    return this.http.post<Specialite>(this.url + 'Add', Specialite);
  }

  public update(Specialite: Specialite): Observable<Specialite> {
    return this.http.put<Specialite>(this.url + 'Update', Specialite);
  }

  public getAll(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.url + 'Get');
  }

  public findById(SpecialiteId: number): Observable<Specialite> {
    return this.http.get<Specialite>(this.url + 'GetById/' + SpecialiteId);
  }
}
