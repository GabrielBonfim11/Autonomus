import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { NavController } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: string = '';

  user: User;

  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afa: AngularFireAuth, private navCtrl: NavController, private angularFirestore: AngularFirestore) {
    this.userCollection = this.angularFirestore.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  loginFirebase(user: User): Promise<string | void> {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password).then((userAuth) => {
      return userAuth.user.uid;
    });
  }

  register(user: User) {
    console.log(user);
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    this.afa.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }

  getAuth() {
    return this.afa.auth;
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(uid: string): Observable<User> {
    return this.userCollection.doc<User>(uid).valueChanges().pipe(
      take(1),
      map(user => {
        this.user = user;
        return user;
      })
    )
  }

  cadastraUsuario(uid: string, user: User): Promise<void> {
    return this.angularFirestore.collection('users').doc(uid).set(user);
  }
}
