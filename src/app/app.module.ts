import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DetailsComponent } from "./details/details.component";
import { ListComponent } from "./list/list.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./_services/auth/auth.service";
import { ProductService } from "./_services/product/product.service";
import { NavbarComponent } from './navbar/navbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const appRoutes: Routes = [
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "login", component: LoginComponent },
  { path: "details/:id", component: DetailsComponent },
  {
    path: "edit/:id",
    component: EditComponent
  },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "**", component: ListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [ProductService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
