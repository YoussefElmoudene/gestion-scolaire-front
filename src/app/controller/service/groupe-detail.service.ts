import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupDetail} from "../modules/group-detail.model";

@Injectable({
  providedIn: 'root'
})
export class GroupeDetailService {

  url = environment.url + 'GroupDetail/';
  private _showEdit: boolean;
  private _groupDetails: Array<GroupDetail> = new Array<GroupDetail>();
  private _selectedGroupDetail: GroupDetail = new GroupDetail();

  constructor(private http: HttpClient) {
  }


  get groupDetails(): Array<GroupDetail> {
    return this._groupDetails;
  }

  set groupDetails(value: Array<GroupDetail>) {
    this._groupDetails = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedGroupDetail(): GroupDetail {
    return this._selectedGroupDetail;
  }

  set selectedGroupDetail(value: GroupDetail) {
    this._selectedGroupDetail = value;
  }

  public save(GroupDetail: GroupDetail): Observable<GroupDetail> {
    return this.http.post<GroupDetail>(this.url + 'Add', GroupDetail);
  }

  public update(GroupDetail: GroupDetail): Observable<GroupDetail> {
    return this.http.put<GroupDetail>(this.url + 'Update', GroupDetail);
  }

  public getAll(): Observable<GroupDetail[]> {
    return this.http.get<GroupDetail[]>(this.url + 'Get');
  }

  public findById(GroupDetailId: number): Observable<GroupDetail> {
    return this.http.get<GroupDetail>(this.url + 'GetById/' + GroupDetailId);
  }
}
