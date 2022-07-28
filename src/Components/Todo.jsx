import React, { useState, useReducer } from "react";
import "./Todo.css";

const reducer = (todos, action) => {
  if (action.type === "add") {
    //add todo item in list
    if (action.value != "") {
      todos = [...todos];
      let newtodo = {
        id: todos.length + 1,
        item: action.value,
      };
      todos.push(newtodo);
    } else {
      alert("Please Enter a Todo");
    }
    return todos;
  }
  if (action.type === "delete") {
    //delete todo item from list
    todos = todos.filter((todo) => todo.id !== action.id);
    return todos;
  }
  if (action.type === "edit") {
    //edit todo list item
    let text = prompt("Enter name", action.item.item);
    if (text === null) {
      text = action.item.item;
    }
    action.item.item = text;
    todos = [...todos];
    return todos;
  }
  return todos;
};

const TodoApp = () => {
  const [singleTodo, addTodo] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <>
      <h2>Todo App</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter new task"
          onChange={(e) => addTodo(e.target.value)}
        />
        <button onClick={() => dispatch({ type: "add", value: singleTodo })}>
          Add Item
        </button>
      </div>
      {todos.length !== 0 ? (
        <>
          <div className="heading">
            <h3>Todos list</h3>
          </div>
          <div className="display-todos">
            {todos.map((item, index) => (
              <div className="separate-todo" key={item.id}>
                <span className="txt"> {item.item}</span>
                <div className="buttons">
                  <button
                    onClick={() => dispatch({ type: "edit", item: item })}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch({ type: "delete", id: item.id })}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default TodoApp;
