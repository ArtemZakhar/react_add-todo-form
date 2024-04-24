import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoWithUser } from './types/todoWithUser';
import { findUser } from './services/findUser';

import todosFromServer from './api/todos';

import { InputValues } from './types/inputValues';
import './App.scss';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const handleNewUser = (inputValues: InputValues) => {
    const maxId = Math.max(...todos.map(todo => todo.id));
    const findedUser = findUser(inputValues.user);

    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title: inputValues.title,
      completed: false,
      userId: findedUser.id,
      user: findedUser,
    };

    setTodos(prevState => [...prevState, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAddTodo={handleNewUser} />

      <TodoList todos={todos} />
    </div>
  );
};
