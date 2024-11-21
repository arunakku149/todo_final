package com.todoapp.services;

import java.util.Optional;

import com.todoapp.entities.User;

public interface UserService {
	public User registerUser(User user);
	public Optional<User> loginUser(String email, String password);
	public Optional<User> findById(Long userId);
	
	
}
