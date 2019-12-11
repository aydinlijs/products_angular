import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { Product } from "./../../_models/product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: Observable<Product[]>;
  user: string;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("currentUser")).access_token;
  }

  getProducts() {
    return this.http.get(`${environment.apiUrl}product`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.user}`
      })
    });
  }

  getProduct(id) {
    return this.http.get(`${environment.apiUrl}product/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.user}`
      })
    });
  }

  addProduct(data: FormData) {
    return this.http.post<any>(`${environment.apiUrl}product`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.user}`
      })
    });
  }

  deleteProduct(id: number) {
    return this.http.post<any>(
      `${environment.apiUrl}product/${id}/delete`,
      null,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.user}`
        })
      }
    );
  }

  updateProduct(data: FormData, id: number) {
    return this.http.post<any>(
      `${environment.apiUrl}product/${id}/update`,
      data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.user}`
        })
      }
    );
  }
}
