import { Category } from './../../shared/models/category';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;

  newProductForm: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {}

  ngOnInit() {
    this.categories$ = this.categoryService
      .getCategories()
      .pipe(map(data => data.map(item => item.payload.doc.data() as Category)));

    this.newProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    });
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

  get picture() {
    return this.newProductForm.get('picture');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newProductForm.value);
    this.newProductForm.reset();
  }

  onReset() {
    this.newProductForm.reset();
  }
}
