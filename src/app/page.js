"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, deleteTodo } from "@/store/todoApi";

export default function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Добавить новую задачу..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Добавить
        </button>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center border-b py-2">
            <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
