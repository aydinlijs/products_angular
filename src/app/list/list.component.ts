import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product/product.service";
import { Product } from "./../_models/product";
import { AuthService } from "../_services/auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  products: Product[];
  isAdmin$: Observable<Boolean>;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  fetchProducts() {
    this.productService.getProducts().subscribe((data: { data: Product[] }) => {
      this.products = data.data;
    });
  }

  ngOnInit() {
    this.fetchProducts();
    this.isAdmin$ = this.authService.isAdmin;
  }

  async delete(id: number) {
    await this.productService.deleteProduct(id).subscribe(data => {
      console.log(data);
    });
    this.fetchProducts();
  }
}