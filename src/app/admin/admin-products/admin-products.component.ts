import { Product } from './../../shared/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts().subscribe((products: Product[]) => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(product => product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.products;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
