import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo';
  constructor(private translate: TranslateService) {
    // Set default and initial language
    const savedLang = localStorage.getItem('lang') || 'en'; // Load from localStorage if saved
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }
}
