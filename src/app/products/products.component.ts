import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;

  constructor(productService: ProductService) { 
    this.products$ = productService.getAllProducts();
  }
}
