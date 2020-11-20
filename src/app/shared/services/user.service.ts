import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  save(user: firebase.User) {
    this.firestore
      .doc('/users/' + user.uid)
      .set(
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true },
      )
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => console.log('user save failed', reason));
  }

  get(uid: string): Observable<AppUser> {
    return this.firestore.doc('/users/' + uid).valueChanges() as Observable<AppUser>;
  }
}
