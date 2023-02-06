import React from "react";
import "../styles/Todo.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ListTodos from "./ListTodos";
import Error from "./Error";
import Login from "./Login";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  return (
    <div className="todo">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          {/* <Route path="/welcome/:username" element={<Welcome />}></Route> */}
          <Route path="/todos/:username" element={<ListTodos />}></Route>
          <Route path="/todo/:username/:id" element={<TodoItem />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

/*
function Welcome() {
  const { username } = useParams();
  console.log(username);
  return (
    <div className="welcome">
      <h1>Welcome {username}</h1>
    </div>
  );
} */

function Header() {
  return (
    <div className="header">
      Header <hr />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">Footer</div>
    </footer>
  );
}

export default TodoApp;
