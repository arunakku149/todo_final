import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model'
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    errorMessage = '';
    constructor(private userServie:UserService, private router:Router, private translate:TranslateService ){}

    changeLanguage(lang: string) {
      this.translate.use(lang);
    }

    loginClick(){
      this.router.navigate(['/login'])
    }

    onRegister(){
      const user: User ={
        id: 0,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      if(this.firstName!=null || this.lastName!=null || this.email!=null || this.password!=null){
      this.userServie.register(user).subscribe(
        () => this.router.navigate(['/login']),
        error => this.errorMessage = 'Please fill all the fields'
      );
      }
    }

}
