import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthService } from "./../_services/auth/auth.service";
import { ProductService } from "../_services/product/product.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = "";
  product: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.route.params.subscribe(params => {
        this.router.navigate([`/edit/${params.id}`]);
        this.product = params.id;
      });
    }
  }
  get f() {
    return this.productForm.controls;
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      image: file
    });
    this.productForm.get("image").updateValueAndValidity();
  }

  ngOnInit() {
    !this.authService.isAdmin ? this.router.navigate(["/"]) : null;
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      image: [File, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const form = new FormData();
    form.append("name", this.productForm.value.name);
    form.append("description", this.productForm.value.description);
    form.append("image", this.productForm.value.image);

    this.productService
      .updateProduct(form, this.product)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/"]);
        },
        error => {
          this.error = error;
        }
      );
  }
}
