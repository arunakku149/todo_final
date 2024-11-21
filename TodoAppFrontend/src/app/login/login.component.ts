import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password= '';
  errorMessage='';

  constructor(private userService: UserService, private router:Router, private translate:TranslateService ){
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  registerClick(){
    this.router.navigate(['/register'])
  }
    onLogin() {
    
      this.userService.login(this.email, this.password).subscribe(
          user => {
              localStorage.setItem('userId', user.id.toString());
              this.router.navigate(['/tasks']);
          },
          error => {
              this.errorMessage = 'Invalid email or password';
          }
      );
    }


}
