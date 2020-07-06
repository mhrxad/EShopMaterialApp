import {Component, Renderer2, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from './Services/auth.service';
import {CurrentUserDTO} from './DTOs/Account/CurrentUserDTO';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.checkUserAuth().subscribe(res => {
      if (res.status === 'Success') {
        const user = new CurrentUserDTO(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address);

        this.authService.setCurrentUser(user);
      }
    });
  }




}
