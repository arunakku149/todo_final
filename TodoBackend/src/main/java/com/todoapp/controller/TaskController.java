package com.todoapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todoapp.dto.TaskDTO;
import com.todoapp.entities.Task;
import com.todoapp.entities.User;
import com.todoapp.services.TaskServiceImpl;
import com.todoapp.services.UserServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class TaskController {
	
	@Autowired
	private TaskServiceImpl taskService;
	@Autowired
	private UserServiceImpl userService;

	
    @GetMapping("/task/{userId}")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getTasksByUser(userId));
    }

    @PostMapping("/addTask")
    public ResponseEntity<Task> addTask(@RequestBody TaskDTO taskDTO) {  	
    	Long userId=taskDTO.getUserId();
    	Optional<User> userById=userService.findById(userId);
    	if(!userById.isPresent()) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    	Task task=new Task();
    	task.setStatus(taskDTO.getStatus());
    	task.setTitle(taskDTO.getTitle());
    	task.setDescription(taskDTO.getDescription());
    	task.setUser(userById.get());
    	
    	Task saveTask = taskService.addTask(task);  	
    	return ResponseEntity.ok(saveTask);
    }

    @PutMapping("/updateTask")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
    	System.out.println(task);
        return ResponseEntity.ok(taskService.updateTask(task));
    }
 
    @DeleteMapping("/deleteTask/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/filterTask")
    public ResponseEntity<List<Task>> getTasksByUserIdAndStatus(@RequestParam Long userId, @RequestParam String status) {
        
    	List<Task> tasks;
        if ("all".equals(status)) {
            tasks = taskService.getTasksByUser(userId);
        } else {
            tasks = taskService.getTasksByUserIdAndStatus(userId, status);
        }
        return ResponseEntity.ok(tasks);
    }
}
