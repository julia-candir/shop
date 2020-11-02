import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  create(product) {
    this.firestore.collection('products').add(product);
  }

  getAllProducts() {
    return this.firestore.collection('products').snapshotChanges().pipe(map(data => data.map(item => { return { id: item.payload.doc.id, ...item.payload.doc.data() } })));
  }

  getProduct(productId) {
    return this.firestore.collection('products').doc(productId).snapshotChanges();
  }
}
