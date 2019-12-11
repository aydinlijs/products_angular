import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<Boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin;
  }

  logOut() {
    this.authService.logout();
  }
}
