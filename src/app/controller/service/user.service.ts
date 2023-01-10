import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../modules/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url + 'User/';

  constructor(private http: HttpClient) {
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'Add', user);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'Get');
  }

  public findById(userId: number): Observable<User> {
    return this.http.get<User>(this.url + 'GetById/' + userId);
  }
}
