import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}
  public categories$: Observable<{}>;

  getAllCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }
}
