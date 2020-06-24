import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrentUserDTO} from '../DTOs/Account/CurrentUserDTO';
import {RegisterUserDTO} from '../DTOs/Account/RegisterUserDTO';
import {LoginUserDTO} from '../DTOs/Account/LoginUserDTO';
import {ILoginUserAccount} from '../DTOs/Account/ILoginUserAccount';
import {ICheckUserAuthResult} from '../DTOs/Account/ICheckUserAuthResult';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<CurrentUserDTO> = new BehaviorSubject<CurrentUserDTO>(null);


  constructor(
    private http: HttpClient
  ) { }

  setCurrentUser(user: CurrentUserDTO): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<CurrentUserDTO> {
    return this.currentUser;
  }


  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('/account/register', registerData);
  }

  loginUser(loginUserDTO: LoginUserDTO): Observable<ILoginUserAccount> {
    return this.http.post<ILoginUserAccount>('/account/login', loginUserDTO);
  }

  checkUserAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>('/account/check-auth', null);
  }

  logOutUser(): Observable<any> {
    return this.http.get('/account/sign-out');
  }

  activateUser(emailActiveCode: string): Observable<any> {
    return this.http.get('/account/activate-account/' + emailActiveCode);
  }
}
