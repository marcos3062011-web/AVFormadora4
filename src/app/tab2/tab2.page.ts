import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonItem, IonCardTitle, IonButton, IonFab, IonFabButton, IonCardContent, IonIcon, IonCardHeader } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonItem, IonButton, FormsModule, IonFab, IonFabButton, IonCardContent, IonIcon, IonCardHeader ]
})
export class Tab2Page {
  emailUser: string = '';
  passwordUser: string = '';

  private auth = getAuth();

  constructor() {}

  register() {
    if (!this.emailUser || !this.passwordUser) {
      alert('Please insert Email and Password.');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.emailUser, this.passwordUser)
      .then((userCredential) => {
        alert('Account: ' + userCredential.user.email + ' created.');
        this.emailUser = '';
        this.passwordUser = '';
      })
      .catch((error) => {
        console.error('Register Error:', error.code);
        if (error.code === 'auth/email-already-in-use') {
          alert('e-mail already in use.');
        } else if (error.code === 'auth/weak-password') {
          alert('password must have at least 6 characters.');
        } else {
          alert('Error:' + error.message);
        }
      });
  }

  login() {
    if (!this.emailUser || !this.passwordUser) {
      alert('Please insert Email and Password.');
      return;
    }
    signInWithEmailAndPassword(this.auth, this.emailUser, this.passwordUser)
      .then((userCredential) => {
        alert('Succesful LogIn: ' + userCredential.user.email);
        this.emailUser = '';
        this.passwordUser = '';
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          alert('Invalid E-mail or Password.');
        } else {
          alert('LogIn Error: ' + error.message);
        }
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => alert('Successful LogOff.'))
      .catch((error) => alert('LogOff Error: ' + error.message));
  }

  deleteAccount() {
    const user = this.auth.currentUser;

    if (!user) {
      alert('You need to login if you would like to delete your account.');
      return;
    }
    if (confirm('Are you sure you want to delete?.')) {
      deleteUser(user)
        .then(() => {
          alert('Account Deleted.');
        })
        .catch((error) => {
          console.error('Delete Error:', error.code);
          if (error.code === 'auth/requires-recent-login') {
            alert('Not Found.');
          } else {
            alert('Delete Error: ' + error.message);
          }
        });
    }
  }
}