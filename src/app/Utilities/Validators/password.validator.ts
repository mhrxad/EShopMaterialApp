import {AbstractControl} from '@angular/forms';

export  function passwordValidator(control: AbstractControl): {[key: string]: boolean} {
const password = control.get('password');
const confirmPassword = control.get('confirmPassword');
if (password.pristine || confirmPassword.pristine) {
  return  null;
}
return password && confirmPassword && password.value != confirmPassword.value ?
  {misMatch: true} :
  null;
}
