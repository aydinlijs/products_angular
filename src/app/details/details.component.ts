import { Component, OnInit } from "@angular/core";
import { Product } from "./../_models/product";
import { ProductService } from "../_services/product/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../_services/auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  product: Product;
  isAdmin$: Observable<Boolean>;
  isLoading: Boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin$ = this.authService.isAdmin;
    this.isLoading = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService
        .getProduct(params.id)
        .subscribe((res: { data: Product }) => {
          this.product = res.data;
        });
    });
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(["/"]);
  }
}
