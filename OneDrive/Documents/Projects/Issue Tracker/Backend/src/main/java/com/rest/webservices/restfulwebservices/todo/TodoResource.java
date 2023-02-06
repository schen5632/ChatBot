package com.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//@RestController
public class TodoResource {
	private TodoService todoService;
	
	public TodoResource(TodoService todoService) {
		this.todoService = todoService;
	}
	
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable String id) {
		return todoService.findById(id);
	}

	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable String id) {
		todoService.deleteById(id);
		return ResponseEntity.noContent().build(); // sending response status of no content
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username, @PathVariable String id, @RequestBody Todo todo) {
		todoService.updateTodo(todo);
		return todo; // sending response status of no content
	}
	
	@PostMapping("/users/{username}/todos")
	public Todo updateTodo(@PathVariable String username,  @RequestBody Todo todo, @RequestBody String id) {
		Todo createdTodo = todoService.addTodo(id, username, todo.getDescription(),todo.getTargetDate(), todo.isDone(), todo.getStatus());
		return createdTodo; // sending response status of no content
		
	}
}
