import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../app/models/user.model';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseURL='http://localhost:8080'

  private baseURL='https://welcometodo.onrender.com'
  constructor(private http:HttpClient) { }

  register(user:User): Observable<User>{
    return this.http.post<User>(`${this.baseURL}/register`, user);
  }

  login(email: String, password:String): Observable<User>{
    console.log(email,password)
    return this.http.post<User>(`${this.baseURL}/login`, {email, password});
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/user/`+userId);
}
}
