import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    // if (!this.shoppingCart) return 0;
    console.warn("this.shoppingCart", this.shoppingCart);

    // let item = this.shoppingCart.items[this.product.id];
    // console.warn("dlmgldfmgm", item);
    // return item ? item.quantity : 0;
  }
}
