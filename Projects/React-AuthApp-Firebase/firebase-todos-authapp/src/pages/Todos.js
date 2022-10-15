import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import {
  query,
  collection,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useAppContext } from "../App";
import { MdCollectionsBookmark } from "react-icons/md";
import { alertToast } from "../components/toastify";

const Todos = () => {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState(null);
  const [filterBy, setFilterBy] = useState("all");

  const filterCategories = ["all", "pending", "completed"];

  const [editTodo, setEditTodo] = useState(null);
  const todoInput = useRef();

  const { auth, db } = useAppContext();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (!user) return;
    fetchTodos(user.uid);
  }, [user]);

  // Create
  const addTodo = () => {
    const todoName = todoInput.current.value;

    if (todoName === "") {
      alertToast("warning", "Todo should have a Name");
      return;
    }

    addDoc(collection(db, "todos"), {
      uid: user.uid,
      name: todoName,
      isCompleted: false,
      createdAt: new Date().getTime(),
    })
      .then((res) => {
        fetchTodos(user.uid);
        alertToast("success", "Todo Added Succesfully !!");
        todoInput.current.value = "";
      })
      .catch((error) => {
        alertToast("error", error.message);
      });
  };

  // Read
  const fetchTodos = (user_uid) => {
    const q = query(collection(db, "todos"), where("uid", "==", user_uid));

    getDocs(q)
      .then((querySnapshot) => {
        let fetchedTodos = [];

        querySnapshot.forEach((doc) => {
          fetchedTodos.push({ _id: doc.id, ...doc.data() });
        });

        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      })
      .catch((error) => {
        alertToast("error", error.message);
      });
  };
  // Update
  const setupEditing = (todo) => {
    setEditTodo(todo);
    todoInput.current.value = todo.name;
  };

  const cancelEditing = () => {
    setEditTodo(null);
    todoInput.current.value = "";
  };

  const updateTodo = (todo) => {
    const newTodoName = todoInput.current.value;
    if (todo.name === newTodoName) {
      alertToast("warning", "Todo Name is the Same !! Change to Update");
      return;
    }

    updateDoc(doc(db, "todos", todo._id), {
      name: newTodoName,
    })
      .then((res) => {
        alertToast("success", "TodoName Updated !!");
        fetchTodos(user.uid);
        cancelEditing();
      })
      .catch((error) => {
        alertToast("error", error.message);
      });
  };

  const alterTodoStatus = (id, cur_IsCompleted) => {
    updateDoc(doc(db, "todos", id), {
      isCompleted: !cur_IsCompleted,
    })
      .then((res) => {
        fetchTodos(user.uid);
        setFilterBy("all");
        alertToast(
          cur_IsCompleted ? "default" : "success",
          `Todo Marked as ${cur_IsCompleted ? "Pending.." : "Complete !!"}`
        );
      })
      .catch((error) => {
        alertToast("error", error.message);
      });
  };

  // Delete
  const deleteTodo = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then((res) => {
        alertToast("success", "Todo Deleted: ");
        fetchTodos(user.uid);
      })
      .catch((error) => {
        alertToast("error", error.message);
      });
  };

  const clearAllTodos = async () => {
    try {
      todos.forEach((todo) => {
        deleteDoc(doc(db, "todos", todo._id))
          .then((res) => {
            fetchTodos(user.uid);
          })
          .catch((error) => {
            throw error;
          });
      });
      alertToast("success", "All Todos Cleared !!!");
    } catch (error) {
      alertToast("error", error.message);
    }
  };

  const setFilter = (status) => {
    setFilterBy(status);

    switch (status) {
      case "all":
        setFilteredTodos(todos);
        break;
      case "pending":
        setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
        break;
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const numOfTodosByCategory = (category) => {
    switch (category) {
      case "all":
        return todos.length;
      case "pending":
        return todos.reduce((total, todo) => {
          return todo.isCompleted ? total : total + 1;
        }, 0);
      case "completed":
        return todos.reduce((total, todo) => {
          return todo.isCompleted ? total + 1 : total;
        }, 0);
      default:
        return todos.length;
    }
  };

  return (
    <div className="card w-100 mt-3" style={{ minWidth: "600px" }}>
      {user ? (
        <>
          <h1 className="card-title my-3">
            ToDo List <MdCollectionsBookmark style={{ fontSize: "2rem" }} />
          </h1>
          <section>
            <div className="input-group mb-4 px-3">
              <input
                type="text"
                name="todoName"
                id="todo-input"
                className="form-control"
                placeholder="Enter a Todo"
                ref={todoInput}
              />
              {editTodo ? (
                <button
                  className="btn btn-success px-3"
                  onClick={() => updateTodo(editTodo)}
                >
                  Update
                </button>
              ) : (
                <button className="btn btn-primary px-3" onClick={addTodo}>
                  Add
                </button>
              )}
              {editTodo && (
                <button className="btn btn-danger" onClick={cancelEditing}>
                  Cancel
                </button>
              )}
            </div>
            {todos?.length > 0 && (
              <section className="d-flex justify-content-around align-items-center">
                <ul className="nav nav-pills justify-content-center mt-1 ">
                  {filterCategories.map((category, index) => {
                    return (
                      <li className="nav-item" key={index}>
                        <h5
                          className={
                            filterBy === category
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => setFilter(category)}
                        >
                          {category}({numOfTodosByCategory(category)})
                        </h5>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={clearAllTodos}
                  className="btn btn-danger py-2 px-1 px-md-3"
                >
                  Clear All
                </button>
              </section>
            )}

            {filteredTodos ? (
              filteredTodos.length > 0 ? (
                filteredTodos.map((singleTodo) => {
                  const { _id, name, isCompleted } = singleTodo;

                  return (
                    <article className="todo-item my-1" key={_id}>
                      <div
                        className="d-flex justify-content-center align-items-center todo"
                        style={
                          isCompleted
                            ? {
                                textDecoration: "line-through",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => alterTodoStatus(_id, isCompleted)}
                          className="mx-2"
                        />
                        <h5 className="my-1">{name}</h5>
                      </div>

                      <div className="todo-actions">
                        <button
                          className="btn btn-info"
                          onClick={() => setupEditing(singleTodo)}
                          disabled={editTodo?._id === _id}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTodo(_id)}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <h6 className="text-center fw-bold p-4 text-uppercase">
                  No Todos to Display !!
                </h6>
              )
            ) : (
              <Loading />
            )}

            <section className="d-grid gap-3 col-9 mx-auto mt-4">
              <Link to="/home" className="btn btn-dark">
                Back to Home&nbsp;
                <FaHome />
              </Link>
            </section>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Todos;
