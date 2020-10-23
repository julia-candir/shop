import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAllProducts();
  }

  ngOnInit() {
    console.warn('111', this.products$);
  }

}
