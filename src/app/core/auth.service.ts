import { Injectable } from '@angular/core';
// import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database/';
import { auth } from 'firebase/app/';
import { AngularFireAuth } from 'angularfire2/auth';
// import { FirebaseAuthState } from 'angularfire2/auth/';
import {AngularFireDatabase} from '@angular/fire/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  public isLoggedIn = false;
  auth = null;
  public authState = null;
  constructor(
    private af: AngularFireAuth,
    // private db: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService
  ) {
    af.authState.subscribe(authState => {
      this.authState = authState;
      console.log(authState);
      if (authState) {
        this.isLoggedIn = true;
      }
    });
    // .subscribe(auth => {
    //   this.authState = auth;
    // });
  }

  getUser(): Promise<any> {
    return this.af.user.toPromise();
  }

  signInWithGoogle() {
    this.af.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
      console.log(res);
      // this.af.authState.
      this.isLoggedIn = true;
    });
  }

  logout() {
    this.af.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.toastr.success('Completed', 'Logout Success.');
    });
  }
}
