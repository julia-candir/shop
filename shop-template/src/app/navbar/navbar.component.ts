import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AppUser } from '../shared/models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    // auth.appUser$.subscribe(appUser => (this.appUser = appUser));authService.appUsers$.subscribe(user=>{
    auth.appUser$.subscribe(user => {
      console.log(user.isAdmin);
      this.appUser = user; // appUser is unable to read the property
      console.log(this.appUser.isAdmin);
    });
  }

  logout() {
    this.auth.logout();
  }
}
