import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import uuidv4 from 'uuid/v4'


function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => { // Function to load the Todos
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos) // Set todos to the stored todos
  }, []) // Only calls this function once when the component loads
        // JSON parses the string into an array

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) // stores Todos in a local storage
  }, [todos]) // Any time the array of todos changes, calls on this useEffect function to save to a local storage
              //JSON.stringify is used to convert the data into string

  function toggleTodo(id) { // Toggles to store the change of the Todos
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) { // Function adds new Todos to the previous Todos list
    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todos => !todos.complete)
    setTodos(newTodos)
  }

  return (
    
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} type="submit"> Add To Do</button>
      <button onClick={handleClearTodos}>Clear Completed To Do</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>

    </>
  )
}

export default App;
