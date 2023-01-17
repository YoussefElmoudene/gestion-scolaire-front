import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Groupe} from "../modules/Groupe.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  url = environment.url + 'Groupe/';
  private _showEdit: boolean;
  private _groupes: Array<Groupe> = new Array<Groupe>();
  private _selectedGroupe: Groupe = new Groupe();
  private _currentGroup: Groupe = new Groupe();

  constructor(private http: HttpClient) {
  }


  get currentGroup(): Groupe {
    return this._currentGroup;
  }

  set currentGroup(value: Groupe) {
    this._currentGroup = value;
  }

  get groupes(): Array<Groupe> {
    return this._groupes;
  }

  set groupes(value: Array<Groupe>) {
    this._groupes = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedGroupe(): Groupe {
    return this._selectedGroupe;
  }

  set selectedGroupe(value: Groupe) {
    this._selectedGroupe = value;
  }

  public save(Groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(this.url + 'Add', Groupe);
  }

  public update(Groupe: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(this.url + 'Update', Groupe);
  }

  public getAll(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(this.url + 'Get');
  }

  public findById(GroupeId: number): Observable<Groupe> {
    return this.http.get<Groupe>(this.url + 'GetById/' + GroupeId);
  }
}
