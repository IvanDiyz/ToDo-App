import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Загрузка задач с сервера
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}?_limit=10`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Добавление новой задачи
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title, thunkAPI) => {
    try {
      const newTask = { title, completed: false };
      const response = await axios.post(API_URL, newTask);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Удаление задачи
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Возвращаем ID, чтобы удалить из Redux
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
