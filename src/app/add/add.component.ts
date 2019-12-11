import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthService } from "./../_services/auth/auth.service";
import { ProductService } from "../_services/product/product.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/add"]);
    }
  }

  ngOnInit() {
    !this.authService.isAdmin ? this.router.navigate(["/"]) : null;
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      image: [File, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }

    const form = new FormData();
    form.append("name", this.productForm.value.name);
    form.append("description", this.productForm.value.description);
    form.append("image", this.productForm.value.image);

    // this.loading = true;
    this.productService
      .addProduct(form)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/"]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
