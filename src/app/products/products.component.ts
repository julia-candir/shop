import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(productService: ProductService, route: ActivatedRoute) { 
    productService.getAllProducts().pipe(switchMap((products: Product[]) => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category.shortcode === this.category) : this.products;
      });
  }
}
