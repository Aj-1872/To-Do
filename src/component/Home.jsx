import React, { useState } from "react";
import { Reorder } from "framer-motion";

import {v4 as uuid4} from 'uuid';


const Home = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editing, setediting] = useState(false);
  const [checked, setchecked] = useState(false);

  

  const saveInTodos = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuid4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const clearList = () => {
    setTodos([]);
  };

  const removeTodoFromList = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const edit = (e , index) => {

    // setTodo('hello')
    setTodo(todos[index])
    setTodos(todos.filter((_, i) => i !== index));
      
  };

  const handleCheckChange = (e) => {
    const id = e.target.name;
    const newTodos = [...todos];
    const index = newTodos.findIndex(item => item.id === id);
  
    if (index !== -1) {
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos); // This ensures React re-renders the component with updated state
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>

      <div className="input-section flex space-x-2 mb-6">
        <input
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          id="new-task"
          value={todo}
          placeholder="Add a new task..."
          className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={saveInTodos}
        >
          Add
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={clearList}
        >
          Clear
        </button>
      </div>

      <ul className="list-disc space-y-2 max-h-60 max-w-2xl overflow-y-auto">
        <Reorder.Group axis="y" values={todos} onReorder={setTodos}>
          {todos.map((item, index) => (
            <Reorder.Item value={item} key={index}>


              <li 
                className={`flex justify-between items-start p-4 rounded-md mb-2 ${
                  index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                }`}
              >
                <input  type="checkbox" name={item.id} value={item.isCompleted} onChange = {(e)=>handleCheckChange(e)}   ></input>
                {/* <input  type="checkbox" value={todo.isCompleted} checked={checked} onChange = {(e)=>handleCheckChange(e,index)} ></input> */}

                <span className={ item.isCompleted ? "flex-grow text-left break-words line-through":"flex-grow text-left break-words "}>
                {index + 1}: {item.todo}

                </span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600"
                  onClick={() => removeTodoFromList(index)}
                >
                  X
                </button>

                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600"
                  onClick={(e) => edit(e,index)}
                >
                  edit
                </button>
              </li>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ul>
    </div>
  );
};

export default Home;
