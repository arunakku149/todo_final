package com.todoapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapp.entities.Task;
import com.todoapp.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService{
	
	@Autowired
	TaskRepository taskRepo;

	@Override
	public List<Task> getTasksByUser(Long userId) {
		 return taskRepo.findByUserId(userId);
	}

	@Override
	public Task addTask(Task task) {
		return taskRepo.save(task);
	}

	@Override
	public Task updateTask(Task task) {
		return taskRepo.save(task);
	}

	@Override
	public void deleteTask(Long taskId) {
		taskRepo.deleteById(taskId);	
	}

	@Override
	public List<Task> getTasksByUserIdAndStatus(Long userId, String status) {
		return taskRepo.findByUserIdAndStatus(userId, status);
	}
	

}
