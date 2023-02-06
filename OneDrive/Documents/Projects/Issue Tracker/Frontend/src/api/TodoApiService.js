import axios from "axios";

// URL for API
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// GET request method for getting todo list by username
export const retrieveAllTodosForUsernameApi = (username) =>
  apiClient.get(`users/${username}/todos`);

// DELETE request method for deleting todo item
export const deleteTodoApi = (username, id) =>
  apiClient.delete(`users/${username}/todos/${id}`);

// GET request method for specific todo item
export const retrieveTodoApi = (username, id) =>
  apiClient.get(`users/${username}/todos/${id}`);

// PUT request method for updating specific todo item
export const updateTodoApi = (username, id, todo) =>
  apiClient.put(`users/${username}/todos/${id}`, todo);

export const createTodoApi = (username, todo, id) =>
  apiClient.post(`users/${username}/todos`, todo, id);
