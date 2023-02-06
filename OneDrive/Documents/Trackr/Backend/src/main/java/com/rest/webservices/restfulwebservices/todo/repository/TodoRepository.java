package com.rest.webservices.restfulwebservices.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rest.webservices.restfulwebservices.todo.Todo;

public interface TodoRepository extends JpaRepository<Todo, String>{
	List<Todo> findByUsername(String username);
}
