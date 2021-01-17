import { Product } from './../models/product';
import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { take, map, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore) { }

  private create() {
    return from(this.firestore.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    }));
  }

  getCart() {
    return this.getOrCreateCartId().pipe(
      switchMap(cartId => this.firestore.collection('shopping-carts').doc(cartId).collection('items').get()),
      map((snapshot: QuerySnapshot<Cart[]>) => {
        const products: Cart[] = [];
        snapshot.forEach((query) => products.push(query.data() as Cart))
        return products;
      })
    )
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return of(cartId);

    return this.create().pipe(
      tap((result) => localStorage.setItem('cartId', result.id)),
      map(result => result.id)
    )
  }

  addToCart(product: Product) {
    let cartId;
    this.getOrCreateCartId().subscribe(event => cartId = event);
    let item$ = this.firestore.collection('shopping-carts').doc(cartId + '/items/' + product.id);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      const itemPayload = item.payload.data();

      if (item.payload.exists) item$.update({ quantity: itemPayload.quantity + 1 });
      else item$.set({ product: product, quantity: 1 })
    })
  }
}
