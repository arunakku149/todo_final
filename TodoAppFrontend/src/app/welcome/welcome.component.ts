import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  
  constructor(private translate:TranslateService){
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    // localStorage.setItem('lang', lang);
  }

}
