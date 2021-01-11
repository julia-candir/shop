import { Cart } from '../shared/models/cart';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;
  private destroy$ = new Subject()

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    productService.getAllProducts().pipe(switchMap((products: Product[]) => {
      this.products = products;
      return route.queryParamMap;
    })).pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = this.products.filter(p => this.category ? p.category.shortcode === this.category : true);
    });
  }

  ngOnInit() {
    const sub = this.shoppingCartService.getCart().subscribe((products: Cart[]) => {
      console.log(products);
      
    });
    this.subscription.add(sub)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
