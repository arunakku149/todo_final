import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../models/task.model';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  tasks: Task[] = [];
  userName = '';
  newTask: Task = { id: 0, title: '', description: '', status: 'incomplete', userId: 0};
  //for filtering
  filteredTasks: Task[] = [];
  filterStatus: string='all';
  //editing
  editingTask: Task | null = null;


  constructor(private taskService:TaskService, private userService:UserService, 
              private router:Router, private translate:TranslateService ){
 }
 changeLanguage(lang: string) {
  this.translate.use(lang);
  // localStorage.setItem('lang', lang);
}




  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId')); //store user details in localstorage
        this.newTask.userId = userId;
        // Fetch user details
        this.userService.getUser(userId).subscribe(user => {
            this.userName = `${user.firstName} ${user.lastName}`;
        });
        // Fetch tasks for the user
        this.loadTasks();
  }

  setFilter(status: string){
    this.filterStatus = status;
    this.loadTasks();
  }
  // Reapply the filter after editing a task
  loadTasks(){
    const userId = Number(localStorage.getItem('userId'));
    if (this.filterStatus === 'all') {
      this.taskService.getUserTasks(userId).subscribe(tasks => {
        this.tasks = tasks;
        this.filteredTasks = tasks; // No filter applied
      });
   }  else{
      this.taskService.getFilterTask(userId, this.filterStatus).subscribe(tasks => {
        this.filteredTasks = tasks;
      });
   }
  }

  //for addTask
  addTask() {
    const userId = Number(localStorage.getItem('userId')); 
    const taskData={ title: this.newTask.title,
      description: this.newTask.description,
      status: this.newTask.status,
      userId:userId
    }
    this.taskService.addTask(taskData).subscribe(task => {
        this.tasks.push(task);
        this.newTask = { id: 0, title: '', description: '', status: 'incomplete', userId: this.newTask.userId };
        this.loadTasks(); // Reapply the filter after add a task
    });
  }

  //for edit a task
  editTask(task: Task){
    this.editingTask = {...task};
  }
  
  updateTask(): void {
    // //popup
    // task.title = prompt("Edit Task Title", task.title) || task.title;
    // task.description = prompt("Edit Task Description", task.description) || task.description;
    if(this.editingTask){
    this.taskService.updateTask(this.editingTask).subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        console.log(index)
        this.tasks[index] = updatedTask;
        this.loadTasks(); // Reapply the filter after editing a task
        this.editingTask = null
    });
    }
  }
  cancelEdit():void{
    this.editingTask=null;
  }

  //for delete a task
  deleteTask(taskId: number) {
      this.taskService.deleteTask(taskId).subscribe(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.loadTasks(); // Reapply the filter after delete a task
      });
  }

  //for change status
  changeStatus(task: Task) {
    task.status = task.status === 'incomplete' ? 'completed' : 'incomplete';
    this.taskService.updateTask(task).subscribe();
  }

  //logout
  logout(){
    localStorage.removeItem('userId'); //clear user data from localstorage
    this.router.navigate(['/login'])
  }

}
