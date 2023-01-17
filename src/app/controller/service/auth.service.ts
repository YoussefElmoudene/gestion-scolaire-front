import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {User} from "../modules/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url + 'User/';
  private token: string;
  private loggedInUsername: string;
  public isLoggedIn = false;

  constructor(private http: HttpClient,
              private router: Router) {
  }


  public login(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'login', user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }


  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }


}
