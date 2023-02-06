package com.rest.webservices.restfulwebservices.todo;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	
	private static List<Todo> todos = new ArrayList<>();
	
	private static int todosCount = 0;
	
//	static {
//		todos.add(new Todo(++todosCount, "Siena","Get AWS Certified", 
//							LocalDate.now().plusYears(10), false ));
//		todos.add(new Todo(++todosCount, "Siena","Learn DevOps", 
//				LocalDate.now().plusYears(11), false ));
//		todos.add(new Todo(++todosCount, "Siena","Learn Full Stack Development", 
//				LocalDate.now().plusYears(12), false ));
//	}
	
	public List<Todo> findByUsername(String username){
		Predicate<? super Todo> predicate = 
				todo -> todo.getUsername().equalsIgnoreCase(username);
		return todos.stream().filter(predicate).toList();
	}
	
	public Todo addTodo(String id, String username, String description, LocalDate targetDate, boolean done, String status) {
		Todo todo = new Todo(id,username,description,targetDate,done, status);
		todos.add(todo);
		return todo;
	}
	
	public void deleteById(String id) {
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		todos.removeIf(predicate);
	}

	public Todo findById(String id) {
		System.out.println("test");
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		Todo todo = todos.stream().filter(predicate).findFirst().get();
		return todo;
	}

	public void updateTodo(Todo todo) {
		deleteById(todo.getId());
		todos.add(todo);
	}
	
}