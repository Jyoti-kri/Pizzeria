import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink, CommonModule,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private auth: Auth, private router:Router) {}

  isLoggedIn() {

  return this.auth.isLoggedIn();
}

logout() {

  this.auth.logout();

  alert('Logged out successfully');

  this.router.navigate(['/']);
}
}
