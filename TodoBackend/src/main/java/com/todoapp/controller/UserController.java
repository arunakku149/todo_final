package com.todoapp.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.todoapp.entities.User;
import com.todoapp.services.UserServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserServiceImpl userService;
	
	@PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }
	
	
	@PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginData) {
        String email = loginData.getEmail();
        String password = loginData.getPassword();
        Optional<User> user = userService.loginUser(email, password);
        if(user.isPresent()) {
        	return ResponseEntity.ok(user.get());
        }else {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<User> getUser(@PathVariable Long userId){
		Optional<User> userById = userService.findById(userId);
		if(userById.isPresent()) {
			return ResponseEntity.ok(userById.get());
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
