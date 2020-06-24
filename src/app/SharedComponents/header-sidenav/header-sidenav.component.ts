import {Component, OnInit, Renderer2} from '@angular/core';
import {CurrentUserDTO} from '../../DTOs/Account/CurrentUserDTO';
import {AuthService} from '../../Services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header-sidenav',
  templateUrl: './header-sidenav.component.html',
  styleUrls: ['./header-sidenav.component.scss']
})
export class HeaderSidenavComponent implements OnInit {

  user: CurrentUserDTO = null;
  darktheme = false;
  isLoading = true;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
    });
    this.isLoading = false;
  }

  logOutUser() {
    this.isLoading = true;
    this.cookieService.delete('eshop-cookie');
    this.authService.setCurrentUser(null);
    this.router.navigate(['/']);
    this.snackBar.open('شما با موفقيت از سايت خارج شديد', 'باشه', {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      direction: 'rtl'
    });
    this.isLoading = false;
  }

  changetheme() {
    this.isLoading = true;
    this.darktheme = !this.darktheme;
    console.log(this.darktheme);
    if (this.darktheme === true) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    this.isLoading = false;
  }

}
