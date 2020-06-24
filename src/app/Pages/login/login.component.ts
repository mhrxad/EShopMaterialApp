import {Component, OnInit} from '@angular/core';
import {CurrentUserDTO} from '../../DTOs/Account/CurrentUserDTO';
import {LoginUserDTO} from '../../DTOs/Account/LoginUserDTO';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.loginForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    });

    this.isLoading = false;
  }

  submitLoginForm() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const loginData = new LoginUserDTO(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );

      this.authService.loginUser(loginData).subscribe(res => {
        const currentUser = new CurrentUserDTO(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address
        );

        if (res.status === 'Success') {
          this.cookieService.set('eshop-cookie', res.data.token, res.data.expireTime * 60);
          this.authService.setCurrentUser(currentUser);
          this.loginForm.reset();
          this.isLoading = false;
          this.snackBar.open('شما با موفقيت وارد شديد', 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
          this.router.navigate(['/']);
        } else if (res.status === 'Error') {
          this.isLoading = false;
          this.snackBar.open(res.data.message, 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
        } else if (res.status === 'NotFound') {
          this.isLoading = false;
          this.snackBar.open(res.data.message, 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });        }
      });

    }


  }

}
