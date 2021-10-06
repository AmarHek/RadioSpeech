import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { User } from "../models/user";


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.backend}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]).then();
  }
}
