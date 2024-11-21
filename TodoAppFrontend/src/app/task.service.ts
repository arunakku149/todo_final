import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Task} from '../app/models/task.model';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private baseURL='http://localhost:8080'

  private baseURL='https://welcometodo.onrender.com'

  
  constructor(private http:HttpClient) { }

  getUserTasks(userId: number): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseURL}/task/`+userId)
  }

  addTask(taskData:any): Observable<Task>{
    return this.http.post<Task>(`${this.baseURL}/addTask`, taskData)
  }

  updateTask(task:Task): Observable<Task>{
    console.log(task)
    return this.http.put<Task>(`${this.baseURL}/updateTask`, task)
  }
  deleteTask(taskId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/deleteTask/`+taskId)
  }

  getFilterTask(userId:number, status: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseURL}/filterTask`, {params:{userId:userId, status:status}})

  }
}
