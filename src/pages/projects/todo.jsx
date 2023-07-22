// Importing the useState and useEffect hooks from React
import classNames from 'classnames';
import { useState, useEffect } from 'react';

// Defining the functional component TodoList
const TodoList = () => {
  // Using the useState hook to create state variables
  const [newItem, setNewItem] = useState(''); // State variable for the new item input
  const [todos, setTodos] = useState([]); // State variable for the list of todos, initially an empty array

  // Load todos from localStorage on component mount
  useEffect(() => {
    // Retrieve stored todos from localStorage
    const storedTodos = localStorage.getItem('todos');
    // Check if there are any stored todos
    if (storedTodos) {
      // If storedTodos is not empty, parse the JSON and set it as the initial state of todos
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Function to handle form submission when adding a new item
  function handleSubmit(e) {
    e.preventDefault();
    const newTodos= [...todos, { id: crypto.randomUUID(), title: newItem, completed: false }];
    // Updating the todos state with a new item using the currentTodos value provided by the useState callback
    setTodos(newTodos);
    if (newTodos.length !== 0) {
      // If there are todos, save them to localStorage as a JSON string
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    setNewItem(''); // Clear the newItem input after adding an item
  }

  // Function to handle the deletion of a todo item
  function handleDelete(id) {
    // Filter out the todo with the provided id from the todos list and create a newTodos array without that todo
    const newTodos = todos.filter((todo) => todo.id !== id);
    // Update the todos state with the newTodos array, effectively removing the deleted todo from the list
    setTodos(newTodos);
    // Check if the newTodos array is empty
    if (newTodos.length === 0) {
      // If the newTodos array is empty, remove the 'todos' key from localStorage
      localStorage.removeItem('todos');
    } else {
      // If the newTodos array is not empty, save it to localStorage as a JSON string
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  }

  // Function to handle the completion of a todo item
  function handleComplete(id) {
    // Map over the todos list and toggle the completed property of the todo with the provided id
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    // Update the todos state with the newTodos array, effectively toggling the completed property of the todo
    setTodos(newTodos);
    // Check if the newTodos array is not empty
    if (newTodos.length !== 0) {
      // If the newTodos array is not empty, save it to localStorage as a JSON string
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  }

  // The TodoList component returns JSX to render the UI
  return (
    <div className="m-6 rounded-lg bg-white/30 p-6 dark:bg-black/30  max-w-lg mx-auto dark:text-white">
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row mb-6">
          <label htmlFor="item" className="block text-sm font-medium leading-6">
            new item
          </label>
          <div className="flex gap-2">
            {/* Input field to add a new item, the value is bound to the newItem state */}
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              type="text"
              id="item"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {/* Button to add the new item */}
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              add
            </button>
          </div>
        </div>
      </form>
      <h1 className="text-xl font-bold">todo list:</h1>
      <ul className="list flex flex-col gap-2">
        {/* Rendering the list of todos using the map function */}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={classNames("group flex justify-between rounded-lg bg-white p-2", {
              "opacity-50": todo.completed,
            })}
          >
            <label className="flex items-center gap-2 text-black">
              {/* Checkbox input to mark the todo as completed, checked state bound to todo's completed property */}
              <input type="checkbox" checked={todo.completed} onChange={()=>{
                handleComplete(todo.id);
              }} />
              {todo.title}
            </label>
            {/* Button to delete the todo item, calling the handleDelete function onClick */}
            <button
              onClick={() => {
                handleDelete(todo.id);
              }}
              className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 opacity-0 shadow-sm transition-opacity duration-500 hover:bg-red-600 hover:text-white group-hover:opacity-100"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the TodoList component as the default export of the module
export default function TodoListPage() {
  // TodoListPage component returns the TodoList component
  return <TodoList />;
}
