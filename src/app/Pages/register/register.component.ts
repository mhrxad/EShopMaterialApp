import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUserDTO} from '../../DTOs/Account/RegisterUserDTO';
import {passwordValidator} from '../../Utilities/Validators/password.validator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      firstName: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      confirmPassword: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      address: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ])
    }, {validators: passwordValidator});

    this.isLoading = false;
  }


  submitRegisterForm() {
    this.isLoading = true;
    const registerData = new RegisterUserDTO(
      this.registerForm.controls.email.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      this.registerForm.controls.address.value,
    );

    this.authService.registerUser(registerData).subscribe(res => {
      if (res.status === 'Success') {
        this.registerForm.reset();
        this.isLoading = false;
        this.snackBar.open('ثبت نام شما با موفقیت انجام شد لینک فعال سازی حساب کاربری به ایمیل شما ارسال گردید', 'باشه', {
          duration: 10000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          direction: 'rtl'
        });
        this.router.navigate(['/']);

      }
      if (res.status === 'Error') {
        if (res.data.info === 'EmailExist') {
          this.isLoading = false;
          this.snackBar.open('با این ایمیل قبلا ثبت نام انجام شده است', 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
        }
      }
    });
  }

}
