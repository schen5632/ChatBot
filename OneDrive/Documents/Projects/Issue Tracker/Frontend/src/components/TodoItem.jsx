import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "../api/TodoApiService";
import moment from "moment/moment";
import { v4 as uuid } from "uuid";

const TodoItem = () => {
  let { username, id } = useParams();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => retrieveTodos(), [id]);
  const navigate = useNavigate();

  function retrieveTodos() {
    console.log(typeof id);
    retrieveTodoApi(username, id)
      .then((response) => {
        if (id != -1) {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
          setStatus(response.data.status);
        }
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    //console.log("status: " + values.status);
    //console.log("values: ", values);
    let createNew = false;
    let todo = {};
    if (id === "-1") {
      console.log("TRUE");
      createNew = true;
      todo = {
        id: uuid(),
        username: username,
        description: values.description,
        targetDate: values.targetDate,
        done: false,
        status: values.status,
      };
    } else {
      todo = {
        id: id,
        username: username,
        description: values.description,
        targetDate: values.targetDate,
        done: false,
        status: values.status,
      };
    }

    //console.log("todo: ", todo);
    updateTodoApi(username, id, todo)
      .then((response) => {
        navigate(`/todos/${username}`);
      })
      .catch((error) => console.log(error));
    // if (createNew === true) {
    //   createTodoApi(username, todo, id)
    //     .then((response) => {
    //       navigate(`/todos/${username}`);
    //     })
    //     .catch((error) => console.log(error));
    // } else {
    //   updateTodoApi(username, id, todo)
    //     .then((response) => {
    //       navigate(`/todos/${username}`);
    //     })
    //     .catch((error) => console.log(error));
    // }
  }

  function validate(values) {
    let errors = {
      //description: "Enter a valid description",
      //targetDate: "Enter a valid target date",
    };
    console.log("values: " + values.description + "date: " + values.targetDate);
    if (values.description.length === 0) {
      errors.description = "Please enter a description";
    }
    if (
      values.targetDate == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "Please enter a target date";
    }
    if (values.status == null || values.status == "") {
      values.status = "Todo";
    }
    return errors;
  }
  return (
    <div className="container">
      <h1>description: {description}</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate, status }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <fieldset className="form-group">
                <label>Status</label>
                <Field as="select" className="form-control" name="status">
                  <option value="Todo">Todo</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Testing">Testing</option>
                  <option value="Done">Done</option>
                </Field>
              </fieldset>
              <div>
                <button className="btn btn-outline-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoItem;
