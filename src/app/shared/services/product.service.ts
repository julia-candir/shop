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
    return this.firestore.collection('products').snapshotChanges().pipe(map(data => data.map(item => item.payload.doc.data())));
  }
}
