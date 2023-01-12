import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Module} from "../modules/Module.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  url = environment.url + 'Module/';
  private _showEdit: boolean;
  private _modules: Array<Module> = new Array<Module>();
  private _selectedModule: Module = new Module();

  constructor(private http: HttpClient) {
  }


  get modules(): Array<Module> {
    return this._modules;
  }

  set modules(value: Array<Module>) {
    this._modules = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedModule(): Module {
    return this._selectedModule;
  }

  set selectedModule(value: Module) {
    this._selectedModule = value;
  }

  public save(Module: Module): Observable<Module> {
    return this.http.post<Module>(this.url + 'Add', Module);
  }

  public update(Module: Module): Observable<Module> {
    return this.http.put<Module>(this.url + 'Update', Module);
  }

  public getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(this.url + 'Get');
  }

  public findById(ModuleId: number): Observable<Module> {
    return this.http.get<Module>(this.url + 'GetById/' + ModuleId);
  }
}
