import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore) { }

  private create() {
    return this.firestore.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.firestore.collection('shopping-carts').doc(cartId).snapshotChanges();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.firestore.collection('shopping-carts').doc(cartId + '/items/' + product.id);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      const itemPayload = item.payload.data();

      if (item.payload.exists) item$.update({ quantity: itemPayload.quantity + 1 });
      else item$.set({ product: product, quantity: 1 })
    })

  }
}
