import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Product } from '../models/product';
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
    this.getOrCreateCartId().pipe(
      take(1),
      switchMap(cartId => {
        const collection = this.firestore.collection('shopping-carts').doc(cartId + '/items/' + product.id);
        return collection.snapshotChanges().pipe(
          withLatestFrom(of(collection))
        )
      })
    ).subscribe(([items, collection]) => {
      const itemPayload = items.payload.data() as any;
      console.warn('itemPayload', itemPayload)

      if (items.payload.exists) collection.update({ quantity: itemPayload.quantity + 1 });
      else collection.set({ product: product, quantity: 1 })
    });

  }
}
