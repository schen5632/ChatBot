import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoApi,
  updateTodoApi,
} from "../api/TodoApiService";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ListTodos = () => {
  const { username } = useParams();
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const columnsFromBackend = {
    [uuid()]: {
      name: "TODO",
      value: "Todo",
    },
    [uuid()]: {
      name: "IN PROGRESS",
      value: "InProgress",
    },
    [uuid()]: {
      name: "TESTING",
      value: "Testing",
    },
    [uuid()]: {
      name: "DONE",
      value: "Done",
    },
  };

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
  const onDragEnd = (result, columns, setColumns) => {
    //console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId]; // original column of card
    const destColumn = columns[destination.droppableId]; // destination column of card
    let todo = todos.filter((todo) => {
      return todo.id === result.draggableId;
    })[0];
    console.log(todos);
    todo.status = destColumn.value;
    updateTodoApi(username, todo.id, todo)
      .then((response) => {
        navigate(`/todos/${username}`);
      })
      .catch((error) => console.log(error));
    const fromIndex = todos.findIndex(
      (element) => element.id === result.draggableId
    );

    if (destination.index === 0) {
      arraymove(todos, fromIndex, 0);
    } else {
      //const toIndex = todos.findIndex(element => element.id )
      let counter = -1;
      let destIndex = 0;
      todos.forEach((item, index) => {
        if (item.status === destColumn.value) {
          counter += 1;
        }
        if (counter === destination.index - 1) {
          destIndex = index + 1;
        }
      });
      arraymove(todos, fromIndex, destIndex);
    }

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceItems = [...sourceColumn.items];
    //   const destItems = [...destColumn.items];
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       items: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
  };

  useEffect(() => refreshTodos(), [] /*empty dependency list*/);

  // Calling GET request method for API
  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => response.data)
      .then((data) => {
        //console.log(data);
        setTodos(data);
        console.log(todos);
        console.log("1");
        // const arr = todos.filter((todo) => {
        //   return todo.status === "Todo";
        // });
        // console.log(arr);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then(() => {
        setMessage(`Todo ${id} deleted!`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(username, id) {
    navigate(`/todo/${username}/${id}`);
  }

  function addNewTodo() {
    navigate(`/todo/${username}/-1`);
  }
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="container">
      {/* <h1>Welcome {username}</h1> */}
      <h1>Issues and Projects</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "140px",
          marginTop: "10px",
        }}
      >
        <div className="btn btn-outline-primary" onClick={addNewTodo}>
          Add New Todo
        </div>
        <Button
          variant="outline-primary"
          className="ms-2"
          onClick={() => setOpen(!open)}
          aria-controls="collapse"
          aria-expanded={open}
        >
          Edit Todos
        </Button>
      </div>
      {/* {message && <div className="alert alert-warning">{message}</div>} */}
      <Collapse in={open}>
        <div
          style={{
            marginRight: "140px",
            marginLeft: "140px",
          }}
          id="collapse"
        >
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key="{todo.id}">
                  <td>{todo.description}</td>
                  {/* <td>{todo.targetDate.toDateString()}</td> */}
                  <td>{todo.targetDate}</td>
                  <td>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => updateTodo(username, todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapse>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          marginTop: "5px",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <div style={{ margin: 4 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: "whitesmoke",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                          className="rounded"
                        >
                          <h6>{column.name}</h6>
                          {todos
                            .filter((todo) => {
                              return todo.status === column.value;
                            })
                            .map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "8px 8px 0 8px",
                                          minHeight: "50px",
                                          backgroundColor: "white",
                                          color: "black",
                                          ...provided.draggableProps.style,
                                        }}
                                        className="rounded"
                                      >
                                        <table className="table">
                                          <tr>
                                            <th>{item.description}</th>
                                          </tr>
                                          <tr>
                                            <td>{item.targetDate}</td>
                                          </tr>
                                        </table>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default ListTodos;
