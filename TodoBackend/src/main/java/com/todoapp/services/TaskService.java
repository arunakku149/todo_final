package com.todoapp.services;

import java.util.List;

import com.todoapp.entities.Task;

public interface TaskService {
	public List<Task> getTasksByUser(Long userId);
	public Task addTask(Task task);
	public Task updateTask(Task task);
	public void deleteTask(Long taskId);
	public List<Task> getTasksByUserIdAndStatus(Long userId, String status);

}
