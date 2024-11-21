package com.todoapp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapp.entities.User;
import com.todoapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserRepository userRepo;
	
	@Override
	public User registerUser(User user) {
		return userRepo.save(user);
	}

	@Override
	public Optional<User> loginUser(String email, String password) {
		Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
	}
	@Override
	public Optional<User> findById(Long userId) {
		Optional<User> userbyId = userRepo.findById(userId);
		if (userbyId.isPresent()) {
			return userbyId;
		} else {
			return Optional.empty();
		}
	}
	
	

}
