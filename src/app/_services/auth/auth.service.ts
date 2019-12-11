import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./../../_models/user";
import { map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    if (this.currentUserValue != null) {
      this.loggedIn.next(true);
    }
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject == null) {
      this.router.navigate(["/login"]);
    }
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    return this.admin.asObservable();
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}auth/login`, { email, password })
      .pipe(
        map(user => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          this.admin.next(user.user.is_admin);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    this.admin.next(false);
    this.router.navigate(["/login"]);
  }
}
