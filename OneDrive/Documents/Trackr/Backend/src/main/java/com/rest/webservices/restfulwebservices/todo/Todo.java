package com.rest.webservices.restfulwebservices.todo;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Todo {

	public Todo() {
		
	}
	// Use Integer instead of int since Integer is a wrapper class while int is a primitive data type
	// This allows for more flexibility, such as setting Integer to null, which is used for JPA Repository
	// save method to determine whether to update or add to database
	public Todo(String id, String username, String description, LocalDate targetDate, boolean done, String status) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.done = done;
		this.status = status;
	}

	@Id
	//@GeneratedValue
	private String id;

	private String username;
	
	private String description;
	private LocalDate targetDate;
	private boolean done;
	private String status;

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", targetDate="
				+ targetDate + ", done=" + done + ", status=" + status + "]";
	}

}