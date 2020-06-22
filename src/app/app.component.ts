import {Component, Renderer2} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  darktheme = false;

  constructor(private renderer: Renderer2) {
  }


  changetheme() {
    this.darktheme = !this.darktheme;
    console.log(this.darktheme);
    if (this.darktheme === true) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }


}
