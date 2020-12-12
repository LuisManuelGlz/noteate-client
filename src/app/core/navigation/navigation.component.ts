import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleNavbarNav();
  }

  // close navbar toggler when someone clicks a nav link
  handleNavbarNav() {
    // get navbar nav
    const navbarNav = document.querySelector('#navbarNavAltMarkup');

    // get all nav links
    const navLinks = document.querySelectorAll('.nav-link');

    // get navbar toggler button
    const navbarTogglerButton = document.querySelector(
      '.navbar-toggler'
    ) as HTMLElement;

    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', () => {
        // check if navbar nav is collapsed
        const isNavbarCollapsed = navbarNav.classList.contains('show');
        if (isNavbarCollapsed) {
          // close navbar nav
          navbarTogglerButton.click();
        }
      });
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut();
  }
}
