import React from 'react';
import './App.css';
import { Content } from './features/task/Content';
import TaskForm from './features/task/TaskForm';


function App() {
  return (
    <div className="App">
      <nav style={{ backgroundColor: 'black', color: 'white' }}>ToDoList</nav>
      <TaskForm />
      <Content />
    </div>
  );
}

export default App;
