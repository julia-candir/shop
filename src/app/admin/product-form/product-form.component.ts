import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../../shared/models/category';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  product = {};
  productId;

  newProductForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private modalService: ModalService,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProduct(this.productId).pipe(take(1)).subscribe(p => this.product = p.payload.data())
    }
  }

  ngOnInit() {
    this.categories$ = this.categoryService
      .getAllCategories()
      .pipe(map(data => data.map(item => item.payload.doc.data() as Category)));

    this.newProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: [{
        name: '',
        shortcode: ''
      }, Validators.required],
      imageUrl: ['', [Validators.required, ValidateUrl]],
    });

    console.warn(this.newProductForm.value);
  }

  get title() {
    return this.newProductForm.get('title');
  }

  get price() {
    return this.newProductForm.get('price');
  }

  get category() {
    return this.newProductForm.get('category');
  }

  get imageUrl() {
    return this.newProductForm.get('imageUrl');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onReset() {
    this.newProductForm.reset();
  }

  onSave(product) {
    const onCreate = (product) => {
      this.productService.create(product);
      this.modalService.open('productCreatedSuccessfullyModal');
    }
    const onUpdate = (productId, product) => {
      this.productService.update(productId, product)
    }

    this.productId ? onUpdate(this.productId, product) : onCreate(product);
    this.newProductForm.reset();
  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return; 

    this.productService.delete(this.productId);
    this.router.navigate(['admin/admin-products']);
  }
}

export function ValidateUrl(control: AbstractControl) {
  if (control.value && !control.value.startsWith('https')) {
    return { validUrl: true };
  }
  return null;
}
