import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../modules/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url + 'User/';
  private _showEdit: boolean;
  private _users: Array<User> = new Array<User>();
  private _selectedUser: User = new User();

  constructor(private http: HttpClient) {
  }


  get users(): Array<User> {
    return this._users;
  }

  set users(value: Array<User>) {
    this._users = value;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  set showEdit(value: boolean) {
    this._showEdit = value;
  }

  get selectedUser(): User {
    return this._selectedUser;
  }

  set selectedUser(value: User) {
    this._selectedUser = value;
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'Add', user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url + 'Update', user);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'Get');
  }

  public findById(userId: number): Observable<User> {
    return this.http.get<User>(this.url + 'GetById/' + userId);
  }
}
