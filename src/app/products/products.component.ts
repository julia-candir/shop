import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../shared/services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Category } from '../shared/models/category';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(productService: ProductService, categoryServise: CategoryService, route: ActivatedRoute) { 
    productService.getAllProducts().subscribe((products: Product[]) => this.products = products);
    this.categories$ = categoryServise.getAllCategories().pipe(map(data => data.map(item => item.payload.doc.data() as Category)));

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category.shortcode === this.category) : this.products;
    })
  }
}
